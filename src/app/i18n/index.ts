'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import tr from './locales/tr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';

const resources = {
  en: {
    common: en.common,
    nav: en.nav,
    features: en.features,
    planner: en.planner,
    home: en.home
  },
  tr: {
    common: tr.common,
    nav: tr.nav,
    features: tr.features,
    planner: tr.planner,
    home: tr.home
  },
  es: {
    common: es.common,
    nav: es.nav,
    features: es.features,
    planner: es.planner,
    home: es.home
  },
  de: {
    common: de.common,
    nav: de.nav,
    features: de.features,
    planner: de.planner,
    home: de.home
  },
  fr: {
    common: fr.common,
    nav: fr.nav,
    features: fr.features,
    planner: fr.planner,
    home: fr.home
  }
};

// For error handling
const handleError = (error: Error) => {
  console.error('i18n initialization error:', error);
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: ['en', 'tr', 'es', 'de', 'fr'],
      defaultNS: 'common',
      ns: ['common', 'nav', 'features', 'planner', 'home'],
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['path', 'navigator', 'htmlTag'],
        lookupFromPathIndex: 0,
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false,
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
      },
    })
    .catch(handleError);
}

export default i18n; 