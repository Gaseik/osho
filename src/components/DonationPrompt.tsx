"use client";

import { useRef, useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { useTranslation } from "react-i18next";

export default function DonationPrompt() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="donation-section"
      ref={containerRef}
      className={`donation-prompt max-w-[500px] w-full mb-2 ${
        visible ? "donation-prompt--visible" : ""
      }`}
    >
      <div className="bg-white/[0.03] rounded-xl border border-zen-gold/15 p-5">
        {/* Icon + Main text */}
        <div className="text-center mb-3">
          <span className="text-lg">✦</span>
        </div>
        <p className="text-sm text-zen-gold/80 text-center leading-relaxed tracking-wider mb-1">
          {t("donation.message")}
        </p>
        <p className="text-[10px] text-white/35 text-center leading-relaxed tracking-wider mb-4">
          {t("donation.submessage")}
        </p>

        {/* Ko-fi button */}
        <div className={`flex justify-center ${visible ? "donation-kofi-pulse" : ""}`}>
          <a
            href="https://ko-fi.com/I2I51TYYE8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGAEvent("event", "kofi_click", { location: "result_page" })}
          >
            <img
              width={143}
              height={36}
              style={{ border: 0, height: 36, width: 143 }}
              src="https://storage.ko-fi.com/cdn/kofi3.png?v=6"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
