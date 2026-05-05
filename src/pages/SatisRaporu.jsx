import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const SatisRaporu = () => {
    const [timeframe, setTimeframe] = useState('all');
    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        const invoices = JSON.parse(localStorage.getItem('salesInvoices') || '[]');
        let filtered = [...invoices];
        const now = new Date();
        
        if (timeframe === 'today') {
            const todayStr = now.toISOString().split('T')[0];
            filtered = invoices.filter(inv => inv.date === todayStr);
        } else if (timeframe === 'month') {
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            filtered = invoices.filter(inv => {
                const invDate = new Date(inv.date);
                return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear;
            });
        } else if (timeframe === 'year') {
            const currentYear = now.getFullYear();
            filtered = invoices.filter(inv => {
                const invDate = new Date(inv.date);
                return invDate.getFullYear() === currentYear;
            });
        }

        let totalGross = 0;
        let totalKdv = 0;

        filtered.forEach(inv => {
            const gTotal = parseFloat(inv.grandTotal) || parseFloat(inv.total) || 0;
            totalGross += gTotal;
            inv.calculatedNet = gTotal / 1.2; 
            inv.calculatedKdv = gTotal - inv.calculatedNet;
            inv.calculatedTotal = gTotal;
        });

        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        setReportData({
            list: filtered,
            totalGross,
            totalKdv: totalGross - (totalGross / 1.2),
            totalNet: totalGross / 1.2,
            invoiceCount: filtered.length
        });
    };

    const formatCurrency = (val) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val || 0);
    const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('tr-TR') : '-';

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '250px', height: '250px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#818cf8', letterSpacing: '0.1em', marginBottom: '8px' }}>TİCARİ SATIŞ ANALİTİĞİ</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Satış Performans Raporu</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '18px' }}>Ciro gelişiminizi ve fatura trafiğinizi derinlemesine analiz edin.</p>
                    </div>
                    {reportData && (
                        <div style={{ textAlign: 'right', background: 'rgba(255,255,255,0.1)', padding: '15px 25px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', opacity: 0.7 }}>TOPLAM SATIŞ</div>
                            <div style={{ fontSize: '28px', fontWeight: '900' }}>{formatCurrency(reportData.totalGross)}</div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Modern Filter Engine */}
                <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>ANALİZ DÖNEMİ SEÇİN</label>
                        <select className="input-modern" value={timeframe} onChange={e => setTimeframe(e.target.value)} style={{ width: '100%', maxWidth: '400px', height: '54px', borderRadius: '15px', background: '#f8fafc' }}>
                            <option value="today">Bugün</option><option value="month">Bu Ay</option><option value="year">Bu Yıl</option><option value="all">Tüm Zamanlar</option>
                        </select>
                    </div>
                    <button className="btn" style={{ background: '#312e81', color: 'white', fontWeight: '800', borderRadius: '15px', height: '54px', padding: '0 40px', border: 'none' }} onClick={generateReport}>
                        <i className="fa-solid fa-chart-pie" style={{ marginRight: '10px' }}></i> Analiz Raporu Hazırla
                    </button>
                    {reportData && (
                        <button className="btn" style={{ background: '#f8fafc', color: '#10b981', fontWeight: '800', borderRadius: '15px', height: '54px', padding: '0 25px', border: '1px solid #d1fae5' }} onClick={() => window.print()}>
                            <i className="fa-solid fa-print"></i>
                        </button>
                    )}
                </div>

                {reportData && (
                    <>
                        {/* High Impact Sales Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '30px' }}>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>BRÜT SATIŞ (G.TOPLAM)</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>{formatCurrency(reportData.totalGross)}</div>
                            </div>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>NET SATIŞ (KDV HARİÇ)</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>{formatCurrency(reportData.totalNet)}</div>
                            </div>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>HESAPLANAN KDV</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#f59e0b' }}>{formatCurrency(reportData.totalKdv)}</div>
                            </div>
                            <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '8px' }}>FATURA ADEDİ</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#6366f1' }}>{reportData.invoiceCount} Adet</div>
                            </div>
                        </div>

                        {/* Professional Invoices Table */}
                        <div className="main-content-card" style={{ background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9' }}>
                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>Kesilen Faturalar Dökümü</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="standard-data-table">
                                    <thead>
                                        <tr>
                                            <th>TARİH</th>
                                            <th>FATURA NO</th>
                                            <th>MÜŞTERİ / CARİ ÜNVANI</th>
                                            <th style={{ textAlign: 'right' }}>KDV TUTARI</th>
                                            <th style={{ textAlign: 'right' }}>GENEL TOPLAM</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.list.length > 0 ? reportData.list.map(inv => (
                                            <tr key={inv.id || inv.invoiceNo}>
                                                <td style={{ fontWeight: '700', color: '#64748b' }}>{formatDate(inv.date)}</td>
                                                <td style={{ fontWeight: '800', color: '#312e81' }}>{inv.invoiceNo}</td>
                                                <td style={{ fontWeight: '700', color: '#1e293b' }}>{inv.customer || inv.cariCode || '-'}</td>
                                                <td style={{ textAlign: 'right', fontWeight: '700', color: '#f59e0b' }}>{formatCurrency(inv.calculatedKdv)}</td>
                                                <td style={{ textAlign: 'right', fontWeight: '900', color: '#1e1b4b', fontSize: '15px' }}>{formatCurrency(inv.calculatedTotal)}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>Döneme ait veri bulunamadı.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SatisRaporu;
