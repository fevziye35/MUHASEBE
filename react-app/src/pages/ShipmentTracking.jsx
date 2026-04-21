import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const ShipmentTracking = () => {
    const [shipments, setShipments] = useState(() => {
        try {
            const saved = localStorage.getItem('shipmentsData');
            if (saved) return JSON.parse(saved);
        } catch (e) { console.error(e); }
        return [
            { id: 1, name: 'Ahmet', surname: 'Yılmaz', company: 'Yılmaz Lojistik', shipmentType: 'Kara Yolu', invoiceAmount: 15000, currency: 'TL', date: '2024-04-10', payments: [{ date: '2024-04-10', amount: 12500, note: '1. Ödeme' }] }
        ];
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // ID to delete
    
    const [newShipment, setNewShipment] = useState({
        name: '', surname: '', company: '', shipmentType: 'Kara Yolu', currency: 'TL', invoiceAmount: '', initialPayment: '', date: new Date().toISOString().split('T')[0]
    });
    const [newPayment, setNewPayment] = useState({ amount: '', date: new Date().toISOString().split('T')[0], note: '' });

    useEffect(() => {
        localStorage.setItem('shipmentsData', JSON.stringify(shipments));
    }, [shipments]);

    const formatCurrency = (val, curr = 'TL') => {
        try {
            return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: curr || 'TL' }).format(val || 0);
        } catch (e) { return (val || 0) + ' ' + curr; }
    };

    const handleSaveShipment = () => {
        if (!newShipment.name || !newShipment.company || !newShipment.invoiceAmount) return alert('Lütfen zorunlu alanları doldurun.');
        const shipmentToAdd = {
            id: Date.now(),
            name: newShipment.name,
            surname: newShipment.surname,
            company: newShipment.company,
            shipmentType: newShipment.shipmentType,
            invoiceAmount: Number(newShipment.invoiceAmount),
            currency: newShipment.currency,
            date: newShipment.date,
            payments: newShipment.initialPayment ? [{ date: newShipment.date, amount: Number(newShipment.initialPayment), note: '1. Ödeme' }] : []
        };
        setShipments([shipmentToAdd, ...shipments]);
        setShowAddModal(false);
        setNewShipment({ name: '', surname: '', company: '', shipmentType: 'Kara Yolu', currency: 'TL', invoiceAmount: '', initialPayment: '', date: new Date().toISOString().split('T')[0] });
    };

    const handleAddPayment = () => {
        if (!newPayment.amount) return alert('Lütfen tutar girin.');
        setShipments(shipments.map(s => {
            if (s.id === showPaymentModal) {
                return { ...s, payments: [...s.payments, { ...newPayment, amount: Number(newPayment.amount), note: newPayment.note || `${s.payments.length + 1}. Ödeme` }] };
            }
            return s;
        }));
        setShowPaymentModal(null);
        setNewPayment({ amount: '', date: new Date().toISOString().split('T')[0], note: '' });
    };

    const deleteShipment = () => {
        if (showDeleteConfirm) {
            setShipments(shipments.filter(s => s.id !== showDeleteConfirm));
            setShowDeleteConfirm(null);
        }
    };

    const getShipmentTotalPaid = (s) => s.payments.reduce((acc, p) => acc + p.amount, 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '40px 30px', color: 'white' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>Sevkiyat ve Çoklu Ödeme Takibi</h1>
                        <p style={{ margin: '5px 0 0', opacity: 0.7 }}>Ödemeleri parçalı olarak (1. Ödeme, 2. Ödeme vb.) yönetin.</p>
                    </div>
                    <button className="btn" style={{ background: '#3b82f6', color: 'white', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', border: 'none', cursor: 'pointer' }} onClick={() => setShowAddModal(true)}>
                        <i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni Sevkiyat
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-30px auto 0', padding: '0 30px' }}>
                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9' }}>
                        <h3 style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>Sevkiyat ve Ödeme Listesi</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th>Müşteri / Firma</th>
                                    <th>Fatura</th>
                                    <th>Ödenen Toplam</th>
                                    <th>Kalan</th>
                                    <th>Ödemeler</th>
                                    <th style={{ textAlign: 'center' }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments.map(s => {
                                    const totalPaid = getShipmentTotalPaid(s);
                                    const balance = s.invoiceAmount - totalPaid;
                                    return (
                                        <tr key={s.id}>
                                            <td>
                                                <div style={{ fontWeight: '700', color: '#1e293b' }}>{s.name} {s.surname}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{s.company} ({s.shipmentType})</div>
                                            </td>
                                            <td style={{ fontWeight: '800' }}>{formatCurrency(s.invoiceAmount, s.currency)}</td>
                                            <td style={{ color: '#10b981', fontWeight: '700' }}>{formatCurrency(totalPaid, s.currency)}</td>
                                            <td style={{ color: balance > 0 ? '#f59e0b' : '#10b981', fontWeight: '700' }}>{formatCurrency(balance, s.currency)}</td>
                                            <td>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                    {s.payments.map((p, idx) => (
                                                        <span key={idx} style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', color: '#475569', border: '1px solid #e2e8f0' }}>{idx+1}. Ödeme: {formatCurrency(p.amount, s.currency)}</span>
                                                    ))}
                                                    <button onClick={() => setShowPaymentModal(s.id)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>+ Ödeme Ekle</button>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button 
                                                    className="btn-icon delete" 
                                                    onClick={() => setShowDeleteConfirm(s.id)}
                                                ><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Kaydı Silmek İstiyor musunuz?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu işlem geri alınamaz. Seçili sevkiyat kaydı kalıcı olarak silinecektir.</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer' }} onClick={deleteShipment}>Evet, Sil</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Shipment and Payment Modals (Same as before) omitted for brevity but preserved in real file */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '600px', maxWidth: '95%' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b' }}>Yeni Sevkiyat ve İlk Ödeme</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <input className="input-modern" placeholder="Ad" onChange={e => setNewShipment({...newShipment, name: e.target.value})} />
                            <input className="input-modern" placeholder="Soyad" onChange={e => setNewShipment({...newShipment, surname: e.target.value})} />
                            <input className="input-modern" placeholder="Firma" style={{ gridColumn: 'span 2' }} onChange={e => setNewShipment({...newShipment, company: e.target.value})} />
                            <select className="input-modern" style={{ gridColumn: 'span 2' }} onChange={e => setNewShipment({...newShipment, currency: e.target.value})}>
                                <option value="TL">TL (Türk Lirası)</option>
                                <option value="USD">USD (Dolar)</option>
                                <option value="EUR">EUR (Euro)</option>
                            </select>
                            <input className="input-modern" type="number" placeholder="Toplam Fatura Bedeli" onChange={e => setNewShipment({...newShipment, invoiceAmount: e.target.value})} />
                            <input className="input-modern" type="number" placeholder="İlk Ödeme (Opsiyonel)" onChange={e => setNewShipment({...newShipment, initialPayment: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '12px', height: '48px', border: 'none', cursor: 'pointer' }} onClick={handleSaveShipment}>Kaydı Tamamla</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '48px', border: 'none', cursor: 'pointer' }} onClick={() => setShowAddModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

            {showPaymentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '450px', maxWidth: '95%' }}>
                        <h2 style={{ marginBottom: '10px', color: '#1e293b' }}>Ödeme Ekle</h2>
                        <p style={{ color: '#64748b', marginBottom: '25px' }}>{shipments.find(s => s.id === showPaymentModal)?.company} için yeni ödeme.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input className="input-modern" type="number" placeholder="Ödeme Tutarı" onChange={e => setNewPayment({...newPayment, amount: e.target.value})} />
                            <input className="input-modern" type="date" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} />
                            <input className="input-modern" placeholder="Ödeme Notu" onChange={e => setNewPayment({...newPayment, note: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#3b82f6', color: 'white', borderRadius: '12px', height: '45px', border: 'none', cursor: 'pointer' }} onClick={handleAddPayment}>Ödemeyi Kaydet</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', border: 'none', cursor: 'pointer' }} onClick={() => setShowPaymentModal(null)}>Kapat</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShipmentTracking;
