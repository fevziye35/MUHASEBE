import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DebitVoucher = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [formData, setFormData] = useState({
        debitAccount: '',
        creditAccount: '',
        date: new Date().toISOString().split('T')[0],
        documentNumber: '',
        currencyType: 'TRY',
        exchangeRate: 1,
        amount: '',
        description: ''
    });

    useEffect(() => {
        const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [
            { id: 1, name: 'ABC Ticaret' },
            { id: 2, name: 'XYZ Mühendislik' }
        ];
        // Handle name/cariAdi discrepancy
        const mappedCustomers = storedCustomers.map(c => ({
            ...c,
            displayName: c.name || c.cariAdi
        }));
        setCustomers(mappedCustomers);

        const storedVouchers = JSON.parse(localStorage.getItem('vouchers')) || [];
        setVouchers(storedVouchers);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        
        if (!formData.debitAccount || !formData.creditAccount) {
            alert('Lütfen borç ve alacak hesaplarını seçiniz!');
            return;
        }

        if (formData.debitAccount === formData.creditAccount) {
            alert('Borç ve alacak hesapları aynı olamaz!');
            return;
        }

        const newVoucher = {
            ...formData,
            id: Date.now(),
            amount: parseFloat(formData.amount) || 0,
            exchangeRate: parseFloat(formData.exchangeRate) || 1
        };

        const updatedVouchers = [...vouchers, newVoucher];
        localStorage.setItem('vouchers', JSON.stringify(updatedVouchers));
        setVouchers(updatedVouchers);

        // Reset form
        setFormData({
            debitAccount: '',
            creditAccount: '',
            date: new Date().toISOString().split('T')[0],
            documentNumber: '',
            currencyType: 'TRY',
            exchangeRate: 1,
            amount: '',
            description: ''
        });

        alert('Mahsup fişi başarıyla kaydedildi!');
    };

    const handleDeleteVoucher = (id) => {
        if (window.confirm('Bu fişi silmek istediğinize emin misiniz?')) {
            const updatedVouchers = vouchers.filter(v => v.id !== id);
            localStorage.setItem('vouchers', JSON.stringify(updatedVouchers));
            setVouchers(updatedVouchers);
            alert('Fiş başarıyla silindi.');
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        fontSize: '14px'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        color: '#475569',
        marginBottom: '6px'
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#1e293b' }}>Mahsup Fişi</h2>
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    <i className="fa-solid fa-reply"></i> Geri Dön
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                {/* Form Section */}
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <form onSubmit={handleSave}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={labelStyle}>Borç Hesabı *</label>
                                <select id="debitAccount" value={formData.debitAccount} onChange={handleChange} style={inputStyle} required>
                                    <option value="">Hesap Seçiniz</option>
                                    {customers.map(c => <option key={c.id} value={c.displayName}>{c.displayName}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Alacak Hesabı *</label>
                                <select id="creditAccount" value={formData.creditAccount} onChange={handleChange} style={inputStyle} required>
                                    <option value="">Hesap Seçiniz</option>
                                    {customers.map(c => <option key={c.id} value={c.displayName}>{c.displayName}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={labelStyle}>Tarih *</label>
                                <input id="date" type="date" value={formData.date} onChange={handleChange} style={inputStyle} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Belge No</label>
                                <input id="documentNumber" type="text" value={formData.documentNumber} onChange={handleChange} style={inputStyle} placeholder="Belge numarası" />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            <div>
                                <label style={labelStyle}>Döviz Tipi</label>
                                <select id="currencyType" value={formData.currencyType} onChange={handleChange} style={inputStyle}>
                                    <option value="TRY">TRY - Türk Lirası</option>
                                    <option value="USD">USD - Amerikan Doları</option>
                                    <option value="EUR">EUR - Euro</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Kur</label>
                                <input id="exchangeRate" type="number" value={formData.exchangeRate} onChange={handleChange} style={inputStyle} step="0.0001" min="0" />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>Tutar (Amount) *</label>
                            <input id="amount" type="number" value={formData.amount} onChange={handleChange} style={inputStyle} placeholder="0,00" step="0.01" min="0" required />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>Açıklama</label>
                            <textarea id="description" value={formData.description} onChange={handleChange} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Açıklama giriniz"></textarea>
                        </div>

                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <i className="fa-solid fa-save"></i> Fişi Kaydet
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Son Kayıtlı Fişler</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', background: '#f1f5f9' }}>
                                    <th style={{ padding: '12px' }}>Tarih</th>
                                    <th style={{ padding: '12px' }}>Borç/Alacak</th>
                                    <th style={{ padding: '12px', textAlign: 'right' }}>Tutar</th>
                                    <th style={{ padding: '12px', textAlign: 'center' }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vouchers.slice().reverse().slice(0, 10).map(v => (
                                    <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px' }}>{v.date}</td>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ fontWeight: '600', color: '#ef4444' }}>B: {v.debitAccount}</div>
                                            <div style={{ fontWeight: '600', color: '#10b981' }}>A: {v.creditAccount}</div>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                                            {parseFloat(v.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {v.currencyType}
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <button 
                                                onClick={() => handleDeleteVoucher(v.id)}
                                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}
                                                title="Sil"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {vouchers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>Kayıtlı fiş bulunamadı.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebitVoucher;
