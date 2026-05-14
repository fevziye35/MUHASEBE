import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
// i18n dosyasını import ediyoruz
import i18nInstance from '../i18n'; 
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  // Burada i18n ismini kullanmıyoruz, sadece t fonksiyonunu alıyoruz
  const { t } = useTranslation(); 
  const { language } = useLanguage();
  const location = useLocation();

  // import ettiğimiz instance üzerinden kontrol yapıyoruz
  if (!i18nInstance.isInitialized) {
    return null; 
  }
  
  // Geri kalan menü elemanları ve JSX yapısı...