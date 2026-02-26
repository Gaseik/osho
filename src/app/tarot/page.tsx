"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import SideMenu from "../../components/SideMenu";
import { TAROT_SPREADS } from "../../data/tarot-spreads";

export default function TarotPage() {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith("zh");

  return (
    <div className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark text-white font-serif flex flex-col items-center px-4 py-10">
      <SideMenu />

      {/* Header */}
      <div className="text-center animate-fadeUp mb-10">
        <div className="text-sm tracking-[0.375rem] text-purple-300/60 mb-2">
          🃏 CLASSIC TAROT 🃏
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {isZh ? "傳統塔羅" : "Classic Tarot"}
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mx-auto mt-3" />
      </div>

      {/* Spread selection */}
      <div className="animate-fadeUp max-w-[400px] w-full flex flex-col gap-4">
        {TAROT_SPREADS.map((spread, i) => (
          <Link
            key={spread.id}
            href={`/tarot/${spread.id}`}
            className={`p-5 rounded-xl bg-white/[0.02] border transition-all duration-300 text-left no-underline ${
              i === 0
                ? "border-2 border-purple-400/40 hover:bg-purple-500/[0.08] hover:border-purple-400/60"
                : "border-white/10 hover:bg-white/[0.06] hover:border-white/20"
            }`}
          >
            <div className={`text-[15px] mb-1 ${i === 0 ? "text-purple-300 font-medium" : "text-white/70"}`}>
              {isZh ? spread.name : spread.nameEn}
            </div>
            <div className="text-xs text-white/40">
              {isZh ? spread.desc : spread.descEn}
            </div>
            <div className="text-[10px] text-white/25 mt-1">
              {spread.count} {isZh ? "張牌" : "cards"}
            </div>
          </Link>
        ))}

        <p className="text-center text-white/25 text-[11px] tracking-wider mt-2">
          {isZh ? "靜心片刻，讓直覺引導你" : "Take a moment, let your intuition guide you"}
        </p>
      </div>
    </div>
  );
}
