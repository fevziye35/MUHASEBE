import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const CompanyDebts = () => {
    const [debts, setDebts] = useState(() => {
        try {
            const saved = localStorage.getItem('companyDebtsData');
            if (saved) return JSON.parse(saved);
        } catch (e) { console.error(e); }
        return [
            { id: 1, vendor: 'Öztürk Gıda Tedarik', contact: 'Kemal Ak', category: 'Hammadde', totalAmount: 85000, currency: '₺', date: '2024-04-01', payments: [{ date: '2024-04-05', amount: 35000, note: '1. Ödememiz' }] }
        ];
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const [newDebt, setNewDebt] = useState({ vendor: '', contact: '', category: '', totalAmount: '', currency: '₺', initialPayment: '', date: new Date().toISOString().split('T')[0] });
    const [newPayment, setNewPayment] = useState({ amount: '', date: new Date().toISOString().split('T')[0], note: '' });

    useEffect(() => {
        localStorage.setItem('companyDebtsData', JSON.stringify(debts));
    }, [debts]);

    const formatCurrency = (val, curr = '₺') => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val || 0).replace('₺', curr);
    };

    const handleSaveDebt = () => {
        if (!newDebt.vendor || !newDebt.totalAmount) return alert('Lütfen zorunlu alanları doldurun.');
        const debtToAdd = {
            id: Date.now(),
            vendor: newDebt.vendor,
            contact: newDebt.contact,
            category: newDebt.category,
            totalAmount: Number(newDebt.totalAmount),
            currency: newDebt.currency,
            date: newDebt.date,
            payments: newDebt.initialPayment ? [{ date: newDebt.date, amount: Number(newDebt.initialPayment), note: '1. Ödeme' }] : []
        };
        setDebts([debtToAdd, ...debts]);
        setShowAddModal(false);
        setNewDebt({ vendor: '', contact: '', category: '', totalAmount: '', currency: '₺', initialPayment: '', date: new Date().toISOString().split('T')[0] });
    };

    const handleAddPayment = () => {
        if (!newPayment.amount) return alert('Lütfen tutar girin.');
        setDebts(debts.map(d => {
            if (d.id === showPaymentModal) {
                return { ...d, payments: [...d.payments, { ...newPayment, amount: Number(newPayment.amount), note: newPayment.note || `${d.payments.length + 1}. Ödememiz` }] };
            }
            return d;
        }));
        setShowPaymentModal(null);
        setNewPayment({ amount: '', date: new Date().toISOString().split('T')[0], note: '' });
    };

    const totalDebt = debts.reduce((acc, d) => acc + d.totalAmount, 0);
    const totalPaid = debts.reduce((acc, d) => acc + d.payments.reduce((pAcc, p) => pAcc + p.amount, 0), 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #450a0a 0%, #1e1b4b 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Tedarikçi & Borç Yönetimi</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: '18px' }}>Piyasa itibarınızı ve ödeme dengelerinizi buradan analiz edin.</p>
                    </div>
                    <button className="btn" style={{ background: '#ef4444', color: 'white', fontWeight: '800', borderRadius: '14px', height: '54px', padding: '0 30px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)' }} onClick={() => setShowAddModal(true)}>
                        <i className="fa-solid fa-file-invoice-dollar" style={{ marginRight: '10px' }}></i> Yeni Borç Kaydı Ekle
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Financial Health Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
                    <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '10px' }}>TOPLAM BORCUMUZ</div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#1e293b' }}>{formatCurrency(totalDebt)}</div>
                    </div>
                    <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '10px' }}>ÖDEDİĞİMİZ TUTAR</div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#10b981' }}>{formatCurrency(totalPaid)}</div>
                    </div>
                    <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '10px' }}>KALAN RİSK</div>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#ef4444' }}>{formatCurrency(totalDebt - totalPaid)}</div>
                    </div>
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '30px', background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#1e293b' }}>Borç & Taksit Dökümü</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>Tedarikçi / Firma</th>
                                    <th>Kategori</th>
                                    <th style={{ textAlign: 'right' }}>Toplam Borç</th>
                                    <th style={{ textAlign: 'right' }}>Ödenen</th>
                                    <th style={{ textAlign: 'right' }}>Kalan</th>
                                    <th style={{ width: '30%' }}>Ödeme Geçmişimiz</th>
                                    <th style={{ textAlign: 'center' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {debts.map(d => {
                                    const paid = d.payments.reduce((acc, p) => acc + p.amount, 0);
                                    const balance = d.totalAmount - paid;
                                    return (
                                        <tr key={d.id}>
                                            <td>
                                                <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '15px' }}>{d.vendor}</div>
                                                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Yetkili: {d.contact}</div>
                                            </td>
                                            <td><span style={{ padding: '6px 12px', background: '#fef2f2', color: '#991b1b', borderRadius: '10px', fontSize: '12px', fontWeight: '800' }}>{d.category}</span></td>
                                            <td style={{ textAlign: 'right', fontWeight: '700' }}>{formatCurrency(d.totalAmount, d.currency)}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#10b981' }}>{formatCurrency(paid, d.currency)}</td>
                                            <td style={{ textAlign: 'right', fontWeight: '900', color: balance > 0 ? '#ef4444' : '#10b981' }}>{formatCurrency(balance, d.currency)}</td>
                                            <td>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                                    {d.payments.map((p, idx) => (
                                                        <div key={idx} style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', color: '#475569', border: '1px solid #e2e8f0', fontWeight: '700' }}>
                                                            {idx+1}. Ödeme: {formatCurrency(p.amount, d.currency)}
                                                        </div>
                                                    ))}
                                                    <button onClick={() => setShowPaymentModal(d.id)} style={{ background: '#1e1b4b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', transition: '0.3s' }}>
                                                        <i className="fa-solid fa-plus-circle"></i> Taksit Öde
                                                    </button>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className="btn-icon delete" onClick={() => setShowDeleteConfirm(d.id)}><i className="fa-solid fa-trash-can"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Add Modal */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '32px', width: '600px', maxWidth: '95%', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: '900', color: '#1e293b', textAlign: 'center' }}>Yeni Borç Tanımlama</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>TEDARİKÇİ / FİRMA</label>
                                <input className="input-modern" placeholder="Firma adını giriniz..." onChange={e => setNewDebt({...newDebt, vendor: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>İLGİLİ KİŞİ</label>
                                <input className="input-modern" placeholder="Ad Soyad" onChange={e => setNewDebt({...newDebt, contact: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>KATEGORİ</label>
                                <input className="input-modern" placeholder="Örn: Hammadde" onChange={e => setNewDebt({...newDebt, category: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>PARA BİRİMİ</label>
                                <select className="input-modern" onChange={e => setNewDebt({...newDebt, currency: e.target.value})}>
                                    <option value="₺">₺ (TL)</option><option value="$">$ (USD)</option><option value="€">€ (EUR)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>TOPLAM BORÇ</label>
                                <input className="input-modern" type="number" placeholder="0,00" onChange={e => setNewDebt({...newDebt, totalAmount: e.target.value})} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '15px', height: '54px', fontWeight: '800' }} onClick={handleSaveDebt}>Kayıt Oluştur</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '15px', height: '54px', fontWeight: '800' }} onClick={() => setShowAddModal(false)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Payment Modal */}
            {showPaymentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '32px', width: '450px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={{ width: '60px', height: '60px', background: '#f0f9ff', color: '#3b82f6', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 15px' }}><i className="fa-solid fa-money-bill-transfer"></i></div>
                            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>Ödeme Çıkar</h2>
                            <p style={{ margin: '5px 0 0', color: '#64748b', fontWeight: '500' }}>{debts.find(d => d.id === showPaymentModal)?.vendor}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>ÖDENECEK TUTAR</label>
                                <input className="input-modern" type="number" placeholder="0,00" onChange={e => setNewPayment({...newPayment, amount: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>ÖDEME TARİHİ</label>
                                <input className="input-modern" type="date" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '15px', height: '54px', fontWeight: '800', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.2)' }} onClick={handleAddPayment}>Ödemeyi Onayla</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '15px', height: '54px', fontWeight: '800' }} onClick={() => setShowPaymentModal(null)}>Kapat</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}><i className="fa-solid fa-trash-can"></i></div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Borç Kaydını Sil?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Dikkat! Bu tedarikçi kaydını sildiğinizde bağlı olan tüm ödeme geçmişiniz de kalıcı olarak sistemden kaldırılacaktır.</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '12px', height: '45px', fontWeight: '700', border: 'none' }} onClick={() => { setDebts(debts.filter(d => d.id !== showDeleteConfirm)); setShowDeleteConfirm(null); }}>Evet, Sil</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', fontWeight: '700', border: 'none' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDebts;
