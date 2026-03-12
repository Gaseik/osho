import type { TarotCard } from './tarot-cards';

export const TAROT_CARD_NAMES_KO: Record<number, string> = {
  // Major Arcana
  0: '바보',
  1: '마법사',
  2: '여사제',
  3: '여황제',
  4: '황제',
  5: '교황',
  6: '연인',
  7: '전차',
  8: '힘',
  9: '은둔자',
  10: '운명의 수레바퀴',
  11: '정의',
  12: '매달린 남자',
  13: '죽음',
  14: '절제',
  15: '악마',
  16: '탑',
  17: '별',
  18: '달',
  19: '태양',
  20: '심판',
  21: '세계',
  // Wands (완드) 22-35
  22: '완드 에이스',
  23: '완드 2',
  24: '완드 3',
  25: '완드 4',
  26: '완드 5',
  27: '완드 6',
  28: '완드 7',
  29: '완드 8',
  30: '완드 9',
  31: '완드 10',
  32: '완드 페이지',
  33: '완드 나이트',
  34: '완드 퀸',
  35: '완드 킹',
  // Cups (컵) 36-49
  36: '컵 에이스',
  37: '컵 2',
  38: '컵 3',
  39: '컵 4',
  40: '컵 5',
  41: '컵 6',
  42: '컵 7',
  43: '컵 8',
  44: '컵 9',
  45: '컵 10',
  46: '컵 페이지',
  47: '컵 나이트',
  48: '컵 퀸',
  49: '컵 킹',
  // Swords (소드) 50-63
  50: '소드 에이스',
  51: '소드 2',
  52: '소드 3',
  53: '소드 4',
  54: '소드 5',
  55: '소드 6',
  56: '소드 7',
  57: '소드 8',
  58: '소드 9',
  59: '소드 10',
  60: '소드 페이지',
  61: '소드 나이트',
  62: '소드 퀸',
  63: '소드 킹',
  // Pentacles (펜타클) 64-77
  64: '펜타클 에이스',
  65: '펜타클 2',
  66: '펜타클 3',
  67: '펜타클 4',
  68: '펜타클 5',
  69: '펜타클 6',
  70: '펜타클 7',
  71: '펜타클 8',
  72: '펜타클 9',
  73: '펜타클 10',
  74: '펜타클 페이지',
  75: '펜타클 나이트',
  76: '펜타클 퀸',
  77: '펜타클 킹',
};

export const TAROT_CARD_NAMES_JA: Record<number, string> = {
  // Major Arcana
  0: '愚者',
  1: '魔術師',
  2: '女教皇',
  3: '女帝',
  4: '皇帝',
  5: '法王',
  6: '恋人',
  7: '戦車',
  8: '力',
  9: '隠者',
  10: '運命の輪',
  11: '正義',
  12: '吊された男',
  13: '死神',
  14: '節制',
  15: '悪魔',
  16: '塔',
  17: '星',
  18: '月',
  19: '太陽',
  20: '審判',
  21: '世界',
  // Wands (ワンド) 22-35
  22: 'ワンドのエース',
  23: 'ワンドの2',
  24: 'ワンドの3',
  25: 'ワンドの4',
  26: 'ワンドの5',
  27: 'ワンドの6',
  28: 'ワンドの7',
  29: 'ワンドの8',
  30: 'ワンドの9',
  31: 'ワンドの10',
  32: 'ワンドのペイジ',
  33: 'ワンドのナイト',
  34: 'ワンドのクイーン',
  35: 'ワンドのキング',
  // Cups (カップ) 36-49
  36: 'カップのエース',
  37: 'カップの2',
  38: 'カップの3',
  39: 'カップの4',
  40: 'カップの5',
  41: 'カップの6',
  42: 'カップの7',
  43: 'カップの8',
  44: 'カップの9',
  45: 'カップの10',
  46: 'カップのペイジ',
  47: 'カップのナイト',
  48: 'カップのクイーン',
  49: 'カップのキング',
  // Swords (ソード) 50-63
  50: 'ソードのエース',
  51: 'ソードの2',
  52: 'ソードの3',
  53: 'ソードの4',
  54: 'ソードの5',
  55: 'ソードの6',
  56: 'ソードの7',
  57: 'ソードの8',
  58: 'ソードの9',
  59: 'ソードの10',
  60: 'ソードのペイジ',
  61: 'ソードのナイト',
  62: 'ソードのクイーン',
  63: 'ソードのキング',
  // Pentacles (ペンタクル) 64-77
  64: 'ペンタクルのエース',
  65: 'ペンタクルの2',
  66: 'ペンタクルの3',
  67: 'ペンタクルの4',
  68: 'ペンタクルの5',
  69: 'ペンタクルの6',
  70: 'ペンタクルの7',
  71: 'ペンタクルの8',
  72: 'ペンタクルの9',
  73: 'ペンタクルの10',
  74: 'ペンタクルのペイジ',
  75: 'ペンタクルのナイト',
  76: 'ペンタクルのクイーン',
  77: 'ペンタクルのキング',
};

