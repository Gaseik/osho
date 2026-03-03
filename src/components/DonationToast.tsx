"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

const READING_COUNT_KEY = "zen-reading-count";
const MIN_READINGS_FOR_TOAST = 2;

function getAndIncrementCount(): number {
  if (typeof window === "undefined") return 0;
  const current = parseInt(localStorage.getItem(READING_COUNT_KEY) || "0", 10) || 0;
  const next = current + 1;
  localStorage.setItem(READING_COUNT_KEY, String(next));
  return next;
}

export default function DonationToast() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const hasChecked = useRef(false);

  const dismiss = useCallback(() => setDismissed(true), []);

  // Check reading count on mount
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;
    const count = getAndIncrementCount();
    if (count >= MIN_READINGS_FOR_TOAST) {
      setShouldRender(true);
    }
  }, []);

  // Scroll listener — only if toast should render
  useEffect(() => {
    if (!shouldRender) return;
    let triggered = false;

    const onScroll = () => {
      if (!triggered && window.scrollY > 200) {
        triggered = true;
        setShow(true);
      }

      const section = document.getElementById("donation-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          setDismissed(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldRender]);

  const handleClick = () => {
    const el = document.getElementById("donation-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(dismiss, 600);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismiss();
  };

  if (!shouldRender || dismissed) return null;

  return (
    <div
      onClick={handleClick}
      className={`donation-toast ${show ? "donation-toast--visible" : ""}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base leading-none">☕</span>
        <span className="text-xs text-zen-gold/90 tracking-wider">
          {t("donation.toastMessage")}
        </span>
        <button
          onClick={handleDismiss}
          className="ml-1 text-white/30 hover:text-white/60 transition-colors text-sm leading-none"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
