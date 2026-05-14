import './i18n'; // i18n motorunu burada da zorunlu olarak çağırıyoruz
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import CariHesaplar from './pages/CariHesaplar';
import StokKartlari from './pages/StokKartlari';
import Faturalar from './pages/Faturalar';
import EFatura from './pages/EFatura';
import EIrsaliye from './pages/EIrsaliye';
import ESmm from './pages/ESmm';
import GelirGider from './pages/GelirGider';
import Kasa from './pages/Kasa';
import Banka from './pages/Banka';
import TaksitTakip from './pages/TaksitTakip';
import TeklifSiparis from './pages/TeklifSiparis';
import DovizAyarlari from './pages/DovizAyarlari';
import CariRaporu from './pages/CariRaporu';
import StokRaporu from './pages/StokRaporu';
import TaksitRaporu from './pages/TaksitRaporu';
import KasaRaporu from './pages/KasaRaporu';
import BankaRaporu from './pages/BankaRaporu';
import CekRaporu from './pages/CekRaporu';
import GunSonuRaporu from './pages/GunSonuRaporu';
import KarZararAnalizi from './pages/KarZararAnalizi';
import SatisRaporu from './pages/SatisRaporu';
import Messages from './pages/Messages';
import PersonnelTracking from './pages/PersonnelTracking';
import ShipmentTracking from './pages/ShipmentTracking';
import CompanyDebts from './pages/CompanyDebts';
import Agenda from './pages/Agenda';
import UserManagement from './pages/UserManagement';
import SalesInvoice from './pages/SalesInvoice';
import InvoiceDetail from './pages/InvoiceDetail';
import Purchase from './pages/Purchase';
import PurchaseInvoice from './pages/PurchaseInvoice';
import CustomerForm from './pages/CustomerForm';
import CariGroups from './pages/CariGroups';
import StockForm from './pages/StockForm';
import ChecksList from './pages/ChecksList';
import StockMetaList from './pages/StockMetaList';
import DebitVoucher from './pages/DebitVoucher';
import SalesWaybillSelection from './pages/SalesWaybillSelection';
import SalesWaybillDetail from './pages/SalesWaybillDetail';
import PurchaseWaybillSelection from './pages/PurchaseWaybillSelection';
import PurchaseWaybillDetail from './pages/PurchaseWaybillDetail';
import IncomeExpenseReport from './pages/IncomeExpenseReport';
import ComponentPending from './pages/ComponentPending';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import StockDetail from './pages/StockDetail';
import { LanguageProvider } from './context/LanguageContext';
import { BranchProvider } from './context/BranchContext';
import { AuthProvider } from './context/AuthContext';
import LockScreen from './components/LockScreen';
import './App.css';

function App() {
  const [isLocked, setIsLocked] = React.useState(() => {
    return localStorage.getItem('isLocked') === 'true';
  });

  React.useEffect(() => {
    const handleStorage = () => {
      setIsLocked(localStorage.getItem('isLocked') === 'true');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
    localStorage.removeItem('isLocked');
  };

  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <LanguageProvider>
      <BranchProvider>
        <AuthProvider>
          <Router>
      <Routes>
        {/* Auth Routes - No Sidebar/Header */}
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />

        {/* Protected Routes - With MainLayout */}
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
          <Route path="/satis-yap" element={<Sales />} />
          <Route path="/cari-hesaplar" element={<CariHesaplar />} />
          <Route path="/stok-kartlari" element={<StokKartlari />} />
          <Route path="/faturalar" element={<Faturalar />} />
          <Route path="/efatura" element={<EFatura />} />
          <Route path="/e-irsaliye" element={<EIrsaliye />} />
          <Route path="/e-smm" element={<ESmm />} />
          <Route path="/gelir-gider" element={<GelirGider />} />
          <Route path="/gelir-gider-raporu" element={<IncomeExpenseReport />} />
          <Route path="/kasa" element={<Kasa />} />
          <Route path="/banka" element={<Banka />} />
          <Route path="/cek-senet" element={<ChecksList />} />
          <Route path="/taksit-takip" element={<TaksitTakip />} />
          <Route path="/teklif-siparis" element={<TeklifSiparis />} />
          <Route path="/doviz-ayarlari" element={<DovizAyarlari />} />
          
          {/* Reports */}
          <Route path="/raporlar/cari" element={<CariRaporu />} />
          <Route path="/raporlar/stok" element={<StokRaporu />} />
          <Route path="/raporlar/taksit" element={<TaksitRaporu />} />
          <Route path="/raporlar/satis" element={<SatisRaporu />} />
          <Route path="/raporlar/kasa" element={<KasaRaporu />} />
          <Route path="/raporlar/banka" element={<BankaRaporu />} />
          <Route path="/raporlar/cek" element={<CekRaporu />} />
          <Route path="/raporlar/gun-sonu" element={<GunSonuRaporu />} />
          <Route path="/raporlar/kar-zarar" element={<KarZararAnalizi />} />
          <Route path="/raporlar/gelir-gider" element={<GelirGider />} />
          
          {/* Modules */}
          <Route path="/mesajlar" element={<Messages />} />
          <Route path="/akilli-personel" element={<PersonnelTracking />} />
          <Route path="/sevkiyat-takibi" element={<ShipmentTracking />} />
          <Route path="/borc-takibi" element={<CompanyDebts />} />
          <Route path="/ajanda" element={<Agenda />} />
          <Route path="/kisi-ekle" element={<UserManagement />} />
          
          {/* Transactional */}
          <Route path="/satis-faturasi" element={<SalesInvoice />} />
          <Route path="/alis-yap" element={<Purchase />} />
          <Route path="/alis-faturasi" element={<PurchaseInvoice />} />
          
          {/* Customer Management */}
          <Route path="/satis-yeni" element={<Navigate to="/cari-yeni" />} />
          <Route path="/alis-yeni" element={<Navigate to="/cari-yeni" />} />
          <Route path="/cari-yeni" element={<CustomerForm />} />
          <Route path="/cari-duzenle/:id" element={<CustomerForm />} />
          <Route path="/cari-detay/:id" element={<CustomerForm />} />
          
          {/* Pending Sub-routes */}
          <Route path="/gruplar" element={<CariGroups />} />
          <Route path="/mahsup-fisi" element={<DebitVoucher />} />
          <Route path="/stok-yeni" element={<StockForm />} />
          <Route path="/stok-duzenle/:id" element={<StockForm />} />
          <Route path="/markalar" element={<StockMetaList />} />
          <Route path="/birimler" element={<StockMetaList />} />
          <Route path="/depolar" element={<StockMetaList />} />
          <Route path="/stok-detay/:id" element={<StockDetail />} />
          <Route path="/satis-irsaliye" element={<SalesWaybillSelection />} />
          <Route path="/satis-irsaliye-detay" element={<SalesWaybillDetail />} />
          <Route path="/alis-irsaliye" element={<PurchaseWaybillSelection />} />
          <Route path="/alis-irsaliye-detay" element={<PurchaseWaybillDetail />} />
          <Route path="/fatura-detay/:no" element={<InvoiceDetail />} />
          <Route path="/banka-ozet" element={<Banka />} />
          
          {/* 404 Handler */}
          <Route path="*" element={<ComponentPending title="Sayfa Bulunamadı / Gönderiliyor" />} />
        </Routes>
      </MainLayout>
    } />
  </Routes>
      </Router>
        </AuthProvider>
      </BranchProvider>
    </LanguageProvider>
  );
}

export default App;

