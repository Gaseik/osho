import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import BackButton from "../../../components/BackButton";
import CardDetailContent from "../../../components/CardDetailContent";
import { CARD_DETAILS, getCardBySlug } from "../../../data/cardDetails";
import zhTW from "../../../locales/zh-TW.json";

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

  const keywordsZh =
    zhTW.cardKeywords[String(card.id) as keyof typeof zhTW.cardKeywords] ?? "";

  return {
    title: `${card.nameZh}（${card.name}）| 禪意靈卡 牌義解讀`,
    description: `${card.nameZh}（${card.name}）的牌義解讀與啟示。${keywordsZh}。免費線上奧修禪卡抽牌。`,
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

  const idx = CARD_DETAILS.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? CARD_DETAILS[idx - 1] : null;
  const next = idx < CARD_DETAILS.length - 1 ? CARD_DETAILS[idx + 1] : null;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                  text-white font-serif px-4 py-10"
    >
      <LanguageSwitcher />
      <BackButton href="/cards" />
      <CardDetailContent card={card} prev={prev} next={next} />
    </div>
  );
}
