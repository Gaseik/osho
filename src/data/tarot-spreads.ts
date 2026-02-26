export interface TarotSpread {
  id: string;
  name: string;
  nameEn: string;
  count: number;
  desc: string;
  descEn: string;
  positions: { en: string; zh: string }[];
}

export const TAROT_SPREADS: TarotSpread[] = [
  {
    id: "single",
    name: "單牌",
    nameEn: "Single Card",
    count: 1,
    desc: "一張牌回答你的問題",
    descEn: "One card to answer your question",
    positions: [{ en: "Guidance", zh: "指引" }],
  },
  {
    id: "three-card",
    name: "三牌陣",
    nameEn: "Three Card Spread",
    count: 3,
    desc: "過去・現在・未來",
    descEn: "Past · Present · Future",
    positions: [
      { en: "Past", zh: "過去" },
      { en: "Present", zh: "現在" },
      { en: "Future", zh: "未來" },
    ],
  },
  {
    id: "celtic-cross",
    name: "凱爾特十字",
    nameEn: "Celtic Cross",
    count: 10,
    desc: "深度全面的牌陣，適合複雜問題",
    descEn: "Deep comprehensive spread for complex questions",
    positions: [
      { en: "Present", zh: "現況" },
      { en: "Challenge", zh: "挑戰" },
      { en: "Foundation", zh: "根源" },
      { en: "Recent Past", zh: "過去" },
      { en: "Potential", zh: "可能結果" },
      { en: "Near Future", zh: "近期未來" },
      { en: "Self", zh: "自我態度" },
      { en: "Environment", zh: "外在環境" },
      { en: "Hopes/Fears", zh: "希望或恐懼" },
      { en: "Outcome", zh: "最終結果" },
    ],
  },
  {
    id: "relationship",
    name: "關係牌陣",
    nameEn: "Relationship Spread",
    count: 7,
    desc: "深入剖析兩人之間的關係動態",
    descEn: "Deep analysis of the relationship dynamic between two people",
    positions: [
      { en: "You", zh: "你的現狀" },
      { en: "The Other Person", zh: "對方的現狀" },
      { en: "Foundation", zh: "關係的基礎" },
      { en: "Past Influence", zh: "過去的影響" },
      { en: "Current Challenge", zh: "現在的挑戰" },
      { en: "Advice", zh: "建議行動" },
      { en: "Outcome", zh: "關係走向" },
    ],
  },
];

export function getTarotSpread(id: string): TarotSpread | undefined {
  return TAROT_SPREADS.find((s) => s.id === id);
}
