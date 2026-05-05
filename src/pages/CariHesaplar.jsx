import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const CariHesaplar = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('customers')) || [
            { id: 1, name: 'ABC Ticaret LTD', group: 'MÜŞTERİLER', balance: '125,450.00' },
            { id: 2, name: 'XYZ Mühendislik A.Ş', group: 'TEDARİKCİLER', balance: '-45,200.00' },
            { id: 3, name: 'Mehmet Ali Kaya', group: 'MÜŞTERİLER', balance: '12,800.00' },
            { id: 4, name: 'Yılmaz Gıda Sanayi', group: 'TEDARİKCİLER', balance: '-3,150.00' }
        ];

        let filtered = stored;
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            filtered = filtered.filter(c => (c.name || '').toLowerCase().includes(lower));
        }
        if (selectedGroup) {
            filtered = filtered.filter(c => c.group === selectedGroup);
        }
        setCustomers(filtered);
    }, [searchTerm, selectedGroup]);

    const handleExcelExport = () => {
        const headers = ['Cari Adı', 'Grup', 'Bakiye'];
        const data = customers.map(c => [c.name, c.group, c.balance]);
        exportToExcel(data, headers, 'cari_listesi', 'Cari Listesi');
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const stored = JSON.parse(localStorage.getItem('customers')) || [];
            const updated = stored.filter(c => c.id !== showDeleteConfirm);
            localStorage.setItem('customers', JSON.stringify(updated));
            setCustomers(updated);
            setShowDeleteConfirm(null);
        }
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Cari Hesap Yönetimi</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Müşteri ve tedarikçi bakiye dengelerini akıllıca takip edin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to="/cari-yeni" className="btn" style={{ background: 'white', color: '#1e293b', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i> Yeni Kayıt
                        </Link>
                        <button className="btn" onClick={handleExcelExport} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '600', borderRadius: '12px', height: '48px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '0 20px' }}>
                            <i className="fa-solid fa-file-excel" style={{ marginRight: '8px' }}></i> Excel
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Finance Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM ALACAK', value: '185.750,00 TL', icon: 'fa-arrow-trend-up', color: '#10b981' },
                        { label: 'TOPLAM BORÇ', value: '62.400,00 TL', icon: 'fa-arrow-trend-down', color: '#ef4444' },
                        { label: 'NET DURUM', value: '123.350,00 TL', icon: 'fa-scale-balanced', color: '#3b82f6' },
                        { label: 'KAYITLI CARİ', value: customers.length, icon: 'fa-users-viewfinder', color: '#6366f1' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '5px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                                </div>
                                <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: `${stat.color}10`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                                    <i className={`fa-solid ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    {/* Modern Search/Filter Bar */}
                    <div style={{ padding: '25px 30px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '15px', flex: 1, minWidth: '300px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                                <input 
                                    className="input-modern" 
                                    placeholder="Cari adı veya yetkili ara..." 
                                    style={{ paddingLeft: '45px', width: '100%', marginBottom: 0 }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select 
                                className="input-modern" 
                                style={{ width: '200px', marginBottom: 0 }}
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                            >
                                <option value="">Tüm Kategoriler</option>
                                <option value="MÜŞTERİLER">Müşteriler</option>
                                <option value="TEDARİKCİLER">Tedarikçiler</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                             <Link to="/gruplar" className="btn" style={{ background: '#f1f5f9', color: '#475569', fontWeight: '700', borderRadius: '12px', height: '42px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', textDecoration: 'none', padding: '0 15px' }}>Gruplar</Link>
                             <Link to="/mahsup-fisi" className="btn" style={{ background: '#f1f5f9', color: '#475569', fontWeight: '700', borderRadius: '12px', height: '42px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', textDecoration: 'none', padding: '0 15px' }}>Mahsup Fişi</Link>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '45%' }}>Cari Bilgileri</th>
                                    <th style={{ width: '20%' }}>Kategori</th>
                                    <th style={{ width: '20%', textAlign: 'right' }}>Güncel Bakiye</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((c) => {
                                    const isDebt = parseFloat((c.balance || '0').replace(/\./g, '').replace(',', '.')) < 0;
                                    return (
                                        <tr key={c.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#1e293b', fontSize: '14px' }}>
                                                        {getInitials(c.name)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{c.name}</div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID: #CAR-{c.id.toString().padStart(4, '0')}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge-modern" style={{ background: c.group === 'MÜŞTERİLER' ? '#ecfdf5' : '#fef2f2', color: c.group === 'MÜŞTERİLER' ? '#059669' : '#b91c1c' }}>
                                                    {c.group}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: '800', color: isDebt ? '#ef4444' : '#10b981', fontSize: '16px' }}>
                                                    {c.balance} <span style={{ fontSize: '11px', opacity: 0.7 }}>TL</span>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    <Link to={`/cari-duzenle/${c.id}`} className="btn-icon" title="Düzenle"><i className="fa-solid fa-pen"></i></Link>
                                                    <Link to={`/cari-detay/${c.id}`} className="btn-icon" title="Detay"><i className="fa-solid fa-eye"></i></Link>
                                                    <button 
                                                        onClick={() => setShowDeleteConfirm(c.id)}
                                                        className="btn-icon delete"
                                                        title="Sil"
                                                    ><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Custom Premium Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-user-minus"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Cari Hesabı Sil?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Seçili müşteriyi sildiğinizde bağlı tüm borç/alacak kayıtları da etkilenecektir. Devam etmek istiyor musunuz?</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={confirmDelete}>Evet, Sil</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CariHesaplar;
