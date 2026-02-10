export interface Spread {
  id: string;
  name: string;
  nameEn: string;
  count: number;
  desc: string;
}

export const SPREADS: Spread[] = [
  { id: "single", name: "單牌", nameEn: "Single Card", count: 1, desc: "一張牌回答你的問題" },
  { id: "three", name: "三牌陣", nameEn: "Three Cards", count: 3, desc: "三張牌給你指引" },
  { id: "time-flow", name: "時間之流", nameEn: "Flow of Time", count: 3, desc: "過去·現在·未來" },
  { id: "relationship", name: "兩人關聯", nameEn: "Two People Connection", count: 4, desc: "你的貢獻·對方的貢獻·綜合能量·洞見" },
  { id: "cross", name: "五牌陣", nameEn: "Cross Spread", count: 5, desc: "情境·障礙·建議·根源·結果" },
  { id: "two-choice", name: "二擇一", nameEn: "Two Choices", count: 5, desc: "現狀·A狀況·A結果·B狀況·B結果" },
  { id: "diamond", name: "鑽石牌陣", nameEn: "Diamond Spread", count: 5, desc: "問題·內在影響·外在影響·所需·答案" },
  { id: "mirror", name: "鏡子牌陣", nameEn: "Mirror Spread", count: 12, desc: "映照自我與同伴·身心靈的對話" },
];

export const POSITION_LABELS: Record<string, string[]> = {
  single: ["指引"],
  three: ["第一張", "第二張", "第三張"],
  "time-flow": ["過去", "現在", "未來"],
  relationship: ["你的貢獻", "對方的貢獻", "綜合能量", "洞見"],
  cross: ["情境", "障礙", "建議", "根源", "結果"],
  "two-choice": ["現狀", "A 狀況", "A 的結果", "B 狀況", "B 的結果"],
  diamond: ["問題", "未知的內在影響", "已知的外在影響", "解決問題所需的", "答案了解"],
  mirror: [
    "身體", "心", "頭腦",       // 0-2: 此時此地的你
    "身體", "心", "頭腦",       // 3-5: 此時此地的同伴
    "親密", "蛻變", "祝福",     // 6-8: 在此關係當中的外在顯現
    "親密", "蛻變", "祝福",     // 9-11: 內在心靈的目的
  ],
};

/* ── Custom grid layouts for specific spreads ── */

export type LayoutRow =
  | { type: "cards"; cells: (number | null)[] }
  | { type: "section"; key: string }
  | { type: "sections"; items: { key: string; col: number }[] };

export interface SpreadLayout {
  cols: number;
  rows: LayoutRow[];
}

export const SPREAD_LAYOUTS: Record<string, SpreadLayout> = {
  diamond: {
    cols: 3,
    rows: [
      { type: "cards", cells: [null, 4, null] },
      { type: "cards", cells: [1, 0, 2] },
      { type: "cards", cells: [null, 3, null] },
    ],
  },
  mirror: {
    cols: 3,
    rows: [
      { type: "section", key: "innerPurpose" },
      { type: "cards", cells: [null, 11, null] },
      { type: "cards", cells: [null, 10, null] },
      { type: "cards", cells: [2, 9, 5] },
      { type: "cards", cells: [1, null, 4] },
      { type: "cards", cells: [0, 8, 3] },
      {
        type: "sections",
        items: [
          { key: "you", col: 0 },
          { key: "companion", col: 2 },
        ],
      },
      { type: "cards", cells: [null, 7, null] },
      { type: "cards", cells: [null, 6, null] },
      { type: "section", key: "external" },
    ],
  },
};
