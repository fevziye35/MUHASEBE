import React, { useState } from 'react';
import '../styles/global.css';

const GunSonuRaporu = () => {
    const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
    const [showResults, setShowResults] = useState(false);

    const generateReport = () => {
        setShowResults(true);
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #d97706 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#fbbf24', letterSpacing: '0.1em', marginBottom: '8px' }}>GÜNLÜK KAPANIŞ TERMİNALİ</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Gün Sonu Raporu</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '18px' }}>Bugünün tüm işlemlerini, nakit ve pos dengesini buradan teyit edin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '15px 25px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', opacity: 0.7 }}>TOPLAM CİRO</div>
                            <div style={{ fontSize: '24px', fontWeight: '900' }}>12.450 ₺</div>
                         </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Modern Date Filter */}
                <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>RAPOR TARİHİ SEÇİN</label>
                        <input className="input-modern" type="date" value={reportDate} onChange={e => setReportDate(e.target.value)} style={{ width: '300px', height: '54px', borderRadius: '15px', background: '#f8fafc' }} />
                    </div>
                    <button className="btn" style={{ background: '#1e1b4b', color: 'white', fontWeight: '800', borderRadius: '15px', height: '54px', padding: '0 40px', border: 'none' }} onClick={generateReport}>
                        <i className="fa-solid fa-file-invoice" style={{ marginRight: '10px' }}></i> Raporu Hazırla
                    </button>
                </div>

                {showResults && (
                    <>
                        {/* Daily Quick Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#ecfdf5', color: '#10b981', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><i className="fa-solid fa-money-bill-1"></i></div>
                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em' }}>NAKİT TAHSİLAT</div>
                                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b' }}>4.200,00 ₺</div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#eff6ff', color: '#3b82f6', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><i className="fa-solid fa-credit-card"></i></div>
                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em' }}>KREDİ KARTI / POS</div>
                                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b' }}>8.250,00 ₺</div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#fef2f2', color: '#ef4444', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}><i className="fa-solid fa-receipt"></i></div>
                                    <div>
                                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em' }}>MASRAF / GİDER</div>
                                        <div style={{ fontSize: '22px', fontWeight: '900', color: '#ef4444' }}>- 120,00 ₺</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transaction Detail Table */}
                        <div className="main-content-card" style={{ background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>İşlem Detayları</h3>
                                <button className="btn" style={{ background: '#f8fafc', color: '#64748b', fontSize: '13px', fontWeight: '800', borderRadius: '10px', height: '40px', border: '1px solid #e2e8f0' }}>Yazdır / PDF</button>
                            </div>
                            <table className="standard-data-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Saat</th>
                                        <th style={{ width: '25%' }}>İşlem Tipi</th>
                                        <th style={{ width: '40%' }}>Cari / Açıklama</th>
                                        <th style={{ width: '20%', textAlign: 'right' }}>Tutar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: '700', color: '#64748b' }}>09:15</td>
                                        <td><span className="badge-modern" style={{ background: '#f0fdf4', color: '#15803d' }}>Satış Faturası</span></td>
                                        <td style={{ fontWeight: '700', color: '#1e293b' }}>Ahmet Yılmaz Perakende</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#10b981' }}>1.250,00 ₺</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: '700', color: '#64748b' }}>11:40</td>
                                        <td><span className="badge-modern" style={{ background: '#f0f9ff', color: '#1d4ed8' }}>Nakit Tahsilat</span></td>
                                        <td style={{ fontWeight: '700', color: '#1e293b' }}>Mehmet Demir (Ticari Alacak)</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#10b981' }}>500,00 ₺</td>
                                    </tr>
                                    <tr style={{ background: '#fffafb' }}>
                                        <td style={{ fontWeight: '700', color: '#64748b' }}>14:20</td>
                                        <td><span className="badge-modern" style={{ background: '#fef2f2', color: '#991b1b' }}>Genel Masraf</span></td>
                                        <td style={{ fontWeight: '700', color: '#1e293b' }}>Ofis Mutfak / Yemek Gideri</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#ef4444' }}>- 120,00 ₺</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GunSonuRaporu;
