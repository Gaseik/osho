"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Menu01, XClose, Globe01, Mail01, BookOpen01, MagicWand02 } from '@untitled-ui/icons-react';
import { getRecords } from '../utils/divinationRecords';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [recordCount, setRecordCount] = useState(0);

  useEffect(() => {
    if (open) setRecordCount(getRecords().length);
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
        className="fixed top-6 left-6 w-10 h-10 flex items-center justify-center
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
          {/* Reading */}
          <Link
            href="/reading"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                       transition-colors"
          >
            <MagicWand02 width={18} height={18} />
            <span className="text-sm tracking-wider">{t('menu.reading')}</span>
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
          <a
            href="mailto:gaseik.dev@gmail.com"
            className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                       transition-colors"
          >
            <Mail01 width={18} height={18} />
            <span className="text-sm tracking-wider">{t('menu.contact')}</span>
          </a>

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

          {/* Spacer */}
          <div className="flex-1" />

          {/* Ko-fi donate — pinned to bottom */}
          <div className="pb-8 flex justify-center">
            <a href="https://ko-fi.com/I2I51TYYE8" target="_blank" rel="noopener noreferrer">
              <img
                height="36"
                style={{ border: 0, height: 36 }}
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
