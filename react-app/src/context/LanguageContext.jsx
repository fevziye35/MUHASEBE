import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  tr: {
    back: 'Geri Dön',
    lock: 'Ekranı Kilitle',
    branch: 'Merkez Şube',
    logout_confirm: 'Çıkış yapmak istediğinize emin misiniz?',
    home: 'Giriş Ekranı',
    sales: 'Satış Yap',
    customers: 'Cari Hesaplar',
    stocks: 'Stok Kartları',
    invoices: 'Faturalar',
    greeting_day: 'İyi Günler!',
    greeting_morning: 'Günaydın!',
    greeting_night: 'İyi Geceler!',
    greeting_evening: 'İyi Akşamlar!',
    welcome_subtitle: 'İşletme tablonuza hoş geldiniz',
    system_time: 'Sistem Saati',
    logout: 'Güvenli Çıkış',
    oturum_acik: 'Oturum Açık',
    yonetici: 'Yönetici',
    stat_sales: 'SON 30 GÜN SATIŞ',
    stat_purchase: 'SON 30 GÜN ALIŞ',
    stat_profit: 'SON 30 GÜN KÂR',
    stat_kdv: 'SON 30 GÜN KDV',
    modules: 'MODÜLLER',
    efatura: 'E-Fatura',
    bank: 'Banka',
    cash: 'Kasa',
    agenda: 'Ajanda',
    bank_balances: 'Banka Bakiyeleri',
    cash_balances: 'Kasa Bakiyeleri',
    last_30_days_balances: 'Son 30 günlük bakiye durumu',
    cash_balances_subtitle: 'Güncel kasa durumları',
    account_name: 'Hesap Adı',
    cash_name: 'Kasa Adı',
    balance: 'Bakiye',
    no_records_found: 'Kayıt bulunamadı',
    trend_up: 'Artış',
    trend_down: 'Düşüş',
    trend_stable: 'Sabit',
    go_to_module: 'Modüle git'
  },
  en: {
    back: 'Back',
    lock: 'Lock Screen',
    branch: 'Main Branch',
    logout_confirm: 'Are you sure you want to logout?',
    home: 'Home',
    sales: 'Sales',
    customers: 'Customers',
    stocks: 'Stocks',
    invoices: 'Invoices',
    greeting_day: 'Good Day!',
    greeting_morning: 'Good Morning!',
    greeting_night: 'Good Night!',
    greeting_evening: 'Good Evening!',
    welcome_subtitle: 'Welcome to your dashboard',
    system_time: 'System Time',
    logout: 'Logout',
    oturum_acik: 'Session Active',
    yonetici: 'Administrator',
    stat_sales: 'LAST 30 DAYS SALES',
    stat_purchase: 'LAST 30 DAYS PURCHASE',
    stat_profit: 'LAST 30 DAYS PROFIT',
    stat_kdv: 'LAST 30 DAYS VAT',
    modules: 'MODULES',
    efatura: 'E-Invoice',
    bank: 'Bank',
    cash: 'Cash',
    agenda: 'Agenda',
    bank_balances: 'Bank Balances',
    cash_balances: 'Cash Balances',
    last_30_days_balances: 'Last 30 days balance status',
    cash_balances_subtitle: 'Current cash statuses',
    account_name: 'Account Name',
    cash_name: 'Cash Name',
    balance: 'Balance',
    no_records_found: 'No records found',
    trend_up: 'Increase',
    trend_down: 'Decrease',
    trend_stable: 'Stable',
    go_to_module: 'Go to module'
  },
  de: {
    back: 'Zurück',
    lock: 'Sperren',
    branch: 'Filiale',
    home: 'Startseite',
    sales: 'Verkauf',
    customers: 'Kunden',
    stocks: 'Lager',
    invoices: 'Rechnungen',
    greeting_day: 'Guten Tag!',
    greeting_morning: 'Guten Morgen!',
    greeting_night: 'Gute Nacht!',
    greeting_evening: 'Guten Abend!',
    welcome_subtitle: 'Willkommen im Dashboard',
    system_time: 'Systemzeit',
    logout: 'Abmelden',
    oturum_acik: 'Sitzung Aktiv',
    yonetici: 'Administrator',
    stat_sales: 'VERKÄUFE LETZTE 30 TAGE',
    stat_purchase: 'EINKÄUFE LETZTE 30 TAGE',
    stat_profit: 'GEWINN LETZTE 30 TAGE',
    stat_kdv: 'MWST LETZTE 30 TAGE',
    modules: 'MODULE',
    efatura: 'E-Rechnung',
    bank: 'Bank',
    cash: 'Kasse',
    agenda: 'Agenda',
    bank_balances: 'Bankguthaben',
    cash_balances: 'Kassenguthaben',
    last_30_days_balances: 'Kontostand der letzten 30 Tage',
    cash_balances_subtitle: 'Aktuelle Kassenstände',
    account_name: 'Kontoname',
    cash_name: 'Kassenname',
    balance: 'Saldo',
    no_records_found: 'Keine Datensätze gefunden',
    trend_up: 'Anstieg',
    trend_down: 'Rückgang',
    trend_stable: 'Stabil',
    go_to_module: 'Zum Modul'
  },
  ru: {
    back: 'Назад',
    lock: 'Заблокировать',
    branch: 'Филиал',
    home: 'Главная',
    sales: 'Продажи',
    customers: 'Клиенты',
    stocks: 'Склады',
    invoices: 'Счета',
    greeting_day: 'Добрый день!',
    greeting_morning: 'Доброе утро!',
    greeting_night: 'Доброй ночи!',
    greeting_evening: 'Добрый вечер!',
    welcome_subtitle: 'Добро пожаловать',
    system_time: 'Системное время',
    logout: 'Выход',
    oturum_acik: 'Сессия активна',
    yonetici: 'Администратор',
    stat_sales: 'ПРОДАЖИ ЗА 30 ДНЕЙ',
    stat_purchase: 'ЗАКУПКИ ЗА 30 ДНЕЙ',
    stat_profit: 'ПРИБЫЛЬ ЗА 30 ДНЕЙ',
    stat_kdv: 'НДС ЗА 30 ДНЕЙ',
    modules: 'МОДУЛИ',
    efatura: 'Э-Счет',
    bank: 'Банк',
    cash: 'Касса',
    agenda: 'Повестка дня',
    bank_balances: 'Банковские балансы',
    cash_balances: 'Балансы касс',
    last_30_days_balances: 'Состояние баланса за 30 дней',
    cash_balances_subtitle: 'Текущее состояние касс',
    account_name: 'Имя счета',
    cash_name: 'Имя кассы',
    balance: 'Баланс',
    no_records_found: 'Записей не найдено',
    trend_up: 'Увеличение',
    trend_down: 'Снижение',
    trend_stable: 'Стабильно',
    go_to_module: 'Перейти к модулю'
  },
  zh: {
    back: '返回',
    lock: '锁定',
    branch: '分行',
    home: '首页',
    sales: '销售',
    customers: '客户',
    stocks: '库存',
    invoices: '发票',
    greeting_day: '日安！',
    greeting_morning: '早上好！',
    greeting_night: '晚安！',
    greeting_evening: '晚上好！',
    welcome_subtitle: '欢迎来到仪表板',
    system_time: '系统时间',
    logout: '退出',
    oturum_acik: '会话激活',
    yonetici: '管理员',
    stat_sales: '最近 30 天销售额',
    stat_purchase: '最近 30 天采购额',
    stat_profit: '最近 30 天利润',
    stat_kdv: '最近 30 天增值税',
    modules: '模块',
    efatura: '电子发票',
    bank: '银行',
    cash: '现金',
    agenda: '议程',
    bank_balances: '银行余额',
    cash_balances: '现金余额',
    last_30_days_balances: '最近 30 天的余额状态',
    cash_balances_subtitle: '当前现金状态',
    account_name: '账户名称',
    cash_name: '现金名称',
    balance: '余额',
    no_records_found: '未找到记录',
    trend_up: '增长',
    trend_down: '下降',
    trend_stable: '稳定',
    go_to_module: '转到模块'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('language') || 'tr';
  });

  const t = (key) => {
    let activeLang = lang;
    if (!translations[activeLang]) activeLang = 'tr';

    // 1. Internal React translations
    if (translations[activeLang] && translations[activeLang][key]) {
      return translations[activeLang][key];
    }

    // 2. Legacy window.translations fallback
    if (window.translations && window.translations[activeLang]) {
      const dict = window.translations[activeLang];
      if (dict[key]) return dict[key];
      
      // Auto-prefix search
      const prefixes = ['sidebar.', 'word.', 'dashboard.', 'header.', 'contact.', 'mega.'];
      for (const p of prefixes) {
        if (dict[p + key]) return dict[p + key];
      }
    }

    // 3. Fallback to Turkish internal
    if (activeLang !== 'tr' && translations['tr'][key]) {
      return translations['tr'][key];
    }

    return key;
  };

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    localStorage.setItem('app_lang', newLang); // Sync with legacy
    window.dispatchEvent(new Event('languageChanged'));
    
    // If we have an applyTranslations function in global scope, call it
    if (typeof window.applyTranslations === 'function') {
      window.applyTranslations();
    }
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem('language') || 'tr';
      if (currentLang !== lang) {
        setLang(currentLang);
      }
    };
    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
