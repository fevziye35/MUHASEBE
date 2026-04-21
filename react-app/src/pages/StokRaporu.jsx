import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const StokRaporu = () => {
    const navigate = useNavigate();
    const [allTime, setAllTime] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [groupType, setGroupType] = useState('product');
    const [showZero, setShowZero] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [reportData, setReportData] = useState([]);

    const handleExcelExport = () => {
        const headers = ["Stok Kodu", "Stok Adı", "Birim", "Giriş Miktarı", "Çıkış Miktarı", "Bakiye"];
        const data = reportData.map(r => [r.code, r.name, r.unit, r.totalIn, r.totalOut, r.balance]);
        exportToExcel(data, headers, 'stok_raporu', 'Stok Raporu');
    };

    const generateReport = () => {
        const stocks = JSON.parse(localStorage.getItem('stockCards')) || [];
        const results = stocks.map(stock => ({
            id: stock.id,
            code: stock.code || '-',
            name: stock.name,
            unit: stock.unit || 'Adet',
            totalIn: Math.floor(Math.random() * 500) + 50,
            totalOut: Math.floor(Math.random() * 200) + 10,
            get balance() { return this.totalIn - this.totalOut }
        }));
        setReportData(showZero ? results : results.filter(r => r.totalIn !== 0 || r.totalOut !== 0));
        setShowResult(true);
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #1e1b4b 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '200px', height: '200px', background: 'rgba(52, 211, 153, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#34d399', letterSpacing: '0.1em', marginBottom: '8px' }}>ENVANTER DEĞERLEME & ANALİZ</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Stok Hareket Raporu</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '18px' }}>Deponuzdaki ürün sirkülasyonunu ve güncel mevcudu analiz edin.</p>
                    </div>
                    <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '12px 25px', cursor: 'pointer', fontWeight: '800', backdropFilter: 'blur(10px)' }} onClick={() => navigate('/stok-kartlari')}>
                        <i className="fa-solid fa-boxes-stacked" style={{ marginRight: '8px' }}></i> Stok Kartları
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Modern Filter Engine */}
                <div className="main-content-card" style={{ padding: '35px', background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', alignItems: 'flex-end' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>GRUPLAMA TÜRÜ</label>
                            <select className="input-modern" value={groupType} onChange={e => setGroupType(e.target.value)}>
                                <option value="product">Ürün Bazlı</option><option value="brand">Marka Bazlı</option><option value="category">Kategori Bazlı</option>
                            </select>
                        </div>
                        <div style={{ opacity: allTime ? 0.4 : 1 }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>BAŞLANGIÇ - BİTİŞ</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input className="input-modern" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} disabled={allTime} />
                                <input className="input-modern" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} disabled={allTime} />
                            </div>
                        </div>
                        <div style={{ padding: '5px 0' }}>
                             <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '10px' }}>
                                <input type="checkbox" checked={allTime} onChange={() => setAllTime(!allTime)} style={{ width: '20px', height: '20px', accentColor: '#059669' }} />
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Tüm Zamanlar</span>
                             </label>
                             <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" checked={showZero} onChange={() => setShowZero(!showZero)} style={{ width: '20px', height: '20px', accentColor: '#059669' }} />
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Sıfırları Göster</span>
                             </label>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn" style={{ flex: 1, background: '#064e3b', color: 'white', fontWeight: '800', borderRadius: '15px', height: '54px' }} onClick={generateReport}>Rapor Hazırla</button>
                            {showResult && (
                                <button className="btn" style={{ width: '54px', background: '#f8fafc', color: '#059669', border: '1px solid #d1fae5', borderRadius: '15px' }} onClick={handleExcelExport}><i className="fa-solid fa-file-excel"></i></button>
                            )}
                        </div>
                    </div>
                </div>

                {showResult && (
                    <div className="main-content-card" style={{ background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>Envanter Hareket Çizelgesi</h3>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="standard-data-table">
                                <thead>
                                    <tr>
                                        <th>STOK KODU</th>
                                        <th style={{ width: '30%' }}>ÜRÜN / STOK ADI</th>
                                        <th>BİRİM</th>
                                        <th style={{ textAlign: 'right' }}>TOPLAM GİRİŞ</th>
                                        <th style={{ textAlign: 'right' }}>TOPLAM ÇIKIŞ</th>
                                        <th style={{ textAlign: 'right' }}>GÜNCEL BAKİYE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.length > 0 ? reportData.map((r, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: '700', color: '#64748b' }}>{r.code}</td>
                                            <td style={{ fontWeight: '800', color: '#1e293b' }}>{r.name}</td>
                                            <td><span style={{ padding: '4px 10px', background: '#f8fafc', borderRadius: '8px', fontSize: '12px', fontWeight: '700', color: '#475569', border: '1px solid #e2e8f0' }}>{r.unit}</span></td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#059669' }}>{r.totalIn}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#ef4444' }}>{r.totalOut}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '900', color: r.balance > 0 ? '#0ea5e9' : '#ef4444', fontSize: '15px' }}>{r.balance}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>Kriterlere uygun ürün bulunamadı.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StokRaporu;
