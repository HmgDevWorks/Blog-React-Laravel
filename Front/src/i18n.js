import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const savedLanguage = localStorage.getItem("language") || "en"; // Carga el idioma guardado

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // Cambia la ruta a `public/`
    },
    interpolation: { escapeValue: false },
    lang: savedLanguage
  });

export default i18n;
