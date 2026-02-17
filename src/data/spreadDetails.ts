import { SPREADS, POSITION_LABELS, SPREAD_LAYOUTS, type Spread, type SpreadLayout } from "./spreads";

export interface SpreadDetail extends Spread {
  slug: string;
  descEn: string;
  descZh: string;
  suitableQuestions: string[];
  suitableQuestionsZh: string[];
  positionMeanings: { label: string; labelZh: string; description: string; descriptionZh: string }[];
  usageTips: string;
  usageTipsZh: string;
  layout?: SpreadLayout;
}

const SPREAD_SLUGS: Record<string, string> = {
  single: "single",
  three: "three-cards",
  "time-flow": "time-flow",
  relationship: "relationship",
  cross: "cross",
  "two-choice": "two-choice",
  diamond: "diamond",
  mirror: "mirror",
  key: "key",
};

const POSITION_LABELS_EN: Record<string, string[]> = {
  single: ["Guidance"],
  three: ["First Card", "Second Card", "Third Card"],
  "time-flow": ["Past", "Present", "Future"],
  relationship: ["Your Contribution", "Their Contribution", "Combined Energy", "Insight"],
  cross: ["Situation", "Obstacle", "Advice", "Root Cause", "Outcome"],
  "two-choice": ["Current Situation", "Option A Situation", "Option A Outcome", "Option B Situation", "Option B Outcome"],
  diamond: ["The Issue", "Unknown Inner Influence", "Known Outer Influence", "What Is Needed", "The Answer"],
  mirror: [
    "Body", "Heart", "Mind",
    "Body", "Heart", "Mind",
    "Intimacy", "Transformation", "Blessing",
    "Intimacy", "Transformation", "Blessing",
  ],
  key: [
    "What Is Suppressed",
    "Your Feminine (Passive) Side",
    "Your Masculine (Active) Side",
    "Meditation",
    "Insight Into the Body",
    "Insight Into the Heart",
    "Insight Into Essence",
    "Consciousness (Understanding)",
  ],
};

const SUITABLE_QUESTIONS: Record<string, { en: string[]; zh: string[] }> = {
  single: {
    en: ["Daily guidance", "Quick insight", "Simple yes/no questions"],
    zh: ["每日指引", "快速洞察", "簡單的是非題"],
  },
  three: {
    en: ["General exploration", "Getting an overview", "Open-ended questions"],
    zh: ["一般性探索", "獲得概觀", "開放式問題"],
  },
  "time-flow": {
    en: ["Understanding a situation's timeline", "Seeing how things evolve", "Life transitions"],
    zh: ["了解事情的時間線", "看見事物如何演變", "人生轉折"],
  },
  relationship: {
    en: ["Romantic relationships", "Friendships", "Work partnerships", "Family dynamics"],
    zh: ["戀愛關係", "友誼", "工作夥伴關係", "家庭動態"],
  },
  cross: {
    en: ["Complex situations", "Finding root causes", "Getting actionable advice"],
    zh: ["複雜情況", "尋找根本原因", "獲得可行建議"],
  },
  "two-choice": {
    en: ["Deciding between two paths", "Comparing outcomes", "Career decisions"],
    zh: ["在兩條路之間做選擇", "比較結果", "職業決定"],
  },
  diamond: {
    en: ["Deep problem analysis", "Understanding hidden influences", "Finding solutions"],
    zh: ["深入問題分析", "了解隱藏影響", "尋找解決方案"],
  },
  mirror: {
    en: ["Deep relationship exploration", "Understanding body-heart-mind dynamics", "Self and other reflection"],
    zh: ["深入關係探索", "了解身心靈動態", "自我與他人的映照"],
  },
  key: {
    en: ["Deep self-exploration", "Understanding suppressed aspects", "Balancing feminine and masculine energy"],
    zh: ["深入自我探索", "了解被壓抑的面向", "平衡陰陽能量"],
  },
};

