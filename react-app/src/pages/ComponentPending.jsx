import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComponentPending = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px solid #ddd', margin: '40px' }}>
      <div style={{ fontSize: '60px', color: '#1f3a60', marginBottom: '20px' }}>
        <i className="fa-solid fa-person-digging"></i>
      </div>
      <h2 style={{ color: '#333' }}>{title || 'Sayfa Hazırlanıyor'}</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>Bu modül React mimarisine taşınma sürecindedir. Çok yakında aktif edilecektir.</p>
      <button 
        onClick={() => navigate(-1)} 
        style={{ padding: '10px 25px', background: '#1f3a60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        <i className="fa-solid fa-arrow-left"></i> Geri Dön
      </button>
    </div>
  );
};

export default ComponentPending;
