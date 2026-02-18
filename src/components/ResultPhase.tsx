"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread, POSITION_LABELS, SPREAD_LAYOUTS } from "../data/spreads";
import FlipCard from "./FlipCard";
import CardSpreadLayout from "./CardSpreadLayout";
import {
  saveRecord,
  generateId,
  type DivinationCard,
} from "../utils/divinationRecords";

type AiState = "idle" | "loading" | "streaming" | "done" | "error";

interface ResultPhaseProps {
  spread: Spread;
  drawn: Card[];
  flippedCount: number;
  copied: boolean;
  onFlipped: () => void;
  onCopyPrompt: () => void;
  onReset: () => void;
}

export default function ResultPhase({
  spread,
  drawn,
  flippedCount,
  copied,
  onFlipped,
  onCopyPrompt,
  onReset,
}: ResultPhaseProps) {
  const { t, i18n } = useTranslation();
  const resultRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const aiResultRef = useRef<HTMLDivElement>(null);
  const layout = SPREAD_LAYOUTS[spread.id];
  const [revealed, setRevealed] = useState(false);
  const [question, setQuestion] = useState("");
  const [saved, setSaved] = useState(false);

  // AI reading state
  const [aiState, setAiState] = useState<AiState>("idle");
  const [aiText, setAiText] = useState("");
  const [aiError, setAiError] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [showPromptLink, setShowPromptLink] = useState(false);
  const [readingCopied, setReadingCopied] = useState(false);
  const aiTriggered = useRef(false);

  const allFlipped = flippedCount >= spread.count;

  const handleRequestReveal = () => {
    if (!revealed) setRevealed(true);
  };

  useEffect(() => {
    if (allFlipped && actionsRef.current) {
      setTimeout(() => {
        actionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    }
  }, [allFlipped]);

  // 3-second timer: if still loading/streaming, show the copy prompt link
  useEffect(() => {
    if (aiState !== "loading" && aiState !== "streaming") return;
    const timer = setTimeout(() => {
      setShowPromptLink(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [aiState]);

  // Auto-scroll AI result area as text streams in
  useEffect(() => {
    if ((aiState === "streaming" || aiState === "done") && aiResultRef.current) {
      aiResultRef.current.scrollTop = aiResultRef.current.scrollHeight;
    }
  }, [aiText, aiState]);

  const getSpreadLabels = (spreadId: string): string[] => {
    if (i18n.language === 'zh-TW') {
      return POSITION_LABELS[spreadId];
    }
    return Array.from({ length: spread.count }, (_, i) =>
      t(`spread.${spreadId}Labels.${i}`)
    );
  };

  const genPrompt = () => {
    const labels = getSpreadLabels(spread.id);
    const lines = drawn.map((c, i) => {
      const cardName = t(`cards.${c.id}`);
      return `${labels[i]}：${cardName} - ${c.keywords.join(", ")}`;
    });
    const spreadName = i18n.language === 'zh-TW' ? spread.name : t(`spread.${spread.id}`);
    const cardsText = lines.join("\n");
    return t('result.promptTemplate', { spreadName, cards: cardsText });
  };

  const handleAiReading = useCallback(async () => {
    setAiState("loading");
    setAiText("");
    setAiError("");
    setShowPrompt(false);
    setShowPromptLink(false);

    const labels = getSpreadLabels(spread.id);
    const spreadName = i18n.language === 'zh-TW' ? spread.name : t(`spread.${spread.id}`);

    const cards = drawn.map((c, i) => ({
      position: labels[i],
      nameZh: c.nameZh,
      nameEn: c.name,
      meaningZh: c.keywordsZh.join("、"),
      meaningEn: c.keywords.join(", "),
    }));

    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spread: spreadName,
          cards,
          locale: i18n.language,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.log("AI reading error:", response.status, errData);
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

      setAiState("streaming");
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setAiText(accumulated);
      }

      setAiState("done");
      setShowPromptLink(true);
    } catch (err) {
      // Network error or stream interrupted
      console.log("AI reading fetch error:", err);
      setAiText((currentText) => {
        if (currentText) {
          setAiState("done");
        } else {
          setAiError(err instanceof Error ? err.message : String(err));
          setAiState("error");
          setShowPrompt(true);
          setShowPromptLink(true);
        }
        return currentText;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spread, drawn, i18n.language]);

  // Auto-trigger AI reading when all cards are flipped
  useEffect(() => {
    if (allFlipped && !aiTriggered.current) {
      aiTriggered.current = true;
      handleAiReading();
    }
  }, [allFlipped, handleAiReading]);

  const handleCopyReading = () => {
    navigator.clipboard.writeText(aiText).then(() => {
      setReadingCopied(true);
      setTimeout(() => setReadingCopied(false), 2000);
    });
  };

  const handleSave = () => {
    const recordCards: DivinationCard[] = drawn.map((c) => ({
      id: c.id,
      name: c.name,
      nameZh: c.nameZh,
      meaning: c.keywords.join(", "),
    }));
    saveRecord({
      id: generateId(),
      spreadId: spread.id,
      spreadName: spread.name,
      spreadNameEn: spread.nameEn,
      cards: recordCards,
      question,
      createdAt: new Date().toISOString(),
      review: "",
      reviewedAt: null,
    });
    setSaved(true);
  };

  const labels = getSpreadLabels(spread.id);

  const renderCard = (cardIdx: number) => {
    const cardName = t(`cards.${drawn[cardIdx].id}`);
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="text-[11px] text-zen-gold-dim tracking-widest">
          {labels[cardIdx]}
        </div>
        <FlipCard
          card={drawn[cardIdx]}
          label={labels[cardIdx]}
          delay={cardIdx * 150}
          revealed={revealed}
          onFlipped={onFlipped}
          onRequestReveal={handleRequestReveal}
        />
        {revealed && (
          <div className="text-xs text-white/70 mt-1">{cardName}</div>
        )}
      </div>
    );
  };

  return (
    <div className={`animate-fadeUp text-center w-full ${layout ? 'max-w-[900px]' : 'max-w-[700px]'}`}>
      <p
        className="text-white/60 text-sm overflow-hidden transition-all duration-500 ease-out"
        style={{
          opacity: flippedCount > 0 ? 0 : 1,
          maxHeight: flippedCount > 0 ? 0 : 40,
          marginBottom: flippedCount > 0 ? 0 : 24,
        }}
      >
        {t('result.title')}
      </p>

      <p
        className="text-white/50 text-xs overflow-hidden transition-all duration-700 ease-out"
        style={{
          opacity: revealed && !allFlipped ? 0 : revealed ? 1 : 0,
          maxHeight: revealed ? 30 : 0,
          marginBottom: revealed ? 16 : 0,
        }}
      >
        {t('result.zoomHint')}
      </p>

      {/* Cards */}
      <CardSpreadLayout
        ref={resultRef}
        spreadId={spread.id}
        cardCount={spread.count}
        renderCard={renderCard}
      />

      {/* Actions - show after all flipped */}
      {allFlipped && (
        <div ref={actionsRef} className="animate-fadeUp flex flex-col items-center gap-3">
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-zen-gold/30 to-transparent mb-2" />

          {/* Loading State */}
          {aiState === "loading" && (
            <div className="flex items-center gap-3 px-8 py-3.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zen-gold/60 animate-pulse" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-zen-gold/60 animate-pulse" style={{ animationDelay: "300ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-zen-gold/60 animate-pulse" style={{ animationDelay: "600ms" }} />
              </div>
              <span className="text-zen-gold/70 text-sm tracking-wider">
                {t('result.aiReadingLoading')}
              </span>
            </div>
          )}

          {/* Error Message */}
          {aiState === "error" && (
            <div className="bg-white/[0.03] rounded-xl border border-red-500/20 p-4 max-w-[500px] w-full text-left mb-2">
              <div className="text-xs text-white/60 leading-relaxed">
                {t('result.aiReadingError')}
              </div>
              {aiError && (
                <div className="mt-2 text-[10px] text-red-400/70 font-mono leading-relaxed break-all">
                  {aiError}
                </div>
              )}
            </div>
          )}

          {/* AI Reading Result */}
          {(aiState === "streaming" || aiState === "done") && aiText && (
            <div className="bg-white/[0.03] rounded-xl border border-zen-gold/20 p-5 max-w-[500px] w-full text-left mb-2">
              <div
                ref={aiResultRef}
                className="text-sm text-white/75 leading-relaxed whitespace-pre-line max-h-[60vh] overflow-y-auto"
              >
                {aiText}
                {aiState === "streaming" && (
                  <span className="inline-block w-1 h-4 bg-zen-gold/50 ml-0.5 animate-pulse align-text-bottom" />
                )}
              </div>

              {/* Copy Reading button - show when done */}
              {aiState === "done" && (
                <div className="mt-4 pt-3 border-t border-zen-gold/10 flex justify-center">
                  <button
                    onClick={handleCopyReading}
                    className={`px-5 py-2 rounded-lg border text-xs tracking-wider transition-all duration-300
                      ${readingCopied
                        ? 'bg-zen-gold/20 border-zen-gold/40 text-zen-gold'
                        : 'bg-zen-gold/[0.06] border-zen-gold/20 text-zen-gold/70 hover:bg-zen-gold/[0.12]'
                      }`}
                  >
                    {readingCopied ? `✓ ${t('result.copyReadingDone')}` : t('result.copyReading')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* "Or copy prompt" link - fades in after 3s or on error/done */}
          {showPromptLink && (
            <button
              onClick={() => setShowPrompt((p) => !p)}
              className="text-white/40 text-xs tracking-wider hover:text-white/60
                       transition-colors duration-200 underline underline-offset-2
                       decoration-white/20 hover:decoration-white/40 animate-fadeUp"
            >
              {t('result.orCopyPrompt')}
            </button>
          )}

          {/* Prompt Preview (expandable) */}
          {showPrompt && (
            <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-4 max-w-[500px] w-full text-left mb-2 animate-fadeUp">
              <div className="text-[11px] text-zen-gold/50 mb-2 tracking-wider">
                {t('result.promptPreview')}
              </div>
              <div className="text-[10px] text-white/40 mb-3 leading-relaxed">
                {t('result.promptHelper')}
              </div>
              <div className="text-xs text-white/60 leading-relaxed whitespace-pre-line">
                {genPrompt()}
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  onClick={onCopyPrompt}
                  className={`px-5 py-2 rounded-lg border text-xs tracking-wider transition-all duration-300
                    ${copied
                      ? 'bg-zen-gold/20 border-zen-gold/40 text-zen-gold'
                      : 'bg-zen-gold/[0.06] border-zen-gold/20 text-zen-gold/70 hover:bg-zen-gold/[0.12]'
                    }`}
                >
                  {copied ? `✓ ${t('result.copied')}` : t('result.copyPrompt')}
                </button>
              </div>
            </div>
          )}

          {/* Save Record */}
          {!saved ? (
            <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-4 max-w-[500px] w-full mb-2">
              <div className="text-[11px] text-zen-gold/50 mb-2 tracking-wider">
                {t('record.saveTitle')}
              </div>
              <div className="text-[10px] text-white/30 mb-2 leading-relaxed">
                {t('record.autoDeleteHint')}
              </div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('record.questionPlaceholder')}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2
                         text-xs text-white/70 placeholder-white/30 resize-none
                         focus:outline-none focus:border-zen-gold/30 transition-colors"
                rows={2}
              />
              <button
                onClick={handleSave}
                className="mt-3 w-full px-5 py-2.5 rounded-lg border border-zen-gold/30
                         bg-zen-gold/[0.08] text-zen-gold text-sm tracking-wider
                         hover:bg-zen-gold/[0.15] transition-all duration-300"
              >
                {t('record.save')}
              </button>
            </div>
          ) : (
            <div className="text-zen-gold/70 text-sm tracking-wider mb-2">
              ✓ {t('record.saved')}
            </div>
          )}

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={onReset}
              className="px-7 py-3 rounded-lg border border-white/15 bg-white/[0.03] text-white/60
                       hover:bg-white/[0.08] transition-all duration-300 text-sm tracking-wider"
            >
              {t('result.reset')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