const USAGE_TIPS: Record<string, { en: string; zh: string }> = {
  single: {
    en: "Take a deep breath, clear your mind, and draw a single card. Let its message be your guide for the day or for the question at hand.",
    zh: "深呼吸，清空你的頭腦，抽出一張牌。讓它的訊息成為你今天或當前問題的指引。",
  },
  three: {
    en: "This versatile spread gives you three perspectives on your question. Consider how the cards relate to each other and what story they tell together.",
    zh: "這個多功能牌陣為你的問題提供三個視角。思考牌與牌之間的關係，以及它們共同訴說的故事。",
  },
  "time-flow": {
    en: "Use this spread to understand how a situation has developed, where it stands now, and where it is heading. Pay attention to the flow from past to future.",
    zh: "使用這個牌陣來了解一個情況是如何發展的、現在處於什麼位置、以及它正朝著什麼方向前進。注意從過去到未來的流動。",
  },
  relationship: {
    en: "Focus on a specific relationship when drawing. Each card reveals different aspects of the dynamic between you and the other person.",
    zh: "抽牌時專注於一段特定的關係。每張牌揭示了你和對方之間動態的不同面向。",
  },
  cross: {
    en: "This comprehensive spread covers the main aspects of your situation. Read the cards both individually and as a whole picture.",
    zh: "這個全面的牌陣涵蓋了你情況的主要面向。既要單獨閱讀每張牌，也要把它們看作一幅完整的圖畫。",
  },
  "two-choice": {
    en: "Think clearly about the two options before drawing. The spread will show you the current situation and the potential path and outcome of each choice.",
    zh: "抽牌前先清楚地想好兩個選項。牌陣會顯示你目前的狀況，以及每個選擇的潛在路徑和結果。",
  },
  diamond: {
    en: "This spread digs deep into a problem, revealing both inner and outer influences that may not be immediately apparent. The top card holds the answer.",
    zh: "這個牌陣深入探討一個問題，揭示可能不太明顯的內在和外在影響。頂部的牌持有答案。",
  },
  mirror: {
    en: "This is the most comprehensive relationship spread, revealing body-heart-mind aspects of both individuals and the deeper spiritual purpose of the connection.",
    zh: "這是最全面的關係牌陣，揭示兩個人在身體、心和頭腦層面的狀態，以及這段連結更深層的靈性目的。",
  },
  key: {
    en: "Use this spread for deep self-exploration. It reveals what is suppressed, your masculine and feminine energies, and provides insights into body, heart, and essence.",
    zh: "使用這個牌陣進行深入的自我探索。它揭示被壓抑的部分、你的陽性和陰性能量，並提供關於身體、心和本質的洞見。",
  },
};

export const SPREAD_DETAILS: SpreadDetail[] = SPREADS.map((spread) => {
  const zhLabels = POSITION_LABELS[spread.id] ?? [];
  const enLabels = POSITION_LABELS_EN[spread.id] ?? [];
  const suitable = SUITABLE_QUESTIONS[spread.id] ?? { en: [], zh: [] };
  const tips = USAGE_TIPS[spread.id] ?? { en: "", zh: "" };

  return {
    ...spread,
    slug: SPREAD_SLUGS[spread.id] ?? spread.id,
    descEn: spread.desc,
    descZh: spread.desc,
    suitableQuestions: suitable.en,
    suitableQuestionsZh: suitable.zh,
    positionMeanings: zhLabels.map((labelZh, i) => ({
      label: enLabels[i] ?? `Position ${i + 1}`,
      labelZh,
      description: "(Position meaning to be added)",
      descriptionZh: "（位置含義待補充）",
    })),
    usageTips: tips.en,
    usageTipsZh: tips.zh,
    layout: SPREAD_LAYOUTS[spread.id],
  };
});

export function getSpreadBySlug(slug: string): SpreadDetail | undefined {
  return SPREAD_DETAILS.find((s) => s.slug === slug);
}
