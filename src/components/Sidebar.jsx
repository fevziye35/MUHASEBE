import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// i18n dosyasını doğrudan buraya da import edelim ki instance garantilensin
import '../i18n'; 
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