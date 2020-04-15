import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LocizeBackend from "i18next-locize-backend";
i18n
  .use(LocizeBackend)
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV !== "development" ? false : true,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "common",
    whitelist: ["en", "tr"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // ** Enterprise https://locize.com **
    saveMissing: true,
    saveMissingTo: "all",
    backend: {
      projectId: process.env.REACT_APP_LOCIZE_ID,
      apiKey: process.env.REACT_APP_LOCIZE_API_KEY,
      referenceLng: "en",
    },
  });

export default i18n;
