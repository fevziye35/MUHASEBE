import React, { useState } from 'react';

const CekRaporu = () => {
    const [allTime, setAllTime] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [cekTuru, setCekTuru] = useState('hepsi');
    const [cekDurumu, setCekDurumu] = useState('hepsi');
    const [showResults, setShowResults] = useState(false);

    const generateReport = () => {
        setShowResults(true);
    };

    return (
        <div className="dash-container">
            <h1 className="page-title">Çek Raporu</h1>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#4a5568', fontWeight: '500' }}>
                        <input 
                            type="checkbox" 
                            checked={allTime} 
                            onChange={() => setAllTime(!allTime)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        Tüm Zamanlar
                    </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: allTime ? 0.5 : 1 }}>
                        <label style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Başlangıç Tarihi</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={allTime}
                            style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: allTime ? 0.5 : 1 }}>
                        <label style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Bitiş Tarihi</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={allTime}
                            style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Çek Türü</label>
                        <select 
                            value={cekTuru} 
                            onChange={(e) => setCekTuru(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        >
                            <option value="hepsi">Hepsi</option>
                            <option value="musteri">MÜŞTERİ EVRAĞI</option>
                            <option value="kendi">KENDİ EVRAĞIMIZ</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Çek Durumu</label>
                        <select 
                            value={cekDurumu} 
                            onChange={(e) => setCekDurumu(e.target.value)}
                            style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        >
                            <option value="hepsi">Hepsi</option>
                            <option value="bekleme">BEKLEME</option>
                            <option value="odendi">ÖDENDİ</option>
                            <option value="ciro">CİRO EDİLDİ</option>
                            <option value="bankada">BANKADA</option>
                            <option value="iade">İADE</option>
                        </select>
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <button 
                        onClick={generateReport}
                        style={{ background: '#e67e22', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '8px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-bars"></i> Çek Raporu
                    </button>
                </div>
            </div>

            {showResults && (
                <div style={{ marginTop: '30px', background: 'white', borderRadius: '12px', border: '1px solid #edf2f7', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#1a2d4c', color: 'white' }}>
                                <th style={{ padding: '15px', textAlign: 'left' }}>#</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Tarih</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Vade</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Banka</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Türü</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Durumu</th>
                                <th style={{ padding: '15px', textAlign: 'right' }}>Tutar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                                <td style={{ padding: '15px' }}>1</td>
                                <td style={{ padding: '15px' }}>2026-01-09</td>
                                <td style={{ padding: '15px' }}>2026-02-09</td>
                                <td style={{ padding: '15px' }}>Ziraat Bankası</td>
                                <td style={{ padding: '15px' }}>KENDİ EVRAĞIMIZ</td>
                                <td style={{ padding: '15px' }}>BEKLEME</td>
                                <td style={{ padding: '15px', textAlign: 'right', fontWeight: '600' }}>10.000,00 ₺</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CekRaporu;
