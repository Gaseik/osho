import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh-TW' ? 'en' : 'zh-TW';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 px-4 py-2 rounded-lg border border-zen-gold/30
                 bg-zen-gold/5 text-zen-gold-dim hover:bg-zen-gold/10 hover:border-zen-gold/50
                 transition-all duration-300 text-sm tracking-wider z-50"
    >
      {i18n.language === 'zh-TW' ? 'EN' : '中文'}
    </button>
  );
}
