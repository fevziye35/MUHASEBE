import React, { useState } from 'react';
import logo from '../assets/logo.png';

const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') { // Default pin for lock screen
      onUnlock();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(26, 45, 76, 0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      color: 'white'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src={logo} alt="MAKFA" style={{ width: '150px', marginBottom: '10px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: '300' }}>Sistem Kilitli</h2>
        <p style={{ opacity: 0.7 }}>Devam etmek için şifrenizi girin</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <input 
          type="password" 
          placeholder="Şifre (Varsayılan: 1234)" 
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          autoFocus
          style={{
            padding: '15px',
            borderRadius: '8px',
            border: error ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            textAlign: 'center',
            fontSize: '18px',
            outline: 'none',
            transition: '0.3s'
          }}
        />
        {error && <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center' }}>Hatalı şifre, tekrar deneyin.</p>}
        <button type="submit" style={{
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          background: '#3b82f6',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Sistemi Aç
        </button>
      </form>

      <div style={{ marginTop: '40px', fontSize: '14px', opacity: 0.5 }}>
        {new Date().toLocaleTimeString()} | MAKFA Accounting System
      </div>
    </div>
  );
};

export default LockScreen;
