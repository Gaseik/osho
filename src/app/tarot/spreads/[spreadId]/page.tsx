import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageSwitcher from "../../../../components/LanguageSwitcher";
import {
  TAROT_SPREAD_DETAILS,
  getTarotSpreadBySlug,
  type TarotSpreadDetail,
} from "../../../../data/tarot-spread-details";

export function generateStaticParams() {
  return TAROT_SPREAD_DETAILS.map((s) => ({ spreadId: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ spreadId: string }>;
}): Promise<Metadata> {
  const { spreadId } = await params;
  const spread = getTarotSpreadBySlug(spreadId);
  if (!spread) return {};

  return {
    title: `${spread.name.zh}（${spread.name.en}）| 禪意靈卡 塔羅牌陣`,
    description: `${spread.name.zh}（${spread.name.en}）牌陣介紹。${spread.count} 張牌，${spread.desc.zh}`,
    keywords: [
      spread.name.zh,
      spread.name.en,
      "塔羅牌陣",
      "tarot spread",
      "韋特塔羅",
    ],
    openGraph: {
      title: `${spread.name.zh}（${spread.name.en}）| 禪意靈卡`,
      description: `${spread.name.zh}牌陣介紹與使用指南`,
    },
  };
}

/** Render a simple layout diagram for the spread */
function SpreadDiagram({ spread }: { spread: TarotSpreadDetail }) {
  // Celtic cross: special layout
  if (spread.id === "celtic-cross") {
    return (
      <div className="inline-grid gap-2" style={{ gridTemplateColumns: "repeat(6, 40px)" }}>
        {/* Row 1: potential outcome */}
        {[null, null, null, 4, null, null].map((cell, i) => (
          <div
            key={`r0-${i}`}
            className={`w-10 h-14 rounded flex items-center justify-center text-xs ${
              cell !== null
                ? "border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
                : ""
            }`}
          >
            {cell !== null ? cell + 1 : ""}
          </div>
        ))}
        {/* Row 2: recent past, present+challenge, near future, hopes */}
        {[3, 0, 5, null, null, 8].map((cell, i) => (
          <div
            key={`r1-${i}`}
            className={`w-10 h-14 rounded flex items-center justify-center text-xs ${
              cell !== null
                ? "border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
                : ""
            }`}
          >
            {cell === 0 ? "1/2" : cell !== null ? cell + 1 : ""}
          </div>
        ))}
        {/* Row 3: foundation */}
        {[null, null, null, 2, null, 7].map((cell, i) => (
          <div
            key={`r2-${i}`}
            className={`w-10 h-14 rounded flex items-center justify-center text-xs ${
              cell !== null
                ? "border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
                : ""
            }`}
          >
            {cell !== null ? cell + 1 : ""}
          </div>
        ))}
        {/* Row 4: attitude, final outcome */}
        {[null, null, null, null, null, 6].map((cell, i) => (
          <div
            key={`r3-${i}`}
            className={`w-10 h-14 rounded flex items-center justify-center text-xs ${
              cell !== null
                ? "border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
                : ""
            }`}
          >
            {cell !== null ? cell + 1 : ""}
          </div>
        ))}
        {/* Row 5: final outcome at bottom of staff */}
        {[null, null, null, null, null, 9].map((cell, i) => (
          <div
            key={`r4-${i}`}
            className={`w-10 h-14 rounded flex items-center justify-center text-xs ${
              cell !== null
                ? "border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
                : ""
            }`}
          >
            {cell !== null ? cell + 1 : ""}
          </div>
        ))}
      </div>
    );
  }

  // Relationship: custom layout
  if (spread.id === "relationship") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          {[0, 2, 1].map((i) => (
            <div
              key={i}
              className="w-10 h-14 rounded flex items-center justify-center text-xs
                         border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {[3, 4].map((i) => (
            <div
              key={i}
              className="w-10 h-14 rounded flex items-center justify-center text-xs
                         border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div
          className="w-10 h-14 rounded flex items-center justify-center text-xs
                     border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
        >
          6
        </div>
        <div
          className="w-10 h-14 rounded flex items-center justify-center text-xs
                     border border-zen-gold/40 bg-zen-gold/[0.08] text-zen-gold/70"
        >
          7
        </div>
      </div>
    );
  }

  // Default: simple row
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

export default async function TarotSpreadDetailPage({
  params,
}: {
  params: Promise<{ spreadId: string }>;
}) {
  const { spreadId } = await params;
  const spread = getTarotSpreadBySlug(spreadId);
  if (!spread) notFound();

  const idx = TAROT_SPREAD_DETAILS.findIndex((s) => s.slug === spreadId);
  const prev = idx > 0 ? TAROT_SPREAD_DETAILS[idx - 1] : null;
  const next =
    idx < TAROT_SPREAD_DETAILS.length - 1 ? TAROT_SPREAD_DETAILS[idx + 1] : null;

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
            href="/tarot/spreads"
            className="hover:text-zen-gold/80 transition-colors no-underline text-white/40"
          >
            牌陣總覽
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{spread.name.zh}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10 animate-fadeUp">
          <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
            🃏 SPREAD 🃏
          </div>
          <h1 className="text-[28px] font-light tracking-[0.15rem] text-white/90 m-0">
            {spread.name.zh}
          </h1>
          <p className="text-white/50 text-base mt-1 tracking-wider">
            {spread.name.en}
          </p>

          {/* Count badge */}
          <div
            className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full
                        border border-zen-gold/20 bg-zen-gold/[0.05]"
          >
            <span className="text-zen-gold/70 text-xs">{spread.count} 張牌</span>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-white/40 text-xs">{spread.count} cards</span>
          </div>

          <div
            className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                        mx-auto mt-5"
          />
        </div>

        {/* Description */}
        <section className="mb-8 animate-fadeUp">
          <p className="text-white/60 text-sm text-center">{spread.desc.zh}</p>
          <p className="text-white/40 text-xs text-center mt-2">{spread.desc.en}</p>
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
            {spread.suitableQuestions.zh.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-white/60 text-sm"
              >
                <span className="text-zen-gold/50 mt-0.5">·</span>
                <span>
                  {q}
                  <span className="text-white/30 ml-2">
                    {spread.suitableQuestions.en[i]}
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
            {spread.positions.map((pos, i) => (
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
                    {pos.name.zh}
                    <span className="text-white/40 ml-2 text-xs">
                      {pos.name.en}
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
          <div
            className="space-y-3 text-white/60 text-sm leading-relaxed
                          border-l-2 border-zen-gold/15 pl-5"
          >
            <p>{spread.usageTips.zh}</p>
            <p className="text-white/40">{spread.usageTips.en}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12 mb-10 animate-fadeUp">
          <Link
            href={`/tarot/${spread.slug}`}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full
                       border border-zen-gold/35
                       bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                       text-zen-gold/90 text-sm tracking-[2px]
                       hover:border-zen-gold/60 hover:scale-105
                       transition-all duration-300 no-underline"
          >
            <span>🃏</span>
            <span>使用此牌陣抽牌</span>
          </Link>
        </div>

        {/* Prev / Next */}
        <nav className="flex justify-between items-center pt-6 border-t border-white/5 animate-fadeUp">
          {prev ? (
            <Link
              href={`/tarot/spreads/${prev.slug}`}
              className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                         transition-colors no-underline text-sm"
            >
              <span>←</span>
              <span>{prev.name.zh}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/tarot/spreads"
            className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors"
          >
            總覽
          </Link>
          {next ? (
            <Link
              href={`/tarot/spreads/${next.slug}`}
              className="flex items-center gap-2 text-white/40 hover:text-zen-gold/80
                         transition-colors no-underline text-sm"
            >
              <span>{next.name.zh}</span>
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
