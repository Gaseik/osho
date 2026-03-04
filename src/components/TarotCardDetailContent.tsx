"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import type { TarotCard } from "../data/tarot-cards";
import { getTarotCardSlug, getTarotSuitLabel } from "../data/tarot-cards";
import TarotCardFace from "./TarotCardFace";

interface Props {
  card: TarotCard;
  prev: TarotCard | null;
  next: TarotCard | null;
}

export default function TarotCardDetailContent({ card, prev, next }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language === "zh-TW" ? "zh" : "en";

  const suitKey = card.suit ?? "major";
  const suitLabel = getTarotSuitLabel(suitKey, lang);
  const suitLabelAlt = getTarotSuitLabel(suitKey, lang === "zh" ? "en" : "zh");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-white/40 mb-8 animate-fadeUp">
        <Link
          href="/tarot/cards"
          className="hover:text-zen-gold/80 transition-colors no-underline text-white/40"
        >
          {lang === "zh" ? "塔羅牌總覽" : "All Cards"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">{card.name[lang]}</span>
      </nav>

      {/* Card header */}
      <div className="text-center mb-10 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          🃏 {suitLabel.toUpperCase()} 🃏
        </div>

        {/* Card visual */}
        <div className="flex justify-center mb-6">
          <TarotCardFace card={card} />
        </div>

        {/* Name */}
        <h1 className="text-[28px] font-light tracking-[0.15rem] text-white/90 m-0">
          {card.name.zh}
        </h1>
        <p className="text-white/50 text-base mt-1 tracking-wider">
          {card.name.en}
        </p>

        {/* Suit & Element badges */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        border border-zen-gold/20 bg-zen-gold/[0.05]"
          >
            <span className="text-zen-gold/70 text-xs tracking-wider">
              {suitLabel}
            </span>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-white/40 text-xs">{suitLabelAlt}</span>
          </div>
          {card.element && (
            <div
              className="inline-flex items-center px-3 py-1.5 rounded-full
                          border border-white/10 bg-white/[0.03]"
            >
              <span className="text-white/50 text-xs">{card.element}</span>
            </div>
          )}
        </div>

        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-5"
        />
      </div>

      {/* Keywords */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
          {lang === "zh" ? "關鍵詞" : "Keywords"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {card.keywords[lang].map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 rounded-full text-xs
                         border border-white/10 bg-white/[0.03] text-white/70"
            >
              {kw}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {card.keywords[lang === "zh" ? "en" : "zh"].map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 rounded-full text-xs
                         border border-white/5 bg-transparent text-white/35"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Upright Meaning */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light flex items-center gap-2">
          <span className="text-zen-gold/60">▲</span>
          {lang === "zh" ? "正位牌義" : "Upright Meaning"}
        </h2>
        <div
          className="space-y-3 text-white/60 text-sm leading-relaxed
                      border-l-2 border-zen-gold/15 pl-5"
        >
          <p>{card.upright.zh}</p>
          <p className="text-white/40">{card.upright.en}</p>
        </div>
      </section>

      {/* Reversed Meaning */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-purple-400/70 tracking-[0.15rem] mb-4 font-light flex items-center gap-2">
          <span className="text-purple-400/60">▼</span>
          {lang === "zh" ? "逆位牌義" : "Reversed Meaning"}
        </h2>
        <div
          className="space-y-3 text-white/60 text-sm leading-relaxed
                      border-l-2 border-purple-400/15 pl-5"
        >
          <p>{card.reversed.zh}</p>
          <p className="text-white/40">{card.reversed.en}</p>
        </div>
      </section>

      {/* Timeframe */}
      {card.timeframe && (
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
            {lang === "zh" ? "時間參考" : "Timeframe"}
          </h2>
          <p className="text-white/50 text-sm">{card.timeframe}</p>
        </section>
      )}

      {/* CTA */}
      <div className="text-center mt-12 mb-10 animate-fadeUp">
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
          <span>{lang === "zh" ? "抽一張塔羅牌試試" : "Try a Reading"}</span>
        </Link>
      </div>

      {/* Prev / Next navigation */}
      <nav className="flex justify-between items-center pt-6 border-t border-white/5 animate-fadeUp">
        {prev ? (
          <Link
            href={`/tarot/cards/${getTarotCardSlug(prev)}`}
            className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                       transition-colors no-underline text-sm"
          >
            <span>←</span>
            <span>{prev.name[lang]}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/tarot/cards"
          className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors"
        >
          {lang === "zh" ? "總覽" : "All"}
        </Link>
        {next ? (
          <Link
            href={`/tarot/cards/${getTarotCardSlug(next)}`}
            className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                       transition-colors no-underline text-sm"
          >
            <span>{next.name[lang]}</span>
            <span>→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
