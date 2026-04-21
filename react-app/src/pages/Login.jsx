import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Abstract Background Elements */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', borderRadius: '50%' }}></div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px', padding: '0 20px' }}>
                {/* Brand Logo / Title */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '24px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                        <i className="fa-solid fa-gem" style={{ fontSize: '36px', color: '#6366f1' }}></i>
                    </div>
                    <h1 style={{ margin: 0, fontSize: '38px', fontWeight: '900', color: 'white', letterSpacing: '-0.04em' }}>MAKFA <span style={{ color: '#6366f1' }}>Portal</span></h1>
                    <p style={{ margin: '10px 0 0', color: '#94a3b8', fontSize: '18px', fontWeight: '500' }}>İşletmenizin Dijital Karargahı</p>
                </div>

                {/* Glass Login Card */}
                <div style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    backdropFilter: 'blur(20px)', 
                    padding: '50px 40px', 
                    borderRadius: '35px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' 
                }}>
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#6366f1', marginBottom: '10px', letterSpacing: '0.05em' }}>E-POSTA ADRESİ</label>
                            <div style={{ position: 'relative' }}>
                                <i className="fa-solid fa-at" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}></i>
                                <input 
                                    type="email" 
                                    className="input-modern"
                                    placeholder="ad@makfaglobal.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ 
                                        width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255,255,255,0.05)', 
                                        border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '16px', fontSize: '15px'
                                    }}
                                    required 
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#6366f1', marginBottom: '10px', letterSpacing: '0.05em' }}>SİSTEM ŞİFRESİ</label>
                            <div style={{ position: 'relative' }}>
                                <i className="fa-solid fa-lock-keyhole" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}></i>
                                <input 
                                    type="password" 
                                    className="input-modern"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ 
                                        width: '100%', padding: '16px 20px 16px 50px', background: 'rgba(255,255,255,0.05)', 
                                        border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '16px', fontSize: '15px'
                                    }}
                                    required 
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                             <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#6366f1' }} /> Beni Hatırla
                             </label>
                             <span onClick={() => navigate('/password-reset')} style={{ color: '#6366f1', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Şifremi Unuttum</span>
                        </div>

                        <button type="submit" style={{ 
                            width: '100%', padding: '18px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                            color: 'white', border: 'none', borderRadius: '18px', fontSize: '16px', fontWeight: '800', 
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            boxShadow: '0 10px 20px rgba(99,102,241,0.3)', transition: '0.3s'
                        }}>
                            SİSTEME GİRİŞ YAP <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </form>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <div style={{ color: '#475569', fontSize: '11px', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase' }}>© 2026 MAKFA GIDA ÜRÜNLERİ SANAYİ TİCARET A.Ş.</div>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#10b981', fontSize: '12px', fontWeight: '700' }}>
                        <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}></div> SÜREÇLER OPTİMİZE EDİLDİ
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
