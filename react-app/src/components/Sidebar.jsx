import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/logo.png';

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const location = useLocation();

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    if (window.confirm(t('logout_confirm'))) {
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/', label: t('home'), icon: 'fa-house' },
    { path: '/satis-yap', label: t('sales'), icon: 'fa-cart-shopping' },
    { path: '/cari-hesaplar', label: t('customers'), icon: 'fa-users' },
    { path: '/stok-kartlari', label: t('stocks'), icon: 'fa-boxes-stacked' },
    { path: '/faturalar', label: t('invoices'), icon: 'fa-file-invoice' },
    { path: '/gelir-gider', label: t('income_expense'), icon: 'fa-chart-line' },
    { path: '/kasa', label: t('cash'), icon: 'fa-cash-register' },
    { path: '/banka', label: t('bank'), icon: 'fa-building-columns' },
    { path: '/cek-senet', label: t('checks'), icon: 'fa-money-check' },
    { path: '/taksit-takip', label: t('installments'), icon: 'fa-calendar-days' },
    { path: '/teklif-siparis', label: t('quotes'), icon: 'fa-file-contract' },
    { path: '/doviz-ayarlari', label: t('currency'), icon: 'fa-dollar-sign' },
    { path: '/raporlar', label: t('reports'), icon: 'fa-file-lines' },
    { path: '/mesajlar', label: t('messages'), icon: 'fa-envelope' },
    { path: '/moduller', label: t('modules'), icon: 'fa-layer-group' },
  ];

  return (
    <nav style={{ 
        width: isCollapsed ? '72px' : '260px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        background: '#1e2d40',
        transition: 'width 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
    }}>
      {/* Logo */}
      <div style={{ 
          padding: isCollapsed ? '24px 0' : '28px 24px', 
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: '12px',
          minHeight: '80px'
      }}>
        <img src={logo} alt="MAKFA" style={{ height: '36px', objectFit: 'contain', filter: 'brightness(2)', flexShrink: 0 }} />
        {!isCollapsed && <span style={{ fontSize: '16px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>Makfa</span>}
      </div>
      
      {/* Nav items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link to={item.path} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: isCollapsed ? '10px' : '10px 14px',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    color: active ? '#fff' : 'rgba(255,255,255,0.55)', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: active ? '600' : '500',
                    borderRadius: '8px',
                    background: active ? '#4f46e5' : 'transparent',
                    transition: 'all 0.15s ease'
                }}>
                  <i className={`fa-solid ${item.icon}`} style={{ fontSize: '16px', flexShrink: 0 }}></i>
                  {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {!isCollapsed && (
            <div style={{ 
                padding: '12px 14px', 
                background: 'rgba(255,255,255,0.06)', 
                borderRadius: '8px',
                marginBottom: '8px'
            }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', marginBottom: '2px' }}>Oturum Açık</div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>Yönetici</div>
            </div>
        )}
        <button onClick={handleLogout} style={{ 
            width: '100%', 
            padding: isCollapsed ? '10px' : '10px 14px',
            background: 'rgba(239,68,68,0.1)', 
            color: '#fca5a5', 
            border: '1px solid rgba(239,68,68,0.2)', 
            borderRadius: '8px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '10px',
            fontWeight: '600',
            fontSize: '13px',
            fontFamily: 'inherit'
        }}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          {!isCollapsed && <span>{t('logout')}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
