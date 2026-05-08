import React, { useEffect, useState } from 'react';
import { StatCard, ModuleCard } from '../components/DashboardWidgets';
import { useLanguage } from '../context/LanguageContext';
import { useBranch } from '../context/BranchContext';
import '../styles/global.css';

const Dashboard = () => {
    const { t, lang } = useLanguage();
    const { currentBranch } = useBranch();
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [stats, setStats] = useState({ sales30: '0,00 ₺', purchase30: '0,00 ₺', profit30: '0,00 ₺', kdv30: '0,00 ₺' });
    const [bankBalances, setBankBalances] = useState([]);
    const [cashBalances, setCashBalances] = useState([]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hour = now.getHours();
            let greetKey = 'greeting_day';
            if (hour < 6) greetKey = 'greeting_night';
            else if (hour < 12) greetKey = 'greeting_morning';
            else if (hour < 18) greetKey = 'greeting_day';
            else greetKey = 'greeting_evening';
            setGreeting(t(greetKey));
            
            const months = lang === 'tr' ? ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            setCurrentDate(`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`);
            setCurrentTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        loadData();
        return () => clearInterval(interval);
    }, [lang, t]);

    const loadData = () => {
        const sales = JSON.parse(localStorage.getItem('salesInvoices')) || [];
        const purchases = JSON.parse(localStorage.getItem('purchaseInvoices')) || [];
        const banks = JSON.parse(localStorage.getItem('bankAccounts')) || [];
        const cash = JSON.parse(localStorage.getItem('cashRegisters')) || [];
        
        const totalSales = sales.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
        const totalPurchases = purchases.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
        
        setStats({
            sales30: totalSales.toLocaleString('tr-TR') + ' ₺',
            purchase30: totalPurchases.toLocaleString('tr-TR') + ' ₺',
            profit30: (totalSales - totalPurchases).toLocaleString('tr-TR') + ' ₺',
            kdv30: (totalSales * 0.20).toLocaleString('tr-TR') + ' ₺'
        });
        setBankBalances(banks);
        setCashBalances(cash);
    };

    return (
        <div className="main-content">
            {/* Header spacer */}
            <div style={{ height: '64px' }}></div>
            
            <div className="page-container">
                {/* Welcome Banner */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    borderRadius: '16px', 
                    padding: '32px 40px', 
                    marginBottom: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <div style={{ 
                        position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '50%'
                    }}></div>
                    <div style={{ 
                        position: 'absolute', bottom: '-40px', right: '100px', width: '160px', height: '160px',
                        background: 'rgba(255,255,255,0.04)', borderRadius: '50%'
                    }}></div>
                    <div>
                        <p style={{ margin: '0 0 8px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500' }}>{currentDate}</p>
                        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#fff' }}>
                            {greeting} 👋
                        </h1>
                        <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
                            {t('welcome_subtitle')}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '42px', fontWeight: '800', color: '#fff', lineHeight: 1 }}>{currentTime}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: '600', marginTop: '4px' }}>{t('system_time')}</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                    <StatCard title={t('stat_sales')} value={stats.sales30} icon="fa-arrow-trend-up" trend="up" color="#4f46e5" />
                    <StatCard title={t('stat_purchase')} value={stats.purchase30} icon="fa-cart-shopping" trend="down" color="#f59e0b" />
                    <StatCard title={t('stat_profit')} value={stats.profit30} icon="fa-sack-dollar" trend="up" color="#10b981" />
                    <StatCard title={t('stat_kdv')} value={stats.kdv30} icon="fa-percent" trend="neutral" color="#6b7a8d" />
                </div>

                {/* Modules */}
                <div style={{ marginBottom: '32px' }}>
                    <h2 className="section-heading">{t('modules')}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        <ModuleCard title={t('customers')} icon="fa-users" link="/cari-hesaplar" color="#4f46e5" />
                        <ModuleCard title={t('stocks')} icon="fa-boxes-stacked" link="/stok-kartlari" color="#0ea5e9" />
                        <ModuleCard title={t('sales')} icon="fa-cash-register" link="/satis-yap" color="#10b981" />
                        <ModuleCard title="E-Fatura" icon="fa-file-invoice" link="/efatura" color="#8b5cf6" />
                        <ModuleCard title={t('bank')} icon="fa-building-columns" link="/banka" color="#f59e0b" />
                        <ModuleCard title={t('kasa')} icon="fa-vault" link="/kasa" color="#ef4444" />
                        <ModuleCard title={t('invoices')} icon="fa-file-invoice-dollar" link="/faturalar" color="#06b6d4" />
                        <ModuleCard title={t('agenda')} icon="fa-calendar-days" link="/ajanda" color="#ec4899" />
                    </div>
                </div>

                {/* Financial Tables */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="glass-card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e8ecf0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-building-columns" style={{ color: '#4f46e5', fontSize: '14px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1a2332' }}>Banka Hesapları</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b7a8d' }}>Son 30 günlük bakiyeler</p>
                            </div>
                        </div>
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Hesap Adı</th>
                                    <th style={{ textAlign: 'right' }}>Bakiye</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bankBalances.map((b, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: '500' }}>{b.bankName}</td>
                                        <td style={{ textAlign: 'right', fontWeight: '700', color: '#10b981' }}>{b.balance} ₺</td>
                                    </tr>
                                ))}
                                {bankBalances.length === 0 && (
                                    <tr><td colSpan="2" style={{ textAlign: 'center', padding: '48px', color: '#c4c9d4' }}>
                                        <i className="fa-regular fa-folder-open" style={{ fontSize: '28px', marginBottom: '8px', display: 'block' }}></i>
                                        Kayıt bulunamadı
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="glass-card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e8ecf0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-vault" style={{ color: '#10b981', fontSize: '14px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#1a2332' }}>Kasa Hesapları</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b7a8d' }}>Nakit bakiyeler</p>
                            </div>
                        </div>
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Kasa Adı</th>
                                    <th style={{ textAlign: 'right' }}>Bakiye</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cashBalances.map((c, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: '500' }}>{c.name}</td>
                                        <td style={{ textAlign: 'right', fontWeight: '700', color: '#4f46e5' }}>{c.balance} ₺</td>
                                    </tr>
                                ))}
                                {cashBalances.length === 0 && (
                                    <tr><td colSpan="2" style={{ textAlign: 'center', padding: '48px', color: '#c4c9d4' }}>
                                        <i className="fa-regular fa-folder-open" style={{ fontSize: '28px', marginBottom: '8px', display: 'block' }}></i>
                                        Kayıt bulunamadı
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
