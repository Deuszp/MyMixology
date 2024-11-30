import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import ukTranslations from './uk.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      uk: {
        translation: ukTranslations
      }
    },
    lng: 'uk', // Встановлюємо українську як основну
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
