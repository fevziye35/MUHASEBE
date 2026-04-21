import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const PersonnelTracking = () => {
    const defaultPersonnel = [
        { id: 1, name: 'Aydın Ertop', email: 'aydinertop@gmail.com', department: 'Yönetim', salary: 90000, paidAmount: 0, status: 'Aktif' },
        { id: 2, name: 'Fevziye Mamak', email: 'fevziye.mamak35@gmail.com', department: 'Finans & Muhasebe', salary: 65000, paidAmount: 0, status: 'Aktif' },
        { id: 3, name: 'Ali Mamak', email: 'amamak1980@gmail.com', department: 'Satın Alma', salary: 60000, paidAmount: 0, status: 'Aktif' },
        { id: 4, name: 'Ahmet Yılmaz', email: 'ahmet.yilmaz@makfa.com', department: 'Lojistik', salary: 35000, paidAmount: 0, status: 'Yıllık İzinde' },
    ];

    const [personnelList, setPersonnelList] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editPerson, setEditPerson] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [paymentForm, setPaymentForm] = useState({ date: new Date().toISOString().split('T')[0], amount: '', desc: '' });
    const [personDetails, setPersonDetails] = useState({ sgk: '', puantaj: 30, prevCarryover: 0 });
    const [newPerson, setNewPerson] = useState({ name: '', email: '', department: '', salary: '', status: 'Aktif' });
    const [leaves, setLeaves] = useState([]);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [newLeave, setNewLeave] = useState({ personId: '', type: 'Yıllık İzin', startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] });

    useEffect(() => {
        let storedP = localStorage.getItem('personnelData');
        if (storedP) setPersonnelList(JSON.parse(storedP));
        else { localStorage.setItem('personnelData', JSON.stringify(defaultPersonnel)); setPersonnelList(defaultPersonnel); }

        let storedL = localStorage.getItem('personnelLeaves');
        if (storedL) setLeaves(JSON.parse(storedL));
        else {
            const initialLeaves = [
                { id: 1, name: 'Ahmet Yılmaz', type: 'Yıllık İzin', date: '12-26 Mayıs', days: '14 Gün', initials: 'AY' }
            ];
            setLeaves(initialLeaves);
            localStorage.setItem('personnelLeaves', JSON.stringify(initialLeaves));
        }
    }, []);

    const handleSaveLeave = () => {
        if (!newLeave.personId || !newLeave.startDate || !newLeave.endDate) return;
        const person = personnelList.find(p => p.id === parseInt(newLeave.personId));
        if (!person) return;
        const start = new Date(newLeave.startDate);
        const end = new Date(newLeave.endDate);
        const diffDays = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
        const l = { id: Date.now(), name: person.name, type: newLeave.type, date: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`, days: `${diffDays} Gün`, initials: person.name[0] };
        const updated = [l, ...leaves];
        setLeaves(updated);
        localStorage.setItem('personnelLeaves', JSON.stringify(updated));
        setShowLeaveModal(false);
    };

    const handleSaveNewPerson = () => {
        if (!newPerson.name || !newPerson.department) return;
        const p = { id: Date.now(), ...newPerson, salary: parseFloat(newPerson.salary) || 0, paidAmount: 0 };
        const updated = [...personnelList, p];
        setPersonnelList(updated);
        localStorage.setItem('personnelData', JSON.stringify(updated));
        setShowAddModal(false);
        setNewPerson({ name: '', email: '', department: '', salary: '', status: 'Aktif' });
    };

    const formatCurrency = (val) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(val);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Personel & İK Paneli</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Kurumsal kadronuzu, özlük haklarını ve puantajları tek noktadan yönetin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn" style={{ background: 'white', color: '#1e293b', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', border: 'none', cursor: 'pointer' }} onClick={() => setShowAddModal(true)}>
                            <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i> Yeni Personel
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* İK Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { label: 'TOPLAM PERSONEL', value: personnelList.length, icon: 'fa-users', color: '#6366f1' },
                        { label: 'AYLIK MAAŞ YÜKÜ', value: formatCurrency(personnelList.reduce((acc, p) => acc + p.salary, 0)), icon: 'fa-money-bill-trend-up', color: '#10b981' },
                        { label: 'İZİNLİ SAYISI', value: personnelList.filter(p => p.status !== 'Aktif').length, icon: 'fa-umbrella-beach', color: '#f59e0b' },
                        { label: 'BEKLEYEN ÖDEME', value: formatCurrency(124500), icon: 'fa-clock-rotate-left', color: '#ef4444' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '5px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                    <i className={`fa-solid ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px' }}>
                    {/* Personnel Table */}
                    <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>Kadrosu Listesi</h3>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="standard-data-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '40%' }}>Personel Bilgisi</th>
                                        <th style={{ width: '20%' }}>Departman</th>
                                        <th style={{ width: '20%', textAlign: 'right' }}>Maaş (Net)</th>
                                        <th style={{ width: '10%', textAlign: 'center' }}>Durum</th>
                                        <th style={{ width: '10%', textAlign: 'center' }}>İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personnelList.map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f1f5f9', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                                                        {p.name[0]}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{p.name}</div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span style={{ fontWeight: '700', color: '#64748b', fontSize: '13px' }}>{p.department}</span></td>
                                            <td style={{ textAlign: 'right', fontWeight: '800', color: '#3b82f6' }}>{formatCurrency(p.salary)}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <span className="badge-modern" style={{ background: p.status === 'Aktif' ? '#f0fdf4' : '#fef2f2', color: p.status === 'Aktif' ? '#16a34a' : '#ef4444' }}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                                                    <button className="btn-icon" title="Hesapla" onClick={() => { setSelectedPerson(p); setShowPaymentModal(true); }}><i className="fa-solid fa-calculator"></i></button>
                                                    <button className="btn-icon delete"><i className="fa-solid fa-trash"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Left Sidebar - Leaves */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>İzin Takvimi</h4>
                                <button className="btn-icon" onClick={() => setShowLeaveModal(true)}><i className="fa-solid fa-plus"></i></button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {leaves.map(l => (
                                    <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800' }}>{l.initials}</div>
                                        <div>
                                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b' }}>{l.name}</div>
                                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{l.type} • {l.days}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Modals (Summary) */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '500px' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'center' }}>Yeni Personel Profil</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input className="input-modern" placeholder="Ad Soyad" value={newPerson.name} onChange={e => setNewPerson({...newPerson, name: e.target.value})} />
                            <input className="input-modern" placeholder="Departman" value={newPerson.department} onChange={e => setNewPerson({...newPerson, department: e.target.value})} />
                            <input className="input-modern" type="number" placeholder="Net Maaş (₺)" value={newPerson.salary} onChange={e => setNewPerson({...newPerson, salary: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '12px', height: '48px' }} onClick={handleSaveNewPerson}>Profili Kaydet</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '48px' }} onClick={() => setShowAddModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonnelTracking;
