import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation, I18nextProvider } from 'react-i18next'; // I18nextProvider ekledik
import i18n from '../i18n'; // i18n instance'ını doğrudan import ettik
// ... diğer importlar

import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  // t fonksiyonunu alırken i18n instance'ını da alalım
  const { t, i18n } = useTranslation(); 
  const { language } = useLanguage();
  const location = useLocation();

  // Eğer i18n instance'ı hala yüklenmediyse düzgün çalışması için zorlayalım
  if (!i18n.isInitialized) {
    return null; // veya basit bir yükleniyor ekranı
  }
  
  // Geri kalan kodun aynı kalabilir...