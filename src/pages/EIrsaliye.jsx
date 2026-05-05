import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const EIrsaliye = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('list');
    const [deliveryNotes, setDeliveryNotes] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [irsaliyeNo, setIrsaliyeNo] = useState('');
    const [tarih, setTarih] = useState(new Date().toISOString().split('T')[0]);
    const [recipient, setRecipient] = useState({ vergiNo: '', unvan: '', adres: '' });
    const [products, setProducts] = useState([
        { name: '', quantity: 1, unit: 'Adet' },
        { name: '', quantity: 1, unit: 'Adet' }
    ]);

    useEffect(() => {
        loadData();
        generateDeliveryNoteNumber();
    }, []);

    const loadData = () => {
        const data = JSON.parse(localStorage.getItem('salesWaybills') || '[]');
        if (data.length === 0) {
            const initialData = [
                { id: 1, waybillNo: 'IRS20260414001', customer: 'Global Lojistik A.Ş.', date: '2026-04-14', grandTotal: 45200.00, status: 'Onaylandı' },
                { id: 2, waybillNo: 'IRS20260414002', customer: 'Marmara Gıda Ltd.', date: '2026-04-14', grandTotal: 12500.00, status: 'Beklemede' }
            ];
            setDeliveryNotes(initialData);
            localStorage.setItem('salesWaybills', JSON.stringify(initialData));
        } else {
            setDeliveryNotes(data);
        }
    };

    const generateDeliveryNoteNumber = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        setIrsaliyeNo(`IRS${year}${month}${day}${random}`);
    };

    const handleSaveNote = () => {
        if (!recipient.unvan) return alert('Lütfen alıcı ünvanını giriniz.');
        const note = { id: Date.now(), waybillNo: irsaliyeNo, customer: recipient.unvan, date: tarih, grandTotal: 0, status: 'Onaylandı' };
        const updated = [note, ...deliveryNotes];
        localStorage.setItem('salesWaybills', JSON.stringify(updated));
        setDeliveryNotes(updated);
        setActiveTab('list');
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const updated = deliveryNotes.filter(item => item.id !== showDeleteConfirm);
            localStorage.setItem('salesWaybills', JSON.stringify(updated));
            setDeliveryNotes(updated);
            setShowDeleteConfirm(null);
        }
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Lojistik Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #78350f 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '250px', height: '250px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                             <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(10px)' }}>
                                <i className="fa-solid fa-truck-ramp-box"></i>
                             </div>
                             <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>E-İrsaliye Terminali</h1>
                        </div>
                        <p style={{ margin: 0, opacity: 0.8, fontSize: '18px', fontWeight: '500' }}>Sevkiyat ve lojistik belgelerinizi dijital ortamda saniyeler içinde düzenleyin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                         <button className="btn" style={{ background: 'white', color: '#b45309', fontWeight: '800', borderRadius: '14px', height: '52px', padding: '0 30px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={() => setActiveTab('create')}>
                            <i className="fa-solid fa-plus-circle"></i> Yeni İrsaliye
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-50px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Lojistik Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM SEVKİYAT', value: deliveryNotes.length, icon: 'fa-box-open', color: '#f59e0b' },
                        { label: 'ONAYLANAN', value: deliveryNotes.filter(d => d.status === 'Onaylandı').length, icon: 'fa-check-double', color: '#10b981' },
                        { label: 'BEKLEMEDE', value: deliveryNotes.filter(d => d.status === 'Beklemede').length, icon: 'fa-clock', color: '#3b82f6' },
                        { label: 'HESAP HATALARI', value: '0', icon: 'fa-bug', color: '#ef4444' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                                    <div style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b', marginTop: '5px' }}>{stat.value}</div>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                    <i className={`fa-solid ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '10px 30px', display: 'flex', gap: '30px', borderBottom: '1px solid #f1f5f9' }}>
                        <button onClick={() => setActiveTab('list')} style={{ padding: '20px 0', border: 'none', background: 'none', fontWeight: '800', color: activeTab === 'list' ? '#f59e0b' : '#94a3b8', borderBottom: activeTab === 'list' ? '3px solid #f59e0b' : '3px solid transparent', cursor: 'pointer', transition: '0.3s' }}>İrsaliye Arşivi</button>
                        <button onClick={() => setActiveTab('create')} style={{ padding: '20px 0', border: 'none', background: 'none', fontWeight: '800', color: activeTab === 'create' ? '#f59e0b' : '#94a3b8', borderBottom: activeTab === 'create' ? '3px solid #f59e0b' : '3px solid transparent', cursor: 'pointer', transition: '0.3s' }}>Yeni Belge Oluştur</button>
                    </div>

                    <div style={{ padding: '30px' }}>
                        {activeTab === 'list' ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="standard-data-table">
                                    <thead>
                                        <tr>
                                            <th>İrsaliye No</th>
                                            <th>Alıcı Firma</th>
                                            <th>Belge Tarihi</th>
                                            <th style={{ textAlign: 'right' }}>Döviz / Tutar</th>
                                            <th style={{ textAlign: 'center' }}>Durum</th>
                                            <th style={{ textAlign: 'center' }}>Eylemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deliveryNotes.map((inv, idx) => (
                                            <tr key={idx}>
                                                <td style={{ fontWeight: '800', color: '#0f172a' }}>{inv.waybillNo}</td>
                                                <td style={{ fontWeight: '700', color: '#475569' }}>{inv.customer}</td>
                                                <td style={{ fontSize: '13px', color: '#94a3b8' }}>{inv.date}</td>
                                                <td style={{ textAlign: 'right', fontWeight: '800', color: '#b45309' }}>{(inv.grandTotal || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <span className="badge-modern" style={{ background: inv.status === 'Onaylandı' ? '#f0fdf4' : '#eff6ff', color: inv.status === 'Onaylandı' ? '#16a34a' : '#2563eb' }}>
                                                        {inv.status || 'Aktif'}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                        <button className="btn-icon" title="Görüntüle"><i className="fa-solid fa-eye"></i></button>
                                                        <button onClick={() => setShowDeleteConfirm(inv.id)} className="btn-icon delete"><i className="fa-solid fa-trash-can"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>Sevk & Alıcı Bilgileri</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <input className="input-modern" placeholder="Alıcı Firma Ünvanı" value={recipient.unvan} onChange={e => setRecipient({...recipient, unvan: e.target.value})} />
                                        <input className="input-modern" placeholder="VKN / TCKN" value={recipient.vergiNo} onChange={e => setRecipient({...recipient, vergiNo: e.target.value})} />
                                        <input className="input-modern" placeholder="İrsaliye No (Otomatik)" value={irsaliyeNo} readOnly />
                                        <input className="input-modern" type="date" value={tarih} onChange={e => setTarih(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>Sevkiyat Onayı</h4>
                                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>Oluşturacağınız irsaliye GİB sistemine taslak olarak gönderilecektir. Onay işleminden sonra resmi kıymet kazanır.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button className="btn" style={{ flex: 1, background: '#f59e0b', color: 'white', borderRadius: '12px', height: '48px', fontWeight: '800' }} onClick={handleSaveNote}>Taslak Oluştur</button>
                                        <button className="btn" style={{ flex: 1, background: 'white', color: '#64748b', borderRadius: '12px', border: '1px solid #cbd5e1', height: '48px', fontWeight: '700' }} onClick={() => setActiveTab('list')}>Vazgeç</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-truck-fade"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>İrsaliyeyi İptal Et?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu sevkiyat belgesini sildiğinizde lojistik kayıtlarından kalıcı olarak kaldırılacaktır. Devam edilsin mi?</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={confirmDelete}>Evet, Kaldır</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EIrsaliye;
