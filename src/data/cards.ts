export interface Card {
  id: number;
  name: string;
  nameZh: string;
  meaning: string;
}

export const CARDS: Card[] = [
  { id: 0, name: "The Fool", nameZh: "愚者", meaning: "New beginnings, innocence, spontaneity" },
  { id: 1, name: "Existence", nameZh: "存在", meaning: "Wholeness, completion, cosmic unity" },
  { id: 2, name: "Inner Voice", nameZh: "內在之聲", meaning: "Intuition, inner guidance, trust" },
  { id: 3, name: "Creativity", nameZh: "創造力", meaning: "Expression, inspiration, flow" },
  { id: 4, name: "The Rebel", nameZh: "叛逆者", meaning: "Courage, individuality, breaking free" },
  { id: 5, name: "No-Thingness", nameZh: "空無", meaning: "Emptiness, potential, the void" },
  { id: 6, name: "The Lovers", nameZh: "戀人", meaning: "Love, harmony, union of opposites" },
  { id: 7, name: "Awareness", nameZh: "覺知", meaning: "Consciousness, presence, clarity" },
  { id: 8, name: "Courage", nameZh: "勇氣", meaning: "Bravery, facing fears, strength" },
  { id: 9, name: "Aloneness", nameZh: "獨處", meaning: "Solitude, self-sufficiency, inner peace" },
  { id: 10, name: "Change", nameZh: "改變", meaning: "Transformation, impermanence, cycles" },
  { id: 11, name: "Breakthrough", nameZh: "突破", meaning: "Liberation, sudden insight, freedom" },
  { id: 12, name: "New Vision", nameZh: "新視野", meaning: "Fresh perspective, seeing clearly" },
  { id: 13, name: "Transformation", nameZh: "蛻變", meaning: "Death and rebirth, letting go" },
  { id: 14, name: "Integration", nameZh: "整合", meaning: "Balance, patience, middle path" },
  { id: 15, name: "Conditioning", nameZh: "制約", meaning: "Social patterns, breaking habits" },
  { id: 16, name: "Thunderbolt", nameZh: "雷電", meaning: "Sudden awakening, destruction of ego" },
  { id: 17, name: "Silence", nameZh: "靜默", meaning: "Stillness, meditation, receptivity" },
  { id: 18, name: "Past Lives", nameZh: "前世", meaning: "Karma, unconscious patterns, depth" },
  { id: 19, name: "Innocence", nameZh: "天真", meaning: "Childlike wonder, simplicity, joy" },
  { id: 20, name: "Beyond Illusion", nameZh: "超越幻象", meaning: "Awakening, seeing truth, liberation" },
  { id: 21, name: "Completion", nameZh: "完成", meaning: "Fulfillment, wholeness, celebration" },
  { id: 22, name: "The Master", nameZh: "大師", meaning: "Wisdom, teaching, self-mastery" },
  { id: 23, name: "Letting Go", nameZh: "放下", meaning: "Surrender, trust, non-attachment" },
  { id: 24, name: "Laziness", nameZh: "懶惰", meaning: "Procrastination, avoidance, stagnation" },
  { id: 25, name: "Healing", nameZh: "療癒", meaning: "Wholeness, recovery, self-love" },
  { id: 26, name: "Moment to Moment", nameZh: "活在當下", meaning: "Presence, mindfulness, now" },
  { id: 27, name: "Playfulness", nameZh: "玩心", meaning: "Joy, lightness, humor" },
  { id: 28, name: "Guilt", nameZh: "罪惡感", meaning: "Self-judgment, shame, release" },
  { id: 29, name: "Compromise", nameZh: "妥協", meaning: "Losing yourself, people-pleasing" },
];

export const GRADIENTS = [
  "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0f0c29 100%)",
  "linear-gradient(135deg, #0c1445 0%, #1b3a6b 50%, #0a1628 100%)",
  "linear-gradient(135deg, #2a0a2e 0%, #5c1a6e 50%, #1a0533 100%)",
  "linear-gradient(135deg, #0a2e1a 0%, #1a6b4a 50%, #0c1f14 100%)",
  "linear-gradient(135deg, #2e1a0a 0%, #6b3a1a 50%, #1f140c 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #3a3a6b 50%, #0f0f1f 100%)",
];

export const getCardColor = (id: number): string => GRADIENTS[id % GRADIENTS.length];

export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
