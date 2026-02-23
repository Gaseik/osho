import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { SPREAD_DETAILS, getSpreadBySlug } from "../../../data/spreadDetails";

export function generateStaticParams() {
  return SPREAD_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spread = getSpreadBySlug(slug);
  if (!spread) return {};

  return {
    title: `${spread.name}（${spread.nameEn}）| 禪意靈卡 牌陣介紹`,
    description: `${spread.name}（${spread.nameEn}）牌陣介紹。${spread.count} 張牌，${spread.desc}。免費線上奧修禪卡抽牌。`,
    keywords: [
      spread.name,
      spread.nameEn,
      "奧修禪卡牌陣",
      "禪卡牌陣",
      "osho zen tarot spread",
    ],
    openGraph: {
      title: `${spread.name}（${spread.nameEn}）| 禪意靈卡`,
      description: `${spread.name}牌陣介紹與使用指南`,
    },
  };
}

/** Render a CSS layout diagram for the spread */
function SpreadDiagram({ spread }: { spread: (typeof SPREAD_DETAILS)[number] }) {
  if (spread.layout) {
    const { cols, rows } = spread.layout;
    const cardRows = rows.filter((r) => r.type === "cards") as {
      type: "cards";
      cells: (number | null)[];
    }[];
    return (
      <div
        className="inline-grid gap-2 mx-auto"
        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
      >
        {cardRows.map((row, ri) =>
          row.cells.map((cell, ci) => (
            <div
              key={`${ri}-${ci}`}
              className={`w-10 h-14 rounded flex items-center justify-center text-xs
                ${
                  cell !== null
                    ? "border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
                    : ""
                }`}
            >
              {cell !== null ? cell + 1 : ""}
            </div>
          ))
        )}
      </div>
    );
  }

  // Default: flex row
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {Array.from({ length: spread.count }, (_, i) => (
        <div
          key={i}
          className="w-10 h-14 rounded flex items-center justify-center text-xs
                     border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default async function SpreadDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spread = getSpreadBySlug(slug);
  if (!spread) notFound();

  // Find prev/next spreads
  const idx = SPREAD_DETAILS.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? SPREAD_DETAILS[idx - 1] : null;
  const next = idx < SPREAD_DETAILS.length - 1 ? SPREAD_DETAILS[idx + 1] : null;

  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif px-4 py-10"
    >
      <LanguageSwitcher />

      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/40 mb-8 animate-fadeUp">
          <Link
            href="/spreads"
            className="hover:text-zen-gold/80 transition-colors no-underline text-white/40"
          >
            牌陣總覽
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{spread.name}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 animate-fadeUp">
          <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
            ☯︎ SPREAD ☯︎
          </div>
          <h1 className="text-[28px] font-light tracking-[0.15rem] text-white/90 m-0">
            {spread.name}
          </h1>
          <p className="text-white/50 text-base mt-1 tracking-wider">
            {spread.nameEn}
          </p>

          {/* Count badge */}
          <div
            className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full
                        border border-zen-gold/20 bg-zen-gold/[0.05]"
          >
            <span className="text-zen-gold/70 text-xs">{spread.count} 張牌</span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-white/40 text-xs">
              {spread.count} cards
            </span>
          </div>

          <div
            className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                        mx-auto mt-5"
          />
        </div>

        {/* Description */}
        <section className="mb-8 animate-fadeUp">
          <p className="text-white/60 text-sm text-center">{spread.desc}</p>
        </section>

        {/* Layout diagram */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
            牌陣排列 Layout
          </h2>
          <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02] text-center">
            <SpreadDiagram spread={spread} />
          </div>
        </section>

        {/* Suitable questions */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
            適合的問題類型
          </h2>
          <ul className="space-y-2 list-none p-0 m-0">
            {spread.suitableQuestionsZh.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-white/60 text-sm"
              >
                <span className="text-zen-gold/50 mt-0.5">·</span>
                <span>
                  {q}
                  <span className="text-white/30 ml-2">
                    {spread.suitableQuestions[i]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Position meanings */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
            各位置含義 Position Meanings
          </h2>
          <div className="space-y-3">
            {spread.positionMeanings.map((pos, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded
                           border border-white/5 bg-white/[0.02]"
              >
                <div
                  className="w-7 h-7 rounded flex items-center justify-center shrink-0
                             border border-zen-gold/30 bg-zen-gold/[0.08]
                             text-zen-gold/70 text-xs"
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-white/80 text-sm">
                    {pos.labelZh}
                    <span className="text-white/40 ml-2 text-xs">
                      {pos.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage tips */}
        <section className="mb-10 animate-fadeUp">
          <h2 className="text-sm text-zen-gold/70 tracking-[0.15rem] mb-4 font-light">
            使用建議 Tips
          </h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed
                          border-l-2 border-zen-gold/15 pl-5">
            <p>{spread.usageTipsZh}</p>
            <p className="text-white/40">{spread.usageTips}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12 mb-10 animate-fadeUp">
          <Link
            href={`/reading?spread=${spread.id}`}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full
                       border border-zen-gold/35
                       bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                       text-zen-gold/90 text-sm tracking-[2px]
                       hover:border-zen-gold/60 hover:scale-105
                       transition-all duration-300 no-underline"
          >
            <span>☯︎</span>
            <span>使用此牌陣抽牌</span>
          </Link>
        </div>

        {/* Prev / Next */}
        <nav className="flex justify-between items-center pt-6 border-t border-white/5 animate-fadeUp">
          {prev ? (
            <Link
              href={`/spreads/${prev.slug}`}
              className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                         transition-colors no-underline text-sm"
            >
              <span>←</span>
              <span>{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/spreads"
            className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors"
          >
            總覽
          </Link>
          {next ? (
            <Link
              href={`/spreads/${next.slug}`}
              className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                         transition-colors no-underline text-sm"
            >
              <span>{next.name}</span>
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
