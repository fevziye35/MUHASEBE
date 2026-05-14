import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // JSON dosyalarını yüklemek için
  .use(LanguageDetector) // Tarayıcı dilini algılamak için
  .use(initReactI18next) // React ile bağlantı kurmak için
  .init({
    fallbackLng: 'tr', // Dil bulunamazsa Türkçe göster
    debug: true, // Hataları konsolda görmek için
    interpolation: {
      escapeValue: false, 
    },
    backend: {
      // Dosya yolunun doğruluğu çok önemli
      loadPath: '/locales/{{lng}}/translation.json', 
    }
  });

export default i18n;