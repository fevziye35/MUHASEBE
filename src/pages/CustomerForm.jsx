import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../styles/global.css';

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isView = location.pathname.includes('/cari-detay');
    const isEdit = location.pathname.includes('/cari-duzenle');

    const [formData, setFormData] = useState({
        name: '', group: 'MÜŞTERİLER', yetkili: '', telefon: '', email: '', vergiNo: '', vergiAdresi: '', adres: '', il: '', ilce: '',
        acilisBakiyesi: '0', borcAlacak: 'Borç', varsayilanKasa: 'Merkez Kasa', riskLimiti: '0', riskDoviz: 'TRY', riskAction: 'islem_yaptir'
    });

    useEffect(() => {
        if (id) {
            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            const found = customers.find(c => c.id == id);
            if (found) setFormData({ ...found, name: found.name || found.cariAdi || '' });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name) return alert('Lütfen Firma Adı giriniz!');
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        const customerData = { ...formData, id: id ? parseInt(id) : Date.now() };
        if (id) {
            const index = customers.findIndex(c => c.id == id);
            if (index !== -1) customers[index] = customerData;
            else customers.push(customerData);
        } else customers.push(customerData);
        localStorage.setItem('customers', JSON.stringify(customers));
        alert('Cari Başarıyla Sistem Arşivine Eklendi!');
        navigate('/cari-hesaplar');
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #1e1b4b 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#e0f2fe', letterSpacing: '0.1em', marginBottom: '8px' }}>YENİ İŞ ORTAĞI KAYDI</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>
                            {isView ? 'Cari Künyesi' : isEdit ? 'Cari Düzenleme' : 'Yeni Cari Kartı'}
                        </h1>
                    </div>
                    <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '15px', padding: '12px 25px', cursor: 'pointer', fontWeight: '800', backdropFilter: 'blur(10px)' }} onClick={() => navigate('/cari-hesaplar')}>
                        <i className="fa-solid fa-reply-all" style={{ marginRight: '8px' }}></i> Listeye Dön
                    </button>
                </div>
            </div>

            <form onSubmit={handleSave} style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    
                    {/* Commercial Identity Section */}
                    <div className="main-content-card" style={{ padding: '40px', background: 'white', borderRadius: '32px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 30px 0', fontSize: '18px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fa-solid fa-building" style={{ color: '#0ea5e9' }}></i> Kurumsal Bilgiler
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>FİRMA / HESAP ÜNVANI</label>
                                <input name="name" className="input-modern" placeholder="Firma adını buraya giriniz..." value={formData.name} onChange={handleChange} disabled={isView} style={{ fontSize: '16px', fontWeight: '700' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>CARİ GRUBU</label>
                                    <select name="group" className="input-modern" value={formData.group} onChange={handleChange} disabled={isView}>
                                        <option>MÜŞTERİLER</option><option>TEDARİKÇİLER</option><option>PERSONEL</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>İLGİLİ YETKİLİ</label>
                                    <input name="yetkili" className="input-modern" placeholder="Ad Soyad" value={formData.yetkili} onChange={handleChange} disabled={isView} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>AÇILIŞ BAKİYESİ</label>
                                    <input name="acilisBakiyesi" className="input-modern" type="number" placeholder="0.00" value={formData.acilisBakiyesi} onChange={handleChange} disabled={isView} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>BAKİYE TÜRÜ</label>
                                    <select name="borcAlacak" className="input-modern" value={formData.borcAlacak} onChange={handleChange} disabled={isView}>
                                        <option>Borç</option><option>Alacak</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Risk Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="main-content-card" style={{ padding: '40px', background: 'white', borderRadius: '32px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ margin: '0 0 30px 0', fontSize: '18px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <i className="fa-solid fa-map-location-dot" style={{ color: '#0ea5e9' }}></i> İletişim Detayları
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>TELEFON</label>
                                    <input name="telefon" className="input-modern" placeholder="0(212)..." value={formData.telefon} onChange={handleChange} disabled={isView} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>E-POSTA</label>
                                    <input name="email" className="input-modern" placeholder="info@company.com" value={formData.email} onChange={handleChange} disabled={isView} />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '10px' }}>AÇIK ADRES</label>
                                    <textarea name="adres" className="input-modern" style={{ height: '80px', paddingTop: '12px' }} placeholder="Sokak, Mahalle, Kat/Daire..." value={formData.adres} onChange={handleChange} disabled={isView}></textarea>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                            {!isView && (
                                <button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', fontWeight: '900', borderRadius: '20px', height: '64px', padding: '0 50px', border: 'none', cursor: 'pointer', fontSize: '18px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}>
                                    <i className="fa-solid fa-cloud-arrow-up" style={{ marginRight: '12px' }}></i> CARİ KARTI KAYDET
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
