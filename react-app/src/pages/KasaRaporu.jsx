import React, { useState } from 'react';

const KasaRaporu = () => {
    const [allTime, setAllTime] = useState(false);
    const [showIncome, setShowIncome] = useState(true);
    const [showOutcome, setShowOutcome] = useState(true);
    const [startDate, setStartDate] = useState('27.03.2026');
    const [endDate, setEndDate] = useState('27.03.2026');
    const [showResults, setShowResults] = useState(false);

    const generateReport = () => {
        setShowResults(true);
    };

    const Checkbox = ({ checked, onChange, label, color }) => (
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div 
                onClick={onChange}
                style={{ 
                    width: '20px', 
                    height: '20px', 
                    background: checked ? color : '#334155', 
                    borderRadius: '4px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: checked ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}
            >
                {checked && <i className="fa-solid fa-check" style={{ color: 'white', fontSize: '12px' }}></i>}
            </div>
            <span style={{ color: label === 'Tüm Zamanlar' ? '#4ade80' : '#cbd5e0', fontSize: '14px', fontWeight: '500' }}>{label}</span>
        </label>
    );

    return (
        <div className="dash-container">
            <h2 className="page-title">Kasa İşlem Raporu</h2>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
                <div style={{ display: 'flex', gap: '30px', marginBottom: '25px', flexWrap: 'wrap' }}>
                    <Checkbox 
                        checked={allTime} 
                        onChange={() => setAllTime(!allTime)} 
                        label="Tüm Zamanlar" 
                        color="#2b6cb0" 
                    />
                    <Checkbox 
                        checked={showIncome} 
                        onChange={() => setShowIncome(!showIncome)} 
                        label="Giriş İşlemleri" 
                        color="#2b6cb0" 
                    />
                    <Checkbox 
                        checked={showOutcome} 
                        onChange={() => setShowOutcome(!showOutcome)} 
                        label="Çıkış İşlemleri" 
                        color="#2b6cb0" 
                    />
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '14px', color: '#64748b' }}>Başlangıç Tarihi</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={allTime}
                            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', background: allTime ? '#f7f7f7' : 'white' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '14px', color: '#64748b' }}>Bitiş Tarihi</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={allTime}
                            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', background: allTime ? '#f7f7f7' : 'white' }}
                        />
                    </div>
                </div>

                <div>
                    <button 
                        className="btn btn-dark-blue" 
                        onClick={generateReport}
                        style={{ background: '#f6ad55', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '6px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                    >
                        <i className="fa-solid fa-bars"></i> Kasa Raporu Getir
                    </button>
                </div>
            </div>

            {showResults && (
                <div style={{ marginTop: '30px', background: '#1a2d4c', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#0f172a' }}>
                                <th style={{ padding: '12px', borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#ffffff' }}>Tarih</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#ffffff' }}>Tip</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#ffffff' }}>Açıklama</th>
                                <th style={{ padding: '12px', borderBottom: '2px solid rgba(255,255,255,0.1)', textAlign: 'right', color: '#ffffff' }}>Tutar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Kayıt bulunamadı.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default KasaRaporu;
