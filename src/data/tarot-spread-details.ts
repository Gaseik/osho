import { TAROT_SPREADS, type TarotSpread } from './tarot-spreads';

export interface TarotSpreadDetail extends TarotSpread {
  slug: string;
  desc: { en: string; zh: string };
  suitableQuestions: { en: string[]; zh: string[] };
  usageTips: { en: string; zh: string };
}

const DETAILS: Record<string, Omit<TarotSpreadDetail, keyof TarotSpread>> = {
  single: {
    slug: 'single',
    desc: {
      en: 'The simplest spread — draw one card as a daily guide or quick answer to any question.',
      zh: '最簡單的牌陣——抽一張牌作為每日指引或快速回答任何問題。',
    },
    suitableQuestions: {
      en: ['Daily guidance', 'Yes/No questions', 'Quick insight', 'Focus for the day'],
      zh: ['每日運勢', 'Yes/No 問題', '快速指引', '今日重點'],
    },
    usageTips: {
      en: 'Clear your mind, take a deep breath, and focus on your question. Draw one card and let its message speak to you. The simplicity of a single card often cuts through confusion with remarkable clarity.',
      zh: '清空思緒，深呼吸，專注於你的問題。抽一張牌，讓它的訊息對你說話。單牌的簡潔往往能以驚人的清晰度穿透迷惑。',
    },
  },
  'three-card': {
    slug: 'three-card',
    desc: {
      en: 'The classic beginner spread — three cards representing past, present, and future give your question a timeline context.',
      zh: '經典入門牌陣——三張牌分別代表過去、現在、未來，為你的問題提供時間脈絡。',
    },
    suitableQuestions: {
      en: ['Any question needing timeline context', 'Understanding a situation\'s progression', 'Career transitions', 'Relationship development'],
      zh: ['任何需要時間脈絡的問題', '了解情況的發展脈絡', '職業轉換', '感情發展'],
    },
    usageTips: {
      en: 'Read the three cards as a flowing story, not three separate answers. The past card reveals root causes, the present shows where you are now, and the future suggests where the current trajectory leads. Pay attention to how the energy shifts between cards.',
      zh: '將三張牌作為一個流動的故事來閱讀，而非三個獨立的答案。過去牌揭示根本原因，現在牌顯示你目前的位置，未來牌暗示目前軌跡的走向。注意牌與牌之間能量的變化。',
    },
  },
  'celtic-cross': {
    slug: 'celtic-cross',
    desc: {
      en: 'The most classic and comprehensive tarot spread — 10 cards for deep, multi-layered analysis of complex situations.',
      zh: '最經典、最全面的塔羅牌陣——10 張牌深入、多層次地分析複雜情況。',
    },
    suitableQuestions: {
      en: ['Complex life situations', 'Major decisions', 'Deep self-exploration', 'Understanding hidden influences'],
      zh: ['複雜的人生處境', '重大決策', '深度自我探索', '了解隱藏的影響力'],
    },
    usageTips: {
      en: 'The Celtic Cross works best when you have a clear, focused question. Start by reading the central cross (cards 1-6) as the core story, then use the staff (cards 7-10) to add depth. Card 2 crossing card 1 reveals the core tension you\'re navigating.',
      zh: '凱爾特十字在你有一個清晰、聚焦的問題時效果最好。先閱讀中央十字（牌 1-6）作為核心故事，再用權杖柱（牌 7-10）增加深度。第 2 張牌橫跨第 1 張牌揭示你正在面對的核心張力。',
    },
  },
  relationship: {
    slug: 'relationship',
    desc: {
      en: 'Designed specifically for analyzing the dynamics between two people — 7 cards exploring both sides and the connection.',
      zh: '專為分析兩人之間的動態而設計——7 張牌探索雙方以及連結。',
    },
    suitableQuestions: {
      en: ['Romantic relationships', 'Business partnerships', 'Family dynamics', 'Any interpersonal situation'],
      zh: ['感情關係', '商業合作', '家庭關係', '任何人際互動'],
    },
    usageTips: {
      en: 'Compare cards 1 and 2 (You and The Other Person) to see how each side experiences the relationship differently. Card 3 (Foundation) reveals what originally brought you together. The advice card is often the most actionable — pay special attention to it.',
      zh: '比較第 1 和第 2 張牌（你和對方）來看雙方如何不同地經歷這段關係。第 3 張牌（基礎）揭示最初將你們聯繫在一起的東西。建議牌通常是最具可操作性的——請特別注意它。',
    },
  },
};

export const TAROT_SPREAD_DETAILS: TarotSpreadDetail[] = Object.entries(TAROT_SPREADS).map(
  ([key, spread]) => ({
    ...spread,
    ...DETAILS[key],
  })
);

export function getTarotSpreadBySlug(slug: string): TarotSpreadDetail | undefined {
  return TAROT_SPREAD_DETAILS.find((s) => s.slug === slug);
}
