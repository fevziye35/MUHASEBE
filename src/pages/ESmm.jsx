import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const ESmm = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('list');
    const [invoices, setInvoices] = useState([]);
    const [settings, setSettings] = useState({ serviceUrl: 'https://api.isnet.net.tr/E-SMM/Servis', apiUser: '', apiPassword: '', apiType: 'isNet' });

    useEffect(() => {
        const savedSettings = localStorage.getItem('esmmSettings');
        if (savedSettings) setSettings(JSON.parse(savedSettings));
        loadData();
    }, []);

    const loadData = () => {
        const data = JSON.parse(localStorage.getItem('esmm') || '[]');
        if (data.length === 0) {
            const initialData = [
                { id: 1, invoiceNo: 'SMM202600001', title: 'Aydın Danışmanlık Hizmetleri', date: '2026-04-14', amount: 15000.00, status: 'Onaylandı' },
                { id: 2, invoiceNo: 'SMM202600002', title: 'Global Yazılım Çözümleri', date: '2026-04-14', amount: 8500.00, status: 'Beklemede' }
            ];
            setInvoices(initialData);
            localStorage.setItem('esmm', JSON.stringify(initialData));
        } else setInvoices(data);
    };

    const handleSaveSettings = () => {
        localStorage.setItem('esmmSettings', JSON.stringify(settings));
        alert('API Entegrasyon Ayarları Güncellendi!');
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium SMM Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                             <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(10px)' }}>
                                <i className="fa-solid fa-file-signature"></i>
                             </div>
                             <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>E-SMM Yönetimi</h1>
                        </div>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '18px', fontWeight: '500' }}>Serbest meslek makbuzlarınızı kurumsal bir ciddiyetle dijital mühür altına alın.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                         <button className="btn" style={{ background: 'white', color: '#065f46', fontWeight: '800', borderRadius: '14px', height: '52px', padding: '0 30px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setActiveTab('create')}>
                            <i className="fa-solid fa-plus-circle"></i> Makbuz Oluştur
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-50px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* SMM Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM DÜZENLENEN', value: invoices.length, icon: 'fa-copy', color: '#059669' },
                        { label: 'BRÜT HAKEDİŞ', value: formatCurrency(invoices.reduce((acc, i) => acc + i.amount, 0)), icon: 'fa-coins', color: '#10b981' },
                        { label: 'BEKLEYEN MAKBUZLAR', value: invoices.filter(i => i.status === 'Beklemede').length, icon: 'fa-hourglass-half', color: '#f59e0b' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 15px 35px -5px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}><i className={`fa-solid ${stat.icon}`}></i></div>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>{stat.label}</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '10px 30px', display: 'flex', gap: '30px', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={() => setActiveTab('list')} style={{ padding: '20px 0', border: 'none', background: 'none', fontWeight: '800', color: activeTab === 'list' ? '#059669' : '#94a3b8', borderBottom: activeTab === 'list' ? '3px solid #059669' : '3px solid transparent', cursor: 'pointer' }}>Makbuz Arşivi</button>
                        <button onClick={() => setActiveTab('settings')} style={{ padding: '20px 0', border: 'none', background: 'none', fontWeight: '800', color: activeTab === 'settings' ? '#059669' : '#94a3b8', borderBottom: activeTab === 'settings' ? '3px solid #059669' : '3px solid transparent', cursor: 'pointer' }}>API Entegrasyonu</button>
                    </div>

                    <div style={{ padding: '30px' }}>
                        {activeTab === 'list' ? (
                            <table className="standard-data-table">
                                <thead>
                                    <tr>
                                        <th>Makbuz No</th>
                                        <th>Müşteri / Danışan</th>
                                        <th>Tarih</th>
                                        <th style={{ textAlign: 'right' }}>Makbuz Tutarı</th>
                                        <th style={{ textAlign: 'center' }}>Durum</th>
                                        <th style={{ textAlign: 'center' }}>Eylem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((inv, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: '800', color: '#0f172a' }}><i className="fa-solid fa-paper-plane" style={{ marginRight: '8px', color: '#cbd5e1' }}></i>{inv.invoiceNo}</td>
                                            <td style={{ fontWeight: '700', color: '#475569' }}>{inv.title}</td>
                                            <td style={{ fontSize: '13px', color: '#94a3b8' }}>{inv.date}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '900', color: '#059669' }}>{formatCurrency(inv.amount)}</td>
                                            <td style={{ textAlign: 'center' }}><span className="badge-modern success" style={{ background: inv.status === 'Onaylandı' ? '#f0fdf4' : '#fef2f2', color: inv.status === 'Onaylandı' ? '#16a34a' : '#ef4444' }}>{inv.status}</span></td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="btn-icon" title="Görüntüle"><i className="fa-solid fa-file-pdf"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <div style={{ background: '#f8fafc', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ margin: '0 0 30px 0', fontWeight: '800', textAlign: 'center' }}>E-SMM Entegrasyon Ayarları</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div style={{ gridColumn: 'span 2' }}>
                                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px', display: 'block' }}>SERVİS URL (ENDPOINT)</label>
                                            <input className="input-modern" value={settings.serviceUrl} onChange={e => setSettings({...settings, serviceUrl: e.target.value})} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px', display: 'block' }}>KULLANICI ADI</label>
                                            <input className="input-modern" value={settings.apiUser} onChange={e => setSettings({...settings, apiUser: e.target.value})} placeholder="API Kullanıcı" />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px', display: 'block' }}>API PAROLASI</label>
                                            <input className="input-modern" type="password" value={settings.apiPassword} onChange={e => setSettings({...settings, apiPassword: e.target.value})} placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <button className="btn" style={{ width: '100%', background: '#059669', color: 'white', fontWeight: '800', borderRadius: '14px', height: '54px', marginTop: '30px', border: 'none' }} onClick={handleSaveSettings}>Entegrasyonu Doğrula ve Kaydet</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ESmm;
