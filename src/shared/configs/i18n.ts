import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { de, en } from "../../locales";

i18n.use(initReactI18next).init({
  defaultNS: "common",
  debug: import.meta.env.DEV,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    de,
  },
});
