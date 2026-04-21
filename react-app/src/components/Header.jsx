import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBranch } from '../context/BranchContext';

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { t, changeLanguage, lang } = useLanguage();
  const { currentBranch, branches, changeBranch } = useBranch();
  const navigate = useNavigate();

  return (
    <header style={{ 
        position: 'fixed',
        top: 0,
        left: isSidebarCollapsed ? '72px' : '260px',
        right: 0,
        height: '64px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        zIndex: 900,
        borderBottom: '1px solid #e8ecf0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'left 0.25s ease'
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={onToggleSidebar} style={{ 
            background: 'none', border: 'none', color: '#6b7a8d', cursor: 'pointer', 
            width: '36px', height: '36px', borderRadius: '8px', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', fontSize: '18px',
            transition: 'background 0.15s ease'
        }}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <button onClick={() => navigate(-1)} style={{ 
            background: 'none', border: '1px solid #e8ecf0', color: '#6b7a8d', 
            cursor: 'pointer', fontSize: '13px', fontWeight: '600', 
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '8px', fontFamily: 'inherit',
            transition: 'all 0.15s ease'
        }}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: '11px' }}></i> Geri
        </button>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Branch Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8f9fb', padding: '8px 14px', borderRadius: '8px', border: '1px solid #e8ecf0' }}>
            <i className="fa-solid fa-building" style={{ color: '#4f46e5', fontSize: '13px' }}></i>
            <select 
                value={currentBranch?.id} 
                onChange={(e) => changeBranch(e.target.value)}
                style={{ background: 'none', border: 'none', color: '#1a2332', fontSize: '13px', fontWeight: '600', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}
            >
                {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                ))}
            </select>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e8ecf0' }}></div>

        {/* Notifications */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7a8d', fontSize: '18px', display: 'flex', position: 'relative' }}>
            <i className="fa-regular fa-bell"></i>
        </button>

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a2332', lineHeight: 1.2 }}>Yönetici</div>
                <div style={{ fontSize: '11px', color: '#6b7a8d', fontWeight: '500' }}>Süper Admin</div>
            </div>
            <div style={{ 
                width: '38px', height: '38px', borderRadius: '10px', 
                background: '#4f46e5', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px'
            }}>
                SA
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
