import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const IncomeExpenseReport = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'monthly'; // 'daily', 'monthly', 'yearly'
    
    const [reportData, setReportData] = useState({
        transactions: [],
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
        title: '',
        periodText: ''
    });

    useEffect(() => {
        loadReport();
    }, [type]);

    const loadReport = () => {
        const savedData = JSON.parse(localStorage.getItem('incomeExpenseData') || '[]');
        const now = new Date();
        let startDate, endDate, reportTitle, periodText;

        if (type === 'daily') {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            reportTitle = 'Günlük Gelir-Gider Raporu';
            periodText = `${now.toLocaleDateString('tr-TR')}`;
        } else if (type === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
            reportTitle = 'Aylık Gelir-Gider Raporu';
            periodText = `${now.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}`;
        } else {
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
            reportTitle = 'Yıllık Gelir-Gider Raporu';
            periodText = `${now.getFullYear()} Yılı`;
        }

        const filtered = savedData.filter(item => {
            const itemDate = new Date(item.transactionDate);
            return itemDate >= startDate && itemDate <= endDate;
        });

        let income = 0;
        let expense = 0;
        
        filtered.forEach(item => {
            const amount = parseFloat(item.amount) || 0;
            if (item.type === 'income') {
                income += amount;
            } else {
                expense += amount;
            }
        });

        setReportData({
            transactions: filtered.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)),
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense,
            title: reportTitle,
            periodText: periodText
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    };

    return (
        <div className="dash-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                    <h2 className="page-title" style={{ margin: 0 }}>{reportData.title}</h2>
                    <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>Dönem: <strong>{reportData.periodText}</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => navigate('/gelir-gider')} className="btn btn-outline" style={{ background: '#f8fafc' }}>
                        <i className="fa-solid fa-arrow-left"></i> Panele Dön
                    </button>
                    <button onClick={() => window.print()} className="btn btn-dark-blue">
                        <i className="fa-solid fa-print"></i> Yazdır
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '500', opacity: '0.9' }}>Toplam Gelir</h3>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatCurrency(reportData.totalIncome)}</div>
                    <div style={{ marginTop: '10px', fontSize: '13px', opacity: '0.8' }}>Bu döneme ait tüm gelir girişleri</div>
                </div>

                <div style={{ background: '#ef4444', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '500', opacity: '0.9' }}>Toplam Gider</h3>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatCurrency(reportData.totalExpense)}</div>
                    <div style={{ marginTop: '10px', fontSize: '13px', opacity: '0.8' }}>Bu döneme ait tüm gider ve harcamalar</div>
                </div>

                <div style={{ background: reportData.netBalance >= 0 ? '#3b82f6' : '#d97706', color: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '500', opacity: '0.9' }}>Net Bakiye</h3>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatCurrency(reportData.netBalance)}</div>
                    <div style={{ marginTop: '10px', fontSize: '13px', opacity: '0.8' }}>
                        {reportData.netBalance >= 0 ? 'Dönem kâr ile kapatılıyor' : 'Dönem zarar ile kapatılıyor'}
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '16px', color: '#1e293b' }}>İşlem Detayları</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>TİP</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>TARİH</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>İŞLEM ADI</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>KOD</th>
                                <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px' }}>TUTAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.transactions.length > 0 ? reportData.transactions.map((item) => (
                                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px', 
                                            fontSize: '11px', 
                                            fontWeight: 'bold',
                                            background: item.type === 'income' ? '#dcfce7' : '#fee2e2',
                                            color: item.type === 'income' ? '#166534' : '#991b1b'
                                        }}>
                                            {item.type === 'income' ? 'GELİR' : 'GİDER'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '13px', color: '#475569' }}>
                                        {new Date(item.transactionDate).toLocaleDateString('tr-TR')} {new Date(item.transactionDate).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                                    </td>
                                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '500' }}>{item.name}</td>
                                    <td style={{ padding: '12px', fontSize: '13px', color: '#64748b' }}>{item.code || '-'}</td>
                                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: 'bold', textAlign: 'right', color: item.type === 'income' ? '#10b981' : '#ef4444' }}>
                                        {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                                        Bu döneme ait herhangi bir gelir veya gider işlemi bulunamadı.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
};

export default IncomeExpenseReport;
