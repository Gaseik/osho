"use client";

import { useState, useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu01, XClose, Globe01, Mail01, BookOpen01, MagicWand02, HelpCircle, User01 } from '@untitled-ui/icons-react';
import { getRecords } from '../utils/divinationRecords';
import { getUserProfile } from '../utils/userProfile';

export default function SideMenu() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (open) {
      setRecordCount(getRecords().length);
      setHasProfile(!!getUserProfile());
    }
  }, [open]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh-TW' ? 'en' : 'zh-TW';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      {/* Hamburger button — top left */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-10 left-4 w-10 h-10 flex items-center justify-center
                   rounded-lg border border-zen-gold/30 bg-zen-gold/5 text-zen-gold-dim
                   hover:bg-zen-gold/10 hover:border-zen-gold/50 transition-all duration-300 z-50"
      >
        <Menu01 width={18} height={18} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          style={{ animation: 'overlayFadeIn 0.3s ease-out' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side panel */}
      <div
        className="side-menu"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-5 text-white/40 hover:text-white/70
                     transition-colors"
        >
          <XClose width={20} height={20} />
        </button>

        <div className="flex flex-col h-full pt-20 px-6">
          {/* Scrollable menu area */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {/* ── Section: Osho Zen Tarot ── */}
            <div className="text-[10px] text-zen-gold/40 tracking-[0.2em] uppercase mt-1 mb-2">
              {i18n.language === 'zh-TW' ? '🔮 奧修禪卡' : '🔮 Osho Zen Tarot'}
            </div>

            {/* Reading — always navigate to landing */}
            <button
              onClick={() => {
                setOpen(false);
                if (pathname === '/reading') {
                  router.refresh();
                } else {
                  router.push('/reading');
                }
              }}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors w-full text-left"
            >
              <MagicWand02 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.reading')}</span>
            </button>

            {/* Card Meanings */}
            <Link
              href="/cards"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors"
            >
              <BookOpen01 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.cardMeanings')}</span>
            </Link>

            {/* Spread Types */}
            <Link
              href="/spreads"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors"
            >
              <Globe01 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.spreadTypes')}</span>
            </Link>

            {/* About Osho */}
            <Link
              href="/about-osho"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors"
            >
              <HelpCircle width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.aboutOsho')}</span>
            </Link>

            {/* ── Divider ── */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />

            {/* ── Section: Classic Tarot ── */}
            <div className="text-[10px] text-purple-300/40 tracking-[0.2em] uppercase mb-2">
              {i18n.language === 'zh-TW' ? '🃏 傳統塔羅' : '🃏 Classic Tarot'}
            </div>

            <Link
              href="/tarot/single"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2.5 text-white/70 hover:text-purple-300
                         transition-colors pl-1"
            >
              <span className="text-sm tracking-wider">{i18n.language === 'zh-TW' ? '單牌' : 'Single Card'}</span>
            </Link>
            <Link
              href="/tarot/three-card"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2.5 text-white/70 hover:text-purple-300
                         transition-colors pl-1"
            >
              <span className="text-sm tracking-wider">{i18n.language === 'zh-TW' ? '三牌陣' : 'Three Card Spread'}</span>
            </Link>
            <Link
              href="/tarot/celtic-cross"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2.5 text-white/70 hover:text-purple-300
                         transition-colors pl-1"
            >
              <span className="text-sm tracking-wider">{i18n.language === 'zh-TW' ? '凱爾特十字' : 'Celtic Cross'}</span>
            </Link>
            <Link
              href="/tarot/relationship"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2.5 text-white/70 hover:text-purple-300
                         transition-colors pl-1"
            >
              <span className="text-sm tracking-wider">{i18n.language === 'zh-TW' ? '關係牌陣' : 'Relationship Spread'}</span>
            </Link>

            {/* ── Divider ── */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-3" />

            {/* ── Section: Common ── */}

            {/* Profile */}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors"
            >
              <User01 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.profile')}</span>
              {hasProfile && (
                <span className="ml-auto text-xs text-zen-gold/60">✓</span>
              )}
            </Link>

            {/* Divination Records */}
            <Link
              href="/records"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors"
            >
              <BookOpen01 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.records')}</span>
              {recordCount > 0 && (
                <span className="ml-auto text-xs text-white/40">{recordCount}</span>
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors"
            >
              <Mail01 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.contact')}</span>
            </Link>

            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                         transition-colors text-left"
            >
              <Globe01 width={18} height={18} />
              <span className="text-sm tracking-wider">{t('menu.language')}</span>
              <span className="ml-auto text-xs text-white/40">
                {i18n.language === 'zh-TW' ? 'EN' : '中文'}
              </span>
            </button>
          </div>

          {/* Ko-fi donate — always visible at bottom */}
          <div className="flex-shrink-0 py-6 flex justify-center">
            <a href="https://ko-fi.com/I2I51TYYE8" target="_blank" rel="noopener noreferrer" onClick={() => sendGAEvent("event", "kofi_click", { location: "sidebar" })}>
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
    </>
  );
}
