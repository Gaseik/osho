"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import SpreadSelector from "../../components/SpreadSelector";
import SideMenu from "../../components/SideMenu";
import GuidedFlow from "../../components/GuidedFlow";

type Phase = "landing" | "guided" | "spreads";

export default function ReadingPage() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>("landing");

  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <SideMenu />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-10">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {t("common.subtitle")} ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t("common.title")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {/* Landing Phase */}
      {phase === "landing" && (
        <div className="animate-fadeUp max-w-[400px] w-full flex flex-col gap-4">
          {/* Guided Reading - Primary */}
          <button
            onClick={() => setPhase("guided")}
            className="p-6 rounded-xl bg-white/[0.03] border-2 border-zen-gold/40
                     transition-all duration-300 hover:bg-zen-gold/[0.08] hover:border-zen-gold/60
                     text-left relative overflow-hidden"
          >
            <div className="absolute top-3 right-4">
              <span className="text-[10px] bg-zen-gold/20 text-zen-gold px-2 py-0.5
                               rounded-full border border-zen-gold/30 tracking-wider">
                {t("guide.recommended")}
              </span>
            </div>
            <div className="text-lg text-zen-gold font-medium mb-1">
              {t("guide.guidedTitle")}
            </div>
            <div className="text-xs text-white/50">
              {t("guide.guidedDesc")}
            </div>
          </button>

          {/* Direct Spread Selection - Secondary */}
          <button
            onClick={() => setPhase("spreads")}
            className="p-5 rounded-xl bg-white/[0.02] border border-white/10
                     transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20
                     text-left"
          >
            <div className="text-[15px] text-white/70 mb-1">
              {t("guide.directTitle")}
            </div>
            <div className="text-xs text-white/40">
              {t("guide.directDesc")}
            </div>
          </button>

          {/* Hint */}
          <p className="text-center text-white/30 text-[11px] tracking-wider mt-2">
            {t("guide.guidedHint")}
          </p>
        </div>
      )}

      {/* Guided Phase */}
      {phase === "guided" && (
        <GuidedFlow onBack={() => setPhase("landing")} />
      )}

      {/* Spread Selection Phase */}
      {phase === "spreads" && (
        <div className="animate-fadeUp w-full flex flex-col items-center">
          <button
            onClick={() => setPhase("landing")}
            className="mb-5 text-white/40 text-xs tracking-wider hover:text-white/60
                       transition-colors duration-200 self-start max-w-[500px] w-full mx-auto"
          >
            ← {t("guide.backToReading")}
          </button>
          <SpreadSelector />
        </div>
      )}
    </div>
  );
}
