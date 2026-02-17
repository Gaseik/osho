"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import type { CardDetail } from "../data/cardDetails";
import { getCardImagePath, getSuitLabel } from "../data/cardDetails";

interface Props {
  card: CardDetail;
  prev: CardDetail | null;
  next: CardDetail | null;
}

export default function CardDetailContent({ card, prev, next }: Props) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === "zh-TW";

  const suitZh = getSuitLabel(card.suit ?? "major", "zh");
  const suitEn = getSuitLabel(card.suit ?? "major", "en");

  const keywordsStr = t(`cardKeywords.${card.id}`);
  const keywords = keywordsStr.split(/[,、]/).map((s: string) => s.trim());
  const description = t(`cardDescriptions.${card.id}`);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-white/40 mb-8 animate-fadeUp">
        <Link
          href="/cards"
          className="hover:text-zen-gold/80 transition-colors no-underline text-white/40"
        >
          {isZh ? "禪卡總覽" : "All Cards"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">
          {isZh ? card.nameZh : card.name}
        </span>
      </nav>

      {/* Card header */}
      <div className="text-center mb-10 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {suitEn.toUpperCase()} ☯︎
        </div>

        {/* Card image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-[180px] h-[270px] rounded-lg overflow-hidden shadow-2xl shadow-zen-gold/10">
            <Image
              src={getCardImagePath(card)}
              alt={`${card.nameZh} (${card.name})`}
              fill
              sizes="180px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-[28px] font-light tracking-[0.15rem] text-white/90 m-0">
          {card.nameZh}
        </h1>
        <p className="text-white/50 text-base mt-1 tracking-wider">
          {card.name}
        </p>

        {/* Suit badge */}
        <div
          className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full
                      border border-zen-gold/20 bg-zen-gold/[0.05]"
        >
          <span className="text-zen-gold/70 text-xs tracking-wider">
            {suitZh}
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-white/40 text-xs">{suitEn}</span>
        </div>

        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-5"
        />
      </div>

      {/* Keywords */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
          {isZh ? "關鍵詞" : "Keywords"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw: string) => (
            <span
              key={kw}
              className="px-3 py-1 rounded-full text-xs
                         border border-white/10 bg-white/[0.03] text-white/70"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
          {isZh ? "牌義解讀" : "Card Meaning"}
        </h2>
        <div
          className="space-y-4 text-white/60 text-sm leading-relaxed
                      border-l-2 border-zen-gold/15 pl-5"
        >
          <p>{description}</p>
        </div>
      </section>

      {/* Core meaning from original data */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
          {isZh ? "核心意涵" : "Core Meaning"}
        </h2>
        <p className="text-white/50 text-sm italic">{card.meaning}</p>
      </section>

      {/* CTA */}
      <div className="text-center mt-12 mb-10 animate-fadeUp">
        <Link
          href="/reading"
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full
                     border border-zen-gold/35
                     bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                     text-zen-gold/90 text-sm tracking-[2px]
                     hover:border-zen-gold/60 hover:scale-105
                     transition-all duration-300 no-underline"
        >
          <span>☯︎</span>
          <span>{isZh ? "抽一張牌試試" : "Try a Reading"}</span>
        </Link>
      </div>

      {/* Prev / Next navigation */}
      <nav className="flex justify-between items-center pt-6 border-t border-white/5 animate-fadeUp">
        {prev ? (
          <Link
            href={`/cards/${prev.slug}`}
            className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                       transition-colors no-underline text-sm"
          >
            <span>←</span>
            <span>{isZh ? prev.nameZh : prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/cards"
          className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors"
        >
          {isZh ? "總覽" : "All"}
        </Link>
        {next ? (
          <Link
            href={`/cards/${next.slug}`}
            className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                       transition-colors no-underline text-sm"
          >
            <span>{isZh ? next.nameZh : next.name}</span>
            <span>→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
