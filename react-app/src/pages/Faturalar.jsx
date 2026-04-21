import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';
import { useBranch } from '../context/BranchContext';
import '../styles/global.css';

const Faturalar = () => {
    const navigate = useNavigate();
    const { currentBranch } = useBranch();
    const [invoices, setInvoices] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // Full object for identification
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        search: '',
        type: ''
    });

    useEffect(() => {
        const today = new Date();
        const lastYear = new Date();
        lastYear.setFullYear(today.getFullYear() - 1);
        setFilters(prev => ({
            ...prev,
            startDate: lastYear.toISOString().split('T')[0],
            endDate: today.toISOString().split('T')[0]
        }));
    }, []);

    useEffect(() => {
        loadInvoices();
    }, [filters, currentBranch]);

    const loadInvoices = () => {
        const filterByBranch = (list) => list.filter(item => (item.branchId || 'merkez') === currentBranch.id);
        const purchaseInvoices = filterByBranch(JSON.parse(localStorage.getItem('purchaseInvoices')) || []);
        const salesInvoices = filterByBranch(JSON.parse(localStorage.getItem('salesInvoices')) || []);
        
        let all = [
            ...purchaseInvoices.map(inv => ({ ...inv, type: 'alis', typeLabel: 'Alış Faturası' })),
            ...salesInvoices.map(inv => ({ ...inv, type: 'satis', typeLabel: 'Satış Faturası' }))
        ];

        const filtered = all.filter(inv => {
            const invDate = inv.date;
            let dateMatch = (filters.startDate ? invDate >= filters.startDate : true) && (filters.endDate ? invDate <= filters.endDate : true);
            let typeMatch = filters.type ? inv.type === filters.type : true;
            let searchMatch = true;
            if (filters.search) {
                const term = filters.search.toLowerCase();
                searchMatch = (inv.cariCode || '').toLowerCase().includes(term) || (inv.descTitle || '').toLowerCase().includes(term) || (inv.invoiceNo || '').toLowerCase().includes(term);
            }
            return dateMatch && typeMatch && searchMatch;
        });
        setInvoices(filtered.sort((a,b) => new Date(b.date) - new Date(a.date)));
    };

    const formatMoney = (amount) => parseFloat(amount || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';

    const handleExportExcel = () => {
        const headers = ['Ünvan', 'Tarih', 'G.Toplam', 'Tür', 'No', 'Açıklama'];
        const data = invoices.map(inv => [inv.cariCode || '-', inv.date || '', formatMoney(inv.grandTotal), inv.typeLabel || '', inv.invoiceNo || '-', inv.descTitle || '-']);
        exportToExcel(data, headers, 'fatura_listesi', 'Faturalar');
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const storageKey = showDeleteConfirm.type === 'alis' ? 'purchaseInvoices' : 'salesInvoices';
            const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
            const index = stored.findIndex(inv => inv.invoiceNo === showDeleteConfirm.invoiceNo && inv.date === showDeleteConfirm.date && inv.grandTotal === showDeleteConfirm.grandTotal);
            if (index !== -1) {
                stored.splice(index, 1);
                localStorage.setItem(storageKey, JSON.stringify(stored));
                loadInvoices();
                setShowDeleteConfirm(null);
            }
        }
    };

    const totalSales = invoices.filter(i => i.type === 'satis').reduce((acc, i) => acc + parseFloat(i.grandTotal || 0), 0);
    const totalPurchase = invoices.filter(i => i.type === 'alis').reduce((acc, i) => acc + parseFloat(i.grandTotal || 0), 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Fatura ve Belge Yönetimi</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Tüm alış ve satış faturalarınızı tek kanaldan kontrol edin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/satis-yap" className="btn" style={{ background: '#10b981', color: 'white', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>+ Yeni Satış</Link>
                        <Link to="/alis-yap" className="btn" style={{ background: '#ef4444', color: 'white', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>+ Yeni Alış</Link>
                        <button className="btn" onClick={handleExportExcel} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '600', borderRadius: '12px', height: '48px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '0 20px' }}>Excel</button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Invoice Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM SATIŞ (G.T)', value: formatMoney(totalSales), icon: 'fa-arrow-trend-up', color: '#10b981' },
                        { label: 'TOPLAM ALIŞ (G.T)', value: formatMoney(totalPurchase), icon: 'fa-arrow-trend-down', color: '#ef4444' },
                        { label: 'BELGE SAYISI', value: invoices.length, icon: 'fa-file-lines', color: '#6366f1' },
                        { label: 'FARK / NET DURUM', value: formatMoney(totalSales - totalPurchase), icon: 'fa-scale-balanced', color: '#f59e0b' }
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
                    {/* Advanced Filter Bar */}
                    <div style={{ padding: '25px 30px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: '15px' }}>
                        <div>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Başlangıç</label>
                            <input type="date" className="input-modern" style={{ width: '100%', marginBottom: 0 }} value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} />
                        </div>
                        <div>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Bitiş</label>
                            <input type="date" className="input-modern" style={{ width: '100%', marginBottom: 0 }} value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} />
                        </div>
                        <div>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Filtrele</label>
                            <select className="input-modern" style={{ width: '100%', marginBottom: 0 }} value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
                                <option value="">Tüm Faturalar</option>
                                <option value="satis">Satış Faturaları</option>
                                <option value="alis">Alış Faturaları</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Hızlı Arama</label>
                            <input className="input-modern" style={{ width: '100%', marginBottom: 0 }} placeholder="Ünvan veya No..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>Cari Bilgisi</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>Tarih</th>
                                    <th style={{ width: '15%', textAlign: 'right' }}>Genel Toplam</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>Fatura Türü</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>No</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: inv.type === 'alis' ? '#fef2f2' : '#f0fdf4', color: inv.type === 'alis' ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                    <i className={`fa-solid ${inv.type === 'alis' ? 'fa-file-import' : 'fa-file-export'}`}></i>
                                                </div>
                                                <div style={{ fontWeight: '700', color: '#1e293b' }}>{inv.cariCode || '-'}</div>
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>{inv.date}</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: inv.type === 'alis' ? '#ef4444' : '#10b981' }}>{formatMoney(inv.grandTotal)}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className="badge-modern" style={{ background: inv.type === 'alis' ? '#991b1b20' : '#065f4620', color: inv.type === 'alis' ? '#991b1b' : '#065f46' }}>
                                                {inv.typeLabel}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{inv.invoiceNo}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <Link to={`/fatura-detay/${inv.invoiceNo}`} className="btn-icon" title="Detay"><i className="fa-solid fa-eye"></i></Link>
                                                <button onClick={() => setShowDeleteConfirm(inv)} className="btn-icon delete" title="Sil"><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-file-circle-exclamation"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Faturayı Sil?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu fatura kaydını sildiğinizde cari bakiye ve stok hareketleri geri alınamayacak şekilde etkilenecektir. Emin misiniz?</p>
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

export default Faturalar;
