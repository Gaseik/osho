import { TarotCard, allTarotCards } from './tarot-cards';

// ============================================
// Tarot Spread Definitions
// ============================================

export interface TarotSpreadPosition {
  name: { en: string; zh: string };
}

export interface TarotSpread {
  id: string;
  name: { en: string; zh: string };
  count: number;
  positions: TarotSpreadPosition[];
}

export const TAROT_SPREADS: Record<string, TarotSpread> = {
  single: {
    id: 'single',
    name: { en: 'Single Card', zh: '單牌' },
    count: 1,
    positions: [
      { name: { en: 'Guidance', zh: '指引' } },
    ],
  },
  'three-card': {
    id: 'three-card',
    name: { en: 'Three Card Spread', zh: '三牌陣' },
    count: 3,
    positions: [
      { name: { en: 'Past', zh: '過去' } },
      { name: { en: 'Present', zh: '現在' } },
      { name: { en: 'Future', zh: '未來' } },
    ],
  },
  'celtic-cross': {
    id: 'celtic-cross',
    name: { en: 'Celtic Cross', zh: '凱爾特十字' },
    count: 10,
    positions: [
      { name: { en: 'Present Situation', zh: '現況' } },
      { name: { en: 'Challenge', zh: '挑戰' } },
      { name: { en: 'Foundation', zh: '根源' } },
      { name: { en: 'Recent Past', zh: '近期過去' } },
      { name: { en: 'Potential Outcome', zh: '可能結果' } },
      { name: { en: 'Near Future', zh: '近期未來' } },
      { name: { en: 'Your Attitude', zh: '自我態度' } },
      { name: { en: 'External Influences', zh: '外在環境' } },
      { name: { en: 'Hopes & Fears', zh: '希望或恐懼' } },
      { name: { en: 'Final Outcome', zh: '最終結果' } },
    ],
  },
  relationship: {
    id: 'relationship',
    name: { en: 'Relationship Spread', zh: '關係牌陣' },
    count: 7,
    positions: [
      { name: { en: 'You', zh: '你的現狀' } },
      { name: { en: 'The Other Person', zh: '對方的現狀' } },
      { name: { en: 'Foundation', zh: '關係的基礎' } },
      { name: { en: 'Past Influence', zh: '過去的影響' } },
      { name: { en: 'Current Challenge', zh: '現在的挑戰' } },
      { name: { en: 'Advice', zh: '建議行動' } },
      { name: { en: 'Outcome', zh: '關係走向' } },
    ],
  },
};

// ============================================
// Draw Logic
// ============================================

export interface DrawnCard {
  card: TarotCard;
  position: number;
  positionName: { en: string; zh: string };
  isReversed: boolean;
}

export function drawTarotCards(spreadId: string): DrawnCard[] {
  const spread = TAROT_SPREADS[spreadId];
  if (!spread) return [];

  const deck = [...allTarotCards];
  const drawn: DrawnCard[] = [];

  for (let i = 0; i < spread.count; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    drawn.push({
      card,
      position: i + 1,
      positionName: spread.positions[i].name,
      isReversed: Math.random() < 0.5,
    });
  }

  return drawn;
}
