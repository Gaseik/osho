import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import I18nProvider from "../components/I18nProvider";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://osho-wk7j.vercel.app"),
  title: "洞見 | 線上塔羅牌/奧修卡 | 面對你真實的聲音",
  description:
    "免費線上塔羅牌與奧修禪卡抽牌，AI 即時解讀你的牌面。面對你真實的聲音，探索內在智慧。Free online Tarot & Osho Zen card reading with AI interpretation.",
  keywords: [
    "塔羅牌",
    "奧修禪卡",
    "線上塔羅",
    "線上抽卡",
    "AI塔羅",
    "AI解讀",
    "免費塔羅",
    "osho zen tarot",
    "free tarot reading",
    "AI tarot reading",
    "洞見",
  ],
  openGraph: {
    title: "洞見 | 線上塔羅牌/奧修卡 | 面對你真實的聲音",
    description: "免費線上塔羅牌與奧修禪卡抽牌，AI 即時解讀。面對你真實的聲音。",
    url: "https://osho-wk7j.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "洞見 | 線上塔羅牌/奧修卡 | 面對你真實的聲音",
    description: "免費線上塔羅牌與奧修禪卡抽牌，AI 即時解讀。面對你真實的聲音。",
  },
  verification: {
    google: "dWOy49FQqp-sBNcMAVRLis1WKr0Yp9nQsw8dyF0DXSQ",
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
      <body className="flex flex-col min-h-screen">
        <I18nProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
