import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "關於洞見 | About OSHO Zen Card Read",
  description:
    "禪意靈卡是一個免費的線上禪卡抽牌平台，靈感來自奧修禪卡。About Zen Insight Cards - a free online Zen tarot card reading platform inspired by Osho Zen Tarot.",
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10"
    >
      <div className="text-center mb-10 animate-fadeUp">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯ ZEN INSIGHT ☯
        </div>
        <h1 className="text-[28px] font-light tracking-[0.1875rem] text-white/90 m-0">
          關於禪意靈卡
        </h1>
        <div
          className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3"
        />
      </div>

      <div className="max-w-lg animate-fadeUp text-center">
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          禪意靈卡是一個免費的線上禪卡抽牌平台，提供多種牌陣選擇，讓你在靜心中探索內在智慧與直覺指引。
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          Zen Insight Cards is a free online Zen tarot card reading platform. It
          offers multiple spread types to help you explore your inner wisdom
          and intuitive guidance through meditation.
        </p>
        <p className="text-white/40 text-xs leading-relaxed mb-10">
          Inspired by Osho Zen Tarot. This is a fan-made tool for
          self-reflection and is not affiliated with any official Osho
          organization.
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
          <span>☯</span>
          <span>開始抽牌</span>
        </Link>
      </div>
    </div>
  );
}
