import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const GelirGider = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [formData, setFormData] = useState({ type: 'income', name: '', amount: '', code: '', date: new Date().toISOString().split('T')[0] });

    useEffect(() => { loadData(); }, []);

    const loadData = () => {
        let savedData = JSON.parse(localStorage.getItem('incomeExpenseData') || '[]');
        if (savedData.length === 0) {
            savedData = [
                { id: 1, type: 'income', name: 'Nakit Satış Tahsilatı', amount: 15600, transactionDate: new Date().toISOString().split('T')[0], code: 'G-001' },
                { id: 2, type: 'expense', name: 'Ofis Kira Ödemesi', amount: 12500, transactionDate: new Date().toISOString().split('T')[0], code: 'D-042' },
                { id: 3, type: 'income', name: 'Danışmanlık Hizmet Bedeli', amount: 4800, transactionDate: new Date().toISOString().split('T')[0], code: 'G-002' }
            ];
            localStorage.setItem('incomeExpenseData', JSON.stringify(savedData));
        }
        setData(savedData);
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const updatedData = data.filter(item => item.id !== showDeleteConfirm);
            localStorage.setItem('incomeExpenseData', JSON.stringify(updatedData));
            setData(updatedData);
            setShowDeleteConfirm(null);
        }
    };

    const handleSaveRecord = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.amount) return alert('Lütfen zorunlu alanları doldurun.');
        const newRecord = { id: Date.now(), type: formData.type, name: formData.name, amount: parseFloat(formData.amount), transactionDate: formData.date, code: formData.code || '-' };
        const updatedData = [newRecord, ...data];
        setData(updatedData);
        localStorage.setItem('incomeExpenseData', JSON.stringify(updatedData));
        setFormData({ type: 'income', name: '', amount: '', code: '', date: new Date().toISOString().split('T')[0] });
        setShowAddForm(false);
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

    const filteredData = data.filter(item => {
        const matchesFilter = filter === 'all' || item.type === filter;
        const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || item.code?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    }).sort((a,b) => new Date(b.transactionDate) - new Date(a.transactionDate));

    const totalIncome = data.filter(i => i.type === 'income').reduce((acc, i) => acc + i.amount, 0);
    const totalExpense = data.filter(i => i.type === 'expense').reduce((acc, i) => acc + i.amount, 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Gelir & Gider Yönetimi</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Şirketinizin nakit akışını ve maliyetlerini anlık analiz edin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn" style={{ background: '#6366f1', color: 'white', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', border: 'none', cursor: 'pointer' }} onClick={() => setShowAddForm(true)}>
                            <i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni İşlem Ekle
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Cash Flow Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM GELİR', value: formatCurrency(totalIncome), icon: 'fa-arrow-up-right-dots', color: '#10b981' },
                        { label: 'TOPLAM GİDER', value: formatCurrency(totalExpense), icon: 'fa-arrow-down-right-dots', color: '#ef4444' },
                        { label: 'GÜNCEL NET DURUM', value: formatCurrency(totalIncome - totalExpense), icon: 'fa-chart-pie', color: '#3b82f6' },
                        { label: 'İŞLEM HACMİ', value: data.length, icon: 'fa-list-check', color: '#6366f1' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '5px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${stat.color}10`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                    <i className={`fa-solid ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    {/* Modern Filter Bar */}
                    <div style={{ padding: '25px 30px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setFilter('all')} style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '13px', background: filter === 'all' ? '#1e293b' : '#f1f5f9', color: filter === 'all' ? 'white' : '#64748b' }}>Tümü</button>
                            <button onClick={() => setFilter('income')} style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '13px', background: filter === 'income' ? '#10b981' : '#f1f5f9', color: filter === 'income' ? 'white' : '#64748b' }}>Gelirler</button>
                            <button onClick={() => setFilter('expense')} style={{ padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '13px', background: filter === 'expense' ? '#ef4444' : '#f1f5f9', color: filter === 'expense' ? 'white' : '#64748b' }}>Giderler</button>
                        </div>
                        <div style={{ position: 'relative', width: '350px' }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                            <input className="input-modern" placeholder="Açıklama veya kod ara..." style={{ paddingLeft: '45px', width: '100%', marginBottom: 0 }} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%', textAlign: 'center' }}>Akış</th>
                                    <th style={{ width: '35%' }}>İşlem Detayı</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>İşlem No</th>
                                    <th style={{ width: '15%', textAlign: 'right' }}>Tutar</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>Tarih</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: item.type === 'income' ? '#dcfce7' : '#fee2e2', color: item.type === 'income' ? '#15803d' : '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                                <i className={`fa-solid ${item.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '700', color: '#1e293b' }}>{item.name}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.type === 'income' ? 'Tahsilat / Gelir' : 'Ödeme / Gider'}</div>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: '600', color: '#64748b' }}>{item.code}</td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: item.type === 'income' ? '#10b981' : '#ef4444', fontSize: '16px' }}>
                                            {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                                        </td>
                                        <td style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>{item.transactionDate}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button onClick={() => setShowDeleteConfirm(item.id)} className="btn-icon delete"><i className="fa-solid fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Add Form Modal */}
            {showAddForm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '500px', maxWidth: '95%' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'center' }}>Yeni Finansal İşlem</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setFormData({...formData, type: 'income'})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: formData.type === 'income' ? '2px solid #10b981' : '1px solid #e2e8f0', background: formData.type === 'income' ? '#f0fdf4' : 'white', color: formData.type === 'income' ? '#15803d' : '#64748b', cursor: 'pointer', fontWeight: '800' }}>GELİR (+)</button>
                                <button onClick={() => setFormData({...formData, type: 'expense'})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: formData.type === 'expense' ? '2px solid #ef4444' : '1px solid #e2e8f0', background: formData.type === 'expense' ? '#fef2f2' : 'white', color: formData.type === 'expense' ? '#b91c1c' : '#64748b', cursor: 'pointer', fontWeight: '800' }}>GİDER (-)</button>
                            </div>
                            <input className="input-modern" placeholder="İşlem Açıklaması" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <input className="input-modern" type="number" placeholder="Tutar (₺)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                                <input className="input-modern" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                            </div>
                            <input className="input-modern" placeholder="Evrak / İşlem No" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', height: '48px' }} onClick={handleSaveRecord}>Kayıt Tamamla</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', border: 'none', cursor: 'pointer', height: '48px' }} onClick={() => setShowAddForm(false)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-hand-holding-dollar"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Para Kaydını Sil?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Kasayı etkileyen bu işlemi sildiğinizde finansal dengeleriniz anında güncellenecektir. Onaylıyor musunuz?</p>
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

export default GelirGider;
