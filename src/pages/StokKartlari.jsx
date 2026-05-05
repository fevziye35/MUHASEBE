import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const INITIAL_STOCK_DATA = [
    { id: 1, code: 'STK001', barcode: '5', name: 'Brown Coffee Bean', salesPrice: 0.75, buyPrice: 0.50, stock: 120, brand: 'Makfa', group: 'TEMEL GIDA', unit: 'Adet' },
    { id: 2, code: 'STK002', barcode: '2', name: 'Buğday Ekmek Soğuk', salesPrice: 3.00, buyPrice: 2.00, stock: 45, brand: 'Makfa', group: 'TEMEL GIDA', unit: 'Adet' },
    { id: 3, code: 'STK003', barcode: '3', name: 'Çamlıca Beyaz Şurup', salesPrice: 3.50, buyPrice: 2.50, stock: 12, brand: 'Makfa', group: 'BİTKİSEL ÜRÜN', unit: 'Adet' },
    { id: 4, code: 'STK004', barcode: '4', name: 'Çaykur Çiçek Çayı', salesPrice: 22.50, buyPrice: 18.00, stock: 4, brand: 'Makfa', group: 'TEMEL GIDA', unit: 'Adet' }
];

const StokKartlari = () => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    useEffect(() => {
        let stored = JSON.parse(localStorage.getItem('stockCards'));
        if (stored === null) {
            stored = INITIAL_STOCK_DATA;
        }
        
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            setStocks(stored.filter(s => 
                (s.name || '').toLowerCase().includes(lower) || 
                (s.barcode || '').toLowerCase().includes(lower) ||
                (s.code || '').toLowerCase().includes(lower)
            ));
        } else {
            setStocks(stored);
        }
    }, [searchTerm]);

    const formatCurrency = (value) => {
        return parseFloat(value).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
    };

    const handleExcelExport = () => {
        const headers = ['Kodu', 'Barkod', 'Stok Adı', 'Satış Fiyatı', 'Bakiye', 'Marka', 'Grup'];
        const data = stocks.map(s => [s.code || '-', s.barcode || '', s.name || '', s.salesPrice || 0, `${s.stock} ${s.unit}`, s.brand || '', s.group || '']);
        exportToExcel(data, headers, 'stok_listesi', 'Stok Listesi');
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const raw = localStorage.getItem('stockCards');
            let stored = raw ? JSON.parse(raw) : INITIAL_STOCK_DATA;
            const updated = stored.filter(s => s.id !== showDeleteConfirm);
            localStorage.setItem('stockCards', JSON.stringify(updated));
            setStocks(updated);
            setShowDeleteConfirm(null);
        }
    };

    const getStockTotalValue = () => stocks.reduce((acc, s) => acc + (s.stock * s.salesPrice), 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-30px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Envanter & Stok Yönetimi</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Ürün stoklarınızı ve depo hareketlerinizi profesyonelce izleyin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to="/stok-yeni" className="btn" style={{ background: 'white', color: '#065f46', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni Stok
                        </Link>
                        <button className="btn" onClick={handleExcelExport} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '600', borderRadius: '12px', height: '48px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '0 20px' }}>
                            <i className="fa-solid fa-file-excel" style={{ marginRight: '8px' }}></i> Excel Çıktısı
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Inventory Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM ENVANTER DEĞERİ', value: formatCurrency(getStockTotalValue()), icon: 'fa-vault', color: '#10b981' },
                        { label: 'TOPLAM ÜRÜN ÇEŞİDİ', value: stocks.length, icon: 'fa-boxes-stacked', color: '#3b82f6' },
                        { label: 'KRİTİK STOK SEVİYESİ', value: stocks.filter(s => s.stock < 10).length, icon: 'fa-triangle-exclamation', color: '#ef4444' },
                        { label: 'TOPLAM STOK ADEDİ', value: stocks.reduce((acc, s) => acc + s.stock, 0), icon: 'fa-cubes', color: '#6366f1' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '5px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${stat.color}10`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                    <i className={`fa-solid ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    {/* Modern Filter bar */}
                    <div style={{ padding: '25px 30px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                            <input 
                                className="input-modern" 
                                placeholder="Ürün adı, barkod veya stok kodu ile ara..." 
                                style={{ paddingLeft: '45px', width: '100%', marginBottom: 0 }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                             <Link to="/depolar" className="btn" style={{ background: '#f1f5f9', color: '#475569', fontWeight: '700', borderRadius: '12px', height: '42px', display: 'inline-flex', alignItems: 'center', fontSize: '13px', textDecoration: 'none', padding: '0 15px' }}>Depolar</Link>
                             <Link to="/markalar" className="btn" style={{ background: '#f1f5f9', color: '#475569', fontWeight: '700', borderRadius: '12px', height: '42px', display: 'inline-flex', alignItems: 'center', fontSize: '13px', textDecoration: 'none', padding: '0 15px' }}>Markalar</Link>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>Kod / Barkod</th>
                                    <th style={{ width: '30%' }}>Ürün Adı</th>
                                    <th style={{ width: '15%' }}>Kategori</th>
                                    <th style={{ width: '15%', textAlign: 'right' }}>Birim Fiyat</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>Stok</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((s) => {
                                    const isLow = s.stock < 10;
                                    return (
                                        <tr key={s.id}>
                                            <td>
                                                <div style={{ fontWeight: '700', color: '#1e293b' }}>{s.code}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.barcode}</div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div style={{ width: '35px', height: '35px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                        <i className="fa-solid fa-box"></i>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{s.name}</div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.brand}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="badge-modern" style={{ background: '#eff6ff', color: '#1e40af' }}>{s.group}</span></td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#1e293b' }}>{formatCurrency(s.salesPrice)}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <span style={{ 
                                                    padding: '6px 12px', 
                                                    borderRadius: '10px', 
                                                    fontWeight: '800', 
                                                    fontSize: '13px',
                                                    background: isLow ? '#fef2f2' : '#f0fdf4',
                                                    color: isLow ? '#ef4444' : '#16a34a',
                                                    border: `1px solid ${isLow ? '#fee2e2' : '#dcfce7'}`
                                                }}>
                                                    {s.stock} {s.unit}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    <Link to={`/stok-duzenle/${s.id}`} className="btn-icon" title="Düzenle"><i className="fa-solid fa-edit"></i></Link>
                                                    <Link to={`/stok-detay/${s.id}`} className="btn-icon" title="Detay"><i className="fa-solid fa-chart-line"></i></Link>
                                                    <button 
                                                        onClick={() => setShowDeleteConfirm(s.id)}
                                                        className="btn-icon delete"
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
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Stok Kartını Sil?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu ürünü sildiğinizde ilgili tüm depo hareketleri ve satış geçmişi de etkilenecektir. Onaylıyor musunuz?</p>
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

export default StokKartlari;
