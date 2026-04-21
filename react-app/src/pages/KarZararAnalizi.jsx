import React, { useState, useEffect } from 'react';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const KarZararAnalizi = () => {
    const [allTime, setAllTime] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [showResults, setShowResults] = useState(false);

    const generateReport = () => {
        setShowResults(true);
    };

    const handleExcelExport = () => {
        const headers = ["Kalem", "Açıklama", "Tutar"];
        const data = [
            ["Toplam Satışlar", "Brüt Satış Geliri", "450.000,00 TL"],
            ["Maliyetler", "Satılan Malın Maliyeti", "-210.000,00 TL"],
            ["Giderler", "Genel Yönetim ve Operasyonel Giderler", "-40.000,00 TL"],
            ["Net Sonuç", "Vergi Öncesi Kâr", "200.000,00 TL"]
        ];
        exportToExcel(data, headers, 'kar_zarar_analizi', 'Kâr Zarar Analizi');
    };

    const stats = {
        sales: 450000,
        costs: 210000,
        expenses: 40000,
        get netProfit() { return this.sales - this.costs - this.expenses }
    };

    const formatTRY = (val) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Analysis Header */}
            <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '250px', height: '250px', background: 'rgba(52, 211, 153, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#34d399', letterSpacing: '0.1em', marginBottom: '8px' }}>STRATEJİK MALİ ANALİZ</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Kar / Zarar Raporu</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: '18px' }}>İşletmenizin karlılık performansını ve maliyet dengesini analiz edin.</p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-50px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Modern Filter Panel */}
                <div className="main-content-card" style={{ padding: '35px', background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f8fafc', padding: '15px 25px', borderRadius: '18px', border: '1px solid #f1f5f9' }}>
                            <input type="checkbox" id="tumZamanlar" checked={allTime} onChange={() => setAllTime(!allTime)} style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#059669' }} />
                            <label htmlFor="tumZamanlar" style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', cursor: 'pointer' }}>Tüm Zamanlar</label>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '20px', opacity: allTime ? 0.4 : 1, pointerEvents: allTime ? 'none' : 'auto' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>BAŞLANGIÇ TARİHİ</label>
                                <input className="input-modern" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '220px', height: '54px', borderRadius: '15px', background: '#f8fafc' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>BİTİŞ TARİHİ</label>
                                <input className="input-modern" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '220px', height: '54px', borderRadius: '15px', background: '#f8fafc' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button className="btn" style={{ background: '#064e3b', color: 'white', fontWeight: '800', borderRadius: '15px', height: '54px', padding: '0 30px', border: 'none' }} onClick={generateReport}>
                                <i className="fa-solid fa-chart-line" style={{ marginRight: '10px' }}></i> Analiz Raporu Oluştur
                            </button>
                            {showResults && (
                                <button className="btn" style={{ background: '#f8fafc', color: '#059669', fontWeight: '800', borderRadius: '15px', height: '54px', padding: '0 25px', border: '1px solid #d1fae5' }} onClick={handleExcelExport}>
                                    <i className="fa-solid fa-file-excel" style={{ marginRight: '10px' }}></i> Excel'e Aktar
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {showResults && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
                            <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>TOPLAM SATIŞ GELİRİ</div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>{formatTRY(stats.sales)}</div>
                            </div>
                            <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>TOPLAM MALİYET & GİDER</div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: '#ef4444' }}>{formatTRY(stats.costs + stats.expenses)}</div>
                            </div>
                            <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', borderTop: '4px solid #10b981' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#10b981', letterSpacing: '0.1em', marginBottom: '8px' }}>NET KAR DURUMU</div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: '#059669' }}>{formatTRY(stats.netProfit)}</div>
                            </div>
                        </div>

                        <div className="main-content-card" style={{ background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9' }}>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>Kalem Bazlı Mali Analiz</h3>
                            </div>
                            <table className="standard-data-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '30%' }}>Analiz Kalemi</th>
                                        <th>Açıklama</th>
                                        <th style={{ textAlign: 'right' }}>Dönem Tutarı</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ background: '#f8fafc' }}>
                                        <td style={{ fontWeight: '800', color: '#1e293b' }}>Toplam Satışlar</td>
                                        <td style={{ color: '#64748b' }}>Brüt Satış Geliri (KDV Dahil Değil)</td>
                                        <td style={{ textAlign: 'right', fontWeight: '900', color: '#059669', fontSize: '16px' }}>{formatTRY(450000)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: '800', color: '#1e293b' }}>Satılan Malın Maliyeti</td>
                                        <td style={{ color: '#64748b' }}>Stoktan Çıkış ve Alış Maliyet Tedariki</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#ef4444' }}>- {formatTRY(210000)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: '800', color: '#1e293b' }}>Operasyonel Giderler</td>
                                        <td style={{ color: '#64748b' }}>Kira, Maaş, Elektrik ve Genel Yönetim</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#ef4444' }}>- {formatTRY(40000)}</td>
                                    </tr>
                                    <tr style={{ background: '#f0fdf4', borderTop: '2px solid #bbf7d0' }}>
                                        <td style={{ fontWeight: '900', color: '#064e3b', fontSize: '17px' }}>Vergi Öncesi Net Kar</td>
                                        <td style={{ fontWeight: '700', color: '#064e3b' }}>Seçili Dönemin Finansal Başarı Karnesi</td>
                                        <td style={{ textAlign: 'right', fontWeight: '900', color: '#059669', fontSize: '20px' }}>{formatTRY(200000)}</td>
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

export default KarZararAnalizi;
