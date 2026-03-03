"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { sendGAEvent } from "@next/third-parties/google";
import SideMenu from "./SideMenu";
import TarotQuestionInput from "./TarotQuestionInput";
import TarotSpreadResult, { ClarifierData } from "./TarotSpreadResult";
import StructuredReading from "./StructuredReading";
import DonationPrompt from "./DonationPrompt";
import DonationToast from "./DonationToast";
import { TAROT_SPREADS, DrawnCard, drawTarotCards } from "../data/tarot-spreads";
import { allTarotCards } from "../data/tarot-cards";
import { getUserProfile } from "../utils/userProfile";
import {
  saveRecord,
  generateId,
  type DivinationCard,
} from "../utils/divinationRecords";

interface TarotReadingPageProps {
  spreadId: string;
  titleKey: string;
  descKey: string;
}

type AiState = "idle" | "loading" | "done" | "error";

export default function TarotReadingPage({ spreadId, titleKey, descKey }: TarotReadingPageProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "zh-TW" ? "zh" : "en";
  const spread = TAROT_SPREADS[spreadId];

  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);

  // AI reading state
  const [aiState, setAiState] = useState<AiState>("idle");
  const [aiText, setAiText] = useState("");
  const [aiError, setAiError] = useState("");

  // Clarifiers
  const [clarifiers, setClarifiers] = useState<Record<number, ClarifierData>>({});

  // Save
  const [saved, setSaved] = useState(false);

  // Ref for abort
  const abortRef = useRef<AbortController | null>(null);

  // ===== Draw cards =====
  const handleDraw = useCallback(() => {
    const cards = drawTarotCards(spreadId);
    setDrawnCards(cards);
    setAiState("idle");
    setAiText("");
    setAiError("");
    setClarifiers({});
    setSaved(false);
    sendGAEvent("event", "draw_card", {
      deck_type: "tarot",
      spread_type: spreadId,
    });
  }, [spreadId]);

  // ===== Draw again =====
  const handleDrawAgain = useCallback(() => {
    abortRef.current?.abort();
    setDrawnCards(null);
    setQuestion("");
    setAiState("idle");
    setAiText("");
    setAiError("");
    setClarifiers({});
    setSaved(false);
  }, []);

  // ===== Build card info for API =====
  const buildCardInfos = useCallback(
    (cards: DrawnCard[]) =>
      cards.map((dc) => ({
        position: `${dc.position} - ${dc.positionName[lang]}`,
        nameZh: `${dc.card.name.zh}${dc.isReversed ? "（逆位）" : "（正位）"}`,
        nameEn: `${dc.card.name.en} (${dc.isReversed ? "Reversed" : "Upright"})`,
        meaningZh: dc.isReversed ? dc.card.reversed.zh : dc.card.upright.zh,
        meaningEn: dc.isReversed ? dc.card.reversed.en : dc.card.upright.en,
      })),
    [lang]
  );

  // ===== Start AI reading =====
  const handleStartReading = useCallback(async () => {
    if (!drawnCards || aiState === "loading") return;

    setAiState("loading");
    setAiText("");
    setAiError("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const profile = getUserProfile();
      const questionText = question || t("tarot.noQuestion");
      const resp = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deck_type: "tarot",
          spread: spread.name[lang],
          cards: buildCardInfos(drawnCards),
          locale: i18n.language,
          userProfile: profile || undefined,
          topic: questionText,
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          setAiError(t("tarot.rateLimitError"));
        } else {
          setAiError(data.error || t("tarot.readingError"));
        }
        setAiState("error");
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) {
        setAiError(t("tarot.readingError"));
        setAiState("error");
        return;
      }

      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setAiText(fullText);
      }

      setAiState("done");
      sendGAEvent("event", "reading_complete", {
        deck_type: "tarot",
        spread_type: spreadId,
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setAiError(t("tarot.readingError"));
      setAiState("error");
    }
  }, [drawnCards, aiState, question, spread, lang, i18n.language, buildCardInfos, spreadId, t]);

  // ===== Draw clarifier =====
  const handleDrawClarifier = useCallback(
    async (positionIdx: number) => {
      if (!drawnCards) return;

      // Collect all used card IDs
      const usedIds = new Set(drawnCards.map((dc) => dc.card.id));
      Object.values(clarifiers).forEach((cl) => usedIds.add(cl.card.id));

      const available = allTarotCards.filter((c) => !usedIds.has(c.id));
      if (available.length === 0) return;

      const card = available[Math.floor(Math.random() * available.length)];
      const isReversed = Math.random() < 0.5;

      setClarifiers((prev) => ({
        ...prev,
        [positionIdx]: { card, isReversed, reading: "", loading: true },
      }));

      const dc = drawnCards[positionIdx];
      sendGAEvent("event", "draw_clarifier", {
        spread_type: spreadId,
        position: String(positionIdx + 1),
        card_name: card.name.en,
      });

      // Call AI for clarifier reading
      try {
        const questionText = question || t("tarot.noQuestion");
        const isZh = i18n.language.startsWith("zh");
        const clarifierPrompt = isZh
          ? `使用者的原始問題：${questionText}\n在「${spread.name.zh}」牌陣中，位置「${dc.positionName.zh}」的牌是「${dc.card.name.zh}（${dc.isReversed ? "逆位" : "正位"}）」。\n\n使用者為這個位置抽了一張確認牌：${card.name.zh}（${isReversed ? "逆位" : "正位"}）\n\n請用 2-3 句話簡短說明這張確認牌如何補充或釐清主牌的訊息。直接說重點，不需要標題或格式。用繁體中文回答。`
          : `User's original question: ${questionText}\nIn the "${spread.name.en}" spread, the card at position "${dc.positionName.en}" is "${dc.card.name.en} (${dc.isReversed ? "Reversed" : "Upright"})".\n\nThe user drew a clarifier card: ${card.name.en} (${isReversed ? "Reversed" : "Upright"})\n\nIn 2-3 sentences, briefly explain how this clarifier card supplements or clarifies the main card's message. Get straight to the point, no titles or formatting needed. Respond in English.`;

        const resp = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deck_type: "tarot",
            spread: spread.name[lang],
            cards: [
              {
                position: dc.positionName[lang],
                nameZh: `${dc.card.name.zh}（${dc.isReversed ? "逆位" : "正位"}）`,
                nameEn: `${dc.card.name.en} (${dc.isReversed ? "Reversed" : "Upright"})`,
                meaningZh: dc.isReversed ? dc.card.reversed.zh : dc.card.upright.zh,
                meaningEn: dc.isReversed ? dc.card.reversed.en : dc.card.upright.en,
              },
            ],
            locale: i18n.language,
            topic: clarifierPrompt,
          }),
        });

        if (!resp.ok) {
          setClarifiers((prev) => ({
            ...prev,
            [positionIdx]: { ...prev[positionIdx], loading: false },
          }));
          return;
        }

        const reader = resp.body?.getReader();
        if (!reader) {
          setClarifiers((prev) => ({
            ...prev,
            [positionIdx]: { ...prev[positionIdx], loading: false },
          }));
          return;
        }

        const decoder = new TextDecoder();
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
        }

        setClarifiers((prev) => ({
          ...prev,
          [positionIdx]: { ...prev[positionIdx], reading: fullText.trim(), loading: false },
        }));
      } catch {
        setClarifiers((prev) => ({
          ...prev,
          [positionIdx]: { ...prev[positionIdx], loading: false },
        }));
      }
    },
    [drawnCards, clarifiers, spreadId, question, spread, lang, i18n.language, t]
  );

  // ===== Save record =====
  const handleSave = useCallback(() => {
    if (!drawnCards || !aiText || saved) return;

    const divinationCards: DivinationCard[] = drawnCards.map((dc) => ({
      id: dc.card.id,
      name: dc.card.name.en,
      nameZh: dc.card.name.zh,
      meaning: dc.isReversed ? "Reversed" : "Upright",
    }));

    saveRecord({
      id: generateId(),
      spreadId,
      spreadName: spread.name.zh,
      spreadNameEn: spread.name.en,
      cards: divinationCards,
      question: question || "",
      aiReading: aiText,
      createdAt: new Date().toISOString(),
      review: "",
      reviewedAt: null,
    });

    setSaved(true);
  }, [drawnCards, aiText, saved, spreadId, spread, question]);

  if (!spread) return null;

  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <SideMenu />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-8">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          🃏 CLASSIC TAROT
        </div>
        <h1 className="text-3xl font-light tracking-wider text-white/90 mb-2">
          {t(titleKey)}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-2 mb-4"
        />
        <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
          {t(descKey)}
        </p>
      </div>

      {/* ===== Question phase ===== */}
      {!drawnCards ? (
        <div className="animate-fadeUp w-full max-w-lg">
          <TarotQuestionInput
            question={question}
            onQuestionChange={setQuestion}
            onSubmit={handleDraw}
          />
        </div>
      ) : (
        <div className="animate-fadeUp w-full flex flex-col items-center">
          {/* Question display */}
          {question && (
            <div className="mb-6 text-center">
              <p className="text-white/35 text-xs tracking-wider mb-1">Q</p>
              <p className="text-white/60 text-sm italic max-w-md">&ldquo;{question}&rdquo;</p>
            </div>
          )}

          {/* Spread result with cards */}
          <TarotSpreadResult
            drawnCards={drawnCards}
            spreadId={spreadId}
            clarifiers={clarifiers}
            onDrawClarifier={aiState === "done" ? handleDrawClarifier : undefined}
            showClarifierButtons={aiState === "done"}
          />

          {/* ===== AI Reading section ===== */}
          {aiState === "idle" && (
            <div className="mt-10 flex flex-col items-center gap-2">
              <button
                onClick={handleStartReading}
                className="px-10 py-3.5 rounded-full border border-zen-gold/35
                           bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                           text-zen-gold/90 text-sm tracking-[2px]
                           hover:border-zen-gold/60 hover:scale-[1.02]
                           hover:shadow-[0_0_24px_rgba(255,215,0,0.12)]
                           transition-all duration-300"
              >
                ☯︎ {t("tarot.startReading")}
              </button>
            </div>
          )}

          {aiState === "loading" && (
            <div className="mt-10 w-full max-w-2xl">
              <div className="text-center text-white/40 text-sm tracking-wider mb-4 animate-pulse">
                {t("tarot.readingLoading")}
              </div>
              {/* Show streaming text as it arrives */}
              {aiText && (
                <div className="reading-section">
                  <StructuredReading content={aiText} />
                </div>
              )}
              {!aiText && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-4 bg-white/[0.04] rounded animate-pulse"
                      style={{ width: `${70 + i * 10}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {aiState === "error" && (
            <div className="mt-10 w-full max-w-lg">
              <div className="p-5 rounded-xl bg-red-900/10 border border-red-500/20 text-center">
                <p className="text-red-300/70 text-sm">{aiError}</p>
                <button
                  onClick={handleStartReading}
                  className="mt-3 text-xs text-zen-gold/60 hover:text-zen-gold transition-colors"
                >
                  {t("tarot.drawAgain")}
                </button>
              </div>
            </div>
          )}

          {aiState === "done" && aiText && (
            <div className="mt-10 w-full max-w-2xl">
              <div className="reading-section">
                <StructuredReading content={aiText} />
              </div>

              {/* Save button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={`text-xs tracking-wider px-5 py-2 rounded-full border transition-all ${
                    saved
                      ? "border-zen-gold/20 text-zen-gold/50 cursor-default"
                      : "border-white/15 text-white/50 hover:text-zen-gold hover:border-zen-gold/30"
                  }`}
                >
                  {saved ? `✓ ${t("tarot.saveSuccess")}` : t("tarot.saveReading")}
                </button>
              </div>

              {/* Donation */}
              <div className="mt-8 flex flex-col items-center">
                <DonationPrompt />
              </div>
            </div>
          )}

          {/* Draw again */}
          <button
            onClick={handleDrawAgain}
            className="mt-8 mb-8 px-8 py-3 rounded-full border border-zen-gold/30
                       bg-gradient-to-r from-zen-gold/[0.06] to-zen-gold/[0.02]
                       text-zen-gold/80 text-sm tracking-[2px]
                       hover:border-zen-gold/50 hover:scale-[1.02]
                       transition-all duration-300"
          >
            ☯︎ {t("tarot.drawAgain")}
          </button>
        </div>
      )}

      {/* Donation toast (appears after 2+ readings) */}
      {aiState === "done" && <DonationToast />}
    </div>
  );
}
