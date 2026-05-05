import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StockMetaList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isBrands = location.pathname.includes('/markalar');
    const isUnits = location.pathname.includes('/birimler');
    const isDepolar = location.pathname.includes('/depolar');

    const title = isBrands ? 'Markalar' : isUnits ? 'Birimler' : 'Depolar';
    const storageKey = isBrands ? 'stockBrands' : isUnits ? 'stockUnits' : 'stockWarehouses';
    const label = isBrands ? 'Marka' : isUnits ? 'Birim' : 'Depo';

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newItemName, setNewItemName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        try {
            let stored = JSON.parse(localStorage.getItem(storageKey));
            if (!Array.isArray(stored)) {
                if (isBrands) stored = [{ id: 1, name: 'Uno' }, { id: 2, name: 'Çaykur' }];
                else if (isUnits) stored = [{ id: 1, name: 'Adet' }, { id: 2, name: 'Kg' }];
                else if (isDepolar) stored = [{ id: 1, name: 'Merkez' }];
                localStorage.setItem(storageKey, JSON.stringify(stored));
            }
            setItems(Array.isArray(stored) ? stored : []);
        } catch (error) {
            console.error('Error loading storage:', error);
            setItems([]);
        }
    }, [storageKey, isBrands, isUnits, isDepolar]);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleDelete = (id, name) => {
        const updated = (items || []).filter(i => i.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setItems(updated);
        showMessage(`'${name}' silindi.`);
    };

    const handleAdd = (e) => {
        if (e) e.preventDefault();
        
        const name = (newItemName || '').trim();
        if (!name) {
            showMessage('Lütfen bir isim giriniz.');
            return;
        }

        try {
            const currentItems = Array.isArray(items) ? items : [];
            if (currentItems.some(i => i.name && i.name.toLowerCase() === name.toLowerCase())) {
                showMessage('Bu kayıt zaten mevcut!');
                return;
            }

            const updated = [...currentItems, { id: Date.now(), name }];
            localStorage.setItem(storageKey, JSON.stringify(updated));
            setItems(updated);
            setNewItemName('');
            showMessage(`'${name}' başarıyla eklendi.`);
        } catch (error) {
            console.error('Add failed:', error);
            showMessage('Kayıt eklenirken bir hata oluştu.');
        }
    };

    const filteredItems = items.filter(i => (i.name || '').toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#1f3a60' }}>{title}</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={() => navigate('/stok-kartlari')} className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-reply"></i> Geri Dön
                    </button>
                </div>
            </div>

            {message && (
                <div style={{ padding: '10px 15px', marginBottom: '20px', borderRadius: '4px', background: '#dcfce7', color: '#166534', borderLeft: '4px solid #16a34a' }}>
                    {message}
                </div>
            )}

            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', flexGrow: 1, maxWidth: '500px' }}>
                    <input 
                        type="text" 
                        placeholder={`Yeni ${label} Adı...`}
                        className="form-control"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <button type="submit" className="btn" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        <i className="fa-solid fa-plus"></i> Ekle
                    </button>
                </form>

                <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
                    <i className="fa-solid fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                    <input 
                        type="text" 
                        placeholder={`${label} ara...`}
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px 10px 10px 35px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '15px', width: '50px' }}>#</th>
                            <th style={{ padding: '15px' }}>{label} Adı</th>
                            <th style={{ padding: '15px', width: '120px', textAlign: 'right' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px', color: '#64748b' }}>{index + 1}.</td>
                                <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.name}</td>
                                <td style={{ padding: '15px', textAlign: 'right' }}>
                                    <button 
                                        onClick={() => handleDelete(item.id, item.name)}
                                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                                        title={`${label} Sil`}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Kayıt bulunamadı.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockMetaList;
