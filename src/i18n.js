import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// ... diğer ayarlar
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // Buranın olduğundan emin ol
  .init({
    // ayarların...
  });

  
    fallbackLng: 'tr',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // Vercel'in public klasörüne her şartta ulaşması için:
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false // Yükleme sırasında beyaz ekran hatasını önler
    }
  });

export default i18n;