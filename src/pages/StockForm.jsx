import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/global.css';

const StockForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        barcode: '', code: '', shelf: '', name: '', group: 'Temel Gıda', brand: 'Seçiniz', warehouse: 'Merkez',
        buyPrice: '0', buyCurrency: '₺', salesPrice: '0', salesCurrency: '₺', kdv: '20', kdvType: 'Dahil', unit: 'Adet'
    });

    useEffect(() => {
        if (id) {
            const stocks = JSON.parse(localStorage.getItem('stockCards')) || [];
            const found = stocks.find(s => s.id.toString() === id.toString());
            if (found) setFormData({ ...found, buyPrice: found.buyPrice?.toString() || '0', salesPrice: found.salesPrice?.toString() || '0' });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name) return alert('Lütfen Stok Adını giriniz!');
        const stocks = JSON.parse(localStorage.getItem('stockCards')) || [];
        const stockData = { ...formData, id: id ? parseInt(id) : Date.now(), stock: formData.stock || 0 };
        if (id) {
            const index = stocks.findIndex(s => s.id == id);
            if (index !== -1) stocks[index] = stockData;
            else stocks.push(stockData);
        } else stocks.push(stockData);
        localStorage.setItem('stockCards', JSON.stringify(stocks));
        alert('Stok Kartı Envanter Arşivine Eklendi!');
        navigate('/stok-kartlari');
    };

    const generateBarcode = () => {
        const barcode = '869' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
        setFormData(prev => ({ ...prev, barcode }));
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #059669 0%, #1e1b4b 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#d1fae5', letterSpacing: '0.1em', marginBottom: '8px' }}>ENVANTER YÖNETİM MERKEZİ</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>
                            {isEdit ? 'Stok Kartı Düzenleme' : 'Yeni Stok Kartı Oluştur'}
                        </h1>
                    </div>
                    <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '12px 25px', cursor: 'pointer', fontWeight: '800', backdropFilter: 'blur(10px)' }} onClick={() => navigate('/stok-kartlari')}>
                        <i className="fa-solid fa-boxes-stacked" style={{ marginRight: '8px' }}></i> Stok Listesi
                    </button>
                </div>
            </div>

            <form onSubmit={handleSave} style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    
                    {/* Identification Section */}
                    <div className="main-content-card" style={{ padding: '40px', background: 'white', borderRadius: '32px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 30px 0', fontSize: '18px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fa-solid fa-tag" style={{ color: '#059669' }}></i> Ürün Kimlik Bilgileri
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: '10px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>BARKOD NUMARASI</label>
                                    <input name="barcode" className="input-modern" placeholder="Okutun veya girin..." value={formData.barcode} onChange={handleChange} />
                                </div>
                                <button type="button" onClick={generateBarcode} style={{ marginTop: '22px', height: '54px', background: '#f0fdf4', color: '#059669', border: '2px dashed #059669', borderRadius: '15px', cursor: 'pointer', fontSize: '18px' }}>
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                </button>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>ÜRÜN / STOK ADI</label>
                                <input name="name" className="input-modern" placeholder="Ürün adını tam olarak giriniz..." value={formData.name} onChange={handleChange} style={{ fontSize: '16px', fontWeight: '700' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>ÜRÜN GRUBU</label>
                                    <select name="group" className="input-modern" value={formData.group} onChange={handleChange}>
                                        <option>Temel Gıda</option><option>İçecek</option><option>Temizlik</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>MARKA</label>
                                    <input name="brand" className="input-modern" placeholder="Marka giriniz" value={formData.brand} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Units Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="main-content-card" style={{ padding: '40px', background: 'white', borderRadius: '32px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ margin: '0 0 30px 0', fontSize: '18px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <i className="fa-solid fa-coins" style={{ color: '#059669' }}></i> Fiyatlandırma & Birim
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                 <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>SATIŞ FİYATI</label>
                                    <input name="salesPrice" className="input-modern" type="number" placeholder="0.00" value={formData.salesPrice} onChange={handleChange} style={{ fontSize: '18px', fontWeight: '900', color: '#059669' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>KDV ORANI</label>
                                    <select name="kdv" className="input-modern" value={formData.kdv} onChange={handleChange}>
                                        <option value="0">%0</option><option value="1">%1</option><option value="10">%10</option><option value="20">%20</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>STOK BİRİMİ</label>
                                    <select name="unit" className="input-modern" value={formData.unit} onChange={handleChange}>
                                        <option>Adet</option><option>Kg</option><option>Gram</option><option>Koli</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>ALIM FİYATI</label>
                                    <input name="buyPrice" className="input-modern" type="number" placeholder="0.00" value={formData.buyPrice} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                             <button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', color: 'white', fontWeight: '900', borderRadius: '20px', height: '64px', padding: '0 50px', border: 'none', cursor: 'pointer', fontSize: '18px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}>
                                <i className="fa-solid fa-boxes-packing" style={{ marginRight: '12px' }}></i> STOK KARTINI KAYDET
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StockForm;
