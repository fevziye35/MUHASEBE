import React, { useState, useRef, useEffect } from 'react';
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

  // Close menus when clicking outside
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
    switch (l) {
      case 'tr': return 'Türkçe';
      case 'en': return 'English';
      case 'de': return 'Deutsch';
      case 'ru': return 'Русский';
      case 'zh': return '中文';
      default: return 'Language';
    }
  };

  const getLangIcon = (l) => {
    return l === 'en' ? 'fa-flag-usa' : 'fa-flag';
  };

  return (
    <header className="header" style={{
        position: 'fixed',
        top: 0,
        left: isSidebarCollapsed ? '72px' : '260px',
        right: 0,
        height: '64px',
        background: '#1a4189', // Match static header blue
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 900,
        transition: 'left 0.25s ease',
        color: '#fff'
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center' }} onClick={onToggleSidebar}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px' }}>
          MAKFA GIDA ÜRÜNLERİ SANAYİ TİCARET ANONİM ŞİRKETİ
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', fontWeight: '500' }}>
        
        {/* Language Dropdown */}
        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.stopPropagation(); setLangMenuOpen(!langMenuOpen); setBranchMenuOpen(false); setUserMenuOpen(false); }}>
            <i className={`fa-solid ${getLangIcon(lang)}`}></i> <span>{getLangName(lang)}</span>
            {langMenuOpen && (
                <div style={{
                    position: 'absolute', top: '40px', right: 0, background: '#fff', color: '#1a2332', 
                    borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: '8px 0', minWidth: '160px', zIndex: 1000
                }}>
                    <div className="dropdown-item" onClick={() => changeLanguage('tr')} style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-flag" style={{width: '24px'}}></i> Türkçe</div>
                    <div className="dropdown-item" onClick={() => changeLanguage('en')} style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-flag-usa" style={{width: '24px'}}></i> English</div>
                    <div className="dropdown-item" onClick={() => changeLanguage('de')} style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-flag" style={{width: '24px'}}></i> Deutsch</div>
                    <div className="dropdown-item" onClick={() => changeLanguage('ru')} style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-flag" style={{width: '24px'}}></i> Русский</div>
                    <div className="dropdown-item" onClick={() => changeLanguage('zh')} style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-flag" style={{width: '24px'}}></i> 中文</div>
                </div>
            )}
        </div>

        {/* Back Button */}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => navigate(-1)}>
            <i className="fa-solid fa-reply"></i> <span>{t('back')}</span>
        </div>

        {/* Lock Screen */}
        <div style={{ cursor: 'pointer' }} title={t('lock')} onClick={() => navigate('/kilit_ekrani.html')}>
            <i className="fa-solid fa-lock"></i>
        </div>

        {/* Info */}
        <div style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-circle-info"></i>
        </div>

        {/* Branch Selector */}
        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.stopPropagation(); setBranchMenuOpen(!branchMenuOpen); setLangMenuOpen(false); setUserMenuOpen(false); }}>
            <i className="fa-solid fa-building"></i> <span>{currentBranch?.name || t('branch')}</span>
            {branchMenuOpen && (
                <div style={{
                    position: 'absolute', top: '40px', right: 0, background: '#fff', color: '#1a2332', 
                    borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: '8px 0', minWidth: '160px', zIndex: 1000
                }}>
                    {branches.map(b => (
                        <div key={b.id} onClick={() => changeBranch(b.id)} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                            {b.name}
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Agenda */}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => navigate('/ajanda')}>
            <i className="fa-solid fa-calendar-days"></i> 2026
        </div>

        {/* User */}
        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); setLangMenuOpen(false); setBranchMenuOpen(false); }}>
            <i className="fa-solid fa-user"></i> <span>fevziye.mamak35@gmail.com</span>
            {userMenuOpen && (
                <div style={{
                    position: 'absolute', top: '40px', right: 0, background: '#fff', color: '#1a2332', 
                    borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: '8px 0', minWidth: '180px', zIndex: 1000
                }}>
                    <div style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-user-gear" style={{width: '24px'}}></i> Profilim</div>
                    <div style={{ padding: '8px 16px', cursor: 'pointer' }}><i className="fa-solid fa-people-arrows" style={{width: '24px'}}></i> Kullanıcı Değiştir</div>
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e8ecf0' }} />
                    <div style={{ padding: '8px 16px', cursor: 'pointer', color: '#ef4444' }}><i className="fa-solid fa-right-from-bracket" style={{width: '24px'}}></i> {t('logout')}</div>
                </div>
            )}
        </div>

      </div>
    </header>
  );
};

export default Header;
