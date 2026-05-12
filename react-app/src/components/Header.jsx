import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBranch } from '../context/BranchContext';

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { t, changeLanguage, lang } = useLanguage();
  const { currentBranch, branches, changeBranch } = useBranch();
  const navigate = useNavigate();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setLangMenuOpen(false);
      setBranchMenuOpen(false);
      setUserMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getLangName = (l) => {
    const names = { 'tr': 'Türkçe', 'en': 'English', 'de': 'Deutsch', 'ru': 'Русский', 'zh': '中文' };
    return names[l] || 'Language';
  };

  const getLangIcon = (l) => {
    return l === 'en' ? 'fa-flag-usa' : 'fa-flag';
  };

  return (
    <header style={{
        position: 'fixed',
        top: 0,
        left: isSidebarCollapsed ? '80px' : '260px',
        right: 0,
        height: '72px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSidebar(); }}
          style={{ 
            background: '#f3f4f6', 
            border: 'none', 
            width: '40px', 
            height: '40px', 
            borderRadius: '10px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4b5563',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
          onMouseOut={(e) => e.currentTarget.style.background = '#f3f4f6'}
        >
          <i className={`fa-solid ${isSidebarCollapsed ? 'fa-indent' : 'fa-outdent'}`} style={{ fontSize: '18px' }}></i>
        </button>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#1a2332', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          MAKFA GIDA ÜRÜNLERİ SANAYİ TİCARET A.Ş.
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Language */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={(e) => { e.stopPropagation(); setLangMenuOpen(!langMenuOpen); setBranchMenuOpen(false); setUserMenuOpen(false); }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 14px', 
              borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0',
              fontSize: '13px', fontWeight: '700', color: '#475569'
            }}
          >
            <i className={`fa-solid ${getLangIcon(lang)}`} style={{ color: '#4f46e5' }}></i>
            <span>{getLangName(lang)}</span>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', opacity: 0.5 }}></i>
          </div>
          {langMenuOpen && (
            <div style={{
              position: 'absolute', top: '48px', right: 0, background: '#fff', borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '8px', minWidth: '160px', border: '1px solid #f0f2f5'
            }}>
              {['tr', 'en', 'de', 'ru', 'zh'].map(l => (
                <div key={l} className="dropdown-item" onClick={() => changeLanguage(l)} style={{ 
                  padding: '10px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '10px', color: lang === l ? '#4f46e5' : '#475569',
                  background: lang === l ? '#f5f7ff' : 'transparent'
                }}>
                  <i className={`fa-solid ${getLangIcon(l)}`} style={{ width: '16px' }}></i> {getLangName(l)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Branch Selector */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={(e) => { e.stopPropagation(); setBranchMenuOpen(!branchMenuOpen); setLangMenuOpen(false); setUserMenuOpen(false); }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 14px', 
              borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0',
              fontSize: '13px', fontWeight: '700', color: '#475569'
            }}
          >
            <i className="fa-solid fa-building" style={{ color: '#f59e0b' }}></i>
            <span>{currentBranch?.name || t('branch')}</span>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', opacity: 0.5 }}></i>
          </div>
          {branchMenuOpen && (
            <div style={{
              position: 'absolute', top: '48px', right: 0, background: '#fff', borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '8px', minWidth: '180px', border: '1px solid #f0f2f5'
            }}>
              {branches.map(b => (
                <div key={b.id} onClick={() => changeBranch(b.id)} style={{ 
                  padding: '10px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                  color: currentBranch?.id === b.id ? '#f59e0b' : '#475569',
                  background: currentBranch?.id === b.id ? '#fffbeb' : 'transparent'
                }}>
                  {b.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => navigate(-1)} style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', color: '#475569' }}>
                <i className="fa-solid fa-reply"></i>
            </button>
            <button onClick={() => navigate('/ajanda')} style={{ padding: '0 14px', height: '40px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700' }}>
                <i className="fa-solid fa-calendar-days" style={{ color: '#ec4899' }}></i> <span>2026</span>
            </button>
        </div>

        {/* User Menu */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); setLangMenuOpen(false); setBranchMenuOpen(false); }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '6px', 
              borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0',
              paddingRight: '14px'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <i className="fa-solid fa-user" style={{ fontSize: '14px' }}></i>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1a2332' }}>Admin</span>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', opacity: 0.5 }}></i>
          </div>
          {userMenuOpen && (
            <div style={{
              position: 'absolute', top: '56px', right: 0, background: '#fff', borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)', padding: '10px', minWidth: '220px', border: '1px solid #f0f2f5'
            }}>
                <div style={{ padding: '12px 14px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#1a2332' }}>Fevziye Mamak</div>
                    <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '500' }}>fevziye.mamak35@gmail.com</div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #f0f2f5', margin: '0 0 8px' }} />
                <div style={{ padding: '10px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}><i className="fa-solid fa-user-gear" style={{width: '18px'}}></i> {t('profile')}</div>
                <div style={{ padding: '10px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px', color: '#475569' }}><i className="fa-solid fa-people-arrows" style={{width: '18px'}}></i> {t('switch_user')}</div>
                <hr style={{ border: 'none', borderTop: '1px solid #f0f2f5', margin: '8px 0' }} />
                <div style={{ padding: '10px 14px', cursor: 'pointer', borderRadius: '8px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }} onClick={() => { if(window.confirm(t('logout_confirm'))) navigate('/login'); }}>
                    <i className="fa-solid fa-right-from-bracket" style={{width: '18px'}}></i> {t('logout')}
                </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
