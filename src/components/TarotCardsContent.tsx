"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  majorArcana,
  wandsCards,
  cupsCards,
  swordsCards,
  pentaclesCards,
  getTarotCardSlug,
  getTarotSuitDesc,
  type TarotCard,
} from "../data/tarot-cards";
import {
  getTarotCardDisplayName,
  getTarotSuitLabelLocalized,
  getTarotSuitDescLocalized,
} from "../data/tarot-i18n";
import { getCardDataLang } from "../i18n/config";
import TarotCardFace from "./TarotCardFace";
import LanguageSwitcher from "./LanguageSwitcher";

const SUIT_ORDER: { key: string; cards: TarotCard[] }[] = [
  { key: "major", cards: majorArcana },
  { key: "wands", cards: wandsCards },
  { key: "cups", cards: cupsCards },
  { key: "swords", cards: swordsCards },
  { key: "pentacles", cards: pentaclesCards },
];

export default function TarotCardsContent() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const cdLang = getCardDataLang(locale);

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
          {t("cardDetail.tarotCardsPageTitle")}
        </h1>
        <p className="text-white/50 text-sm mt-2">
          {t("cardDetail.tarotCardsPageSubtitle")}
        </p>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {/* Card groups by suit */}
      <div className="max-w-5xl mx-auto space-y-14">
        {SUIT_ORDER.map(({ key, cards }) => {
          const suitLabel = getTarotSuitLabelLocalized(key, locale);
          const suitLabelEn = key === "major" ? "Major Arcana" : key.charAt(0).toUpperCase() + key.slice(1);
          const suitDesc = getTarotSuitDescLocalized(key, locale) || getTarotSuitDesc(key, cdLang);

          return (
            <section key={key} className="animate-fadeUp">
              {/* Suit header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-zen-gold/50 to-transparent" />
                <h2 className="text-lg text-zen-gold/90 tracking-[0.15rem] font-light m-0">
                  {suitLabel}
                  {locale !== "en" && (
                    <span className="text-white/40 text-sm ml-2">{suitLabelEn}</span>
                  )}
                </h2>
                <span className="text-white/30 text-xs">
                  {cards.length} {t("cardDetail.tarotCardsCount")}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-zen-gold/20 to-transparent" />
              </div>

              {/* Suit description */}
              <p className="text-white/40 text-xs ml-11 mb-5">{suitDesc}</p>

              {/* Card grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cards.map((card) => (
                  <Link
                    key={card.id}
                    href={`/tarot/cards/${getTarotCardSlug(card)}`}
                    className="group flex flex-col items-center p-3 rounded-lg
                               border border-white/5 hover:border-zen-gold/30
                               bg-white/[0.02] hover:bg-zen-gold/[0.05]
                               transition-all duration-300 no-underline"
                  >
                    <div style={{ transform: "scale(0.65)", transformOrigin: "top center" }}>
                      <TarotCardFace card={card} small />
                    </div>
                    <div className="text-center -mt-4">
                      <div className="text-white/80 text-sm group-hover:text-zen-gold/90 transition-colors">
                        {getTarotCardDisplayName(card, locale)}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">{card.name.en}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 animate-fadeUp">
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
          <span>{t("cardDetail.tarotCardsPageCta")}</span>
        </Link>
      </div>
    </div>
  );
}
