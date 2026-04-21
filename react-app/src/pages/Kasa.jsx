import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const Kasa = () => {
    const [registers, setRegisters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [newKasa, setNewKasa] = useState({ name: '', desc: '', currency: 'TRY' });

    useEffect(() => { loadCashRegisters(); }, []);

    const loadCashRegisters = () => {
        let savedRegisters = JSON.parse(localStorage.getItem('cashRegisters')) || [
            { id: 1, name: 'Merkez Nakit Kasası', desc: 'Genel Tahsilatlar', currency: 'TRY', balance: 145250.75 },
            { id: 2, name: 'Küçük Kasa', desc: 'Ofis Giderleri', currency: 'TRY', balance: 3450.00 }
        ];
        localStorage.setItem('cashRegisters', JSON.stringify(savedRegisters));
        setRegisters(savedRegisters);
    };

    const handleAddKasa = () => {
        if (!newKasa.name.trim()) return alert('Lütfen kasa adını giriniz.');
        const register = { id: Date.now(), name: newKasa.name, desc: newKasa.desc, currency: newKasa.currency, balance: 0 };
        const updated = [...registers, register];
        localStorage.setItem('cashRegisters', JSON.stringify(updated));
        setRegisters(updated);
        setShowModal(false);
        setNewKasa({ name: '', desc: '', currency: 'TRY' });
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const updated = registers.filter(reg => reg.id !== showDeleteConfirm);
            localStorage.setItem('cashRegisters', JSON.stringify(updated));
            setRegisters(updated);
            setShowDeleteConfirm(null);
        }
    };

    const formatCurrency = (val, curr = 'TRY') => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: curr }).format(val);
    const totalCash = registers.reduce((acc, reg) => acc + reg.balance, 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0d9488 0%, #064e3b 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-30px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Kasa & Nakit Yönetimi</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Şirketinizin anlık likiditesini ve nakit akışını kontrol edin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn" style={{ background: 'white', color: '#0d9488', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', border: 'none', cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                            <i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni Kasa
                        </button>
                         <button className="btn" onClick={() => exportToExcel(registers.map(r => [r.name, r.desc, r.balance]), ['Adı', 'Not', 'Bakiye'], 'kasalar', 'Kasa Listesi')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '600', borderRadius: '12px', height: '48px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '0 20px' }}>
                            Excel
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Total Liquidity Card */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TOPLAM NAKİT VARLIĞI</div>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', marginTop: '5px' }}>{formatCurrency(totalCash)}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>AKTİF PORTFÖY</div>
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#0d9488' }}>{registers.length} Adet Kasa</div>
                        </div>
                        <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                            <i className="fa-solid fa-money-bill-wave"></i>
                        </div>
                    </div>
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9' }}>
                        <h3 style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>Kasa Hesapları ve Bakiyeler</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40%' }}>Kasa Tanımı</th>
                                    <th style={{ width: '25%' }}>Açıklama / Tip</th>
                                    <th style={{ width: '20%', textAlign: 'right' }}>Bakiye</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registers.map(reg => (
                                    <tr key={reg.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f0fdfa', color: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                    <i className="fa-solid fa-wallet"></i>
                                                </div>
                                                <div style={{ fontWeight: '700', color: '#1e293b' }}>{reg.name}</div>
                                            </div>
                                        </td>
                                        <td><span className="badge-modern" style={{ background: '#f1f5f9', color: '#475569' }}>{reg.desc || reg.currency}</span></td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#0d9488', fontSize: '16px' }}>{formatCurrency(reg.balance, reg.currency)}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <Link to={`/raporlar/kasa?id=${reg.id}`} className="btn-icon" title="Ekstre"><i className="fa-solid fa-list-ul"></i></Link>
                                                <button onClick={() => setShowDeleteConfirm(reg.id)} className="btn-icon delete"><i className="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Add Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '450px', maxWidth: '95%' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'center' }}>Yeni Kasa Tanımla</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input className="input-modern" placeholder="Kasa Adı (Örn: Merkez Kasa)" value={newKasa.name} onChange={e => setNewKasa({...newKasa, name: e.target.value})} />
                            <input className="input-modern" placeholder="Kısa Açıklama" value={newKasa.desc} onChange={e => setNewKasa({...newKasa, desc: e.target.value})} />
                            <select className="input-modern" value={newKasa.currency} onChange={e => setNewKasa({...newKasa, currency: e.target.value})}>
                                <option value="TRY">Türk Lirası (₺)</option>
                                <option value="USD">Dolar ($)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', height: '48px' }} onClick={handleAddKasa}>Kayıt Tamamla</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', border: 'none', cursor: 'pointer', height: '48px' }} onClick={() => setShowModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-cash-register"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Kasayı Kapat?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu kasayı sildiğinizde içindeki nakit hareketleri geçmişi de kalıcı olarak silinecektir. Devam edilsin mi?</p>
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

export default Kasa;
