import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PurchaseWaybillDetail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const cariId = searchParams.get('cari_id');
    
    const [customer, setCustomer] = useState({
        name: 'Seçili Tedarikçi',
        authorized: '-',
        email: '-',
        address: '-',
        taxOffice: '-',
        taxNo: '-',
        city: '-',
        district: '-',
        country: 'Türkiye'
    });

    const [waybillInfo, setWaybillInfo] = useState({
        date: new Date().toISOString().split('T')[0],
        shipDate: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        waybillNo: 'AIRS20250000001',
        type: 'TEMELIRSALIYE',
        scenario: 'SEVK',
        currency: 'TRY',
        exchangeRate: 1
    });

    const [items, setItems] = useState([
        { id: 1, name: 'Örnek Alınan Ürün', kdv: 20, otv: 0, price: 500, qty: 10, discount: 0, total: 5000, grandTotal: 6000 }
    ]);

    const handleAddRow = () => {
        setItems([
            ...items,
            { id: Date.now(), name: '', kdv: 20, otv: 0, price: 0, qty: 1, discount: 0, total: 0, grandTotal: 0 }
        ]);
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: field === 'name' ? value : Number(value) };
            }
            return item;
        }));
    };

    const handleRemoveRow = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    useEffect(() => {
        if (cariId) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            const found = customers.find(c => c.id === parseInt(cariId));
            if (found) {
                setCustomer({
                    name: found.name || found.cariAdi || 'Bilinmeyen Tedarikçi',
                    authorized: found.authorized || found.yetkili || '-',
                    email: found.email || '-',
                    address: found.address || '-',
                    taxOffice: found.taxOffice || '-',
                    taxNo: found.taxNo || '-',
                    city: found.city || '-',
                    district: found.district || '-',
                    country: found.country || 'Türkiye'
                });
            }
        }
    }, [cariId]);

    const calculateTotals = () => {
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const totalDiscount = items.reduce((acc, item) => acc + (item.price * item.qty * item.discount / 100), 0);
        const afterDiscount = subtotal - totalDiscount;
        const totalKdv = items.reduce((acc, item) => acc + (afterDiscount * item.kdv / 100), 0);
        const grandTotal = afterDiscount + totalKdv;

        return { subtotal, totalDiscount, afterDiscount, totalKdv, grandTotal };
    };

    const handleSaveWaybill = () => {
        if (!cariId) {
            alert('Lütfen irsaliyeyi kaydetmeden önce bir tedarikçi seçiniz!');
            return;
        }

        const purchaseWaybills = JSON.parse(localStorage.getItem('purchaseWaybills')) || [];
        const newWaybill = {
            ...waybillInfo,
            customer: customer.name,
            cariCode: customer.name,
            grandTotal: grandTotal,
            items: items,
            id: Date.now()
        };

        purchaseWaybills.push(newWaybill);
        localStorage.setItem('purchaseWaybills', JSON.stringify(purchaseWaybills));
        
        alert('Alış irsaliyesi başarıyla kaydedildi!');
        navigate('/faturalar'); 
    };

    const { subtotal, totalDiscount, totalKdv, grandTotal } = calculateTotals();

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#333' }}>Alış İrsaliyesi Oluştur</h2>
                <button 
                    type="button"
                    onClick={() => navigate('/alis-irsaliye')}
                    style={{ padding: '8px 15px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <i className="fa-solid fa-reply"></i> Geri Dön
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {/* Left Panel: Customer Info */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <h3 style={{ marginTop: 0, fontSize: '1.1rem', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Tedarikçi Bilgileri</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Ünvan</label>
                                <input type="text" value={customer.name} readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8fafc' }} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Yetkili</label>
                                <input type="text" value={customer.authorized} readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8fafc' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Vergi No</label>
                                <input type="text" value={customer.taxNo} readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8fafc' }} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Adres</label>
                                <textarea value={customer.address} readOnly style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8fafc', height: '60px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Waybill Info */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <h3 style={{ marginTop: 0, fontSize: '1.1rem', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>İrsaliye Detayları</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>İrsaliye Tarihi</label>
                            <input type="date" value={waybillInfo.date} onChange={(e) => setWaybillInfo({...waybillInfo, date: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Veriliş Tarihi</label>
                            <input type="date" value={waybillInfo.shipDate} onChange={(e) => setWaybillInfo({...waybillInfo, shipDate: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Belge No</label>
                            <input type="text" value={waybillInfo.waybillNo} onChange={(e) => setWaybillInfo({...waybillInfo, waybillNo: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <div style={{ marginTop: '20px', background: 'white', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                            <th style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Ürün/Hizmet</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Miktar</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Birim Fiyat</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #eee' }}>KDV (%)</th>
                            <th style={{ padding: '12px', borderBottom: '1px solid #eee', textAlign: 'right' }}>Toplam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                    <input type="text" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} style={{ width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Ürün Adı" />
                                </td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                    <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} style={{ width: '60px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                    <input type="number" min="0" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', e.target.value)} style={{ width: '80px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                                    <input type="number" min="0" max="100" value={item.kdv} onChange={(e) => handleItemChange(item.id, 'kdv', e.target.value)} style={{ width: '60px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                                    {(item.price * item.qty).toFixed(2)} ₺
                                    <button type="button" onClick={() => handleRemoveRow(item.id)} style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }} title="Satırı Sil">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ padding: '15px', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={handleAddRow} style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                        <i className="fa-solid fa-plus"></i> Ürün Ekle
                    </button>
                </div>
            </div>

            {/* Totals & Actions */}
            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>İrsaliye Açıklaması</label>
                    <textarea style={{ width: '100%', height: '80px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="İrsaliye altı açıklaması..."></textarea>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <table style={{ width: '100%', fontSize: '14px' }}>
                        <tbody>
                            <tr><td style={{ padding: '5px 0' }}>Ara Toplam</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{subtotal.toFixed(2)} ₺</td></tr>
                            <tr><td style={{ padding: '5px 0' }}>KDV Toplam</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{totalKdv.toFixed(2)} ₺</td></tr>
                            <tr style={{ fontSize: '1.2rem', color: '#1e3a8a' }}><td style={{ padding: '10px 0', borderTop: '2px solid #eee' }}>Genel Toplam</td><td style={{ textAlign: 'right', fontWeight: 'bold', borderTop: '2px solid #eee' }}>{grandTotal.toFixed(2)} ₺</td></tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <button onClick={handleSaveWaybill} style={{ padding: '12px 30px', background: '#1f3a60', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                            <i className="fa-solid fa-save"></i> İrsaliyeyi Kaydet ve Kapat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseWaybillDetail;
