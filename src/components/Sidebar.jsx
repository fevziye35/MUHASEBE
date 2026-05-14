import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Dosya isminin küçük harf olduğundan emin olun (i18n.js)
import '../i18n'; 
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  // Sadece 't' fonksiyonunu alıyoruz, çakışmayı önlemek için 'i18n'i buradan siliyoruz
  const { t } = useTranslation(); 
  const { language } = useLanguage();
  const location = useLocation();

  // Menü başlıklarında t('sidebar.dashboard') gibi anahtar kelimeler kullanın
  // ...