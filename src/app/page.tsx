import Link from "next/link";
import SideMenu from "../components/SideMenu";

export default function HomePage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-zen-dark via-zen-darker to-zen-dark
                    text-white font-serif flex flex-col items-center px-4 py-10">
      <SideMenu />

      {/* Hero Section */}
      <div className="text-center animate-fadeUp max-w-lg">
        <div className="text-sm tracking-[0.375rem] text-zen-gold-dim mb-2">
          ☯︎ ZEN INSIGHT ☯︎
        </div>
        <h1 className="text-4xl font-light tracking-[0.1875rem] text-white/90 m-0 mb-4">
          禪意靈卡
        </h1>
        <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-zen-gold/50 to-transparent
                      mx-auto mt-3 mb-8" />

        <p className="text-white/60 text-base leading-relaxed mb-4">
          免費線上禪卡抽牌，探索內在智慧與直覺指引。
        </p>
        <p className="text-white/40 text-sm leading-relaxed mb-10">
          Free online Zen tarot card reading with beautiful UI and multiple spreads.
          Inspired by Osho Zen Tarot.
        </p>

        {/* Spread options preview */}
        <div className="text-white/30 text-xs mb-6 tracking-wider">
          單牌 · 三牌陣 · 時間之流 · 兩人關聯 · 五牌陣
        </div>

        {/* CTA Button */}
        <Link
          href="/reading"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full
                     border border-zen-gold/35
                     bg-gradient-to-r from-zen-gold/[0.08] to-zen-gold/[0.02]
                     text-zen-gold/90 text-lg tracking-[3px]
                     hover:border-zen-gold/60 hover:scale-105
                     hover:shadow-[0_0_30px_rgba(255,215,0,0.15),inset_0_0_20px_rgba(255,215,0,0.05)]
                     transition-all duration-400 no-underline"
        >
          <span className="text-2xl">☯︎</span>
          <span>開始抽牌</span>
        </Link>

        <p className="text-white/25 text-xs mt-6">
          靜心片刻，感受你的直覺
        </p>
      </div>
    </div>
  );
}
