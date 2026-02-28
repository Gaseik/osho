"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { sendGAEvent } from "@next/third-parties/google";
import SideMenu from "./SideMenu";
import TarotQuestionInput from "./TarotQuestionInput";
import TarotSpreadResult from "./TarotSpreadResult";
import { TAROT_SPREADS, DrawnCard, drawTarotCards } from "../data/tarot-spreads";

interface TarotReadingPageProps {
  spreadId: string;
  titleKey: string;
  descKey: string;
}

export default function TarotReadingPage({ spreadId, titleKey, descKey }: TarotReadingPageProps) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);

  const spread = TAROT_SPREADS[spreadId];

  const handleDraw = useCallback(() => {
    const cards = drawTarotCards(spreadId);
    setDrawnCards(cards);
    sendGAEvent("event", "draw_card", {
      deck_type: "tarot",
      spread_type: spreadId,
    });
  }, [spreadId]);

  const handleDrawAgain = useCallback(() => {
    setDrawnCards(null);
    setQuestion("");
  }, []);

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

      {/* Phase: question or result */}
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

          {/* Spread result */}
          <TarotSpreadResult drawnCards={drawnCards} spreadId={spreadId} />

          {/* AI reading placeholder */}
          <div className="mt-10 mb-6 w-full max-w-lg">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <div className="text-sm text-white/50 tracking-wider mb-1">
                {t("tarot.aiReadingTitle")}
              </div>
              <div className="text-xs text-white/30 flex items-center justify-center gap-1.5">
                <span>🚧</span>
                <span>{t("tarot.aiReadingComingSoon")}</span>
              </div>
            </div>
          </div>

          {/* Draw again */}
          <button
            onClick={handleDrawAgain}
            className="mt-2 mb-8 px-8 py-3 rounded-full border border-zen-gold/30
                       bg-gradient-to-r from-zen-gold/[0.06] to-zen-gold/[0.02]
                       text-zen-gold/80 text-sm tracking-[2px]
                       hover:border-zen-gold/50 hover:scale-[1.02]
                       transition-all duration-300"
          >
            ☯︎ {t("tarot.drawAgain")}
          </button>
        </div>
      )}
    </div>
  );
}
