import React, { useState } from 'react';

const CariRaporu = () => {
    const [reportType, setReportType] = useState('all');
    const [showZeroBalance, setShowZeroBalance] = useState(false);
    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        
        let filtered = customers.map(c => {
            let bal = 0;
            if (c.bakiye) bal = parseFloat(c.bakiye);
            else if (c.balance) bal = parseFloat(c.balance);

            return {
                id: c.id || Math.random(),
                name: c.name || c.cariAdi || '-',
                phone: c.phone || c.telefon || '-',
                balance: bal,
                balanceType: bal > 0 ? 'borclu' : (bal < 0 ? 'alacakli' : 'sifir')
            };
        });

        if (!showZeroBalance) {
            filtered = filtered.filter(c => c.balance !== 0);
        }

        if (reportType === 'debit') {
            filtered = filtered.filter(c => c.balance > 0);
        } else if (reportType === 'credit') {
            filtered = filtered.filter(c => c.balance < 0);
        }

        let totalDebit = 0;
        let totalCredit = 0;
        
        filtered.forEach(c => {
            if (c.balance > 0) totalDebit += c.balance;
            if (c.balance < 0) totalCredit += Math.abs(c.balance);
        });

        setReportData({
            list: filtered,
            totalDebit,
            totalCredit,
            netBalance: totalDebit - totalCredit
        });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Math.abs(val));
    };

    return (
        <div className="dash-container">
            <h2 className="page-title">Cari Raporu</h2>

            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px', color: '#2d3748' }}>
                        <input 
                            type="radio" 
                            name="reportType" 
                            value="all" 
                            checked={reportType === 'all'} 
                            onChange={() => setReportType('all')}
                            style={{ width: '20px', height: '20px', marginRight: '15px' }} 
                        />
                        Tüm Cariyi Raporla
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px', color: '#2d3748' }}>
                        <input 
                            type="radio" 
                            name="reportType" 
                            value="debit" 
                            checked={reportType === 'debit'} 
                            onChange={() => setReportType('debit')}
                            style={{ width: '20px', height: '20px', marginRight: '15px' }} 
                        />
                        Borçlu Cariyi Raporla
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px', color: '#2d3748' }}>
                        <input 
                            type="radio" 
                            name="reportType" 
                            value="credit" 
                            checked={reportType === 'credit'} 
                            onChange={() => setReportType('credit')}
                            style={{ width: '20px', height: '20px', marginRight: '15px' }} 
                        />
                        Alacaklı Cariyi Raporla
                    </label>
                </div>

                <div style={{ height: '1px', background: '#edf2f7', margin: '25px 0' }}></div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '15px', color: '#2d3748' }}>
                        <input 
                            type="checkbox" 
                            checked={showZeroBalance} 
                            onChange={() => setShowZeroBalance(!showZeroBalance)}
                            style={{ width: '20px', height: '20px', marginRight: '15px' }} 
                        />
                        Sıfır Bakiyeleri Göster
                    </label>
                </div>

                <div>
                    <button onClick={generateReport} className="btn btn-dark-blue" style={{ background: '#f6ad55', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '6px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <i className="fa-solid fa-bars"></i> Cari Raporu Getir
                    </button>
                    {reportData && (
                        <button onClick={() => window.print()} className="btn btn-outline" style={{ background: '#f8fafc', padding: '12px 25px', marginLeft: '10px', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fa-solid fa-print"></i> Raporu Yazdır
                        </button>
                    )}
                </div>
            </div>

            {reportData && (
                <div style={{ marginTop: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '500', opacity: '0.9' }}>Toplam Borç Bakiye (Alacaklı Olduğumuz)</h3>
                            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatCurrency(reportData.totalDebit)}</div>
                        </div>

                        <div style={{ background: '#ef4444', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '500', opacity: '0.9' }}>Toplam Alacak Bakiye (Borçlu Olduğumuz)</h3>
                            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatCurrency(reportData.totalCredit)}</div>
                        </div>

                        <div style={{ background: reportData.netBalance >= 0 ? '#3b82f6' : '#d97706', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '500', opacity: '0.9' }}>Net Cari Bakiye</h3>
                            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatCurrency(reportData.netBalance)}</div>
                        </div>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #edf2f7', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #edf2f7' }}>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4a5568', fontSize: '14px' }}>Cari Ünvanı / Adı Soyadı</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', color: '#4a5568', fontSize: '14px' }}>Telefon</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', color: '#4a5568', fontSize: '14px' }}>Durum</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', color: '#4a5568', fontSize: '14px' }}>Bakiye</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.list.length > 0 ? reportData.list.map(cari => (
                                    <tr key={cari.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                                        <td style={{ padding: '12px 15px', color: '#2d3748', fontSize: '14px', fontWeight: '500' }}>{cari.name}</td>
                                        <td style={{ padding: '12px 15px', color: '#2d3748', fontSize: '14px' }}>{cari.phone}</td>
                                        <td style={{ padding: '12px 15px', textAlign: 'right' }}>
                                            {cari.balanceType === 'borclu' ? <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px', background: '#dcfce7', padding: '4px 8px', borderRadius: '4px' }}>BORÇLU</span> : 
                                             cari.balanceType === 'alacakli' ? <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '13px', background: '#fee2e2', padding: '4px 8px', borderRadius: '4px' }}>ALACAKLI</span> : 
                                             <span style={{ color: '#64748b', fontSize: '13px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>KAPALI</span>}
                                        </td>
                                        <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: cari.balanceType === 'borclu' ? '#10b981' : (cari.balanceType === 'alacakli' ? '#ef4444' : '#64748b') }}>
                                            {formatCurrency(cari.balance)}
                                            <span style={{ fontSize: '11px', marginLeft: '5px', fontWeight: 'normal', color: '#64748b' }}>
                                                {cari.balanceType === 'borclu' ? '(B)' : cari.balanceType === 'alacakli' ? '(A)' : ''}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#a0aec0', fontStyle: 'italic' }}>Filtrelere uygun cari bulunamadı.</td>
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

export default CariRaporu;
