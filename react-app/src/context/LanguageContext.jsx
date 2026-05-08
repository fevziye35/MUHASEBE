import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  tr: {
    // Header
    back: 'Geri Dön',
    lock: 'Ekranı Kilitle',
    branch: 'Merkez',
    logout_confirm: 'Sistemden çıkış yapmak istediğinize emin misiniz?',
    logout_success: 'Çıkış yapıldı. Giriş ekranına yönlendiriliyorsunuz.',

    // Sidebar
    home: 'Giriş Ekranı',
    sales: 'Satış Yap',
    customers: 'Cari Hesaplar',
    stocks: 'Stok Kartları',
    invoices: 'Faturalar',
    efatura: 'E-Fatura',
    ewaybill: 'E-İrsaliye',
    esmm: 'E-Smm',
    income_expense: 'Gelir Gider',
    cash: 'Kasa',
    bank: 'Banka',
    checks: 'Çek Senet',
    installments: 'Taksit Takip',
    quotes: 'Teklif Sipariş',
    currency: 'Döviz Ayarları',
    reports: 'Raporlar',
    messages: 'Mesajlar',
    modules: 'Ek Modüller',
    personnel: 'Personel Takip',
    agenda: 'Ajanda',
    user_management: 'Kişi Ekleme Paneli',
    logout: 'Çıkış Yap',

    // Dashboard
    greeting_night: 'İyi Geceler!',
    greeting_morning: 'Günaydın!',
    greeting_day: 'TEST_HELLO',
    greeting_evening: 'İyi Akşamlar!',
    stat_sales: 'Son 30 Gün Satış',
    stat_purchase: 'Son 30 Gün Alış',
    purchase: 'Alış Yap',
    stat_profit: 'Son 30 Gün Kâr',
    stat_kdv: 'Son 30 Gün KDV',
    quick_access: 'Hızlı Erişim',
    monthly_charts: 'Aylık Grafikler',
    chart_sales: 'Aylık Satış',
    chart_purchase: 'Aylık Alış',
    chart_collection: 'Aylık Tahsilat',
    chart_payment: 'Aylık Ödeme',
    balance_status: 'Bakiye Durumu',
    bank_balances: 'Banka Bakiyeleri',
    cash_balances: 'Kasa Bakiyeleri',
    day_end: 'Gün Sonu',
    profit_loss: 'Kâr Zarar Analizi',
    welcome_subtitle: 'İşletme tablonuza hoş geldiniz',
    system_time: 'Sistem Saati',
  },
  en: {
    // Header
    back: 'Back',
    lock: 'Lock Screen',
    branch: 'Main Branch',
    logout_confirm: 'Are you sure you want to logout?',
    logout_success: 'Logged out. Redirecting to login screen.',

    // Sidebar
    home: 'Home',
    sales: 'Create Sales',
    customers: 'Current Accounts',
    stocks: 'Stock Cards',
    invoices: 'Invoices',
    efatura: 'E-Invoice',
    ewaybill: 'E-Waybill',
    esmm: 'E-SMM',
    income_expense: 'Income Expense',
    cash: 'Cash Box',
    bank: 'Bank Management',
    checks: 'Check & Notes',
    installments: 'Installment Tracking',
    quotes: 'Quotes & Orders',
    currency: 'Currency Settings',
    reports: 'Reports',
    messages: 'Messages',
    modules: 'Extra Modules',
    personnel: 'Staff Tracking',
    agenda: 'Agenda',
    user_management: 'Add Person Panel',
    logout: 'Logout',

    // Dashboard
    greeting_night: 'Good Night!',
    greeting_morning: 'Good Morning!',
    greeting_day: 'Good Day!',
    greeting_evening: 'Good Evening!',
    stat_sales: 'Last 30 Days Sales',
    stat_purchase: 'Last 30 Days Purchase',
    purchase: 'Create Purchase',
    stat_profit: 'Last 30 Days Profit',
    stat_kdv: 'Last 30 Days Tax',
    quick_access: 'Quick Access',
    monthly_charts: 'Monthly Charts',
    chart_sales: 'Monthly Sales',
    chart_purchase: 'Monthly Purchases',
    chart_collection: 'Monthly Collections',
    chart_payment: 'Monthly Payments',
    balance_status: 'Balance Status',
    bank_balances: 'Bank Balances',
    cash_balances: 'Cash Balances',
    day_end: 'Day End',
    profit_loss: 'Profit/Loss',
    welcome_subtitle: 'Welcome to your business dashboard',
    system_time: 'System Time',
  },
  de: {
    // Header
    back: 'Zurück',
    lock: 'Bildschirm sperren',
    branch: 'Hauptfiliale',
    logout_confirm: 'Sind Sie sicher, dass Sie sich abmelden möchten?',
    logout_success: 'Abgemeldet. Weiterleitung zum Anmeldebildschirm.',

    // Sidebar
    home: 'Startseite',
    sales: 'Verkauf Erstellen',
    customers: 'Kontokorrent',
    stocks: 'Lagerkarten',
    invoices: 'Rechnungen',
    efatura: 'E-Rechnung',
    ewaybill: 'E-Lieferschein',
    esmm: 'E-SMM',
    income_expense: 'Einnahmen Ausgaben',
    cash: 'Kasse',
    bank: 'Bankverwaltung',
    checks: 'Schecks & Wechsel',
    installments: 'Ratenzahlung',
    quotes: 'Angebote & Aufträge',
    currency: 'Währungseinstellungen',
    reports: 'Berichte',
    messages: 'Nachrichten',
    modules: 'Zusatzmodule',
    personnel: 'Personalverfolgung',
    agenda: 'Agenda',
    user_management: 'Benutzer Panel',
    logout: 'Abmelden',

    // Dashboard
    greeting_night: 'Gute Nacht!',
    greeting_morning: 'Guten Morgen!',
    greeting_day: 'Guten Tag!',
    greeting_evening: 'Guten Abend!',
    stat_sales: 'Umsatz letzte 30 Tage',
    stat_purchase: 'Einkauf letzte 30 Tage',
    purchase: 'Einkauf tätigen',
    stat_profit: 'Gewinn letzte 30 Tage',
    stat_kdv: 'MwSt letzte 30 Tage',
    quick_access: 'Schnellzugriff',
    monthly_charts: 'Monatliche Diagramme',
    chart_sales: 'Monatsumsatz',
    chart_purchase: 'Monatseinkauf',
    chart_collection: 'Monatliche Einnahmen',
    chart_payment: 'Monatliche Zahlungen',
    balance_status: 'Kontostand',
    bank_balances: 'Bankguthaben',
    cash_balances: 'Kassenbestände',
    day_end: 'Tagesabschluss',
    profit_loss: 'Gewinn und Verlust',
  },
  ru: {
    // Header
    back: 'Назад',
    lock: 'Заблокировать экран',
    branch: 'Главный филиал',
    logout_confirm: 'Вы уверены, что хотите выйти?',
    logout_success: 'Вы вышли из системы. Перенаправление на страницу входа.',

    // Sidebar
    home: 'Главная',
    sales: 'Продажа',
    customers: 'Контрагенты',
    stocks: 'Карточки товаров',
    invoices: 'Счета',
    efatura: 'Э-Счет',
    ewaybill: 'Э-Накладная',
    esmm: 'Э-SMM',
    income_expense: 'Доходы и расходы',
    cash: 'Касса',
    bank: 'Банк',
    checks: 'Чеки и векселя',
    installments: 'Рассрочка',
    quotes: 'Предложения и заказы',
    currency: 'Настройки валюты',
    reports: 'Отчеты',
    messages: 'Сообщения',
    modules: 'Доп. модули',
    personnel: 'Персонал',
    agenda: 'Повестка дня',
    user_management: 'Управление пользователями',
    logout: 'Выйти',

    // Dashboard
    greeting_night: 'Доброй ночи!',
    greeting_morning: 'Доброе утро!',
    greeting_day: 'Добрый день!',
    greeting_evening: 'Добрый вечер!',
    stat_sales: 'Продажи за 30 дней',
    stat_purchase: 'Закупки за 30 дней',
    purchase: 'Закупка',
    stat_profit: 'Прибыль за 30 дней',
    stat_kdv: 'НДС за 30 дней',
    quick_access: 'Быстрый доступ',
    monthly_charts: 'Месячные графики',
    chart_sales: 'Месячные продажи',
    chart_purchase: 'Месячные закупки',
    chart_collection: 'Месячные сборы',
    chart_payment: 'Месячные платежи',
    balance_status: 'Состояние баланса',
    bank_balances: 'Банковские балансы',
    cash_balances: 'Остатки в кассе',
    day_end: 'Отчет за день',
    profit_loss: 'Прибыль и убытки',
  },
  zh: {
    // Header
    back: '返回',
    lock: '锁定屏幕',
    branch: '总公司',
    logout_confirm: '您确定要退出登录吗？',
    logout_success: '已退出登录。正在返回登录界面。',

    // Sidebar
    home: '首页',
    sales: '销售管理',
    customers: '往来账户',
    stocks: '库存管理',
    invoices: '发票管理',
    efatura: '电子发票',
    ewaybill: '电子运单',
    esmm: '电子SMM',
    income_expense: '收支管理',
    cash: '现金管理',
    bank: '银行管理',
    checks: '支票票据',
    installments: '分期付款',
    quotes: '报价订单',
    currency: '货币设置',
    reports: '报表中心',
    messages: '消息通知',
    modules: '附加模块',
    personnel: '人员管理',
    agenda: '日程安排',
    user_management: '用户管理',
    logout: '退出登录',

    // Dashboard
    greeting_night: '晚安！',
    greeting_morning: '早上好！',
    greeting_day: '您好！',
    greeting_evening: '晚上好！',
    stat_sales: '最近30天销售额',
    stat_purchase: '最近30天采购额',
    purchase: '新增采购',
    stat_profit: '最近30天利润',
    stat_kdv: '最近30天税额',
    quick_access: '快速访问',
    monthly_charts: '月度统计图',
    chart_sales: '月度销售',
    chart_purchase: '月度采购',
    chart_collection: '月度收款',
    chart_payment: '月度付款',
    balance_status: '余额状态',
    bank_balances: '银行余额',
    cash_balances: '现金余额',
    day_end: '日终报告',
    profit_loss: '损益分析',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('language') || localStorage.getItem('app_lang') || 'tr';
  });

  const t = (key) => {
    const activeLang = translations[lang] ? lang : 'tr';
    
    // 1. Internal React translations
    let translated = translations[activeLang][key];
    if (translated) return translated;

    // 2. Legacy window.translations fallback
    if (window.translations && window.translations[activeLang]) {
      const dict = window.translations[activeLang];
      if (dict[key]) return dict[key];
      
      // Try legacy prefixes
      if (dict[`sidebar.${key}`]) return dict[`sidebar.${key}`];
      if (dict[`word.${key}`]) return dict[`word.${key}`];
      if (dict[`dashboard.${key}`]) return dict[`dashboard.${key}`];
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
    localStorage.setItem('app_lang', newLang);
    window.dispatchEvent(new Event('languageChanged'));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const currentLang = localStorage.getItem('language') || localStorage.getItem('app_lang') || 'tr';
      if (currentLang !== lang) {
        setLang(currentLang);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChanged', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleStorageChange);
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
