"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function ContactPage() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xjgerlav", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <div className="text-center mb-10">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ ZEN INSIGHT ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t("contact.title")}
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      <div className="w-full max-w-md">
        {status === "sent" ? (
          <div className="text-center">
            <div className="text-4xl mb-4">✦</div>
            <p className="text-zen-gold/80 text-lg mb-2">{t("contact.sent")}</p>
            <p className="text-white/40 text-sm mb-8">{t("contact.sentDesc")}</p>
            <Link
              href="/reading"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full
                         border border-zen-gold/35
                         bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                         text-zen-gold/90 text-sm tracking-[2px]
                         hover:border-zen-gold/60 hover:scale-105
                         transition-all duration-300 no-underline"
            >
              <span>☯︎</span>
              <span>{t("contact.backToReading")}</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-white/50 text-xs tracking-wider mb-2">
                {t("contact.subject")}
              </label>
              <input
                type="text"
                name="subject"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                           text-white/90 text-sm placeholder-white/25
                           focus:border-zen-gold/40 focus:outline-none transition-colors"
                placeholder={t("contact.subjectPlaceholder")}
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs tracking-wider mb-2">
                {t("contact.message")}
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                           text-white/90 text-sm placeholder-white/25 resize-none
                           focus:border-zen-gold/40 focus:outline-none transition-colors"
                placeholder={t("contact.messagePlaceholder")}
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs tracking-wider mb-2">
                {t("contact.email")}
                <span className="text-white/25 ml-1">({t("contact.optional")})</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                           text-white/90 text-sm placeholder-white/25
                           focus:border-zen-gold/40 focus:outline-none transition-colors"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>

            {status === "error" && (
              <p className="text-red-400/80 text-sm">{t("contact.error")}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 px-8 py-3 rounded-full
                         border border-zen-gold/35
                         bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                         text-zen-gold/90 text-sm tracking-[2px]
                         hover:border-zen-gold/60 hover:scale-105
                         transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {status === "sending" ? t("contact.sending") : t("contact.submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
