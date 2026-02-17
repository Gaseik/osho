import { CARDS, type Card } from "./cards";

export interface CardDetail extends Card {
  slug: string;
  keywords: string[];
  keywordsZh: string[];
  description: string;
  descriptionZh: string;
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

function makeKeywords(card: Card): string[] {
  return card.meaning.split(",").map((s) => s.trim());
}

/** Extra Chinese keywords per card id */
const KEYWORDS_ZH: Record<number, string[]> = {
  0: ["信任", "天真", "信心的跳躍"],
  1: ["歸屬", "合一", "存在的一部分"],
  2: ["直覺", "內在真理", "傾聽"],
  3: ["表達", "神聖靈感", "創造"],
  4: ["個人力量", "打破權威", "獨立"],
  5: ["空無", "絕對潛能", "靜默"],
  6: ["結合", "倒映", "愛"],
  7: ["覺知", "臨在", "燃燒幻象"],
  8: ["勇氣", "成長", "突破障礙"],
  9: ["獨處", "自足", "正面的孤獨"],
  10: ["改變", "生命之輪", "循環"],
  11: ["突破", "光明", "混亂中的秩序"],
  12: ["新視野", "超越二元", "看見整體"],
  13: ["蛻變", "死亡與重生", "放下自我"],
  14: ["整合", "陰陽合一", "平衡"],
  15: ["制約", "社會模式", "假面"],
  16: ["雷霆", "突然的真相", "摧毀虛假"],
  17: ["沈默", "內在寧靜", "靈魂之夜"],
  18: ["前世", "業力模式", "時間之手"],
  19: ["天真", "純淨智慧", "返璞歸真"],
  20: ["超越幻象", "覺醒", "蝴蝶與真實"],
  21: ["完成", "圓滿", "整體性"],
  22: ["師父", "禪", "最高意識"],
  23: ["源頭", "原始能量", "內在太陽"],
  24: ["可能性", "廣闊視野", "鷹的視角"],
  25: ["體驗", "自然", "感受當下"],
  26: ["參與", "行動曼陀羅", "加入"],
  27: ["全神貫注", "絕對專注", "空中飛人"],
  28: ["成功", "公開認可", "慶典"],
  29: ["壓力", "多重角色", "負荷"],
  30: ["旅行", "發現之路", "移動"],
  31: ["疲憊", "機器人", "能量耗盡"],
  32: ["壓抑", "內化壓力", "沉重負擔"],
  33: ["遊戲", "輕鬆", "生命是玩笑"],
  34: ["強度", "箭", "直接專注"],
  35: ["分享", "慷慨", "火之皇后"],
  36: ["創造者", "精湛行動", "火之國王"],
  37: ["順流", "信任生命之河", "臣服"],
  38: ["友誼", "共同成長", "兩棵樹"],
  39: ["慶祝", "在雨中跳舞", "喜悅"],
  40: ["轉向內在", "自我反省", "靜心"],
  41: ["執著", "記憶之盒", "停滯能量"],
  42: ["夢", "浪漫幻象", "迷幻之夜"],
  43: ["投射", "映射自我", "他人的銀幕"],
  44: ["放手", "融入大海", "水滴"],
  45: ["懶惰", "停滯之池", "缺乏意志"],
  46: ["和諧", "以心為中心", "和平"],
  47: ["了解", "籠中鳥", "看見牢籠"],
  48: ["信任", "勇敢跳躍", "未知"],
  49: ["接受", "開放的心", "水之皇后"],
  50: ["治療", "情感完整", "水之國王"],
  51: ["意識", "心智清明", "佛心"],
  52: ["精神分裂", "選擇困難", "撕裂"],
  53: ["冰封", "情感冷漠", "孤立"],
  54: ["拖延", "等待明天", "推遲"],
  55: ["比較", "竹與橡", "不必要的判斷"],
  56: ["重擔", "他人的期望", "承擔"],
  57: ["政治", "面具", "虛偽"],
  58: ["罪惡感", "自我折磨", "心理牢籠"],
  59: ["悲傷", "痛苦蛻變", "哀傷"],
  60: ["重生", "駱駝到獅子到孩子", "新生"],
  61: ["頭腦", "思維機制", "思考"],
  62: ["奮鬥", "自我戰鬥", "盔甲"],
  63: ["道德", "僵硬規則", "雲之皇后"],
  64: ["控制", "僵硬姿態", "雲之國王"],
  65: ["成熟", "經驗的醞釀", "豐富"],
  66: ["剎那", "當下", "一步一腳印"],
  67: ["指引", "內在天使", "同步之路"],
  68: ["吝嗇", "囤積", "能量或財富"],
  69: ["局外人", "被排除", "童年之門"],
  70: ["妥協", "出賣自己", "虛假和平"],
  71: ["耐心", "等待月亮", "等候"],
  72: ["平凡", "簡單之美", "日常"],
  73: ["熟成", "準備好掉落", "努力的果實"],
  74: ["世界", "人類連結", "慶祝"],
  75: ["冒險", "探索", "森林中的孩子"],
  76: ["慢下來", "穩健步伐", "彩虹騎士"],
  77: ["開花", "豐盛", "彩虹皇后"],
  78: ["豐富", "物質富裕", "彩虹國王"],
};

export const CARD_DETAILS: CardDetail[] = CARDS.map((card) => ({
  ...card,
  slug: makeSlug(card.name),
  keywords: makeKeywords(card),
  keywordsZh: KEYWORDS_ZH[card.id] ?? [],
  description: "(Card meaning to be added)",
  descriptionZh: "（牌義內容待補充）",
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
