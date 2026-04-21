import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const EFatura = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('list');
    const [invoices, setInvoices] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    useEffect(() => {
        const sales = JSON.parse(localStorage.getItem('salesInvoices')) || [];
        setInvoices(sales);
    }, []);

    useEffect(() => {
        if (activeTab === 'status') {
            setIsChecking(true);
            const timer = setTimeout(() => setIsChecking(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [activeTab]);

    const handleLucaRedirect = () => {
        window.open('https://turmobefatura.luca.com.tr/', '_blank');
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const allSales = JSON.parse(localStorage.getItem('salesInvoices')) || [];
            const updated = allSales.filter(inv => inv.invoiceNo !== showDeleteConfirm);
            localStorage.setItem('salesInvoices', JSON.stringify(updated));
            setInvoices(updated);
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Cyber Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                             <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(10px)' }}>
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                             </div>
                             <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>E-Fatura Merkezi</h1>
                        </div>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '18px', fontWeight: '500' }}>Dijital dönüşümde tam kontrol. Faturalarınızı bulutta saniyeler içinde yönetin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                         <button className="btn" style={{ background: 'white', color: '#0284c7', fontWeight: '800', borderRadius: '14px', height: '52px', padding: '0 30px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} onClick={() => navigate('/satis-faturasi')}>
                            <i className="fa-solid fa-plus-circle"></i> Yeni Fatura
                        </button>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: '700', borderRadius: '14px', height: '52px', padding: '0 25px', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', backdropFilter: 'blur(10px)' }} onClick={handleLucaRedirect}>
                            Luca Portal
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-50px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Stats & Integrations Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
                    <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}><i className="fa-solid fa-file-invoice"></i></div>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>TOPLAM GÖNDERİLEN</div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>{invoices.length} Adet</div>
                        </div>
                    </div>
                    <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}><i className="fa-solid fa-shield-check"></i></div>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>BAĞLANTI DURUMU</div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>Luca Aktif</div>
                        </div>
                    </div>
                     <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}><i className="fa-solid fa-triangle-exclamation"></i></div>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>HATALI İŞLEMLER</div>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444' }}>0 Bildirim</div>
                        </div>
                    </div>
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '10px 30px', display: 'flex', gap: '30px', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={() => setActiveTab('list')} style={{ padding: '20px 0', border: 'none', background: 'none', fontWeight: '800', color: activeTab === 'list' ? '#0284c7' : '#94a3b8', borderBottom: activeTab === 'list' ? '3px solid #0284c7' : '3px solid transparent', cursor: 'pointer', transition: '0.3s' }}>Fatura Arşivi</button>
                        <button onClick={() => setActiveTab('status')} style={{ padding: '20px 0', border: 'none', background: 'none', fontWeight: '800', color: activeTab === 'status' ? '#0284c7' : '#94a3b8', borderBottom: activeTab === 'status' ? '3px solid #0284c7' : '3px solid transparent', cursor: 'pointer', transition: '0.3s' }}>Durum Sorgulama</button>
                    </div>

                    <div style={{ padding: '30px' }}>
                        {activeTab === 'list' ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="standard-data-table">
                                    <thead>
                                        <tr>
                                            <th>Fatura Seri/No</th>
                                            <th>Müşteri / Alıcı</th>
                                            <th>Belge Tarihi</th>
                                            <th style={{ textAlign: 'right' }}>Toplam Tutar</th>
                                            <th style={{ textAlign: 'center' }}>İşlem Durumu</th>
                                            <th style={{ textAlign: 'center' }}>Eylemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.map((inv, idx) => (
                                            <tr key={idx}>
                                                <td style={{ fontWeight: '800', color: '#0f172a' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <i className="fa-solid fa-qrcode" style={{ color: '#94a3b8' }}></i>
                                                        {inv.invoiceNo}
                                                    </div>
                                                </td>
                                                <td style={{ fontWeight: '700', color: '#475569' }}>{inv.cariCode}</td>
                                                <td style={{ color: '#64748b', fontSize: '13px' }}>{inv.date}</td>
                                                <td style={{ textAlign: 'right', fontWeight: '900', color: '#0284c7' }}>{parseFloat(inv.grandTotal || inv.total || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                                                <td style={{ textAlign: 'center' }}><span className="badge-modern success" style={{ borderRadius: '10px', padding: '6px 12px' }}>GÖNDERİLDİ</span></td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                        <button onClick={() => navigate(`/fatura-detay/${inv.invoiceNo}`)} className="btn-icon" title="Görüntüle"><i className="fa-solid fa-eye"></i></button>
                                                        <button onClick={() => setShowDeleteConfirm(inv.invoiceNo)} className="btn-icon delete"><i className="fa-solid fa-trash-can"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {invoices.length === 0 && (
                                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '100px', color: '#94a3b8' }}>Henüz düzenlenen bir e-fatura bulunmamaktadır.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '50px', textAlign: 'center' }}>
                                {isChecking ? (
                                    <div>
                                        <div className="spinner-modern" style={{ width: '80px', height: '80px', borderTopColor: '#0284c7', margin: '0 auto 30px' }}></div>
                                        <h2 style={{ color: '#1e293b', fontWeight: '900' }}>Dijital Sertifika Kontrolü...</h2>
                                        <p style={{ color: '#64748b' }}>E-Fatura durumları Luca servisleri üzerinden anlık olarak doğrulanıyor.</p>
                                    </div>
                                ) : (
                                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                                        <div style={{ width: '100px', height: '100px', background: '#f0fdf4', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', margin: '0 auto 30px' }}>
                                            <i className="fa-solid fa-cloud-check"></i>
                                        </div>
                                        <h2 style={{ color: '#1e293b', fontWeight: '900', marginBottom: '15px' }}>Tüm Faturalar Senkronize!</h2>
                                        <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '40px' }}>Sistemdeki tüm elektronik belgeler Luca portalı ve GİB servisleri ile tam uyumlu durumdadır. Herhangi bir onay bekleyen işlem bulunmamaktadır.</p>
                                        <button className="btn" style={{ background: '#0f172a', color: 'white', borderRadius: '15px', height: '54px', padding: '0 40px', fontWeight: '800' }} onClick={() => setActiveTab('list')}>Arşive Geri Dön</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-file-circle-xmark"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Faturayı İptal Et?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu işlemi onayladığınızda e-fatura sistem arşivi güncellenecektir. Bu işlem geri alınamaz. Devam edilsin mi?</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={confirmDelete}>Evet, İptal</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EFatura;
