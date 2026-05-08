import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const StatCard = ({ title, value, icon, trend, color }) => {
  const { t } = useLanguage();
  const trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#9ca3af';
  const trendBg = trend === 'up' ? '#ecfdf5' : trend === 'down' ? '#fef2f2' : '#f3f4f6';
  const trendLabel = trend === 'up' ? `▲ ${t('trend_up')}` : trend === 'down' ? `▼ ${t('trend_down')}` : `● ${t('trend_stable')}`;
  const iconBg = color ? color + '15' : '#eef2ff';
  const iconColor = color || '#4f46e5';

  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: iconBg, display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexShrink: 0
        }}>
          <i className={`fa-solid ${icon}`} style={{ fontSize: '18px', color: iconColor }}></i>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: '700', color: trendColor,
          background: trendBg, padding: '4px 8px', borderRadius: '20px'
        }}>
          {trendLabel}
        </span>
      </div>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7a8d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
        {title}
      </div>
      <div style={{ fontSize: '26px', fontWeight: '800', color: '#1a2332', letterSpacing: '-0.02em' }}>
        {value}
      </div>
    </div>
  );
};

export const ModuleCard = ({ title, icon, link, color }) => {
  const { t } = useLanguage();
  const iconBg = color ? color + '15' : '#eef2ff';
  const iconColor = color || '#4f46e5';

  return (
    <Link to={link} className="module-card">
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: iconBg, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0
      }}>
        <i className={`fa-solid ${icon}`} style={{ fontSize: '17px', color: iconColor }}></i>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1a2332', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </div>
        <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '500', marginTop: '1px' }}>
          {t('go_to_module')}
        </div>
      </div>
      <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px', color: '#cbd5e1', flexShrink: 0 }}></i>
    </Link>
  );
};
