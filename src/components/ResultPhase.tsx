"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread, POSITION_LABELS, SPREAD_LAYOUTS } from "../data/spreads";
import FlipCard from "./FlipCard";
import CardSpreadLayout from "./CardSpreadLayout";
import MarkdownReading from "./MarkdownReading";
import {
  saveRecord,
  generateId,
  type DivinationCard,
} from "../utils/divinationRecords";
import { getUserProfile } from "../utils/userProfile";

type AiState = "idle" | "loading" | "done" | "error";

interface ResultPhaseProps {
  spread: Spread;
  drawn: Card[];
  flippedCount: number;
  copied: boolean;
  topic?: string;
  description?: string;
  onFlipped: () => void;
  onCopyPrompt: () => void;
  onReset: () => void;
}

export default function ResultPhase({
  spread,
  drawn,
  flippedCount,
  copied,
  topic,
  description,
  onFlipped,
  onCopyPrompt,
  onReset,
}: ResultPhaseProps) {
  const { t, i18n } = useTranslation();
  const resultRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
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

  // 3-second timer: if still loading, show the copy prompt link
  useEffect(() => {
    if (aiState !== "loading") return;
    const timer = setTimeout(() => {
      setShowPromptLink(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [aiState]);

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

    // Get user profile from localStorage
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
          ...(userProfile && { userProfile }),
          ...(topic && { topic }),
          ...(description && { description }),
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

      // Read the full response as text (no streaming display)
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
    } catch (err) {
      console.log("AI reading fetch error:", err);
      setAiError(err instanceof Error ? err.message : String(err));
      setAiState("error");
      setShowPrompt(true);
      setShowPromptLink(true);
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
      aiReading: aiText,
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
        <div
          className="text-xs text-white/70 mt-1 transition-opacity duration-300"
          style={{ opacity: revealed ? 1 : 0, minHeight: '1.25rem' }}
        >
          {cardName}
        </div>
      </div>
    );
  };

  // Pulse skeleton loading component
  const PulseSkeleton = () => (
    <div className="bg-white/[0.03] rounded-xl border border-zen-gold/20 p-5 max-w-[500px] w-full text-left mb-2">
      <div className="space-y-4">
        {/* Title line */}
        <div className="h-5 w-2/5 bg-white/[0.08] rounded animate-pulse" />
        {/* Paragraph lines */}
        <div className="space-y-2.5">
          <div className="h-3.5 w-full bg-white/[0.06] rounded animate-pulse" />
          <div className="h-3.5 w-[92%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="h-3.5 w-[85%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="h-3.5 w-[78%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "450ms" }} />
        </div>
        {/* Section break */}
        <div className="h-5 w-1/3 bg-white/[0.08] rounded animate-pulse" style={{ animationDelay: "200ms" }} />
        {/* More lines */}
        <div className="space-y-2.5">
          <div className="h-3.5 w-full bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "350ms" }} />
          <div className="h-3.5 w-[88%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "500ms" }} />
          <div className="h-3.5 w-[95%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "650ms" }} />
        </div>
        {/* Another section */}
        <div className="h-5 w-2/5 bg-white/[0.08] rounded animate-pulse" style={{ animationDelay: "400ms" }} />
        <div className="space-y-2.5">
          <div className="h-3.5 w-[90%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "550ms" }} />
          <div className="h-3.5 w-[82%] bg-white/[0.06] rounded animate-pulse" style={{ animationDelay: "700ms" }} />
        </div>
      </div>
      {/* Loading hint */}
      <div className="mt-4 pt-3 border-t border-zen-gold/10 flex items-center justify-center gap-2">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-zen-gold/60 animate-pulse" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-zen-gold/60 animate-pulse" style={{ animationDelay: "300ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-zen-gold/60 animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>
        <span className="text-zen-gold/50 text-xs tracking-wider">
          {t('result.aiReadingLoading')}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`animate-fadeUp text-center w-full ${layout ? 'max-w-[900px]' : 'max-w-[700px]'}`}>
      {/* Fixed-height container prevents CLS from text visibility changes */}
      <div style={{ height: 40, marginBottom: 24 }}>
        <p
          className="text-white/60 text-sm transition-opacity duration-500 ease-out"
          style={{
            opacity: flippedCount > 0 ? 0 : 1,
          }}
        >
          {t('result.title')}
        </p>
      </div>

      <div style={{ height: 30, marginBottom: 16 }}>
        <p
          className="text-white/50 text-xs transition-opacity duration-700 ease-out"
          style={{
            opacity: revealed && !allFlipped ? 0 : revealed ? 1 : 0,
          }}
        >
          {t('result.zoomHint')}
        </p>
      </div>

      {/* Cards */}
      <CardSpreadLayout
        ref={resultRef}
        spreadId={spread.id}
        cardCount={spread.count}
        renderCard={renderCard}
      />

      {/* Actions - always rendered to prevent CLS; hidden via opacity until allFlipped */}
      <div
        ref={actionsRef}
        className={`flex flex-col items-center gap-3 transition-opacity duration-500 ${
          allFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ minHeight: allFlipped ? undefined : 0, overflow: allFlipped ? undefined : 'hidden' }}
        aria-hidden={!allFlipped}
      >
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-zen-gold/30 to-transparent mb-2" />

        {/* Loading State - Pulse Skeleton */}
        {aiState === "loading" && <PulseSkeleton />}

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

        {/* AI Reading Result - shown at once when done */}
        {aiState === "done" && aiText && (
          <div className="bg-white/[0.03] rounded-xl border border-zen-gold/20 p-5 max-w-[500px] w-full text-left mb-2">
            <div className="text-sm leading-relaxed max-h-[60vh] overflow-y-auto">
              <MarkdownReading content={aiText} />
            </div>

            {/* Copy Reading button */}
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
          </div>
        )}

        {/* "Or copy prompt" link - fades in after 3s or on error/done */}
        <button
          onClick={() => setShowPrompt((p) => !p)}
          className={`text-white/40 text-xs tracking-wider hover:text-white/60
                     transition-all duration-200 underline underline-offset-2
                     decoration-white/20 hover:decoration-white/40
                     ${showPromptLink ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {t('result.orCopyPrompt')}
        </button>

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
    </div>
  );
}
