import React, { useEffect, useState } from 'react';
import { StatCard, ModuleCard } from '../components/DashboardWidgets';
import { useLanguage } from '../context/LanguageContext';
import { useBranch } from '../context/BranchContext';
import '../styles/global.css';

const Dashboard = () => {
    const { t, lang: currentLang } = useLanguage();
    const { currentBranch } = useBranch();
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [stats, setStats] = useState({ 
        sales30: '0,00 ₺', 
        purchase30: '0,00 ₺', 
        profit30: '0,00 ₺', 
        kdv30: '0,00 ₺' 
    });
    const [bankBalances, setBankBalances] = useState([]);
    const [cashBalances, setCashBalances] = useState([]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const months = currentLang === 'tr' 
                ? ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] 
                : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            const days = currentLang === 'tr'
                ? ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
                : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            setCurrentDate(`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${days[now.getDay()]}`);
            setCurrentTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        loadData();
        return () => clearInterval(interval);
    }, [currentLang, t]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        let greetKey = 'greeting_day';
        if (hour < 6) greetKey = 'greeting_night';
        else if (hour < 12) greetKey = 'greeting_morning';
        else if (hour < 18) greetKey = 'greeting_day';
        else greetKey = 'greeting_evening';
        return t(greetKey);
    };

    const loadData = () => {
        try {
            const sales = JSON.parse(localStorage.getItem('salesInvoices')) || [];
            const purchases = JSON.parse(localStorage.getItem('purchaseInvoices')) || [];
            const banks = JSON.parse(localStorage.getItem('bankAccounts')) || [];
            const cash = JSON.parse(localStorage.getItem('cashRegisters')) || [];
            
            const totalSales = sales.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
            const totalPurchases = purchases.reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);
            
            setStats({
                sales30: totalSales.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ₺',
                purchase30: totalPurchases.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ₺',
                profit30: (totalSales - totalPurchases).toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ₺',
                kdv30: (totalSales * 0.20).toLocaleString('tr-TR', { minimumFractionDigits: 2 }) + ' ₺'
            });
            setBankBalances(banks);
            setCashBalances(cash);
        } catch (e) {
            console.error("Error loading dashboard data:", e);
        }
    };

    return (
        <div className="main-content">
            <div style={{ height: '64px' }}></div>
            
            <div className="page-container">
                {/* Welcome Banner */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    borderRadius: '24px', 
                    padding: '40px 48px', 
                    marginBottom: '40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 20px 40px -15px rgba(79, 70, 229, 0.4)'
                }}>
                    <div style={{ 
                        position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px',
                        background: 'rgba(255,255,255,0.05)', borderRadius: '50%'
                    }}></div>
                    <div style={{ 
                        position: 'absolute', bottom: '-40px', right: '100px', width: '160px', height: '160px',
                        background: 'rgba(255,255,255,0.04)', borderRadius: '50%'
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <p style={{ margin: '0 0 8px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {currentDate} • {currentBranch?.name || t('branch')}
                        </p>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>
                            {getGreeting()} 👋
                        </h1>
                        <p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '16px', fontWeight: '500' }}>
                            {t('welcome_subtitle')}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right', position: 'relative', zIndex: 2 }}>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>{currentTime}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '700', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t('system_time')}</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    <StatCard title={t('stat_sales')} value={stats.sales30} icon="fa-arrow-trend-up" trend="up" color="#4f46e5" />
                    <StatCard title={t('stat_purchase')} value={stats.purchase30} icon="fa-cart-shopping" trend="down" color="#f59e0b" />
                    <StatCard title={t('stat_profit')} value={stats.profit30} icon="fa-sack-dollar" trend="up" color="#10b981" />
                    <StatCard title={t('stat_kdv')} value={stats.kdv30} icon="fa-percent" trend="neutral" color="#6b7a8d" />
                </div>

                {/* Modules Grid */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '13px', fontWeight: '800', color: '#6b7a8d', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{t('modules')}</h2>
                        <div style={{ height: '1px', flex: 1, background: '#e8ecf0' }}></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        <ModuleCard title={t('customers')} icon="fa-users" link="/cari-hesaplar" color="#4f46e5" />
                        <ModuleCard title={t('stocks')} icon="fa-boxes-stacked" link="/stok-kartlari" color="#0ea5e9" />
                        <ModuleCard title={t('sales')} icon="fa-cash-register" link="/satis-yap" color="#10b981" />
                        <ModuleCard title={t('efatura')} icon="fa-file-invoice" link="/efatura" color="#8b5cf6" />
                        <ModuleCard title={t('bank')} icon="fa-building-columns" link="/banka" color="#f59e0b" />
                        <ModuleCard title={t('cash')} icon="fa-vault" link="/kasa" color="#ef4444" />
                        <ModuleCard title={t('invoices')} icon="fa-file-invoice-dollar" link="/faturalar" color="#06b6d4" />
                        <ModuleCard title={t('agenda')} icon="fa-calendar-days" link="/ajanda" color="#ec4899" />
                    </div>
                </div>

                {/* Balance Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
                    <div className="glass-card" style={{ overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-building-columns" style={{ color: '#4f46e5', fontSize: '18px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1a2332' }}>{t('bank_balances')}</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b7a8d', fontWeight: '500' }}>{t('last_30_days_balances')}</p>
                            </div>
                        </div>
                        <div style={{ padding: '8px' }}>
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>{t('account_name')}</th>
                                        <th style={{ textAlign: 'right' }}>{t('balance')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bankBalances.map((b, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: '600' }}>{b.bankName}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#10b981' }}>{b.balance} ₺</td>
                                        </tr>
                                    ))}
                                    {bankBalances.length === 0 && (
                                        <tr><td colSpan="2" style={{ textAlign: 'center', padding: '60px', color: '#c4c9d4' }}>
                                            <i className="fa-regular fa-folder-open" style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}></i>
                                            {t('no_records_found')}
                                        </td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="glass-card" style={{ overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-vault" style={{ color: '#10b981', fontSize: '18px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1a2332' }}>{t('cash_balances')}</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#6b7a8d', fontWeight: '500' }}>{t('cash_balances_subtitle')}</p>
                            </div>
                        </div>
                        <div style={{ padding: '8px' }}>
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>{t('cash_name')}</th>
                                        <th style={{ textAlign: 'right' }}>{t('balance')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cashBalances.map((c, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: '600' }}>{c.name}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#4f46e5' }}>{c.balance} ₺</td>
                                        </tr>
                                    ))}
                                    {cashBalances.length === 0 && (
                                        <tr><td colSpan="2" style={{ textAlign: 'center', padding: '60px', color: '#c4c9d4' }}>
                                            <i className="fa-regular fa-folder-open" style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}></i>
                                            {t('no_records_found')}
                                        </td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
