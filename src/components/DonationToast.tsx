"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface DonationToastProps {
  /** Delay in ms before the toast slides in */
  delay?: number;
}

export default function DonationToast({ delay = 2000 }: DonationToastProps) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    // Scroll to the donation section at bottom
    const el = document.getElementById("donation-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Dismiss after a short delay so user sees the scroll
    setTimeout(() => setDismissed(true), 600);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
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
