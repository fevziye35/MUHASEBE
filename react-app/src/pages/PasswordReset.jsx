import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Güvenli bağlantı e-posta adresinize iletildi.");
            navigate('/login');
        }, 2000);
    };

    return (
        <div style={{ 
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Abstract Lighting Elements */}
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', borderRadius: '50%' }}></div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '24px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <i className="fa-solid fa-shield-keyhole" style={{ fontSize: '36px', color: '#6366f1' }}></i>
                    </div>
                    <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '900', color: 'white', letterSpacing: '-0.04em' }}>Güvenlik Doğrulaması</h1>
                    <p style={{ margin: '10px 0 0', color: '#94a3b8', fontSize: '16px' }}>Lütfen kayıtlı e-posta adresinizi giriniz.</p>
                </div>

                <div style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    backdropFilter: 'blur(20px)', 
                    padding: '50px 40px', 
                    borderRadius: '35px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' 
                }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#6366f1', marginBottom: '10px', letterSpacing: '0.05em' }}>DOĞRULAMA E-POSTASI</label>
                            <div style={{ position: 'relative' }}>
                                <i className="fa-solid fa-paper-plane" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}></i>
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
                            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '15px', lineHeight: '1.5' }}>
                                Şifrenizi güvenli bir şekilde belirlemeniz için bu adrese tek kullanımlık sistem erişim anahtarı gönderilecektir.
                            </p>
                        </div>

                        <button type="submit" disabled={loading} style={{ 
                            width: '100%', padding: '18px', background: loading ? '#334155' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                            color: 'white', border: 'none', borderRadius: '18px', fontSize: '15px', fontWeight: '800', 
                            cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            boxShadow: '0 10px 20px rgba(99,102,241,0.2)', transition: '0.3s'
                        }}>
                            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "ERİŞİM ANAHTARI GÖNDER"}
                        </button>
                        
                        <button type="button" onClick={() => navigate('/login')} style={{ width: '100%', marginTop: '20px', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '700' }}>
                            Giriş Ekranına Geri Dön
                        </button>
                    </form>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <div style={{ color: '#475569', fontSize: '11px', fontWeight: '800', letterSpacing: '0.2em' }}>SİSTEM GÜVENLİĞİ ÜST SEVİYEDE AKTİF</div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
