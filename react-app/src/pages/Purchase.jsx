import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Purchase = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('customers')) || [];
        let filtered = stored;
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            filtered = stored.filter(c => 
                (c.name || '').toLowerCase().includes(lower) || 
                (c.authorized || '').toLowerCase().includes(lower)
            );
        }
        setCustomers(filtered);
    }, [searchTerm]);

    const handleSelectVendor = (id) => {
        navigate(`/alis-faturasi?cari_id=${id}`);
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-40px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#c7d2fe', letterSpacing: '0.1em', marginBottom: '8px' }}>TEDARİK & SATIN ALMA SİSTEMİ</div>
                    <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Tedarikçi Seçimi Yapın</h1>
                    <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: '18px' }}>Yeni bir alış faturası veya mal kabulü başlatmak için tedarikçinizi seçin.</p>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Search Bar Terminal */}
                <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <div style={{ position: 'relative' }}>
                        <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '25px', top: '50%', transform: 'translateY(-50%)', color: '#6366f1', fontSize: '20px' }}></i>
                        <input 
                            type="text" 
                            className="input-modern" 
                            placeholder="Tedarikçi firma adı, yetkili ismi veya cari kod ile hızlı arama yapın..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', height: '64px', paddingLeft: '65px', fontSize: '18px', fontWeight: '600', borderRadius: '20px', background: '#f8fafc' }}
                        />
                    </div>
                </div>

                {/* Vendor Vitrine Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
                    {customers.length > 0 ? (
                        customers.map((c) => (
                            <div 
                                key={c.id} 
                                className="main-content-card" 
                                style={{ 
                                    padding: '30px', 
                                    background: 'white', 
                                    borderRadius: '24px', 
                                    border: '1px solid #f1f5f9', 
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onClick={() => handleSelectVendor(c.id)}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 25px 40px -15px rgba(67, 56, 202, 0.15)';
                                    e.currentTarget.style.borderColor = '#c7d2fe';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                                    <div style={{ 
                                        width: '64px', 
                                        height: '64px', 
                                        background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', 
                                        color: '#4338ca', 
                                        borderRadius: '18px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontSize: '24px',
                                        fontWeight: '900'
                                    }}>
                                        {c.name ? c.name.charAt(0).toUpperCase() : 'T'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name || 'Belirtilmemiş'}</h3>
                                        <div style={{ fontSize: '13px', color: '#6366f1', fontWeight: '700', marginTop: '4px' }}>{c.group || 'TEDARİKÇİ'}</div>
                                    </div>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>YETKİLİ</span>
                                        <span style={{ fontSize: '12px', color: '#475569', fontWeight: '800' }}>{c.authorized || '-'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>BAKİYE</span>
                                        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '900' }}>{c.bakiye || '0,00 ₺'}</span>
                                    </div>
                                </div>

                                <button className="btn" style={{ 
                                    width: '100%', 
                                    height: '48px', 
                                    background: '#f1f5f9', 
                                    color: '#1e1b4b', 
                                    borderRadius: '14px', 
                                    fontWeight: '800', 
                                    border: 'none', 
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}>
                                    Alış İşlemi Başlat <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', padding: '100px', textAlign: 'center' }}>
                            <div style={{ fontSize: '60px', color: '#e2e8f0', marginBottom: '20px' }}><i className="fa-solid fa-user-slash"></i></div>
                            <h3 style={{ color: '#94a3b8', fontSize: '20px' }}>Aradığınız kriterde tedarikçi bulunamadı.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Purchase;
