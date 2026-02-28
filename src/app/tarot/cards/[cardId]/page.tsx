import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LanguageSwitcher from "../../../../components/LanguageSwitcher";
import TarotCardDetailContent from "../../../../components/TarotCardDetailContent";
import {
  allTarotCards,
  getTarotCardSlug,
  getTarotCardBySlug,
} from "../../../../data/tarot-cards";

export function generateStaticParams() {
  return allTarotCards.map((card) => ({ cardId: getTarotCardSlug(card) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cardId: string }>;
}): Promise<Metadata> {
  const { cardId } = await params;
  const card = getTarotCardBySlug(cardId);
  if (!card) return {};

  return {
    title: `${card.name.zh}（${card.name.en}）| 禪意靈卡 塔羅牌義`,
    description: `${card.name.zh}（${card.name.en}）的塔羅牌義解讀，包含正位與逆位含義。關鍵字：${card.keywords.zh.join("、")}。`,
    keywords: [
      card.name.zh,
      card.name.en,
      "塔羅牌義",
      "韋特塔羅",
      "tarot card meaning",
      ...card.keywords.en,
    ],
    openGraph: {
      title: `${card.name.zh}（${card.name.en}）| 禪意靈卡`,
      description: `${card.name.zh}的塔羅牌義解讀與正逆位含義`,
    },
  };
}

export default async function TarotCardDetailPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;
  const card = getTarotCardBySlug(cardId);
  if (!card) notFound();

  const idx = allTarotCards.findIndex(
    (c) => getTarotCardSlug(c) === cardId
  );
  const prev = idx > 0 ? allTarotCards[idx - 1] : null;
  const next = idx < allTarotCards.length - 1 ? allTarotCards[idx + 1] : null;

  return (
    <div
      className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif px-4 py-10"
    >
      <LanguageSwitcher />
      <TarotCardDetailContent card={card} prev={prev} next={next} />
    </div>
  );
}
