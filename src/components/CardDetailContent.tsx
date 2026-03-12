"use client";

import { useTranslation } from "react-i18next";
import { getCardDataLang } from "../i18n/config";
import Image from "next/image";
import Link from "next/link";
import type { CardDetail } from "../data/cardDetails";
import { getCardImagePath, getSuitLabel } from "../data/cardDetails";
import CardImageLightbox from "./CardImageLightbox";

interface Props {
  card: CardDetail;
  prev: CardDetail | null;
  next: CardDetail | null;
}

export default function CardDetailContent({ card, prev, next }: Props) {
  const { t, i18n } = useTranslation();
  const lang = getCardDataLang(i18n.language);

  const suitLabel = getSuitLabel(card.suit ?? "major", lang);

  const cardName = t(`cards.${card.id}`);
  const keywordsStr = t(`cardKeywords.${card.id}`);
  const keywords = keywordsStr.split(/[,、]/).map((s: string) => s.trim());
  const rawDescription = t(`cardDescriptions.${card.id}`);
  const paragraphs = rawDescription.split('\n\n').filter((p: string) => p.trim());

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-white/40 mb-8 animate-fadeUp">
        <Link
          href="/cards"
          className="hover:text-zen-gold/80 transition-colors no-underline text-white/40"
        >
          {t("cardDetail.allCards")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">
          {cardName}
        </span>
      </nav>

      {/* Card header */}
      <div className="text-center mb-10 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ {suitLabel.toUpperCase()} ☯︎
        </div>

        {/* Card image */}
        <div className="flex justify-center mb-6">
          <CardImageLightbox
            src={getCardImagePath(card)}
            alt={`${card.nameZh} (${card.name})`}
          >
            <div className="relative w-[180px] h-[270px] rounded-lg overflow-hidden shadow-2xl shadow-zen-gold/10 group/img">
              <Image
                src={getCardImagePath(card)}
                alt={`${card.nameZh} (${card.name})`}
                fill
                sizes="180px"
                className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white/0 group-hover/img:text-white/80 text-xs transition-colors duration-300">
                  {t("cardDetail.clickToEnlarge")}
                </span>
              </div>
            </div>
          </CardImageLightbox>
        </div>

        {/* Name */}
        <h1 className="text-[28px] font-light tracking-[0.15rem] text-white/90 m-0">
          {cardName}
        </h1>

        {/* Suit badge */}
        <div
          className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full
                      border border-zen-gold/20 bg-zen-gold/[0.05]"
        >
          <span className="text-zen-gold/70 text-xs tracking-wider">
            {suitLabel}
          </span>
        </div>

        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-5"
        />
      </div>

      {/* Keywords */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
          {t("cardDetail.keywords")}
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
          {t("cardDetail.cardMeaning")}
        </h2>
        <div
          className="space-y-4 text-white/60 text-sm leading-relaxed
                      border-l-2 border-zen-gold/15 pl-5"
        >
          {paragraphs.map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Core meaning from original data */}
      <section className="mb-10 animate-fadeUp">
        <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
          {t("cardDetail.coreMeaning")}
        </h2>
        <p className="text-white/50 text-sm italic">
          {lang === "zh" ? card.keywordsZh.join("、") : card.keywords.join(", ")}
        </p>
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
          <span>{t("cardDetail.tryReading")}</span>
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
            <span>{t(`cards.${prev.id}`)}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/cards"
          className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors"
        >
          {t("cardDetail.all")}
        </Link>
        {next ? (
          <Link
            href={`/cards/${next.slug}`}
            className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                       transition-colors no-underline text-sm"
          >
            <span>{t(`cards.${next.id}`)}</span>
            <span>→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
