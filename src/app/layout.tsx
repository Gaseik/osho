import type { Metadata } from "next";
import I18nProvider from "../components/I18nProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "禪意靈卡 | Zen Tarot Card Reading Online Free",
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
    title: "禪意靈卡 | Zen Tarot Card Reading",
    description: "免費線上禪卡抽牌，精美互動體驗",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "禪意靈卡 | Zen Tarot Card Reading",
    description: "免費線上禪卡抽牌，精美互動體驗",
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
