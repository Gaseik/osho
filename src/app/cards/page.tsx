import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { CARD_DETAILS, getCardImagePath, getSuitLabel } from "../../data/cardDetails";

export const metadata: Metadata = {
  title: "79 張禪卡牌義解讀 | 禪意靈卡",
  description:
    "完整 79 張奧修禪卡牌義解讀，包含大阿爾克納、火、水、雲、彩虹牌組。中英雙語。",
  keywords: [
    "奧修禪卡",
    "禪卡牌義",
    "osho zen tarot",
    "禪卡解讀",
    "塔羅牌義",
    "禪卡總覽",
  ],
  openGraph: {
    title: "79 張禪卡牌義解讀 | 禪意靈卡",
    description: "完整 79 張奧修禪卡牌義解讀，包含大阿爾克納、火、水、雲、彩虹牌組。中英雙語。",
  },
};

const SUIT_ORDER = ["major", "fire", "water", "clouds", "rainbows"] as const;

export default function CardsPage() {
  const grouped = SUIT_ORDER.map((suit) => ({
    suit,
    labelZh: getSuitLabel(suit, "zh"),
    labelEn: getSuitLabel(suit, "en"),
    cards: CARD_DETAILS.filter((c) => c.suit === suit),
  }));

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif px-4 py-10"
    >
      <LanguageSwitcher />

      {/* Header */}
      <div className="text-center mb-12 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ ZEN INSIGHT ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          禪卡牌義總覽
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Card Meanings — All 79 Osho Zen Tarot Cards
        </p>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      {/* Card groups by suit */}
      <div className="max-w-5xl mx-auto space-y-14">
        {grouped.map(({ suit, labelZh, labelEn, cards }) => (
          <section key={suit} className="animate-fadeUp">
            {/* Suit header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-px bg-gradient-to-r from-zen-gold/50 to-transparent"
              />
              <h2 className="text-lg text-zen-gold/90 tracking-[0.15rem] font-light m-0">
                {labelZh}
                <span className="text-white/40 text-sm ml-2">{labelEn}</span>
              </h2>
              <span className="text-white/30 text-xs">{cards.length} cards</span>
              <div
                className="flex-1 h-px bg-gradient-to-r from-zen-gold/20 to-transparent"
              />
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cards.map((card) => (
                <Link
                  key={card.id}
                  href={`/cards/${card.slug}`}
                  className="group flex flex-col items-center p-3 rounded-lg
                             border border-white/5 hover:border-zen-gold/30
                             bg-white/[0.02] hover:bg-zen-gold/[0.05]
                             transition-all duration-300 no-underline"
                >
                  <div className="relative w-[90px] h-[135px] mb-2 overflow-hidden rounded">
                    <Image
                      src={getCardImagePath(card)}
                      alt={`${card.nameZh} (${card.name})`}
                      fill
                      sizes="90px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-white/80 text-sm group-hover:text-zen-gold/90 transition-colors">
                      {card.nameZh}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">{card.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 animate-fadeUp">
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
          <span>抽一張牌試試</span>
        </Link>
      </div>
    </div>
  );
}