export const TAROT_SUIT_LABELS: Record<string, Record<string, string>> = {
  major: {
    en: 'Major Arcana',
    zh: '大阿爾克那',
    ko: '대 아르카나',
    ja: '大アルカナ',
  },
  wands: {
    en: 'Wands',
    zh: '權杖',
    ko: '완드',
    ja: 'ワンド',
  },
  cups: {
    en: 'Cups',
    zh: '聖杯',
    ko: '컵',
    ja: 'カップ',
  },
  swords: {
    en: 'Swords',
    zh: '寶劍',
    ko: '소드',
    ja: 'ソード',
  },
  pentacles: {
    en: 'Pentacles',
    zh: '錢幣',
    ko: '펜타클',
    ja: 'ペンタクル',
  },
};

export function getTarotCardDisplayName(
  card: { id: number; name: { en: string; zh: string } },
  locale: string,
): string {
  if (locale.startsWith('zh')) {
    return card.name.zh;
  }
  if (locale === 'ko') {
    return TAROT_CARD_NAMES_KO[card.id] ?? card.name.en;
  }
  if (locale === 'ja') {
    return TAROT_CARD_NAMES_JA[card.id] ?? card.name.en;
  }
  return card.name.en;
}

export function getTarotSuitLabelLocalized(
  suit: string,
  locale: string,
): string {
  const labels = TAROT_SUIT_LABELS[suit];
  if (!labels) {
    return suit;
  }
  if (locale.startsWith('zh')) {
    return labels.zh ?? labels.en;
  }
  if (locale === 'ko') {
    return labels.ko ?? labels.en;
  }
  if (locale === 'ja') {
    return labels.ja ?? labels.en;
  }
  return labels.en;
}

const SUIT_DESCS_LOCALIZED: Record<string, Record<string, string>> = {
  major: {
    ko: '22장의 대 아르카나 카드는 인생의 중요한 주제와 영적 에너지의 변화를 나타냅니다.',
    ja: '22枚の大アルカナカードは、人生の重要なテーマとスピリチュアルなエネルギーの変化を表します。',
  },
  wands: {
    ko: '완드 수트는 불의 에너지를 나타냅니다 — 열정, 창의성, 행동과 의지.',
    ja: 'ワンドのスートは火のエネルギーを表します — 情熱、創造性、行動と意志。',
  },
  cups: {
    ko: '컵 수트는 물의 에너지를 나타냅니다 — 감정, 관계, 직관과 내면 세계.',
    ja: 'カップのスートは水のエネルギーを表します — 感情、人間関係、直感と内面の世界。',
  },
  swords: {
    ko: '소드 수트는 공기의 에너지를 나타냅니다 — 사고, 소통, 갈등과 진실.',
    ja: 'ソードのスートは風のエネルギーを表します — 思考、コミュニケーション、葛藤と真実。',
  },
  pentacles: {
    ko: '펜타클 수트는 땅의 에너지를 나타냅니다 — 물질 세계, 재정, 건강과 일.',
    ja: 'ペンタクルのスートは地のエネルギーを表します — 物質世界、財務、健康と仕事。',
  },
};

export function getTarotSuitDescLocalized(suit: string, locale: string): string {
  const descs = SUIT_DESCS_LOCALIZED[suit];
  if (locale === 'ko' && descs?.ko) return descs.ko;
  if (locale === 'ja' && descs?.ja) return descs.ja;
  // Fall back to the original en/zh from tarot-cards.ts
  return '';
}
