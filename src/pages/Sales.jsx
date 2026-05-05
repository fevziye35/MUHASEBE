import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Sales = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadCustomers();
    }, [searchTerm]);

    const loadCustomers = () => {
        const rawStored = localStorage.getItem('customers');
        let stored = [];
        if (rawStored === null) {
            stored = [
                { id: 1, name: 'Aydın Ertop Perakende', authorized: 'Aydın Bey', email: 'aydin@example.com', taxNo: '1234567890', address: 'İstanbul' },
                { id: 2, name: 'Global Lojistik A.Ş.', authorized: 'Fevziye Hanım', email: 'fevziye@example.com', taxNo: '0987654321', address: 'İzmir' }
            ];
            localStorage.setItem('customers', JSON.stringify(stored));
        } else {
            stored = JSON.parse(rawStored) || [];
        }
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            stored = stored.filter(c => (c.name || '').toLowerCase().includes(lower) || (c.authorized || '').toLowerCase().includes(lower));
        }
        setCustomers(stored);
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const stored = JSON.parse(localStorage.getItem('customers')) || [];
            const updated = stored.filter(c => c.id !== showDeleteConfirm);
            localStorage.setItem('customers', JSON.stringify(updated));
            loadCustomers();
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Sale Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                             <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(10px)' }}>
                                <i className="fa-solid fa-basket-shopping"></i>
                             </div>
                             <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Satış Terminali</h1>
                        </div>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '18px', fontWeight: '500' }}>İşlem başlatmak için listeden bir cari (müşteri) seçin veya yenisini oluşturun.</p>
                    </div>
                    <div>
                         <button className="btn" style={{ background: 'white', color: '#4338ca', fontWeight: '800', borderRadius: '14px', height: '52px', padding: '0 30px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => navigate('/cari-yeni')}>
                            <i className="fa-solid fa-user-plus"></i> Yeni Müşteri Tanımla
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-50px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Search & Filter Bar */}
                <div className="main-content-card" style={{ padding: '25px 35px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.07)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px' }}></i>
                        <input className="input-modern" placeholder="Müşteri adı, ünvan veya yetkili ismi ile anlık ara..." style={{ paddingLeft: '55px', height: '56px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9' }} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#94a3b8', background: '#f1f5f9', padding: '10px 20px', borderRadius: '12px' }}>
                        {customers.length} Kayıt Bulundu
                    </div>
                </div>

                {/* Customers Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '25px' }}>
                    {customers.map(c => (
                        <div key={c.id} className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', transition: '0.3s', cursor: 'pointer', position: 'relative', overflow: 'hidden' }} onClick={() => navigate(`/satis-faturasi?cari_id=${c.id}`)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#e0e7ff', color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800' }}>
                                    {c.name?.substring(0, 2).toUpperCase()}
                                </div>
                                <button className="btn-icon delete" style={{ background: '#fef2f2', color: '#ef4444' }} onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(c.id); }}><i className="fa-solid fa-trash-can"></i></button>
                            </div>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>{c.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>
                                <i className="fa-solid fa-user-tie" style={{ color: '#94a3b8' }}></i> {c.authorized || 'Yetkili Belirtilmemiş'}
                            </div>
                            <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '16px', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fa-solid fa-map-location-dot"></i> {c.address || 'Adres Kaydı Yok'}
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                 <span style={{ fontSize: '13px', fontWeight: '800', color: '#4338ca', display: 'flex', alignItems: 'center', gap: '8px' }}>SATIŞI BAŞLAT <i className="fa-solid fa-arrow-right-long"></i></span>
                            </div>
                        </div>
                    ))}
                </div>

                {customers.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px', background: 'white', borderRadius: '32px' }}>
                        <i className="fa-solid fa-user-slash" style={{ fontSize: '60px', color: '#f1f5f9', marginBottom: '20px' }}></i>
                        <h2 style={{ color: '#94a3b8' }}>Aradığınız müşteri bulunamadı.</h2>
                        <button className="btn" style={{ marginTop: '20px', background: '#4338ca', color: 'white', borderRadius: '12px' }} onClick={() => navigate('/cari-yeni')}>Yeni Cari Oluştur</button>
                    </div>
                )}
            </div>

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-user-xmark"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Cariyi Kaldır?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu müşteriyi listeden sildiğinizde geçmiş satış kayıtları etkilenmez ancak yeni satış başlatılamaz. Devam edilsin mi?</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={confirmDelete}>Evet, Sil</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sales;
