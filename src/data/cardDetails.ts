import { CARDS, type Card } from "./cards";

export interface CardDetail extends Card {
  slug: string;
  imageExt: "png" | "jpeg";
}

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

function makeSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const CARD_DETAILS: CardDetail[] = CARDS.map((card) => ({
  ...card,
  slug: makeSlug(card.name),
  imageExt: PNG_IDS.has(card.id) ? "png" : "jpeg",
}));

export function getCardBySlug(slug: string): CardDetail | undefined {
  return CARD_DETAILS.find((c) => c.slug === slug);
}

export function getCardsBysuit(suit: string): CardDetail[] {
  return CARD_DETAILS.filter((c) => c.suit === suit);
}

export function getCardImagePath(card: CardDetail): string {
  const idStr = String(card.id).padStart(2, "0");
  return `/assets/cards/${idStr}-${card.slug}.${card.imageExt}`;
}
