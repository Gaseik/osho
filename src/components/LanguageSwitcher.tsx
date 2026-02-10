import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

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
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="2" y1="4" x2="16" y2="4" />
          <line x1="2" y1="9" x2="16" y2="9" />
          <line x1="2" y1="14" x2="16" y2="14" />
        </svg>
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
                     transition-colors text-lg"
        >
          ✕
        </button>

        <div className="flex flex-col h-full pt-20 px-6">
          {/* Language */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                       transition-colors text-left"
          >
            <span className="text-base">🌐</span>
            <span className="text-sm tracking-wider">{t('menu.language')}</span>
            <span className="ml-auto text-xs text-white/40">
              {i18n.language === 'zh-TW' ? 'EN' : '中文'}
            </span>
          </button>

          <div className="w-full h-px bg-white/10 my-1" />

          {/* Contact */}
          <a
            href="mailto:gaseik.dev@gmail.com"
            className="flex items-center gap-3 py-3 text-white/70 hover:text-zen-gold
                       transition-colors"
          >
            <span className="text-base">✉</span>
            <span className="text-sm tracking-wider">{t('menu.contact')}</span>
          </a>

        </div>
      </div>
    </>
  );
}
