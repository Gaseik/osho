export interface Spread {
  id: string;
  name: string;
  nameEn: string;
  count: number;
  desc: string;
}

export const SPREADS: Spread[] = [
  { id: "single", name: "單牌", nameEn: "Single Card", count: 1, desc: "一張牌回答你的問題" },
  { id: "three", name: "三牌陣", nameEn: "Past / Present / Future", count: 3, desc: "過去·現在·未來" },
  { id: "cross", name: "五牌陣", nameEn: "Cross Spread", count: 5, desc: "情境·障礙·建議·根源·結果" },
];

export const POSITION_LABELS: Record<string, string[]> = {
  single: ["指引"],
  three: ["過去", "現在", "未來"],
  cross: ["情境", "障礙", "建議", "根源", "結果"],
};
