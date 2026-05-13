import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const StatCard = ({ title, value, icon, trend, color }) => {
  const { t } = useLanguage();
  const trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#64748b';
  const trendBg = trend === 'up' ? '#ecfdf5' : trend === 'down' ? '#fef2f2' : '#f8fafc';
  const trendLabel = trend === 'up' ? `▲ ${t('trend_up')}` : trend === 'down' ? `▼ ${t('trend_down')}` : `● ${t('trend_stable')}`;
  const iconBg = color ? color + '15' : '#eef2ff';
  const iconColor = color || '#4f46e5';

  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: iconBg, display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0,
          boxShadow: `0 8px 16px -4px ${iconBg}`
        }}>
          <i className={`fa-solid ${icon}`} style={{ fontSize: '20px', color: iconColor }}></i>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: '800', color: trendColor,
          background: trendBg, padding: '5px 10px', borderRadius: '20px',
          letterSpacing: '0.02em', border: `1px solid ${trend === 'up' ? '#d1fae5' : trend === 'down' ? '#fee2e2' : '#e2e8f0'}`
        }}>
          {trendLabel}
        </span>
      </div>
      <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
        {title}
      </div>
      <div style={{ fontSize: '28px', fontWeight: '900', color: '#111827', letterSpacing: '-0.03em' }}>
        {value}
      </div>
      {/* Decorative background element */}
      <div style={{ 
          position: 'absolute', bottom: '-15px', right: '-15px', width: '60px', height: '60px', 
          background: iconBg, borderRadius: '50%', opacity: 0.3, filter: 'blur(20px)' 
      }}></div>
    </div>
  );
};

export const ModuleCard = ({ title, icon, link, color }) => {
  const { t } = useLanguage();
  const iconBg = color ? color + '12' : '#eef2ff';
  const iconColor = color || '#4f46e5';

  return (
    <Link to={link} className="module-card">
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px',
        background: iconBg, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
        border: `1px solid ${color ? color + '20' : '#e2e8f0'}`
      }}>
        <i className={`fa-solid ${icon}`} style={{ fontSize: '18px', color: iconColor }}></i>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '15px', fontWeight: '800', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
          {title}
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {t('go_to_module')}
        </div>
      </div>
      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px', color: '#94a3b8' }}></i>
      </div>
    </Link>
  );
};
