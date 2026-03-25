/**
 * ⑥ i18n 설정 — i18next + react-i18next
 *
 * 사용법:
 *   import { useTranslation } from "react-i18next";
 *   const { t } = useTranslation();
 *   t("home.title")            // "올리브식권" | "OliveTicket"
 *   t("enum.mealTime.LUNCH")   // "점심" | "Lunch"
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./locales/ko";
import en from "./locales/en";
import vi from "./locales/vi";

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: "ko",               // 기본 언어
  fallbackLng: "ko",       // 키 누락 시 한국어 폴백
  interpolation: {
    escapeValue: false,     // React는 XSS 자체 방어
  },
});

export default i18n;
