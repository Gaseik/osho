import { TarotCard, allTarotCards } from './tarot-cards';

// ============================================
// Tarot Spread Definitions
// ============================================

export interface TarotSpreadPosition {
  name: { en: string; zh: string; ko: string; ja: string };
}

export interface TarotSpread {
  id: string;
  name: { en: string; zh: string; ko: string; ja: string };
  count: number;
  positions: TarotSpreadPosition[];
}

export const TAROT_SPREADS: Record<string, TarotSpread> = {
  single: {
    id: 'single',
    name: { en: 'Single Card', zh: '單牌', ko: '싱글 카드', ja: 'シングルカード' },
    count: 1,
    positions: [
      { name: { en: 'Guidance', zh: '指引', ko: '가이드', ja: 'ガイダンス' } },
    ],
  },
  'three-card': {
    id: 'three-card',
    name: { en: 'Three Card Spread', zh: '三牌陣', ko: '쓰리 카드 스프레드', ja: 'スリーカードスプレッド' },
    count: 3,
    positions: [
      { name: { en: 'Past', zh: '過去', ko: '과거', ja: '過去' } },
      { name: { en: 'Present', zh: '現在', ko: '현재', ja: '現在' } },
      { name: { en: 'Future', zh: '未來', ko: '미래', ja: '未来' } },
    ],
  },
  'celtic-cross': {
    id: 'celtic-cross',
    name: { en: 'Celtic Cross', zh: '凱爾特十字', ko: '켈틱 크로스', ja: 'ケルト十字' },
    count: 10,
    positions: [
      { name: { en: 'Present Situation', zh: '現況', ko: '현재 상황', ja: '現在の状況' } },
      { name: { en: 'Challenge', zh: '挑戰', ko: '도전', ja: '試練' } },
      { name: { en: 'Foundation', zh: '根源', ko: '기반', ja: '基盤' } },
      { name: { en: 'Recent Past', zh: '近期過去', ko: '최근 과거', ja: '近い過去' } },
      { name: { en: 'Potential Outcome', zh: '可能結果', ko: '잠재적 결과', ja: '潜在的な結果' } },
      { name: { en: 'Near Future', zh: '近期未來', ko: '가까운 미래', ja: '近い未来' } },
      { name: { en: 'Your Attitude', zh: '自我態度', ko: '자신의 태도', ja: 'あなたの姿勢' } },
      { name: { en: 'External Influences', zh: '外在環境', ko: '외부 영향', ja: '外部の影響' } },
      { name: { en: 'Hopes & Fears', zh: '希望或恐懼', ko: '희망과 두려움', ja: '希望と恐れ' } },
      { name: { en: 'Final Outcome', zh: '最終結果', ko: '최종 결과', ja: '最終結果' } },
    ],
  },
  relationship: {
    id: 'relationship',
    name: { en: 'Relationship Spread', zh: '關係牌陣', ko: '관계 스프레드', ja: '関係スプレッド' },
    count: 7,
    positions: [
      { name: { en: 'You', zh: '你的現狀', ko: '당신의 현재', ja: 'あなたの現状' } },
      { name: { en: 'The Other Person', zh: '對方的現狀', ko: '상대방의 현재', ja: '相手の現状' } },
      { name: { en: 'Foundation', zh: '關係的基礎', ko: '관계의 기반', ja: '関係の基盤' } },
      { name: { en: 'Past Influence', zh: '過去的影響', ko: '과거의 영향', ja: '過去の影響' } },
      { name: { en: 'Current Challenge', zh: '現在的挑戰', ko: '현재의 도전', ja: '現在の課題' } },
      { name: { en: 'Advice', zh: '建議行動', ko: '조언', ja: 'アドバイス' } },
      { name: { en: 'Outcome', zh: '關係走向', ko: '관계의 방향', ja: '関係の方向' } },
    ],
  },
};

// ============================================
// Draw Logic
// ============================================

export interface DrawnCard {
  card: TarotCard;
  position: number;
  positionName: { en: string; zh: string; ko: string; ja: string };
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
