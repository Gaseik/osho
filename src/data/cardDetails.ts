import { CARD_DETAILS as RAW_CARDS, type CardDetail as RawCardDetail } from "./cards";

export type { RawCardDetail as CardDetail };

const SUIT_LABEL: Record<string, { en: string; zh: string }> = {
  major: { en: "Major Arcana", zh: "大阿爾克納" },
  fire: { en: "Fire", zh: "火" },
  water: { en: "Water", zh: "水" },
  clouds: { en: "Clouds", zh: "雲" },
  rainbows: { en: "Rainbows", zh: "彩虹" },
};

export function getSuitLabel(suit: string, lang: "en" | "zh" = "zh") {
  return SUIT_LABEL[suit]?.[lang] ?? suit;
}

/** Image extensions per card id (most are jpeg, only a few are png) */
const PNG_IDS = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 13]);

function getImageExt(id: number): "png" | "jpeg" {
  return PNG_IDS.has(id) ? "png" : "jpeg";
}

export const CARD_DETAILS = RAW_CARDS;

export function getCardBySlug(slug: string): RawCardDetail | undefined {
  return RAW_CARDS.find((c) => c.slug === slug);
}

export function getCardsBysuit(suit: string): RawCardDetail[] {
  return RAW_CARDS.filter((c) => c.suit === suit);
}

export function getCardImagePath(card: RawCardDetail): string {
  const idStr = String(card.id).padStart(2, "0");
  return `/assets/cards/${idStr}-${card.slug}.${getImageExt(card.id)}`;
}
