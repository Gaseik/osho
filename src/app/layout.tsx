import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import I18nProvider from "../components/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://osho-wk7j.vercel.app"),
  title: "禪意靈卡 | 免費線上禪卡抽牌・AI 解讀 | Zen Tarot Reading",
  description:
    "免費線上奧修禪卡抽牌，79 張牌、9 種牌陣，AI 即時解讀你的牌面。分析心理、人際、工作多層面，給你具體建議。Free online Zen tarot card reading with AI interpretation.",
  keywords: [
    "禪卡",
    "奧修禪卡",
    "線上抽卡",
    "AI塔羅",
    "AI解讀",
    "免費塔羅",
    "osho zen tarot",
    "free tarot reading",
    "AI tarot reading",
    "zen tarot card",
  ],
  openGraph: {
    title: "禪意靈卡 | 免費線上禪卡抽牌・AI 解讀",
    description: "79 張牌、9 種牌陣、AI 即時解讀。免費、不用註冊。",
    url: "https://osho-wk7j.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "禪意靈卡 | 免費線上禪卡抽牌・AI 解讀",
    description: "79 張牌、9 種牌陣、AI 即時解讀。免費、不用註冊。",
  },
  other: {
    "theme-color": "#0a0a1a",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
