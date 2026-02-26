"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useTranslation } from "react-i18next";
import { TarotCard, shuffleTarotDeck } from "../data/tarot-cards";
import { TarotSpread } from "../data/tarot-spreads";
import { DrawnTarotCard } from "./TarotDrawPhase";
import TarotFlipCard from "./TarotFlipCard";
import TarotCardFace from "./TarotCardFace";
import TarotSpreadLayout from "./TarotSpreadLayout";
import MarkdownReading from "./MarkdownReading";
import DonationPrompt from "./DonationPrompt";
import DonationToast from "./DonationToast";
import { saveRecord, generateId, type DivinationCard } from "../utils/divinationRecords";
import { getUserProfile } from "../utils/userProfile";

type AiState = "idle" | "loading" | "done" | "error";

interface ClarifierCard {
  card: TarotCard;
  isReversed: boolean;
  reading: string;
  loading: boolean;
}

interface TarotResultPhaseProps {
  spread: TarotSpread;
  drawn: DrawnTarotCard[];
  userQuestion: string;
  flippedCount: number;
  onFlipped: () => void;
  onReset: () => void;
  /** Cards already used (drawn), so clarifier doesn't duplicate */
  usedCardIds: Set<number>;
}

export default function TarotResultPhase({
  spread,
  drawn,
  userQuestion,
  flippedCount,
  onFlipped,
  onReset,
  usedCardIds,
}: TarotResultPhaseProps) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith("zh");
  const [revealed, setRevealed] = useState(false);
  const [question, setQuestion] = useState(userQuestion);
  const [saved, setSaved] = useState(false);

  // AI reading state
  const [aiState, setAiState] = useState<AiState>("idle");
  const [aiText, setAiText] = useState("");
  const [aiError, setAiError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isDailyLimit, setIsDailyLimit] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showPromptLink, setShowPromptLink] = useState(false);
  const [readingCopied, setReadingCopied] = useState(false);
  const aiTriggered = useRef(false);

  // Clarifier cards
  const [clarifiers, setClarifiers] = useState<Record<number, ClarifierCard>>({});
  const clarifierPoolRef = useRef<Set<number>>(new Set());

  const allFlipped = flippedCount >= spread.count;

  // Init clarifier pool (all cards not in the main draw)
  useEffect(() => {
    const pool = new Set<number>();
    for (let i = 0; i < 78; i++) {
      if (!usedCardIds.has(i)) pool.add(i);
    }
    clarifierPoolRef.current = pool;
  }, [usedCardIds]);

  const handleRequestReveal = () => {
    if (!revealed) setRevealed(true);
  };

  useEffect(() => {
    if (aiState !== "loading") return;
    const timer = setTimeout(() => setShowPromptLink(true), 3000);
    return () => clearTimeout(timer);
  }, [aiState]);

  const handleAiReading = useCallback(async () => {
    setAiState("loading");
    setAiText("");
    setAiError("");
    setIsRateLimited(false);
    setIsDailyLimit(false);
    setShowPrompt(false);
    setShowPromptLink(false);

    const spreadName = isZh ? spread.name : spread.nameEn;
    const cards = drawn.map((d, i) => ({
      position: isZh ? spread.positions[i]?.zh : spread.positions[i]?.en,
      nameZh: d.card.name.zh,
      nameEn: d.card.name.en,
      meaningZh: d.isReversed ? d.card.reversed.zh : d.card.upright.zh,
      meaningEn: d.isReversed ? d.card.reversed.en : d.card.upright.en,
    }));

    const userProfile = getUserProfile();

    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spread: spreadName,
          spreadId: spread.id,
          cards,
          locale: i18n.language,
          deckType: "tarot",
          userQuestion,
          ...(userProfile && { userProfile }),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          setIsRateLimited(true);
          if (errData.dailyLimit) setIsDailyLimit(true);
        }
        setAiError(errData.error || `HTTP ${response.status}`);
        setAiState("error");
        setShowPrompt(true);
        setShowPromptLink(true);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setAiState("error");
        setShowPrompt(true);
        setShowPromptLink(true);
        return;
      }

      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      setAiText(accumulated);
      setAiState("done");
      setShowPromptLink(true);
      sendGAEvent("event", "tarot_reading_complete", { spread_type: spread.id });
    } catch (err) {
      setAiError(err instanceof Error ? err.message : String(err));
      setAiState("error");
      setShowPrompt(true);
      setShowPromptLink(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spread, drawn, i18n.language, userQuestion]);

  // Auto-trigger AI reading when all cards are flipped
  useEffect(() => {
    if (allFlipped && !aiTriggered.current) {
      aiTriggered.current = true;
      handleAiReading();
    }
  }, [allFlipped, handleAiReading]);

  // --- Clarifier ---
  const drawClarifier = useCallback(async (positionIndex: number) => {
    if (clarifiers[positionIndex]) return;

    const pool = clarifierPoolRef.current;
    if (pool.size === 0) return;

    // Pick a random card from the pool
    const poolArr = Array.from(pool);
    const randomIdx = Math.floor(Math.random() * poolArr.length);
    const cardId = poolArr[randomIdx];
    pool.delete(cardId);

    const allCards = shuffleTarotDeck(); // just to get the card object
    const card = allCards.find((c) => c.id === cardId)!;
    const isReversed = Math.random() < 0.5;

    setClarifiers((prev) => ({
      ...prev,
      [positionIndex]: { card, isReversed, reading: "", loading: true },
    }));

    sendGAEvent("event", "draw_clarifier", {
      spread_type: spread.id,
      position: positionIndex,
      card_name: card.name.en,
    });

    // Ask AI for clarifier reading
    const mainCard = drawn[positionIndex];
    const posLabel = isZh ? spread.positions[positionIndex]?.zh : spread.positions[positionIndex]?.en;

    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spread: isZh ? "確認牌補充解讀" : "Clarifier Card Reading",
          spreadId: "clarifier",
          deckType: "tarot",
          userQuestion,
          cards: [
            {
              position: isZh
                ? `${posLabel}的主牌`
                : `Main card for ${posLabel}`,
              nameZh: mainCard.card.name.zh,
              nameEn: mainCard.card.name.en,
              meaningZh: mainCard.isReversed ? mainCard.card.reversed.zh : mainCard.card.upright.zh,
              meaningEn: mainCard.isReversed ? mainCard.card.reversed.en : mainCard.card.upright.en,
            },
            {
              position: isZh ? "確認牌" : "Clarifier Card",
              nameZh: card.name.zh,
              nameEn: card.name.en,
              meaningZh: isReversed ? card.reversed.zh : card.upright.zh,
              meaningEn: isReversed ? card.reversed.en : card.upright.en,
            },
          ],
          locale: i18n.language,
        }),
      });

      if (!response.ok) {
        setClarifiers((prev) => ({
          ...prev,
          [positionIndex]: { ...prev[positionIndex], loading: false, reading: isZh ? "（無法取得確認牌解讀）" : "(Unable to get clarifier reading)" },
        }));
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let accumulated = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      setClarifiers((prev) => ({
        ...prev,
        [positionIndex]: { ...prev[positionIndex], loading: false, reading: accumulated },
      }));
    } catch {
      setClarifiers((prev) => ({
        ...prev,
        [positionIndex]: { ...prev[positionIndex], loading: false, reading: isZh ? "（無法取得確認牌解讀）" : "(Unable to get clarifier reading)" },
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clarifiers, drawn, spread, i18n.language, userQuestion, isZh]);

  const handleCopyReading = () => {
    navigator.clipboard.writeText(aiText).then(() => {
      setReadingCopied(true);
      setTimeout(() => setReadingCopied(false), 2000);
    });
  };

  const handleSave = () => {
    const recordCards: DivinationCard[] = drawn.map((d) => ({
      id: d.card.id,
      name: d.card.name.en,
      nameZh: d.card.name.zh,
      meaning: (d.isReversed ? d.card.reversed.en : d.card.upright.en).slice(0, 80),
    }));
    saveRecord({
      id: generateId(),
      spreadId: `tarot_${spread.id}`,
      spreadName: spread.name,
      spreadNameEn: spread.nameEn,
      cards: recordCards,
      question,
      aiReading: aiText,
      createdAt: new Date().toISOString(),
      review: "",
      reviewedAt: null,
    });
    setSaved(true);
    sendGAEvent("event", "save_reading", { spread_type: `tarot_${spread.id}` });
  };

  const renderCard = (cardIdx: number) => {
    const d = drawn[cardIdx];
    const cardName = isZh ? d.card.name.zh : d.card.name.en;
    const posLabel = isZh ? spread.positions[cardIdx]?.zh : spread.positions[cardIdx]?.en;
    const clarifier = clarifiers[cardIdx];

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-[11px] text-purple-300/60 tracking-widest">
          {posLabel}
        </div>
        <TarotFlipCard
          card={d.card}
          isReversed={d.isReversed}
          label={posLabel}
          delay={cardIdx * 150}
          revealed={revealed}
          onFlipped={onFlipped}
          onRequestReveal={handleRequestReveal}
          locale={i18n.language}
        />
        <div
          className="text-xs text-white/70 mt-1 transition-opacity duration-300"
          style={{ opacity: revealed ? 1 : 0, minHeight: "1.25rem" }}
        >
          {cardName}
        </div>

        {/* Clarifier button & card */}
        {allFlipped && aiState === "done" && !clarifier && (
          <button
            onClick={() => drawClarifier(cardIdx)}
            className="mt-1 text-[10px] text-purple-400/50 hover:text-purple-300/80
                       border border-purple-400/20 rounded-full px-2.5 py-1
                       hover:border-purple-400/40 transition-all"
          >
            {isZh ? "抽確認牌 🔍" : "Clarifier 🔍"}
          </button>
        )}

        {clarifier && (
          <div className="mt-2 flex flex-col items-center gap-1 animate-fadeUp">
            <div className="text-[9px] text-purple-300/50 tracking-wider mb-1">
              {isZh ? "確認牌" : "Clarifier"}
            </div>
            <TarotCardFace
              card={clarifier.card}
              isReversed={clarifier.isReversed}
              small
              locale={i18n.language}
            />
            <div className="text-[10px] mt-1" style={{ color: clarifier.isReversed ? "rgba(200,130,255,0.8)" : "rgba(180,220,130,0.8)" }}>
              {clarifier.isReversed ? (isZh ? "逆位" : "Reversed") : (isZh ? "正位" : "Upright")}
            </div>
            <div className="text-[10px] text-white/60">{isZh ? clarifier.card.name.zh : clarifier.card.name.en}</div>
            {clarifier.loading && (
              <div className="text-[10px] text-purple-300/50 animate-pulse">
                {isZh ? "解讀中..." : "Reading..."}
              </div>
            )}
            {!clarifier.loading && clarifier.reading && (
              <div className="mt-1 p-2 rounded-lg bg-white/[0.03] border border-purple-400/10 max-w-[200px]">
                <div className="text-[10px] text-white/60 leading-relaxed">
                  <MarkdownReading content={clarifier.reading} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Pulse skeleton
  const PulseSkeleton = () => (
    <div className="bg-white/[0.03] rounded-xl border border-purple-400/20 p-5 max-w-[500px] w-full text-left mb-2">
      <div className="space-y-4">
        <div className="h-5 w-2/5 bg-white/[0.08] rounded animate-pulse" />
        <div className="space-y-2.5">
          <div className="h-3.5 w-full bg-white/[0.06] rounded animate-pulse" />
          <div className="h-3.5 w-[92%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="h-3.5 w-[85%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "300ms" }} />
        </div>
        <div className="h-5 w-1/3 bg-white/[0.08] rounded animate-pulse" style={{ animationDelay: "200ms" }} />
        <div className="space-y-2.5">
          <div className="h-3.5 w-full bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "350ms" }} />
          <div className="h-3.5 w-[88%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "500ms" }} />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-purple-400/10 flex items-center justify-center gap-2">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-pulse" style={{ animationDelay: "300ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>
        <span className="text-purple-300/50 text-xs tracking-wider">
          {isZh ? "解讀中..." : "Reading in progress..."}
        </span>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeUp text-center w-full max-w-[900px]">
      {/* User question display */}
      {userQuestion && (
        <div className="mb-4 text-sm text-purple-300/60 italic">
          &ldquo;{userQuestion}&rdquo;
        </div>
      )}

      <div style={{ height: 40, marginBottom: 24 }}>
        <p
          className="text-white/60 text-sm transition-opacity duration-500 ease-out"
          style={{ opacity: flippedCount > 0 ? 0 : 1 }}
        >
          {isZh ? "點擊牌卡翻牌" : "Click cards to flip"}
        </p>
      </div>

      <div style={{ height: 30, marginBottom: 16 }}>
        <p
          className="text-white/50 text-xs transition-opacity duration-700 ease-out"
          style={{ opacity: revealed && !allFlipped ? 0 : revealed ? 1 : 0 }}
        >
          {isZh ? "點擊已翻開的牌可放大查看" : "Tap a card to zoom in for details"}
        </p>
      </div>

      {/* Cards */}
      <TarotSpreadLayout
        spreadId={spread.id}
        cardCount={spread.count}
        renderCard={renderCard}
      />

      {/* Actions */}
      <div
        className={`flex flex-col items-center gap-3 transition-opacity duration-500 ${allFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ minHeight: allFlipped ? undefined : 0, overflow: allFlipped ? undefined : "hidden" }}
        aria-hidden={!allFlipped}
      >
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent mb-2" />

        {aiState === "loading" && <PulseSkeleton />}

        {aiState === "error" && (
          <div className={`bg-white/[0.03] rounded-xl border ${isRateLimited ? "border-purple-400/30" : "border-red-500/20"} p-4 max-w-[500px] w-full text-left mb-2`}>
            <div className="text-xs text-white/60 leading-relaxed">
              {isDailyLimit
                ? (isZh ? "今日免費次數已用完，請明天再來 🙏" : "Daily free limit reached. Please come back tomorrow 🙏")
                : isRateLimited
                  ? (isZh ? "目前使用人數較多，伺服器忙碌中，請稍後再試。" : "Too many users right now. Please try again shortly.")
                  : (isZh ? "目前流量較高，請複製 prompt 貼到 ChatGPT 或 Claude 進行解讀。" : "High traffic right now. Please copy the prompt for self-reading.")}
            </div>
            {isRateLimited && !isDailyLimit && (
              <button onClick={handleAiReading} className="mt-3 w-full px-5 py-2.5 rounded-lg border border-purple-400/30 bg-purple-400/[0.08] text-purple-300 text-xs tracking-wider hover:bg-purple-400/[0.15] transition-all duration-300">
                {isZh ? "重試解讀" : "Retry Reading"}
              </button>
            )}
          </div>
        )}

        {aiState === "done" && aiText && (
          <div className="bg-white/[0.03] rounded-xl border border-purple-400/20 p-5 max-w-[500px] w-full text-left mb-2">
            <div className="text-sm leading-relaxed max-h-[60vh] overflow-y-auto">
              <MarkdownReading content={aiText} />
            </div>
            <div className="mt-4 pt-3 border-t border-purple-400/10 flex justify-center">
              <button
                onClick={handleCopyReading}
                className={`px-5 py-2 rounded-lg border text-xs tracking-wider transition-all duration-300 ${
                  readingCopied
                    ? "bg-purple-400/20 border-purple-400/40 text-purple-300"
                    : "bg-purple-400/[0.06] border-purple-400/20 text-purple-300/70 hover:bg-purple-400/[0.12]"
                }`}
              >
                {readingCopied ? (isZh ? "✓ 已複製解讀" : "✓ Reading Copied") : (isZh ? "複製解讀" : "Copy Reading")}
              </button>
            </div>
          </div>
        )}

        {/* Prompt link */}
        <button
          onClick={() => setShowPrompt((p) => !p)}
          className={`text-white/40 text-xs tracking-wider hover:text-white/60 transition-all duration-200 underline underline-offset-2 decoration-white/20 hover:decoration-white/40 ${showPromptLink ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {isZh ? "或複製 prompt 自行解讀" : "Or copy prompt for self-reading"}
        </button>

        {showPrompt && (
          <div className="bg-white/[0.03] rounded-xl border border-purple-400/10 p-4 max-w-[500px] w-full text-left mb-2 animate-fadeUp">
            <div className="text-[11px] text-purple-300/50 mb-2 tracking-wider">PROMPT</div>
            <div className="text-xs text-white/60 leading-relaxed whitespace-pre-line">
              {generatePromptText()}
            </div>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatePromptText());
                }}
                className="px-5 py-2 rounded-lg border bg-purple-400/[0.06] border-purple-400/20 text-purple-300/70 hover:bg-purple-400/[0.12] text-xs tracking-wider transition-all duration-300"
              >
                {isZh ? "複製 Prompt" : "Copy Prompt"}
              </button>
            </div>
          </div>
        )}

        {/* Save */}
        {!saved ? (
          <div className="bg-white/[0.03] rounded-xl border border-purple-400/10 p-4 max-w-[500px] w-full mb-2">
            <div className="text-[11px] text-purple-300/50 mb-2 tracking-wider">
              {isZh ? "儲存這次解讀" : "Save This Reading"}
            </div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={isZh ? "輸入你的問題或描述（選填）" : "Enter your question (optional)"}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 placeholder-white/30 resize-none focus:outline-none focus:border-purple-400/30 transition-colors"
              rows={2}
            />
            <button
              onClick={handleSave}
              className="mt-3 w-full px-5 py-2.5 rounded-lg border border-purple-400/30 bg-purple-400/[0.08] text-purple-300 text-sm tracking-wider hover:bg-purple-400/[0.15] transition-all duration-300"
            >
              {isZh ? "儲存紀錄" : "Save Record"}
            </button>
          </div>
        ) : (
          <div className="text-purple-300/70 text-sm tracking-wider mb-2">
            ✓ {isZh ? "已儲存至占卜紀錄" : "Saved to Reading Records"}
          </div>
        )}

        <DonationToast />
        <DonationPrompt />

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={onReset}
            className="px-7 py-3 rounded-lg border border-white/15 bg-white/[0.03] text-white/60 hover:bg-white/[0.08] transition-all duration-300 text-sm tracking-wider"
          >
            {isZh ? "重新抽牌" : "Draw Again"}
          </button>
        </div>
      </div>
    </div>
  );

  function generatePromptText(): string {
    const spreadName = isZh ? spread.name : spread.nameEn;
    const lines = drawn.map((d, i) => {
      const pos = isZh ? spread.positions[i]?.zh : spread.positions[i]?.en;
      const name = isZh ? d.card.name.zh : d.card.name.en;
      const orientation = d.isReversed ? (isZh ? "逆位" : "Reversed") : (isZh ? "正位" : "Upright");
      return `${pos}：${name}（${orientation}）`;
    });
    const questionLine = userQuestion ? (isZh ? `使用者的問題：${userQuestion}\n\n` : `User's question: ${userQuestion}\n\n`) : "";
    return `${questionLine}使用「${spreadName}」牌陣，抽到以下塔羅牌：\n\n${lines.join("\n")}\n\n請根據每張牌的位置和正逆位，給出完整的解讀和建議。`;
  }
}
