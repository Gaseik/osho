import type { Metadata } from "next";
import Link from "next/link";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { TAROT_SPREAD_DETAILS } from "../../../data/tarot-spread-details";

export const metadata: Metadata = {
  title: "4 種塔羅牌陣介紹 | 禪意靈卡",
  description:
    "單牌、三牌陣、凱爾特十字、關係牌陣 — 4 種經典塔羅牌陣詳細介紹與使用建議。中英雙語。",
  keywords: [
    "塔羅牌陣",
    "tarot spread",
    "celtic cross",
    "three card spread",
    "韋特塔羅牌陣",
  ],
  openGraph: {
    title: "4 種塔羅牌陣介紹 | 禪意靈卡",
    description: "單牌、三牌陣、凱爾特十字、關係牌陣 — 4 種經典塔羅牌陣詳細介紹。",
  },
};

export default function TarotSpreadsPage() {
  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif px-4 py-10"
    >
      <LanguageSwitcher />

      {/* Header */}
      <div className="text-center mb-12 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          🃏 CLASSIC TAROT 🃏
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          牌陣總覽
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Spread Guide — 4 Classic Tarot Spreads
        </p>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {/* Spread list */}
      <div className="max-w-3xl mx-auto space-y-4">
        {TAROT_SPREAD_DETAILS.map((spread) => (
          <Link
            key={spread.id}
            href={`/tarot/spreads/${spread.slug}`}
            className="group block p-5 rounded-lg
                       border border-white/5 hover:border-zen-gold/30
                       bg-white/[0.02] hover:bg-zen-gold/[0.05]
                       transition-all duration-300 no-underline animate-fadeUp"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2
                    className="text-lg text-white/85 group-hover:text-zen-gold/90
                                 transition-colors m-0 font-light tracking-wider"
                  >
                    {spread.name.zh}
                  </h2>
                  <span className="text-white/30 text-xs">{spread.name.en}</span>
                </div>
                <p className="text-white/50 text-sm m-0">{spread.desc.zh}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {spread.suitableQuestions.zh.slice(0, 3).map((q) => (
                    <span
                      key={q}
                      className="px-2 py-0.5 rounded text-xs
                                 border border-white/8 text-white/40"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-2xl text-zen-gold/60 font-light">
                  {spread.count}
                </span>
                <span className="text-white/30 text-xs">張</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14 animate-fadeUp">
        <Link
          href="/tarot/single"
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full
                     border border-zen-gold/35
                     bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                     text-zen-gold/90 text-sm tracking-[2px]
                     hover:border-zen-gold/60 hover:scale-105
                     transition-all duration-300 no-underline"
        >
          <span>🃏</span>
          <span>開始抽牌</span>
        </Link>
      </div>
    </div>
  );
}
