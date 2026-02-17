import type { Metadata } from "next";
import I18nProvider from "../components/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://osho-wk7j.vercel.app"),
  title: "洞見 | 奧修禪卡抽牌 | OSHO Zen Card Read",
  description:
    "免費線上禪卡抽牌，提供多種牌陣選擇。Free online Zen tarot card reading with beautiful UI and multiple spreads. Inspired by Osho Zen Tarot.",
  keywords: [
    "禪卡",
    "奧修禪卡",
    "線上抽卡",
    "osho zen tarot",
    "free tarot reading online",
    "zen tarot card",
  ],
  openGraph: {
    title: "洞見 | 奧修禪卡抽牌 | OSHO Zen Card Read",
    description: "免費線上禪卡抽牌，精美互動體驗",
    type: "website",
    url: "https://osho-wk7j.vercel.app",
    siteName: "洞見 | 禪意靈卡",
    locale: "zh_TW",
  },
  twitter: {
    card: "summary_large_image",
    title: "洞見 | 奧修禪卡抽牌 | OSHO Zen Card Read",
    description: "免費線上禪卡抽牌，精美互動體驗",
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
      </body>
    </html>
  );
}
