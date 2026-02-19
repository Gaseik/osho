import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "線上抽牌・AI 解讀 | 禪意靈卡",
  description:
    "選擇牌陣，抽牌，AI 即時解讀你的禪卡牌面。分析心理面、人際面、工作面，給你具體可執行的建議。",
};

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
