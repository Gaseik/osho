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
];

export const POSITION_LABELS: Record<string, string[]> = {
  single: ["指引"],
  three: ["第一張", "第二張", "第三張"],
  "time-flow": ["過去", "現在", "未來"],
  relationship: ["你的貢獻", "對方的貢獻", "綜合能量", "洞見"],
  cross: ["情境", "障礙", "建議", "根源", "結果"],
};
