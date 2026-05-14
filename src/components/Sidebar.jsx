import { useTranslation } from 'react-i18next'; // En üste ekle

// Sidebar fonksiyonu içine:
const { t } = useTranslation();

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

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    { path: '/', label: t('sidebar.dashboard'), icon: 'fa-house' }, // 'home' yerine 'sidebar.dashboard'
    { path: '/satis-yap', label: t('sidebar.sales'), icon: 'fa-cart-shopping' },
    { path: '/cari-hesaplar', label: t('sidebar.customers'), icon: 'fa-users' },
    { path: '/stok-kartlari', label: t('sidebar.stocks'), icon: 'fa-boxes-stacked' },
    // ... diğerleri için de 'sidebar.' önekini ekle
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
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        borderRight: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* Logo Area */}
      <div style={{ 
          padding: isCollapsed ? '20px 0' : '24px 20px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: '14px',
          minHeight: '80px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'rgba(255,255,255,0.05)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <img src={logo} alt="L" style={{ height: '24px', objectFit: 'contain', filter: 'brightness(1.5)' }} />
        </div>
        {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>MAKFA</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>Enterprise</span>
            </div>
        )}
      </div>
      
      {/* Menu Items */}
      <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden',
          padding: '20px 14px',
          scrollbarWidth: 'none'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link to={item.path} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: isCollapsed ? '12px' : '12px 16px',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    color: active ? '#fff' : 'rgba(255,255,255,0.5)', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: active ? '700' : '500',
                    borderRadius: '12px',
                    background: active ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : 'transparent',
                    boxShadow: active ? '0 4px 12px rgba(79, 70, 229, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                }}>
                  <i className={`fa-solid ${item.icon}`} style={{ 
                      fontSize: '18px', 
                      width: '20px', 
                      textAlign: 'center',
                      color: active ? '#fff' : 'inherit'
                  }}></i>
                  {!isCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>}
                  {active && !isCollapsed && (
                      <div style={{ 
                          position: 'absolute', right: '8px', width: '5px', height: '5px', 
                          borderRadius: '50%', background: '#fff', opacity: 0.8 
                      }}></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer / User Area */}
      <div style={{ 
          padding: '20px 14px', 
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.1)'
      }}>
        {!isCollapsed && (
            <div style={{ 
                padding: '12px 14px', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '12px',
                marginBottom: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{t('oturum_acik')}</div>
                <div style={{ fontSize: '14px', color: '#fff', fontWeight: '700' }}>{t('yonetici')}</div>
            </div>
        )}
        <button onClick={handleLogout} style={{ 
            width: '100%', 
            padding: '12px',
            background: 'rgba(239,68,68,0.1)', 
            color: '#fca5a5', 
            border: '1px solid rgba(239,68,68,0.15)', 
            borderRadius: '12px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '12px',
            fontWeight: '700',
            fontSize: '13px',
            transition: 'all 0.2s ease',
            outline: 'none'
        }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'} 
           onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>
          <i className="fa-solid fa-right-from-bracket"></i>
          {!isCollapsed && <span>{t('logout')}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
