"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import tr from "./locales/tr.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
  es: {
    translation: es,
  },
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
};

// For error handling
const handleError = (error: Error) => {
  console.error("i18n initialization error:", error);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "tr", "es", "de", "fr"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "navigator", "htmlTag"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
    react: {
      useSuspense: false,
    },
  })
  .catch(handleError);

export default i18n;
