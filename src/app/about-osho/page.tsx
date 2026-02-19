"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import BackButton from "../../components/BackButton";

export default function AboutOshoPage() {
  const { t } = useTranslation();

  const philosophies = [
    { title: t("aboutOsho.philosophy1Title"), desc: t("aboutOsho.philosophy1") },
    { title: t("aboutOsho.philosophy2Title"), desc: t("aboutOsho.philosophy2") },
    { title: t("aboutOsho.philosophy3Title"), desc: t("aboutOsho.philosophy3") },
    { title: t("aboutOsho.philosophy4Title"), desc: t("aboutOsho.philosophy4") },
  ];

  const zenPoints = [
    t("aboutOsho.zenTarotPoint1"),
    t("aboutOsho.zenTarotPoint2"),
    t("aboutOsho.zenTarotPoint3"),
    t("aboutOsho.zenTarotPoint4"),
  ];

  const howToUsePoints = [
    t("aboutOsho.howToUse1"),
    t("aboutOsho.howToUse2"),
    t("aboutOsho.howToUse3"),
    t("aboutOsho.howToUse4"),
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <LanguageSwitcher />
      <BackButton href="/" />

      {/* Header */}
      <div className="text-center mb-12 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ ZEN INSIGHT ☯︎
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          {t("aboutOsho.title")}
        </h1>
        <p className="text-white/50 text-sm mt-2 tracking-wider">
          {t("aboutOsho.subtitle")}
        </p>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-4"
        />
      </div>

      <div className="max-w-2xl w-full animate-fadeUp space-y-12">
        {/* Intro */}
        <section className="text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            {t("aboutOsho.intro")}
          </p>
        </section>

        {/* Core Teachings */}
        <section>
          <h2 className="text-lg font-light tracking-[0.125rem] text-zen-gold/80 text-center mb-8">
            {t("aboutOsho.philosophyTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {philosophies.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-zen-gold/15 bg-zen-gold/[0.03] p-5
                           hover:border-zen-gold/30 transition-all duration-300"
              >
                <h3 className="text-sm font-medium text-zen-gold/90 mb-2 tracking-wider">
                  {item.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zen-gold/20" />
          <span className="text-zen-gold/40 text-xs">☯︎</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zen-gold/20" />
        </div>

        {/* Zen Tarot Section */}
        <section>
          <h2 className="text-lg font-light tracking-[0.125rem] text-zen-gold/80 text-center mb-4">
            {t("aboutOsho.zenTarotTitle")}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed text-center mb-6">
            {t("aboutOsho.zenTarotDesc")}
          </p>
          <div className="space-y-3">
            {zenPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 rounded-lg
                           border border-white/5 bg-white/[0.02]"
              >
                <span className="text-zen-gold/60 text-xs mt-0.5 shrink-0">
                  {i + 1}.
                </span>
                <p className="text-white/55 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zen-gold/20" />
          <span className="text-zen-gold/40 text-xs">☯︎</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zen-gold/20" />
        </div>

        {/* How to Use */}
        <section>
          <h2 className="text-lg font-light tracking-[0.125rem] text-zen-gold/80 text-center mb-4">
            {t("aboutOsho.howToUseTitle")}
          </h2>
          <p className="text-white/50 text-sm text-center mb-6">
            {t("aboutOsho.howToUseDesc")}
          </p>
          <div className="space-y-3">
            {howToUsePoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 rounded-lg
                           border border-white/5 bg-white/[0.02]"
              >
                <span className="text-zen-gold/60 text-xs mt-0.5 shrink-0">✦</span>
                <p className="text-white/55 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-zen-gold/20" />
          <span className="text-zen-gold/40 text-xs">☯︎</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-zen-gold/20" />
        </div>

        {/* Closing */}
        <section className="text-center">
          <h2 className="text-lg font-light tracking-[0.125rem] text-zen-gold/80 mb-4">
            {t("aboutOsho.closingTitle")}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-10">
            {t("aboutOsho.closing")}
          </p>

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
            <span>{t("aboutOsho.cta")}</span>
          </Link>
        </section>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
