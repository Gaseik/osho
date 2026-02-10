"use client";

import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Card } from "../data/cards";
import { Spread, POSITION_LABELS, SPREAD_LAYOUTS } from "../data/spreads";
import FlipCard from "./FlipCard";

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
  const layout = SPREAD_LAYOUTS[spread.id];

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
      return `${labels[i]}：${cardName} - ${c.meaning}`;
    });
    const spreadName = i18n.language === 'zh-TW' ? spread.name : t(`spread.${spread.id}`);
    const cardsText = lines.join("\n");
    return t('result.promptTemplate', { spreadName, cards: cardsText });
  };

  const labels = getSpreadLabels(spread.id);

  const renderCard = (cardIdx: number) => (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[11px] text-zen-gold-dim tracking-widest">
        {labels[cardIdx]}
      </div>
      <FlipCard
        card={drawn[cardIdx]}
        label={labels[cardIdx]}
        delay={cardIdx * 200}
        onFlipped={onFlipped}
      />
    </div>
  );

  const renderGridLayout = () => {
    if (!layout) return null;
    return (
      <div ref={resultRef} className="spread-grid flex flex-col items-center gap-3 mb-8 px-2">
        {layout.rows.map((row, rowIdx) => {
          if (row.type === "section") {
            return (
              <div
                key={rowIdx}
                className="text-zen-gold/60 text-sm tracking-widest py-3"
              >
                {t(`spread.${spread.id}Sections.${row.key}`)}
              </div>
            );
          }

          if (row.type === "sections") {
            return (
              <div
                key={rowIdx}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                  gap: "0.5rem",
                }}
                className="w-full max-w-[520px]"
              >
                {Array.from({ length: layout.cols }, (_, colIdx) => {
                  const item = row.items.find((it) => it.col === colIdx);
                  return (
                    <div
                      key={colIdx}
                      className="text-zen-gold/60 text-xs tracking-widest py-2 text-center"
                    >
                      {item
                        ? t(`spread.${spread.id}Sections.${item.key}`)
                        : ""}
                    </div>
                  );
                })}
              </div>
            );
          }

          if (row.type === "cards") {
            return (
              <div
                key={rowIdx}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                  gap: "0.5rem",
                }}
                className="w-full max-w-[520px]"
              >
                {row.cells.map((cardIdx, colIdx) => (
                  <div key={colIdx} className="flex justify-center">
                    {cardIdx !== null ? renderCard(cardIdx) : null}
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  const renderDefaultLayout = () => (
    <div
      ref={resultRef}
      className="flex gap-5 justify-center flex-wrap mb-8 p-5"
    >
      {drawn.map((card, i) => (
        <div
          key={card.id}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-[11px] text-zen-gold-dim tracking-widest">
            {labels[i]}
          </div>
          <FlipCard
            card={card}
            label={labels[i]}
            delay={i * 200}
            onFlipped={onFlipped}
          />
        </div>
      ))}
    </div>
  );

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

      {/* Cards */}
      {layout ? renderGridLayout() : renderDefaultLayout()}

      {/* Actions - show after all flipped */}
      {flippedCount >= spread.count && (
        <div className="animate-fadeUp flex flex-col items-center gap-3">
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-zen-gold/30 to-transparent mb-2" />

          {/* Prompt Preview */}
          <div className="bg-white/[0.03] rounded-xl border border-zen-gold/10 p-4 max-w-[500px] w-full text-left mb-2">
            <div className="text-[11px] text-zen-gold/50 mb-2 tracking-wider">
              {t('result.promptPreview')}
            </div>
            <div className="text-xs text-white/60 leading-relaxed whitespace-pre-line">
              {genPrompt()}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={onCopyPrompt}
              className={`px-7 py-3 rounded-lg border transition-all duration-300 text-sm tracking-wider
                ${copied
                  ? 'bg-zen-gold/20 border-zen-gold/40 text-zen-gold'
                  : 'bg-zen-gold/[0.08] border-zen-gold/40 text-zen-gold hover:bg-zen-gold/[0.15]'
                }`}
            >
              {copied ? `✓ ${t('result.copied')}` : t('result.copyPrompt')}
            </button>
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
