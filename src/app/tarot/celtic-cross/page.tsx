"use client";

import { useTranslation } from "react-i18next";
import SideMenu from "../../../components/SideMenu";

export default function TarotCelticCrossPage() {
  const { t } = useTranslation();

  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center justify-center px-4 py-10"
    >
      <SideMenu />

      <div className="text-center animate-fadeUp max-w-md">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-3">
          🃏 CLASSIC TAROT
        </div>
        <h1 className="text-3xl font-light tracking-wider text-white/90 mb-2">
          {t("tarot.celticCross.title")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3 mb-8"
        />
        <p className="text-white/55 text-base leading-relaxed mb-8">
          {t("tarot.celticCross.desc")}
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                        border border-zen-gold/25 bg-zen-gold/[0.06] text-zen-gold/80 text-sm tracking-wider">
          <span>🚧</span>
          <span>{t("tarot.comingSoon")}</span>
        </div>
        <p className="text-white/30 text-xs mt-4">
          {t("tarot.underDevelopment")}
        </p>
      </div>
    </div>
  );
}
