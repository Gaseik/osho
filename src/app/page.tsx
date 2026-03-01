"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import SideMenu from "../components/SideMenu";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center justify-between px-4 py-10">
      <SideMenu />

      {/* Hero Section */}
      <div className="text-center animate-fadeUp max-w-lg">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ ZEN INSIGHT ☯︎
        </div>
        <h1 className="text-4xl font-light tracking-[0.1875rem] text-white/90 m-0 mb-4">
          {t("home.title")}
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3 mb-6" />
        <p className="text-white/55 text-base leading-relaxed mb-2">
          {t("home.subtitle")}
        </p>
      </div>

      {/* Deck Selection */}
      <div className="animate-fadeUp max-w-[460px] w-full flex flex-col gap-4">
        <p className="text-center text-zen-gold-dim text-xs tracking-[0.2em] uppercase mb-1">
          {t("home.chooseTitle")}
        </p>

        {/* Osho Zen Tarot */}
        <Link
          href="/reading"
          className="group p-6 rounded-xl bg-white/[0.03] border border-zen-gold/30
                     transition-all duration-300 hover:bg-zen-gold/[0.07] hover:border-zen-gold/55
                     hover:shadow-[0_0_24px_rgba(255,215,0,0.08)]
                     text-left no-underline relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">🔮</span>
            <div className="flex-1">
              <div className="text-lg text-zen-gold font-medium mb-1.5">
                {t("home.oshoTitle")}
              </div>
              <div className="text-xs text-white/45 leading-relaxed">
                {t("home.oshoDesc")}
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <span className="text-xs text-zen-gold/60 tracking-wider group-hover:text-zen-gold/90 transition-colors">
              {t("home.oshoBtn")} →
            </span>
          </div>
        </Link>

        {/* Classic Tarot */}
        <Link
          href="/tarot"
          className="group p-6 rounded-xl bg-white/[0.03] border border-zen-gold/30
                     transition-all duration-300 hover:bg-zen-gold/[0.07] hover:border-zen-gold/55
                     hover:shadow-[0_0_24px_rgba(255,215,0,0.08)]
                     text-left no-underline relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">🃏</span>
            <div className="flex-1">
              <div className="text-lg text-zen-gold font-medium mb-1.5">
                {t("home.classicTitle")}
              </div>
              <div className="text-xs text-white/45 leading-relaxed">
                {t("home.classicDesc")}
              </div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <span className="text-xs text-zen-gold/60 tracking-wider group-hover:text-zen-gold/90 transition-colors">
              {t("home.classicBtn")} →
            </span>
          </div>
        </Link>
      </div>

      {/* Bottom hint */}
      <div className="text-center animate-fadeUp pb-4">
        <p className="text-white/25 text-xs mt-6">
          {t("home.quietMoment")}
        </p>
      </div>
    </div>
  );
}
