import type { MetadataRoute } from "next";
import { CARD_DETAILS } from "../data/cardDetails";
import { SPREAD_DETAILS } from "../data/spreadDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://osho-wk7j.vercel.app";

  const cards = CARD_DETAILS.map((card) => ({
    url: `${baseUrl}/cards/${card.slug}`,
    lastModified: new Date(),
    priority: 0.7 as const,
  }));

  const spreads = SPREAD_DETAILS.map((spread) => ({
    url: `${baseUrl}/spreads/${spread.slug}`,
    lastModified: new Date(),
    priority: 0.7 as const,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/reading`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/cards`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/spreads`, lastModified: new Date(), priority: 0.8 },
    ...cards,
    ...spreads,
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/records`, lastModified: new Date(), priority: 0.4 },
  ];
}
