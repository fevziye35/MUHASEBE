import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/global.css';

const PurchaseInvoice = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const cariId = searchParams.get('cari_id');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    
    const [customer, setCustomer] = useState({ name: 'Seçili Tedarikçi', authorized: '-', taxNo: '-', address: '-' });
    const [invoiceInfo, setInvoiceInfo] = useState({ date: new Date().toISOString().split('T')[0], invoiceNo: 'ALS-' + Date.now().toString().slice(-6) });
    const [items, setItems] = useState([{ id: 1, name: '', kdv: 20, price: 0, qty: 1 }]);

    useEffect(() => {
        if (cariId) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            const found = customers.find(c => c.id === parseInt(cariId));
            if (found) setCustomer({ name: found.name, authorized: found.authorized, taxNo: found.taxNo, address: found.address });
        }
    }, [cariId]);

    const handleAddRow = () => setItems([...items, { id: Date.now(), name: '', kdv: 20, price: 0, qty: 1 }]);
    const handleRemoveRow = () => {
        if (showDeleteConfirm) {
            setItems(items.filter(item => item.id !== showDeleteConfirm));
            setShowDeleteConfirm(null);
        }
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: field === 'name' ? value : Number(value) } : item));
    };

    const calculateTotals = () => {
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const totalKdv = items.reduce((acc, item) => acc + (item.price * item.qty * item.kdv / 100), 0);
        const grandTotal = subtotal + totalKdv;
        return { subtotal, totalKdv, grandTotal };
    };

    const { subtotal, totalKdv, grandTotal } = calculateTotals();

    const handleSave = () => {
        const purchaseInvoices = JSON.parse(localStorage.getItem('purchaseInvoices')) || [];
        const newInvoice = { ...invoiceInfo, customer: customer.name, grandTotal, id: Date.now() };
        purchaseInvoices.push(newInvoice);
        localStorage.setItem('purchaseInvoices', JSON.stringify(purchaseInvoices));
        alert('Alış Faturası Sisteme Başarıyla İşlendi!');
        navigate('/faturalar');
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Transaction Header */}
            <div style={{ background: 'linear-gradient(135deg, #312e81 0%, #4c1d95 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', letterSpacing: '0.1em', marginBottom: '8px' }}>YENİ ALIŞ / MAL KABUL</div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '900' }}><i className="fa-solid fa-file-import" style={{ marginRight: '15px', color: '#c084fc' }}></i> {customer.name}</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: '15px' }}>Tedarikçiden gelen {invoiceInfo.invoiceNo} numaralı alış faturası işleniyor.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#c084fc', marginBottom: '5px' }}>FATURA TOPLAMI</div>
                        <div style={{ fontSize: '36px', fontWeight: '900' }}>{grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        {/* Vendor & Document Summary Card */}
                        <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Tedarikçi Bilgileri</h4>
                                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{customer.name}</div>
                                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '5px' }}>Yetkili: {customer.authorized}</div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>{customer.address}</div>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Fatura Kaydı</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <input className="input-modern" type="date" value={invoiceInfo.date} onChange={e => setInvoiceInfo({...invoiceInfo, date: e.target.value})} />
                                        <input className="input-modern" type="text" value={invoiceInfo.invoiceNo} onChange={e => setInvoiceInfo({...invoiceInfo, invoiceNo: e.target.value})} placeholder="Fatura Seri/No" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table Card */}
                        <div className="main-content-card" style={{ padding: '0', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <table className="standard-data-table">
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr>
                                        <th style={{ width: '45%' }}>Alınan Ürün / Hizmet</th>
                                        <th>Miktar</th>
                                        <th>Birim Maliyet</th>
                                        <th>KDV %</th>
                                        <th style={{ textAlign: 'right' }}>Dönem Maliyeti</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <td><input className="input-modern" style={{ marginBottom: 0, padding: '8px 12px' }} placeholder="Ürün adı..." value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)} /></td>
                                            <td><input className="input-modern" style={{ marginBottom: 0, padding: '8px 12px', width: '80px' }} type="number" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', e.target.value)} /></td>
                                            <td><input className="input-modern" style={{ marginBottom: 0, padding: '8px 12px', width: '120px' }} type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', e.target.value)} /></td>
                                            <td><input className="input-modern" style={{ marginBottom: 0, padding: '8px 12px', width: '60px' }} type="number" value={item.kdv} onChange={e => handleItemChange(item.id, 'kdv', e.target.value)} /></td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#1e293b' }}>{(item.price * item.qty * (1 + item.kdv/100)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</td>
                                            <td style={{ textAlign: 'center' }}><button className="btn-icon delete" onClick={() => setShowDeleteConfirm(item.id)}><i className="fa-solid fa-trash-can"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ padding: '20px', textAlign: 'left', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                                <button className="btn" style={{ background: 'white', color: '#4c1d95', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: '800', height: '44px' }} onClick={handleAddRow}><i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni Alış Kalemi Ekle</button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sticky Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div className="main-content-card" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Alış Maliyet Özeti</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', fontWeight: '600' }}><span>Ara Toplam</span><span>{subtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', fontWeight: '600' }}><span>KDV Toplamı</span><span>{totalKdv.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span></div>
                                <div style={{ borderTop: '2px dashed #f1f5f9', marginTop: '10px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#312e81' }}>
                                    <span>ÖDENECEK TOPLAM</span>
                                    <span>{grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
                                </div>
                            </div>
                            <button className="btn" style={{ width: '100%', background: '#4c1d95', color: 'white', borderRadius: '15px', height: '54px', fontWeight: '800', marginTop: '30px', boxShadow: '0 10px 20px rgba(76, 29, 149, 0.2)' }} onClick={handleSave}>Faturayı Onayla & Kaydet</button>
                            <button className="btn" style={{ width: '100%', background: '#f8fafc', color: '#94a3b8', border: 'none', borderRadius: '15px', height: '48px', fontWeight: '700', marginTop: '10px' }} onClick={() => navigate('/alis-yap')}>İşlemi İptal Et</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Delete Confirmation Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                         <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-file-circle-minus"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Kalemi Çıkar?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu mal kabul kalemini faturadan kaldırmak faturadaki toplam alım tutarını etkileyecektir. Devam edilsin mi?</p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={handleRemoveRow}>Evet, Çıkar</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '45px', fontWeight: '700', cursor: 'pointer', border: 'none' }} onClick={() => setShowDeleteConfirm(null)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseInvoice;
