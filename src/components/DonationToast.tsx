"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function DonationToast() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const dismiss = useCallback(() => setDismissed(true), []);

  useEffect(() => {
    let triggered = false;

    const onScroll = () => {
      // Show toast once user scrolls down a bit (200px)
      if (!triggered && window.scrollY > 200) {
        triggered = true;
        setShow(true);
      }

      // Auto-dismiss when donation section is in view
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
  }, []);

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

  if (dismissed) return null;

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
