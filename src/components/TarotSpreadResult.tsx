"use client";

import { useTranslation } from "react-i18next";
import { DrawnCard } from "../data/tarot-spreads";
import TarotFlipCard from "./TarotFlipCard";

interface TarotSpreadResultProps {
  drawnCards: DrawnCard[];
  spreadId: string;
}

export default function TarotSpreadResult({ drawnCards, spreadId }: TarotSpreadResultProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "zh-TW" ? "zh" : "en";

  const cardLabel = (dc: DrawnCard) => (
    <div className="text-center mt-1.5">
      <div className="text-[11px] text-white/50 tracking-wider">
        {dc.positionName[lang]}
      </div>
      <div
        className={`text-[10px] tracking-wider mt-0.5 ${
          dc.isReversed ? "text-red-400/70" : "text-zen-gold/70"
        }`}
      >
        {dc.isReversed ? `${t("tarot.reversed")} ▼` : `${t("tarot.upright")} ▲`}
      </div>
    </div>
  );

  const renderCard = (idx: number, overrideDelay?: number) => {
    const dc = drawnCards[idx];
    if (!dc) return null;
    return (
      <div key={idx} className="flex flex-col items-center">
        <TarotFlipCard
          card={dc.card}
          delay={overrideDelay ?? idx * 200}
          revealed
          reversed={dc.isReversed}
        />
        {cardLabel(dc)}
      </div>
    );
  };

  if (spreadId === "single") {
    return (
      <div className="flex justify-center py-4">
        {renderCard(0)}
      </div>
    );
  }

  if (spreadId === "three-card") {
    return (
      <div className="flex justify-center gap-4 sm:gap-6 py-4 flex-wrap">
        {renderCard(0)}
        {renderCard(1)}
        {renderCard(2)}
      </div>
    );
  }

  if (spreadId === "celtic-cross") {
    const dc1 = drawnCards[1];
    return (
      <div className="py-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10">
          {/* Cross section */}
          <div className="flex flex-col items-center gap-3">
            {/* Top: card 5 */}
            <div className="flex justify-center">{renderCard(4)}</div>
            {/* Middle row: card 4, center (1+2), card 6 */}
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              {renderCard(3)}
              {/* Center: card 1 with card 2 rotated on top */}
              <div className="flex flex-col items-center">
                <div className="relative" style={{ width: 140, height: 210 }}>
                  <TarotFlipCard
                    card={drawnCards[0].card}
                    delay={0}
                    revealed
                    reversed={drawnCards[0].isReversed}
                  />
                  {dc1 && (
                    <div
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                      style={{ transform: "rotate(90deg)" }}
                    >
                      <TarotFlipCard
                        card={dc1.card}
                        delay={200}
                        revealed
                        reversed={dc1.isReversed}
                      />
                    </div>
                  )}
                </div>
                {/* Labels for both center cards */}
                <div className="text-center mt-1.5">
                  <div className="text-[10px] text-white/40 tracking-wider">
                    {drawnCards[0].positionName[lang]} / {dc1?.positionName[lang]}
                  </div>
                </div>
              </div>
              {renderCard(5)}
            </div>
            {/* Bottom: card 3 */}
            <div className="flex justify-center">{renderCard(2)}</div>
          </div>

          {/* Staff section: cards 7–10 (bottom to top) */}
          <div className="flex flex-col-reverse items-center gap-3">
            {renderCard(6)}
            {renderCard(7)}
            {renderCard(8)}
            {renderCard(9)}
          </div>
        </div>
      </div>
    );
  }

  if (spreadId === "relationship") {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        {/* Row 1: You / Foundation / Other */}
        <div className="flex justify-center gap-3 sm:gap-6">
          {renderCard(0)}
          {renderCard(2)}
          {renderCard(1)}
        </div>
        {/* Row 2: Past / Challenge */}
        <div className="flex justify-center gap-3 sm:gap-6">
          {renderCard(3)}
          {renderCard(4)}
        </div>
        {/* Row 3: Advice */}
        <div className="flex justify-center">{renderCard(5)}</div>
        {/* Row 4: Outcome */}
        <div className="flex justify-center">{renderCard(6)}</div>
      </div>
    );
  }

  return null;
}
