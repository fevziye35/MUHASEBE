import React, { useState, useEffect } from 'react';
import { exportToExcel } from '../utils/excelExport';
import '../styles/global.css';

const Banka = () => {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showYeniBankaModal, setShowYeniBankaModal] = useState(false);
    const [showVirmanModal, setShowVirmanModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [newAccount, setNewAccount] = useState({ bankName: '', accountNumber: '', iban: '', branch: '', currency: 'TRY', description: '' });

    useEffect(() => { loadAccounts(); }, []);

    const loadAccounts = () => {
        const data = localStorage.getItem('bankAccounts');
        let savedAccounts = data && data !== "undefined" ? JSON.parse(data) : [
            { id: 1, bankName: 'Garanti BBVA', branch: 'Merkez', accountNumber: '1234567', iban: 'TR00 0000 0000 0000 0000 0000 01', balance: 540200.00, currency: 'TRY' },
            { id: 2, bankName: 'Akbank', branch: 'Ticari', accountNumber: '9876543', iban: 'TR00 0000 0000 0000 0000 0000 02', balance: 12500.00, currency: 'TRY' }
        ];
        setAccounts(savedAccounts);
        localStorage.setItem('bankAccounts', JSON.stringify(savedAccounts));
    };

    const handleAddAccount = () => {
        if (!newAccount.bankName) return alert('Lütfen banka adını giriniz.');
        const account = { id: Date.now(), ...newAccount, balance: 0, createdAt: new Date().toISOString() };
        const updated = [...accounts, account];
        localStorage.setItem('bankAccounts', JSON.stringify(updated));
        setAccounts(updated);
        setShowYeniBankaModal(false);
        setNewAccount({ bankName: '', accountNumber: '', iban: '', branch: '', currency: 'TRY', description: '' });
    };

    const confirmDelete = () => {
        if (showDeleteConfirm) {
            const updated = accounts.filter(acc => acc.id !== showDeleteConfirm);
            localStorage.setItem('bankAccounts', JSON.stringify(updated));
            setAccounts(updated);
            setShowDeleteConfirm(null);
        }
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
    const totalBankBalance = accounts.reduce((acc, a) => acc + a.balance, 0);

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e1b4b 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-40px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Banka & Mevduat Yönetimi</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>Tüm banka hesaplarınızı ve varlık dağılımınızı profesyonelce izleyin.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn" style={{ background: 'white', color: '#1e40af', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', border: 'none', cursor: 'pointer' }} onClick={() => setShowYeniBankaModal(true)}>
                            <i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni Hesap
                        </button>
                         <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: '700', borderRadius: '12px', height: '48px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '0 20px' }} onClick={() => setShowVirmanModal(true)}>
                            Virman Yap
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Bank Portfolio Stats */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TOPLAM BANKA MEVDUATI</div>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', marginTop: '5px' }}>{formatCurrency(totalBankBalance)}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                         <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>KAYITLI BANKA</div>
                            <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e40af' }}>{accounts.length} Hesap</div>
                        </div>
                        <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                            <i className="fa-solid fa-building-columns"></i>
                        </div>
                    </div>
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '25px 30px', borderBottom: '1px solid #f1f5f9' }}>
                        <h3 style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>Hesap Portföyü</h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="standard-data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '35%' }}>Banka / Şube</th>
                                    <th style={{ width: '25%' }}>Hesap Detayları</th>
                                    <th style={{ width: '20%', textAlign: 'right' }}>Güncel Bakiye</th>
                                    <th style={{ width: '20%', textAlign: 'center' }}>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map(acc => (
                                    <tr key={acc.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                                    <i className="fa-solid fa-landmark"></i>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '700', color: '#1e293b' }}>{acc.bankName}</div>
                                                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{acc.branch} ŞUBESİ</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: '#475569', fontSize: '13px' }}>{acc.accountNumber}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{acc.iban || '---'}</div>
                                        </td>
                                        <td style={{ textAlign: 'right', fontWeight: '800', color: '#1e40af', fontSize: '17px' }}>{formatCurrency(acc.balance)}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button className="btn-icon" title="Ekstre"><i className="fa-solid fa-file-invoice"></i></button>
                                                <button onClick={() => setShowDeleteConfirm(acc.id)} className="btn-icon delete"><i className="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Premium Add Modal */}
            {showYeniBankaModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '550px', maxWidth: '95%' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'center' }}>Yeni Banka Hesabı</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <input className="input-modern" placeholder="Banka Adı" value={newAccount.bankName} onChange={e => setNewAccount({...newAccount, bankName: e.target.value})} />
                            <input className="input-modern" placeholder="Şube" value={newAccount.branch} onChange={e => setNewAccount({...newAccount, branch: e.target.value})} />
                            <input className="input-modern" placeholder="Hesap No" value={newAccount.accountNumber} onChange={e => setNewAccount({...newAccount, accountNumber: e.target.value})} />
                            <select className="input-modern" value={newAccount.currency} onChange={e => setNewAccount({...newAccount, currency: e.target.value})}>
                                <option value="TRY">Türk Lirası (₺)</option>
                                <option value="USD">Dolar ($)</option>
                                <option value="EUR">Euro (€)</option>
                            </select>
                            <input className="input-modern" style={{ gridColumn: 'span 2' }} placeholder="IBAN (TR...)" value={newAccount.iban} onChange={e => setNewAccount({...newAccount, iban: e.target.value})} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', height: '48px' }} onClick={handleAddAccount}>Hesabı Tanımla</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', border: 'none', cursor: 'pointer', height: '48px' }} onClick={() => setShowYeniBankaModal(false)}>Vazgeç</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Delete Prompt */}
            {showDeleteConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ width: '70px', height: '70px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 20px' }}>
                            <i className="fa-solid fa-building-circle-exclamation"></i>
                        </div>
                        <h2 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '20px', fontWeight: '700' }}>Hesabı Sil?</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px', lineHeight: '1.6' }}>Bu banka hesabını sildiğinizde bağlı tüm hesap özetleri ve transfer geçmişi de etkilenecektir. Devam edilsin mi?</p>
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

export default Banka;
