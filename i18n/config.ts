"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "@/locales/en/common.json";
import faCommon from "@/locales/fa/common.json";

export const languageConfig = {
  en: {
    dir: "ltr",
    font: "Heebo",
  },
  fa: {
    dir: "rtl",
    font: "Abar Low",
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          common: enCommon,
        },
        fa: {
          common: faCommon,
        },
      },
      fallbackLng: "en",
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
