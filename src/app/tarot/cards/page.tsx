import type { Metadata } from "next";
import TarotCardsContent from "../../../components/TarotCardsContent";

export const metadata: Metadata = {
  title: "78 張塔羅牌意百科 | 洞見",
  description:
    "完整 78 張韋特塔羅牌意百科，包含大阿爾克那、權杖、聖杯、寶劍、錢幣牌組。中英雙語。",
  keywords: [
    "塔羅牌意",
    "韋特塔羅",
    "tarot card meanings",
    "rider-waite tarot",
    "major arcana",
    "minor arcana",
  ],
  openGraph: {
    title: "78 張塔羅牌意百科 | 洞見",
    description:
      "完整 78 張韋特塔羅牌意百科，包含大阿爾克那、權杖、聖杯、寶劍、錢幣牌組。中英雙語。",
  },
};

export default function TarotCardsPage() {
  return <TarotCardsContent />;
}
