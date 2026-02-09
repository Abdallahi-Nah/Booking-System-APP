import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";

// الحصول على اللغة المحفوظة أو استخدام الإنجليزية
const savedLanguage = localStorage.getItem("language") || "en";
document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// حفظ اللغة عند تغييرها
i18next.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18next;
