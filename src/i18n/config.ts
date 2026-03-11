import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../locales/en.json';
import zhTWTranslation from '../locales/zh-TW.json';
import jaTranslation from '../locales/ja.json';
import koTranslation from '../locales/ko.json';

const resources = {
  en: {
    translation: enTranslation
  },
  'zh-TW': {
    translation: zhTWTranslation
  },
  ja: {
    translation: jaTranslation
  },
  ko: {
    translation: koTranslation
  }
};

export const LANGUAGE_OPTIONS = [
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
] as const;

/**
 * Map i18n language code to card data key.
 * Card data only has "en" and "zh" keys, so ja/ko fall back to "en".
 */
export function getCardDataLang(lang: string): 'en' | 'zh' {
  return lang === 'zh-TW' ? 'zh' : 'en';
}

const SUPPORTED_LANGS = ['zh-TW', 'en', 'ja', 'ko'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-TW',
    supportedLngs: SUPPORTED_LANGS,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
