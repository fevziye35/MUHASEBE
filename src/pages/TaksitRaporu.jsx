import React, { useState, useEffect } from 'react';

const TaksitRaporu = () => {
    const [allTime, setAllTime] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [installmentType, setInstallmentType] = useState('overdue');

    useEffect(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayStr = `${dd}.${mm}.${yyyy}`;
        setStartDate(todayStr);
        setEndDate(todayStr);
    }, []);

    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        const data = JSON.parse(localStorage.getItem('installments') || '[]');
        
        let filtered = [...data];

        // Since the current mock data for installments doesn't have dates like dueDate, 
        // we'll just filter by type (kalan borç vs ödenen) based on total and totalPaid.
        
        if (installmentType === 'overdue' || installmentType === 'upcoming') {
            // Unpaid logic
            filtered = filtered.filter(item => (item.total - item.totalPaid) > 0);
        } else if (installmentType === 'paid') {
            // Paid logic
            filtered = filtered.filter(item => (item.total - item.totalPaid) <= 0);
        }

        let totalAmount = 0;
        let totalPaidAmount = 0;
        
        filtered.forEach(item => {
            totalAmount += item.total || 0;
            totalPaidAmount += item.totalPaid || 0;
        });

        setReportData({
            list: filtered,
            total: totalAmount,
            paid: totalPaidAmount,
            remaining: totalAmount - totalPaidAmount
        });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val);
    };

    return (
        <div className="dash-container">
            <h2 className="page-title">Taksit Takip Gelişmiş Rapor</h2>

            <div style={{ background: '#1a2d4c', padding: '35px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', maxWidth: '800px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#4ade80', fontWeight: '600' }}>
                        <input 
                            type="checkbox" 
                            checked={allTime} 
                            onChange={() => setAllTime(!allTime)}
                            style={{ width: '20px', height: '20px', marginRight: '10px' }} 
                        />
                        Tüm Zamanlar
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ color: '#cbd5e0', fontSize: '14px', fontWeight: '500' }}>Başlangıç Tarihi</label>
                        <input 
                            type="text" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={allTime}
                            placeholder="GG.AA.YYYY"
                            style={{ width: '100%', padding: '12px 15px', background: '#0f172a', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}
                        />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ color: '#cbd5e0', fontSize: '14px', fontWeight: '500' }}>Bitiş Tarihi</label>
                        <input 
                            type="text" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={allTime}
                            placeholder="GG.AA.YYYY"
                            style={{ width: '100%', padding: '12px 15px', background: '#0f172a', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ color: '#cbd5e0', fontSize: '14px', fontWeight: '500' }}>Listelemek İstediğiniz Taksit Türünü Seçiniz:</label>
                    <select 
                        value={installmentType} 
                        onChange={(e) => setInstallmentType(e.target.value)}
                        style={{ width: '100%', padding: '12px 15px', background: '#0f172a', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px' }}
                    >
                        <option value="overdue">Vadesi Geçen Taksitler</option>
                        <option value="upcoming">Gelecek Taksitler</option>
                        <option value="paid">Ödenen Taksitler</option>
                        <option value="all">Tüm Taksitler</option>
                    </select>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'right' }}>
                    <button 
                        onClick={generateReport}
                        style={{ background: '#e67e22', color: 'white', padding: '12px 45px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                        {reportData ? 'Raporu Güncelle' : 'Rapor Hazırla'}
                    </button>
                    {reportData && (
                        <button 
                            onClick={() => window.print()}
                            style={{ background: '#10b981', color: 'white', padding: '12px 25px', marginLeft: '10px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            <i className="fa-solid fa-print"></i> Yazdır
                        </button>
                    )}
                </div>
            </div>

            {reportData && (
                <div style={{ marginTop: '30px', maxWidth: '800px' }}>
                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold', marginBottom: '5px' }}>TOPLAM TUTAR</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{formatCurrency(reportData.total)}</div>
                        </div>
                        <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                            <div style={{ fontSize: '13px', color: '#166534', fontWeight: 'bold', marginBottom: '5px' }}>ÖDENEN</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#15803d' }}>{formatCurrency(reportData.paid)}</div>
                        </div>
                        <div style={{ background: '#fee2e2', padding: '20px', borderRadius: '8px', border: '1px solid #fecaca', textAlign: 'center' }}>
                            <div style={{ fontSize: '13px', color: '#991b1b', fontWeight: 'bold', marginBottom: '5px' }}>KALAN (BEKLEYEN)</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#b91c1c' }}>{formatCurrency(reportData.remaining)}</div>
                        </div>
                    </div>

                    {/* Report Table */}
                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '12px 15px', textAlign: 'left', fontSize: '13px', color: '#475569' }}>ÜNVAN</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', fontSize: '13px', color: '#475569' }}>TOPLAM</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', fontSize: '13px', color: '#475569' }}>ÖDENEN</th>
                                    <th style={{ padding: '12px 15px', textAlign: 'right', fontSize: '13px', color: '#475569' }}>KALAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.list.length > 0 ? reportData.list.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>{item.title}</td>
                                        <td style={{ padding: '12px 15px', fontSize: '14px', textAlign: 'right', color: '#334155' }}>{formatCurrency(item.total)}</td>
                                        <td style={{ padding: '12px 15px', fontSize: '14px', textAlign: 'right', color: '#10b981', fontWeight: '500' }}>{formatCurrency(item.totalPaid)}</td>
                                        <td style={{ padding: '12px 15px', fontSize: '14px', textAlign: 'right', color: item.total - item.totalPaid > 0 ? '#ef4444' : '#64748b', fontWeight: '600' }}>
                                            {formatCurrency(item.total - item.totalPaid)}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                                            Bu kriterlere uygun taksit kaydı bulunamadı.
                                        </td>
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

export default TaksitRaporu;
