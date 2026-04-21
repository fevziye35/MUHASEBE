import React, { useState } from 'react';

const BankaRaporu = () => {
    const [allTime, setAllTime] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        const data = JSON.parse(localStorage.getItem('bankAccounts') || '[]');
        
        let filtered = [...data];

        if (!allTime) {
            const startStr = new Date(startDate);
            const endStr = new Date(endDate);
            endStr.setHours(23, 59, 59, 999);
            startStr.setHours(0, 0, 0, 0);

            filtered = filtered.filter(acc => {
                if (!acc.createdAt) return false;
                const accDate = new Date(acc.createdAt);
                return accDate >= startStr && accDate <= endStr;
            });
        }

        let totals = { TRY: 0, USD: 0, EUR: 0 };
        
        filtered.forEach(acc => {
            const cur = acc.currency || 'TRY';
            if (totals[cur] !== undefined) {
                totals[cur] += parseFloat(acc.balance) || 0;
            } else {
                totals[cur] = parseFloat(acc.balance) || 0;
            }
        });

        setReportData({
            list: filtered,
            totals
        });
    };

    const formatCurrency = (val, currencyCode) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currencyCode || 'TRY' }).format(val);
    };

    return (
        <div className="dash-container">
            <h2 className="page-title">Banka Raporu</h2>

            <div style={{ background: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <input 
                        type="checkbox" 
                        id="tumZamanlar" 
                        checked={allTime} 
                        onChange={() => setAllTime(!allTime)}
                        style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                    />
                    <label htmlFor="tumZamanlar" style={{ fontSize: '15px', fontWeight: '500', color: '#4ade80' }}>Tüm Zamanlar</label>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Başlangıç Tarihi</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={allTime}
                            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', opacity: allTime ? 0.6 : 1 }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Bitiş Tarihi</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={allTime}
                            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', opacity: allTime ? 0.6 : 1 }}
                        />
                    </div>
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={generateReport}
                        style={{ background: '#e67e22', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '8px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                        <i className="fa-solid fa-bars"></i> {reportData ? 'Raporu Yenile' : 'Banka Raporu'}
                    </button>
                    {reportData && (
                        <button 
                            onClick={() => window.print()}
                            style={{ background: '#10b981', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '8px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            <i className="fa-solid fa-print"></i> Yazdır
                        </button>
                    )}
                </div>
            </div>

            {reportData && (
                <div style={{ marginTop: '30px' }}>
                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>TOPLAM TL (YENİ HESAPLAR)</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{formatCurrency(reportData.totals.TRY, 'TRY')}</div>
                        </div>

                        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>TOPLAM USD (YENİ HESAPLAR)</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{formatCurrency(reportData.totals.USD, 'USD')}</div>
                        </div>

                        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #f59e0b', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '8px' }}>TOPLAM EUR (YENİ HESAPLAR)</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>{formatCurrency(reportData.totals.EUR, 'EUR')}</div>
                        </div>
                    </div>

                    {/* Report Table */}
                    <div style={{ background: 'white', border: '1px solid #edf2f7', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ padding: '15px 20px', background: '#f8fafc', borderBottom: '1px solid #edf2f7', fontWeight: 'bold', fontSize: '14px', color: '#475569' }}>
                            <i className="fa-solid fa-file-invoice" style={{ marginRight: '8px' }}></i> Listelenen Banka Hesapları
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #edf2f7' }}>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4a5568', fontSize: '13px' }}>Banka & Şube</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4a5568', fontSize: '13px' }}>Hesap Numarası</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4a5568', fontSize: '13px' }}>IBAN</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', color: '#4a5568', fontSize: '13px' }}>Aktif Bakiye</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.list.length > 0 ? reportData.list.map(acc => (
                                    <tr key={acc.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                                        <td style={{ padding: '12px 15px', color: '#2d3748', fontSize: '14px', fontWeight: '600' }}>{acc.bankName} - <span style={{ fontWeight: 'normal', color: '#64748b' }}>{acc.branch}</span></td>
                                        <td style={{ padding: '12px 15px', color: '#4a5568', fontSize: '14px' }}>{acc.accountNumber || '-'}</td>
                                        <td style={{ padding: '12px 15px', color: '#4a5568', fontSize: '13px', fontFamily: 'monospace' }}>{acc.iban || '-'}</td>
                                        <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#10b981', fontSize: '15px' }}>
                                            {formatCurrency(acc.balance, acc.currency)}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#a0aec0', fontStyle: 'italic', fontSize: '14px' }}>Bu tarih aralığında oluşturulmuş herhangi bir banka hesabı bulunamadı.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankaRaporu;
