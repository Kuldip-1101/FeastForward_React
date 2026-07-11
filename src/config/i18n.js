import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en.json';
import guTranslation from '../locales/gu.json';
import hiTranslation from '../locales/hi.json';
import paTranslation from '../locales/pa.json';
import frTranslation from '../locales/fr.json';
import esTranslation from '../locales/es.json';

const resources = {
  en: enTranslation,
  gu: guTranslation,
  hi: hiTranslation,
  pa: paTranslation,
  fr: frTranslation,
  es: esTranslation,
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en', // Match system default fallback
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values safely
    },
  });

export default i18n;
