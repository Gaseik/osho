"use client";

import { useState, useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu01, XClose, Globe01, Mail01, BookOpen01, MagicWand02, HelpCircle, User01 } from '@untitled-ui/icons-react';
import { getRecords } from '../utils/divinationRecords';
import { getUserProfile } from '../utils/userProfile';

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width={14} height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SideMenu() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [recordCount, setRecordCount] = useState(0);
  const [hasProfile, setHasProfile] = useState(false);
  const [oshoOpen, setOshoOpen] = useState(true);
  const [tarotOpen, setTarotOpen] = useState(true);

  useEffect(() => {
    if (open) {
      setRecordCount(getRecords().length);
      setHasProfile(!!getUserProfile());
    }
  }, [open]);

  // Auto-expand the section that contains the current route
  useEffect(() => {
    if (pathname.startsWith('/tarot')) {
      setTarotOpen(true);
    } else if (
      pathname.startsWith('/reading') ||
      pathname.startsWith('/cards') ||
      pathname.startsWith('/spreads') ||
      pathname.startsWith('/about-osho')
    ) {
      setOshoOpen(true);
    }
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh-TW' ? 'en' : 'zh-TW';
    i18n.changeLanguage(newLang);
  };

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `flex items-center gap-3 py-2 pl-7 text-sm tracking-wider transition-colors ${
      isActive(href)
        ? 'text-zen-gold'
        : 'text-white/60 hover:text-zen-gold'
    }`;

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

        <div className="flex flex-col h-full pt-16 px-5">
          {/* Scrollable menu area */}
          <div className="flex-1 min-h-0 overflow-y-auto">

            {/* ===== Osho Zen Tarot Section ===== */}
            <button
              onClick={() => setOshoOpen(!oshoOpen)}
              className="flex items-center gap-2.5 w-full text-left py-2.5 mb-1
                         text-zen-gold/90 hover:text-zen-gold transition-colors"
            >
              <span className="text-base">🔮</span>
              <span className="text-[13px] font-medium tracking-wider flex-1">
                {t('menu.oshoZen')}
              </span>
              <ChevronDown open={oshoOpen} />
            </button>

            {oshoOpen && (
              <div className="mb-3">
                {/* Reading */}
                <button
                  onClick={() => {
                    setOpen(false);
                    if (pathname === '/reading') {
                      router.refresh();
                    } else {
                      router.push('/reading');
                    }
                  }}
                  className={`${linkClass('/reading')} w-full text-left`}
                >
                  <MagicWand02 width={16} height={16} />
                  <span>{t('menu.oshoReading')}</span>
                </button>

                {/* Card Meanings */}
                <Link
                  href="/cards"
                  onClick={() => setOpen(false)}
                  className={linkClass('/cards')}
                >
                  <BookOpen01 width={16} height={16} />
                  <span>{t('menu.oshoCards')}</span>
                </Link>

                {/* Spread Types */}
                <Link
                  href="/spreads"
                  onClick={() => setOpen(false)}
                  className={linkClass('/spreads')}
                >
                  <Globe01 width={16} height={16} />
                  <span>{t('menu.oshoSpreads')}</span>
                </Link>

                {/* About Osho */}
                <Link
                  href="/about-osho"
                  onClick={() => setOpen(false)}
                  className={linkClass('/about-osho')}
                >
                  <HelpCircle width={16} height={16} />
                  <span>{t('menu.oshoAbout')}</span>
                </Link>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-white/[0.06] my-2" />

            {/* ===== Classic Tarot Section ===== */}
            <button
              onClick={() => setTarotOpen(!tarotOpen)}
              className="flex items-center gap-2.5 w-full text-left py-2.5 mb-1
                         text-zen-gold/90 hover:text-zen-gold transition-colors"
            >
              <span className="text-base">🃏</span>
              <span className="text-[13px] font-medium tracking-wider flex-1">
                {t('menu.classicTarot')}
              </span>
              <ChevronDown open={tarotOpen} />
            </button>

            {tarotOpen && (
              <div className="mb-3">
                {/* Reading */}
                <button
                  onClick={() => {
                    setOpen(false);
                    if (pathname === '/tarot') {
                      router.refresh();
                    } else {
                      router.push('/tarot');
                    }
                  }}
                  className={`${linkClass('/tarot')} w-full text-left`}
                >
                  <MagicWand02 width={16} height={16} />
                  <span>{t('menu.oshoReading')}</span>
                </button>

                {/* Card Meanings */}
                <Link
                  href="/tarot/cards"
                  onClick={() => setOpen(false)}
                  className={linkClass('/tarot/cards')}
                >
                  <BookOpen01 width={16} height={16} />
                  <span>{t('menu.tarotCards')}</span>
                </Link>

                {/* Spread Guide */}
                <Link
                  href="/tarot/spreads"
                  onClick={() => setOpen(false)}
                  className={linkClass('/tarot/spreads')}
                >
                  <Globe01 width={16} height={16} />
                  <span>{t('menu.tarotSpreadGuide')}</span>
                </Link>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-white/[0.06] my-2" />

            {/* ===== Reading History ===== */}
            <Link
              href="/records"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 py-2.5 transition-colors ${
                isActive('/records') ? 'text-zen-gold' : 'text-white/70 hover:text-zen-gold'
              }`}
            >
              <span className="text-base">📖</span>
              <span className="text-[13px] tracking-wider flex-1">
                {t('menu.readingHistory')}
              </span>
              {recordCount > 0 && (
                <span className="text-xs text-white/40">{recordCount}</span>
              )}
            </Link>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] my-2" />

            {/* ===== Utility Links ===== */}
            {/* Profile */}
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 py-2.5 transition-colors ${
                isActive('/profile') ? 'text-zen-gold' : 'text-white/70 hover:text-zen-gold'
              }`}
            >
              <User01 width={16} height={16} />
              <span className="text-sm tracking-wider">{t('menu.profile')}</span>
              {hasProfile && (
                <span className="ml-auto text-xs text-zen-gold/60">✓</span>
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 py-2.5 transition-colors ${
                isActive('/contact') ? 'text-zen-gold' : 'text-white/70 hover:text-zen-gold'
              }`}
            >
              <Mail01 width={16} height={16} />
              <span className="text-sm tracking-wider">{t('menu.contact')}</span>
            </Link>

            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 py-2.5 text-white/70 hover:text-zen-gold
                         transition-colors text-left w-full"
            >
              <Globe01 width={16} height={16} />
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
