import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const location = useLocation();

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    if (window.confirm(t('sidebar.logout_confirm') || 'Çıkış yapmak istediğinize emin misiniz?')) {
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Sidebar.jsx içinde
const { i18n } = useTranslation();

return (
  <nav key={i18n.language} style={{ ... }}> 
     {/* key={i18n.language} eklemek, dil değiştiğinde menüyü yeniler */}

  const menuItems = [
    { path: '/', label: t('sidebar.dashboard'), icon: 'fa-house' },
    { path: '/satis-yap', label: t('sidebar.sales'), icon: 'fa-cart-shopping' },
    { path: '/cari-hesaplar', label: t('sidebar.customers'), icon: 'fa-users' },
    { path: '/stok-kartlari', label: t('sidebar.stocks'), icon: 'fa-boxes-stacked' },
    { path: '/faturalar', label: t('sidebar.invoices'), icon: 'fa-file-invoice' },
    { path: '/gelir-gider', label: t('sidebar.income_expense'), icon: 'fa-chart-line' },
    { path: '/kasa', label: t('sidebar.kasa'), icon: 'fa-cash-register' },
    { path: '/banka', label: t('sidebar.bank'), icon: 'fa-building-columns' },
    { path: '/cek-senet', label: t('sidebar.checks'), icon: 'fa-money-check' },
  ];

  return (
    <nav style={{ 
        width: isCollapsed ? '80px' : '260px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1001,
        background: '#1e2d40',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)'
    }}>
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img src={logo} alt="L" style={{ height: '32px' }} />
        {!isCollapsed && <span style={{ color: '#fff', fontWeight: 'bold' }}>MAKFA</span>}
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 14px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path} style={{ marginBottom: '4px' }}>
                <Link to={item.path} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px 16px',
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)', 
                    textDecoration: 'none',
                    borderRadius: '12px',
                    background: active ? '#4f46e5' : 'transparent',
                    transition: 'all 0.2s'
                }}>
                  <i className={`fa-solid ${item.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ padding: '20px 14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={handleLogout} style={{ 
            width: '100%', 
            padding: '12px',
            background: 'rgba(239,68,68,0.1)', 
            color: '#fca5a5', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '12px'
        }}>
          <i className="fa-solid fa-right-from-bracket"></i>
          {!isCollapsed && <span>{t('sidebar.logout') || 'Çıkış Yap'}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;