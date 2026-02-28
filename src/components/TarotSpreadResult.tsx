"use client";

import { useTranslation } from "react-i18next";
import { DrawnCard } from "../data/tarot-spreads";
import TarotFlipCard from "./TarotFlipCard";
import TarotCardFace from "./TarotCardFace";
import { TarotCard } from "../data/tarot-cards";

export interface ClarifierData {
  card: TarotCard;
  isReversed: boolean;
  reading: string;
  loading: boolean;
}

interface TarotSpreadResultProps {
  drawnCards: DrawnCard[];
  spreadId: string;
  clarifiers?: Record<number, ClarifierData>;
  onDrawClarifier?: (positionIdx: number) => void;
  showClarifierButtons?: boolean;
}

export default function TarotSpreadResult({
  drawnCards,
  spreadId,
  clarifiers = {},
  onDrawClarifier,
  showClarifierButtons,
}: TarotSpreadResultProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "zh-TW" ? "zh" : "en";

  const cardLabel = (dc: DrawnCard) => (
    <div className="text-center mt-1.5">
      <div className="text-[11px] text-white/50 tracking-wider">
        {dc.positionName[lang]}
      </div>
      <div
        className={`text-[10px] tracking-wider mt-0.5 ${
          dc.isReversed ? "text-purple-400/70" : "text-zen-gold/70"
        }`}
      >
        {dc.isReversed ? `${t("tarot.reversed")} ▼` : `${t("tarot.upright")} ▲`}
      </div>
    </div>
  );

  const renderClarifier = (idx: number) => {
    const cl = clarifiers[idx];
    if (!cl) {
      if (!showClarifierButtons || !onDrawClarifier) return null;
      return (
        <button
          onClick={() => onDrawClarifier(idx)}
          className="mt-2 text-[10px] text-white/30 hover:text-zen-gold/60
                     transition-colors flex items-center gap-1"
        >
          <span>🔍</span>
          <span>{t("tarot.drawClarifier")}</span>
        </button>
      );
    }

    return (
      <div className="mt-2 flex flex-col items-center">
        <div className="text-[9px] text-white/30 tracking-wider mb-1">
          {t("tarot.clarifier")}
        </div>
        <div style={{ transform: "scale(0.75)", transformOrigin: "top center" }}>
          <TarotCardFace card={cl.card} reversed={cl.isReversed} small />
        </div>
        <div className="text-[9px] text-white/40 mt-0.5">
          {cl.card.name[lang]}
        </div>
        <div
          className={`text-[9px] tracking-wider ${
            cl.isReversed ? "text-purple-400/60" : "text-zen-gold/60"
          }`}
        >
          {cl.isReversed ? `${t("tarot.reversed")} ▼` : `${t("tarot.upright")} ▲`}
        </div>
        {cl.loading ? (
          <div className="mt-1 text-[10px] text-white/25 animate-pulse">
            {t("tarot.clarifierLoading")}
          </div>
        ) : cl.reading ? (
          <p className="mt-1.5 text-[11px] text-white/45 leading-relaxed max-w-[160px] text-center">
            {cl.reading}
          </p>
        ) : null}
      </div>
    );
  };

  const renderCard = (idx: number) => {
    const dc = drawnCards[idx];
    if (!dc) return null;
    return (
      <div key={idx} className="flex flex-col items-center">
        <TarotFlipCard
          card={dc.card}
          delay={idx * 200}
          revealed
          reversed={dc.isReversed}
        />
        {cardLabel(dc)}
        {renderClarifier(idx)}
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
    const dc0 = drawnCards[0];
    const dc1 = drawnCards[1];
    return (
      <div className="py-4 w-full overflow-x-auto">
        <div className="celtic-cross-wrapper">
          <div className="flex flex-row items-start justify-center gap-8">
            {/* Cross section */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center">{renderCard(4)}</div>
              <div className="flex items-center justify-center gap-4">
                {renderCard(3)}
                <div className="flex flex-col items-center">
                  <div className="relative" style={{ width: 140, height: 210 }}>
                    <TarotFlipCard
                      card={dc0.card}
                      delay={0}
                      revealed
                      reversed={dc0.isReversed}
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
                  <div className="text-center mt-1.5">
                    <div className="text-[10px] text-white/45 tracking-wider">
                      {dc0.positionName[lang]}
                      <span className={`ml-1 ${dc0.isReversed ? "text-purple-400/60" : "text-zen-gold/60"}`}>
                        {dc0.isReversed ? "▼" : "▲"}
                      </span>
                    </div>
                    {dc1 && (
                      <div className="text-[10px] text-white/45 tracking-wider">
                        {dc1.positionName[lang]}
                        <span className={`ml-1 ${dc1.isReversed ? "text-purple-400/60" : "text-zen-gold/60"}`}>
                          {dc1.isReversed ? "▼" : "▲"}
                        </span>
                      </div>
                    )}
                  </div>
                  {renderClarifier(0)}
                  {renderClarifier(1)}
                </div>
                {renderCard(5)}
              </div>
              <div className="flex justify-center">{renderCard(2)}</div>
            </div>

            {/* Staff section */}
            <div className="flex flex-col-reverse items-center gap-3">
              {renderCard(6)}
              {renderCard(7)}
              {renderCard(8)}
              {renderCard(9)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (spreadId === "relationship") {
    return (
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="flex justify-center gap-3 sm:gap-6">
          {renderCard(0)}
          {renderCard(2)}
          {renderCard(1)}
        </div>
        <div className="flex justify-center gap-3 sm:gap-6">
          {renderCard(3)}
          {renderCard(4)}
        </div>
        <div className="flex justify-center">{renderCard(5)}</div>
        <div className="flex justify-center">{renderCard(6)}</div>
      </div>
    );
  }

  return null;
}
