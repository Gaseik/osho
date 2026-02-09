import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-TW', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
