"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

/**
 * Maps pathname to meta translation key.
 * Returns null for dynamic routes that need special handling.
 */
function getMetaKey(pathname: string): string | null {
  if (pathname === "/") return "home";
  if (pathname === "/cards") return "cards";
  if (pathname === "/spreads") return "spreads";
  if (pathname === "/about") return "about";
  if (pathname === "/tarot/cards") return "tarotCards";
  if (pathname === "/tarot/spreads") return "tarotSpreads";
  if (pathname === "/records") return "records";
  if (
    pathname === "/reading" ||
    pathname.startsWith("/reading/")
  )
    return "reading";
  // Dynamic card/spread detail pages and tarot reading pages
  // are not handled here — they keep server-rendered meta
  return null;
}

function updateMetaTag(name: string, content: string) {
  // Try name attribute first, then property (for og: tags)
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.querySelector(`meta[property="${name}"]`);
  }
  if (el) {
    el.setAttribute("content", content);
  }
}

export default function DynamicMeta() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const metaKey = getMetaKey(pathname);
    if (!metaKey) return;

    const title = t(`meta.${metaKey}.title`);
    const description = t(`meta.${metaKey}.description`);

    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag("description", description);

    // Update Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);

    // Update Twitter tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
  }, [pathname, i18n.language, t]);

  return null;
}
