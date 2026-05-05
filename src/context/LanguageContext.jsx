import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "tr");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = {
    tr: {
      // Mevcut anahtarlarınız
      back: "Geri Dön",
      home: "Giriş Ekranı",
      welcome_msg: "İşletme tablonuza hoş geldiniz",
      logout: "Çıkış Yap",
      admin: "Yönetici",
      
      // EKSİK OLAN VE GÖRSELDEKİ HATALARI DÜZELTECEK ANAHTARLAR:
      greeting_day: "İyi Günler",
      sales: "Satışlar",
      customers: "Müşteriler",
      stocks: "Stoklar",
      invoices: "Faturalar",
      "E-Fatura": "E-Fatura",
      income_expense: "Gelir/Gider",
      cash: "Kasa",
      bank: "Banka",
      agenda: "Ajanda",
      module_go: "Modüle git",
      stat_sales: "SON 30 GÜN SATIŞ",
      stat_purchase: "SON 30 GÜN ALIŞ",
      stat_profit: "SON 30 GÜN KÂR",
      stat_kdv: "SON 30 GÜN KDV",
      modules: "MODÜLLER"
    },
    en: {
      back: "Back",
      home: "Dashboard",
      welcome_msg: "Welcome to your business dashboard",
      logout: "Logout",
      admin: "Administrator",
      
      // İNGİLİZCE KARŞILIKLARI:
      greeting_day: "Good Day",
      sales: "Sales",
      customers: "Customers",
      stocks: "Stocks",
      invoices: "Invoices",
      "E-Fatura": "E-Invoice",
      income_expense: "Income/Expense",
      cash: "Cash",
      bank: "Bank",
      agenda: "Agenda",
      module_go: "Go to module",
      stat_sales: "LAST 30 DAYS SALES",
      stat_purchase: "LAST 30 DAYS PURCHASE",
      stat_profit: "LAST 30 DAYS PROFIT",
      stat_kdv: "LAST 30 DAYS VAT",
      modules: "MODULES"
    }
  };

  const t = (key) => {
    return (translations[language] && translations[language][key]) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};