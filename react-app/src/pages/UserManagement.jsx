import React, { useState } from 'react';
import { exportToExcel } from '../utils/excelExport';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const UserManagement = () => {
    const { users, addUser, updateUsers } = useAuth();
    const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'user', password: '' });
    const [modal, setModal] = useState({ show: false, mode: '', user: null });
    const [modalInput, setModalInput] = useState({ name: '', email: '', password: '' });

    const generatePassword = () => {
        const pass = Math.floor(1000 + Math.random() * 9000).toString();
        setInviteForm({ ...inviteForm, password: pass });
    };

    const handleInvite = (e) => {
        e.preventDefault();
        if (addUser(inviteForm.email, inviteForm.password, inviteForm.name)) {
            alert(`Kullanıcı Sisteme Eklendi! Bilgiler başarıyla arşivlendi.`);
            setInviteForm({ name: '', email: '', role: 'user', password: '' });
        } else {
            alert('Bu e-posta adresi zaten kullanımda!');
        }
    };

    const openModal = (mode, user) => {
        setModal({ show: true, mode, user });
        setModalInput({ name: user.name, email: user.email, password: user.password });
    };

    const handleModalSubmit = (e) => {
        if (e) e.preventDefault();
        let newList;
        if (modal.mode === 'edit') newList = users.map(u => u.id === modal.user.id ? { ...u, ...modalInput } : u);
        else if (modal.mode === 'password') newList = users.map(u => u.id === modal.user.id ? { ...u, password: modalInput.password } : u);
        else if (modal.mode === 'delete') newList = users.filter(u => u.id !== modal.user.id);
        
        if(newList) updateUsers(newList);
        setModal({ show: false, mode: '', user: null });
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', padding: '60px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#c7d2fe', letterSpacing: '0.1em', marginBottom: '8px' }}>GÜVENLİ ERİŞİM & YETKİLENDİRME</div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', letterSpacing: '-0.03em' }}>Kullanıcı Yönetimi</h1>
                        <p style={{ margin: '10px 0 0', opacity: 0.8, fontSize: '18px' }}>Sistem kullanıcılarını, yetki seviyelerini ve erişim anahtarlarını denetleyin.</p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                    
                    {/* Active Users Section */}
                    <div className="main-content-card" style={{ background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>Aktif Personel Listesi</h3>
                            <button onClick={() => {
                                const headers = ['Ad Soyad', 'E-Posta', 'Sistem Şifresi'];
                                const data = users.map(u => [u.name, u.email, u.password]);
                                exportToExcel(data, headers, 'kullanici_listesi', 'Sistem Kullanıcıları');
                            }} style={{ background: '#f8fafc', color: '#4338ca', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '8px 15px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
                                <i className="fa-solid fa-file-excel" style={{ marginRight: '8px' }}></i> Listeyi Dışa Aktar
                            </button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="standard-data-table">
                                <thead>
                                    <tr>
                                        <th>KULLANICI</th>
                                        <th>E-POSTA ADRESİ</th>
                                        <th>ERİŞİM KODU</th>
                                        <th style={{ textAlign: 'center' }}>AKSİYON</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: user.isOwner ? '#e0f2fe' : '#f1f5f9', color: user.isOwner ? '#0ea5e9' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '15px' }}>{user.name}</div>
                                                        <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: user.isOwner ? '#0ea5e9' : '#94a3b8', background: user.isOwner ? '#f0f9ff' : '#f8fafc', padding: '2px 6px', borderRadius: '4px' }}>
                                                            {user.isOwner ? 'Yönetici' : 'Operatör'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ color: '#64748b', fontWeight: '600' }}>{user.email}</td>
                                            <td><code style={{ background: '#f8fafc', padding: '6px 12px', borderRadius: '10px', color: '#4338ca', fontWeight: '800', border: '1px solid #e2e8f0', fontSize: '13px' }}>{user.password}</code></td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    <button onClick={() => openModal('edit', user)} className="btn-icon" style={{ background: '#f8fafc', color: '#4338ca' }}><i className="fa-solid fa-pen"></i></button>
                                                    <button onClick={() => openModal('password', user)} className="btn-icon" style={{ background: '#f8fafc', color: '#0ea5e9' }}><i className="fa-solid fa-key"></i></button>
                                                    {!user.isOwner && <button onClick={() => openModal('delete', user)} className="btn-icon delete"><i className="fa-solid fa-trash-can"></i></button>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Registry Section */}
                    <div className="main-content-card" style={{ padding: '35px', background: 'white', borderRadius: '28px', border: 'none', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.05)', height: 'fit-content' }}>
                        <h3 style={{ margin: '0 0 30px 0', fontSize: '18px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <i className="fa-solid fa-user-plus" style={{ color: '#10b981' }}></i> Yeni Sisteme Dahil Et
                        </h3>
                        <form onSubmit={handleInvite}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>AD SOYAD</label>
                                    <input className="input-modern" placeholder="Ad Soyad giriniz..." value={inviteForm.name} onChange={e => setInviteForm({...inviteForm, name: e.target.value})} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>E-POSTA ADRESİ</label>
                                    <input className="input-modern" type="email" placeholder="ornek@mail.com" value={inviteForm.email} onChange={e => setInviteForm({...inviteForm, email: e.target.value})} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>ERİŞİM ŞİFRESİ</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input className="input-modern" style={{ flex: 1 }} placeholder="****" value={inviteForm.password} onChange={e => setInviteForm({...inviteForm, password: e.target.value})} required />
                                        <button type="button" onClick={generatePassword} style={{ width: '54px', height: '54px', background: '#f0f9ff', color: '#4338ca', border: '2px dashed #4338ca', borderRadius: '15px', cursor: 'pointer' }}><i className="fa-solid fa-wand-magic-sparkles"></i></button>
                                    </div>
                                </div>
                                <button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', fontWeight: '900', borderRadius: '18px', height: '60px', border: 'none', fontSize: '16px', marginTop: '10px', boxShadow: '0 15px 30px rgba(16, 185, 129, 0.2)' }}>Sisteme Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Premium Modals (Edit, Password, Delete) */}
            {modal.show && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '32px', width: '420px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <h2 style={{ marginBottom: '25px', fontSize: '24px', fontWeight: '900', color: '#1e293b', textAlign: 'center' }}>
                            {modal.mode === 'edit' ? 'Kullanıcı Düzenle' : modal.mode === 'password' ? 'Şifre Yenile' : 'Kullanıcıyı Sil'}
                        </h2>
                        {modal.mode === 'delete' ? (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}><i className="fa-solid fa-user-slash"></i></div>
                                <p style={{ color: '#64748b', lineHeight: '1.6' }}><strong style={{ color: '#ef4444' }}>{modal.user?.name}</strong> kullanıcısını silmek istediğinize emin misiniz?</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {modal.mode === 'edit' && (
                                    <>
                                        <div><label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>AD SOYAD</label><input className="input-modern" value={modalInput.name} onChange={e => setModalInput({...modalInput, name: e.target.value})} /></div>
                                        <div><label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>E-POSTA</label><input className="input-modern" value={modalInput.email} onChange={e => setModalInput({...modalInput, email: e.target.value})} /></div>
                                    </>
                                )}
                                <div><label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', marginBottom: '8px' }}>YENİ ŞİFRE</label><input className="input-modern" value={modalInput.password} onChange={e => setModalInput({...modalInput, password: e.target.value})} /></div>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                            <button className="btn" style={{ flex: 1, background: modal.mode === 'delete' ? '#ef4444' : '#4338ca', color: 'white', borderRadius: '15px', height: '54px', fontWeight: '800' }} onClick={handleModalSubmit}>{modal.mode === 'delete' ? 'Evet, Sil' : 'Kaydet'}</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '15px', height: '54px', fontWeight: '800' }} onClick={() => setModal({ show: false, mode: '', user: null })}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
