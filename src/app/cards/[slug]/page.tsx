import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CARD_DETAILS,
  getCardBySlug,
  getCardImagePath,
  getSuitLabel,
} from "../../../data/cardDetails";

export function generateStaticParams() {
  return CARD_DETAILS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) return {};

  return {
    title: `${card.nameZh}（${card.name}）| 禪意靈卡 牌義解讀`,
    description: `${card.nameZh}（${card.name}）的牌義解讀與啟示。${card.keywordsZh.join("、")}。免費線上奧修禪卡抽牌。`,
    keywords: [
      card.nameZh,
      card.name,
      "奧修禪卡",
      "禪卡牌義",
      "osho zen tarot",
      ...card.keywords,
    ],
    openGraph: {
      title: `${card.nameZh}（${card.name}）| 禪意靈卡`,
      description: `${card.nameZh}的牌義解讀與生活啟示`,
    },
  };
}

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();

  const suitZh = getSuitLabel(card.suit ?? "major", "zh");
  const suitEn = getSuitLabel(card.suit ?? "major", "en");

  // Find prev/next cards for navigation
  const idx = CARD_DETAILS.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? CARD_DETAILS[idx - 1] : null;
  const next = idx < CARD_DETAILS.length - 1 ? CARD_DETAILS[idx + 1] : null;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif px-4 py-10"
    >
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/40 mb-8 animate-fadeUp">
          <Link href="/cards" className="hover:text-zen-gold/80 transition-colors no-underline text-white/40">
            禪卡總覽
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{card.nameZh}</span>
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
          <p className="text-white/50 text-base mt-1 tracking-wider">{card.name}</p>

          {/* Suit badge */}
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full
                          border border-zen-gold/20 bg-zen-gold/[0.05]">
            <span className="text-zen-gold/70 text-xs tracking-wider">{suitZh}</span>
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
            關鍵詞 Keywords
          </h2>
          <div className="flex flex-wrap gap-2">
            {card.keywordsZh.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs
                           border border-white/10 bg-white/[0.03] text-white/70"
              >
                {kw}
              </span>
            ))}
            {card.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs
                           border border-zen-gold/10 bg-zen-gold/[0.03] text-zen-gold/60"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>

        {/* Chinese interpretation */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
            牌義解讀
          </h2>
          <div className="space-y-4 text-white/60 text-sm leading-relaxed
                          border-l-2 border-zen-gold/15 pl-5">
            <p>{card.descriptionZh}</p>
          </div>
        </section>

        {/* English interpretation */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
            Card Meaning
          </h2>
          <div className="space-y-4 text-white/50 text-sm leading-relaxed
                          border-l-2 border-white/10 pl-5">
            <p>{card.description}</p>
          </div>
        </section>

        {/* Card meaning from original data */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-3 font-light">
            核心意涵 Core Meaning
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
            <span>抽一張牌試試</span>
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
              <span>{prev.nameZh}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/cards"
            className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors"
          >
            總覽
          </Link>
          {next ? (
            <Link
              href={`/cards/${next.slug}`}
              className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                         transition-colors no-underline text-sm"
            >
              <span>{next.nameZh}</span>
              <span>→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
