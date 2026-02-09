export interface Card {
  id: number;
  name: string;
  nameZh: string;
  meaning: string;
  suit?: 'major' | 'fire' | 'water' | 'clouds' | 'rainbows';
}

export const CARDS: Card[] = [
  // Major Arcana (0-21) - 大阿爾克那
  { id: 0, name: "The Fool", nameZh: "愚者", meaning: "New beginnings, innocence, spontaneity", suit: 'major' },
  { id: 1, name: "Existence", nameZh: "存在", meaning: "Wholeness, completion, cosmic unity", suit: 'major' },
  { id: 2, name: "Inner Voice", nameZh: "內在之聲", meaning: "Intuition, inner guidance, trust", suit: 'major' },
  { id: 3, name: "Creativity", nameZh: "創造力", meaning: "Expression, inspiration, flow", suit: 'major' },
  { id: 4, name: "The Rebel", nameZh: "叛逆者", meaning: "Courage, individuality, breaking free", suit: 'major' },
  { id: 5, name: "No-Thingness", nameZh: "空無", meaning: "Emptiness, potential, the void", suit: 'major' },
  { id: 6, name: "The Lovers", nameZh: "戀人", meaning: "Love, harmony, union of opposites", suit: 'major' },
  { id: 7, name: "Awareness", nameZh: "覺知", meaning: "Consciousness, presence, clarity", suit: 'major' },
  { id: 8, name: "Courage", nameZh: "勇氣", meaning: "Bravery, facing fears, strength", suit: 'major' },
  { id: 9, name: "Aloneness", nameZh: "獨處", meaning: "Solitude, self-sufficiency, inner peace", suit: 'major' },
  { id: 10, name: "Change", nameZh: "改變", meaning: "Transformation, impermanence, cycles", suit: 'major' },
  { id: 11, name: "Breakthrough", nameZh: "突破", meaning: "Liberation, sudden insight, freedom", suit: 'major' },
  { id: 12, name: "New Vision", nameZh: "新視野", meaning: "Fresh perspective, seeing clearly", suit: 'major' },
  { id: 13, name: "Transformation", nameZh: "蛻變", meaning: "Death and rebirth, letting go", suit: 'major' },
  { id: 14, name: "Integration", nameZh: "整合", meaning: "Balance, patience, middle path", suit: 'major' },
  { id: 15, name: "Conditioning", nameZh: "制約", meaning: "Social patterns, breaking habits", suit: 'major' },
  { id: 16, name: "Thunderbolt", nameZh: "雷電", meaning: "Sudden awakening, destruction of ego", suit: 'major' },
  { id: 17, name: "Silence", nameZh: "靜默", meaning: "Stillness, meditation, receptivity", suit: 'major' },
  { id: 18, name: "Past Lives", nameZh: "前世", meaning: "Karma, unconscious patterns, depth", suit: 'major' },
  { id: 19, name: "Innocence", nameZh: "天真", meaning: "Childlike wonder, simplicity, joy", suit: 'major' },
  { id: 20, name: "Beyond Illusion", nameZh: "超越幻象", meaning: "Awakening, seeing truth, liberation", suit: 'major' },
  { id: 21, name: "Completion", nameZh: "完成", meaning: "Fulfillment, wholeness, celebration", suit: 'major' },

  // Fire (22-35) - 火 (Wands)
  { id: 22, name: "The Source", nameZh: "源頭", meaning: "Pure energy, beginning, potential", suit: 'fire' },
  { id: 23, name: "Possibilities", nameZh: "可能性", meaning: "Options, choices, expansion", suit: 'fire' },
  { id: 24, name: "Experiencing", nameZh: "體驗", meaning: "Living fully, being present", suit: 'fire' },
  { id: 25, name: "Participation", nameZh: "參與", meaning: "Engagement, involvement, community", suit: 'fire' },
  { id: 26, name: "Totality", nameZh: "完整", meaning: "Wholeness, integration, unity", suit: 'fire' },
  { id: 27, name: "Success", nameZh: "成功", meaning: "Achievement, recognition, accomplishment", suit: 'fire' },
  { id: 28, name: "Stress", nameZh: "壓力", meaning: "Tension, overwhelm, burden", suit: 'fire' },
  { id: 29, name: "Traveling", nameZh: "旅行", meaning: "Journey, movement, exploration", suit: 'fire' },
  { id: 30, name: "Exhaustion", nameZh: "疲憊", meaning: "Burnout, depletion, rest needed", suit: 'fire' },
  { id: 31, name: "Suppression", nameZh: "壓抑", meaning: "Holding back, restraint, control", suit: 'fire' },
  { id: 32, name: "Playfulness", nameZh: "玩心", meaning: "Joy, lightness, humor", suit: 'fire' },
  { id: 33, name: "Intensity", nameZh: "強烈", meaning: "Passion, power, focused energy", suit: 'fire' },
  { id: 34, name: "Sharing", nameZh: "分享", meaning: "Generosity, giving, abundance", suit: 'fire' },
  { id: 35, name: "The Creator", nameZh: "創造者", meaning: "Manifestation, leadership, vision", suit: 'fire' },

  // Water (36-49) - 水 (Cups)
  { id: 36, name: "Going With the Flow", nameZh: "順流而行", meaning: "Acceptance, ease, trust", suit: 'water' },
  { id: 37, name: "Celebration", nameZh: "慶祝", meaning: "Joy, gratitude, festivity", suit: 'water' },
  { id: 38, name: "Emptiness", nameZh: "空", meaning: "Void, openness, receptivity", suit: 'water' },
  { id: 39, name: "The Dream", nameZh: "夢", meaning: "Imagination, vision, illusion", suit: 'water' },
  { id: 40, name: "Clinging to the Past", nameZh: "執著過去", meaning: "Nostalgia, attachment, memory", suit: 'water' },
  { id: 41, name: "The Lovers", nameZh: "戀人", meaning: "Union, intimacy, connection", suit: 'water' },
  { id: 42, name: "Projections", nameZh: "投射", meaning: "Illusions, expectations, fantasies", suit: 'water' },
  { id: 43, name: "Letting Go", nameZh: "放下", meaning: "Release, surrender, freedom", suit: 'water' },
  { id: 44, name: "Laziness", nameZh: "懶惰", meaning: "Procrastination, avoidance, stagnation", suit: 'water' },
  { id: 45, name: "Harmony", nameZh: "和諧", meaning: "Balance, peace, alignment", suit: 'water' },
  { id: 46, name: "Receptivity", nameZh: "接受", meaning: "Openness, allowing, feminine energy", suit: 'water' },
  { id: 47, name: "Understanding", nameZh: "理解", meaning: "Compassion, empathy, wisdom", suit: 'water' },
  { id: 48, name: "Transformation", nameZh: "轉化", meaning: "Change, renewal, growth", suit: 'water' },
  { id: 49, name: "Rebirth", nameZh: "重生", meaning: "New beginning, resurrection, renewal", suit: 'water' },

  // Clouds (50-63) - 雲 (Swords)
  { id: 50, name: "The Master", nameZh: "大師", meaning: "Wisdom, teaching, self-mastery", suit: 'clouds' },
  { id: 51, name: "Schizophrenia", nameZh: "分裂", meaning: "Inner conflict, duality, confusion", suit: 'clouds' },
  { id: 52, name: "Ice-olation", nameZh: "孤立", meaning: "Separation, coldness, withdrawal", suit: 'clouds' },
  { id: 53, name: "Postponement", nameZh: "延遲", meaning: "Delay, waiting, hesitation", suit: 'clouds' },
  { id: 54, name: "Comparison", nameZh: "比較", meaning: "Judgment, evaluation, measurement", suit: 'clouds' },
  { id: 55, name: "The Burden", nameZh: "負擔", meaning: "Weight, responsibility, heaviness", suit: 'clouds' },
  { id: 56, name: "Politics", nameZh: "政治", meaning: "Strategy, manipulation, power games", suit: 'clouds' },
  { id: 57, name: "Guilt", nameZh: "罪惡感", meaning: "Self-judgment, shame, release", suit: 'clouds' },
  { id: 58, name: "Sorrow", nameZh: "悲傷", meaning: "Grief, pain, emotional depth", suit: 'clouds' },
  { id: 59, name: "Rebirth", nameZh: "重生", meaning: "Transformation, renewal, change", suit: 'clouds' },
  { id: 60, name: "Mind", nameZh: "頭腦", meaning: "Intellect, thinking, mental activity", suit: 'clouds' },
  { id: 61, name: "Fighting", nameZh: "戰鬥", meaning: "Conflict, struggle, resistance", suit: 'clouds' },
  { id: 62, name: "Morality", nameZh: "道德", meaning: "Ethics, righteousness, judgment", suit: 'clouds' },
  { id: 63, name: "Mental", nameZh: "心智", meaning: "Logic, analysis, rationality", suit: 'clouds' },

  // Rainbows (64-78) - 彩虹 (Pentacles)
  { id: 64, name: "Moment to Moment", nameZh: "活在當下", meaning: "Presence, mindfulness, now", suit: 'rainbows' },
  { id: 65, name: "Balance", nameZh: "平衡", meaning: "Equilibrium, stability, harmony", suit: 'rainbows' },
  { id: 66, name: "Guidance", nameZh: "指引", meaning: "Direction, support, wisdom", suit: 'rainbows' },
  { id: 67, name: "The Miser", nameZh: "吝嗇", meaning: "Greed, attachment, holding", suit: 'rainbows' },
  { id: 68, name: "Materialism", nameZh: "物質主義", meaning: "Attachment to things, worldliness", suit: 'rainbows' },
  { id: 69, name: "Patience", nameZh: "耐心", meaning: "Waiting, timing, endurance", suit: 'rainbows' },
  { id: 70, name: "Ordinariness", nameZh: "平凡", meaning: "Simplicity, humility, groundedness", suit: 'rainbows' },
  { id: 71, name: "Slowness", nameZh: "緩慢", meaning: "Taking time, patience, deliberation", suit: 'rainbows' },
  { id: 72, name: "Ripeness", nameZh: "成熟", meaning: "Readiness, fulfillment, timing", suit: 'rainbows' },
  { id: 73, name: "Healing", nameZh: "療癒", meaning: "Wholeness, recovery, self-love", suit: 'rainbows' },
  { id: 74, name: "The Miser", nameZh: "小氣", meaning: "Scarcity mindset, fear, withholding", suit: 'rainbows' },
  { id: 75, name: "Postponement", nameZh: "拖延", meaning: "Delay, procrastination, avoidance", suit: 'rainbows' },
  { id: 76, name: "Abundance", nameZh: "豐盛", meaning: "Wealth, prosperity, generosity", suit: 'rainbows' },
  { id: 77, name: "Compromise", nameZh: "妥協", meaning: "Losing yourself, people-pleasing", suit: 'rainbows' },
  { id: 78, name: "The Master", nameZh: "主宰", meaning: "Mastery, authority, achievement", suit: 'rainbows' },
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
