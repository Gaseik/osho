import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../locales/en.json';
import zhTWTranslation from '../locales/zh-TW.json';

const resources = {
  en: {
    translation: enTranslation
  },
  'zh-TW': {
    translation: zhTWTranslation
  }
};

const SUPPORTED_LANGS = ['zh-TW', 'en'];

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
