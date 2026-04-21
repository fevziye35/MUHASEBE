import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ChecksList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [checks, setChecks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('received'); // 'issued' or 'received'
    const [newCheck, setNewCheck] = useState({
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        firm: '',
        amount: '',
        desc: ''
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('checksList')) || [
            { id: 1, date: '2025-04-10', dueDate: '2025-05-15', firm: 'MAKFA GIDA A.Ş.', status: 'ÖDENMEDİ', amount: 15000, type: 'issued' },
            { id: 2, date: '2025-04-12', dueDate: '2025-06-20', firm: 'YILMAZLAR TİCARET', status: 'CİRO EDİLDİ', amount: 22500, type: 'received' },
        ];
        setChecks(saved);
        if (!localStorage.getItem('checksList')) {
            localStorage.setItem('checksList', JSON.stringify(saved));
        }
    }, []);

    const handleAddCheck = () => {
        if (!newCheck.firm || !newCheck.amount) {
            alert('Lütfen gerekli alanları doldurunuz.');
            return;
        }

        const check = {
            id: Date.now(),
            ...newCheck,
            status: modalType === 'issued' ? 'ÖDENECEK' : 'TAHSİL EDİLECEK',
            type: modalType,
            amount: parseFloat(newCheck.amount)
        };

        const updated = [check, ...checks];
        localStorage.setItem('checksList', JSON.stringify(updated));
        setChecks(updated);
        setShowModal(false);
        setNewCheck({
            date: new Date().toISOString().split('T')[0],
            dueDate: new Date().toISOString().split('T')[0],
            firm: '',
            amount: '',
            desc: ''
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu kaydı silmek istediğinizden emin misiniz?')) {
            const updated = checks.filter(c => c.id !== id);
            localStorage.setItem('checksList', JSON.stringify(updated));
            setChecks(updated);
        }
    };

    const filteredChecks = checks.filter(c => 
        c.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.amount.toString().includes(searchTerm)
    );

    return (
    <div className="page-container">
      <div className="page-header-wrapper">
        <div style={{ flex: 1 }}>
          <h2 className="page-title-main"><i className="fa-solid fa-money-check-dollar"></i> Çek/Senet Yönetimi</h2>
          <div className="page-actions-row" style={{ marginTop: '15px' }}>
            <button 
              onClick={() => { setModalType('issued'); setShowModal(true); }}
              className="btn btn-dark" 
            >
              <i className="fa-solid fa-file-export"></i> Yeni Verilen Çek/Senet
            </button>
            <button 
              onClick={() => { setModalType('received'); setShowModal(true); }}
              className="btn btn-success" 
            >
              <i className="fa-solid fa-file-import"></i> Yeni Alınan Çek/Senet
            </button>
          </div>
        </div>

        <div className="header-stats-mini-chart" style={{ flex: '0 0 320px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>Vadesi Yaklaşanlar</span>
                <span className="badge-modern danger" style={{ fontSize: '10px' }}>3 Adet</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>37.500,00 ₺</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '5px' }}>Önümüzdeki 7 gün içindeki ödemeler</div>
        </div>
      </div>

      <div className="main-content-card">
        <div className="standard-filter-bar">
          <div className="filter-group">
            <input 
              type="text" 
              className="search-input-modern" 
              placeholder="Firma ünvanı veya tutar ile ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '400px' }}
            />
          </div>
          <div className="filter-group">
            <Link to="/raporlar/cek" className="btn btn-secondary">
              <i className="fa-solid fa-chart-pie"></i> Analiz Raporu
            </Link>
          </div>
        </div>

        <div className="standard-table-wrapper">
          <table className="standard-data-table">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Vade Tarihi</th>
                <th style={{ width: '30%' }}>Kurum / Firma Ünvanı</th>
                <th style={{ width: '15%' }}>Kayıt Tarihi</th>
                <th style={{ width: '15%' }}>Durum</th>
                <th style={{ width: '18%', textAlign: 'right' }}>Tutar</th>
                <th style={{ width: '10%', textAlign: 'center' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecks.map((check) => (
                <tr key={check.id}>
                  <td style={{ fontWeight: '700', color: '#1e293b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fa-regular fa-clock" style={{ opacity: 0.4 }}></i>
                      {check.dueDate}
                    </div>
                  </td>
                  <td style={{ fontWeight: '600' }}>{check.firm}</td>
                  <td style={{ color: '#64748b', fontSize: '13px' }}>{check.date}</td>
                  <td>
                    <span className={`badge-modern ${check.type === 'issued' ? 'danger' : 'success'}`} style={{ fontSize: '10px', fontWeight: '800' }}>
                      {check.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: '800', textAlign: 'right', fontSize: '15px', color: '#1e293b' }}>
                    {parseFloat(check.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => navigate(`/raporlar/cek`)} className="btn-icon" title="Detay">
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button onClick={() => handleDelete(check.id)} className="btn-icon delete" title="Sil">
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredChecks.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Kayıt bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay-modern">
          <div className="modal-content-premium">
            <div className="modal-header-elegant">
              <h3>
                <i className={`fa-solid ${modalType === 'issued' ? 'fa-file-export' : 'fa-file-import'}`}></i>
                {modalType === 'issued' ? ' Yeni Verilen Çek/Senet' : ' Yeni Alınan Çek/Senet'}
              </h3>
              <button className="close-btn-minimal" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-body-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group-modern">
                  <label>Kayıt Tarihi</label>
                  <input type="date" className="input-modern" value={newCheck.date} onChange={(e) => setNewCheck({...newCheck, date: e.target.value})} />
                </div>
                <div className="form-group-modern">
                  <label>Vade Tarihi</label>
                  <input type="date" className="input-modern" value={newCheck.dueDate} onChange={(e) => setNewCheck({...newCheck, dueDate: e.target.value})} />
                </div>
                <div className="form-group-modern" style={{ gridColumn: 'span 2' }}>
                  <label>Firma Ünvanı</label>
                  <input type="text" className="input-modern" value={newCheck.firm} onChange={(e) => setNewCheck({...newCheck, firm: e.target.value})} placeholder="İlgili cari ünvanını giriniz..." />
                </div>
                <div className="form-group-modern" style={{ gridColumn: 'span 2' }}>
                  <label>Tutar (₺)</label>
                  <input type="number" className="input-modern" value={newCheck.amount} onChange={(e) => setNewCheck({...newCheck, amount: e.target.value})} placeholder="0,00" />
                </div>
              </div>
            </div>
            <div className="modal-footer-elegant">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>İptal</button>
              <button 
                className={`btn ${modalType === 'issued' ? 'btn-dark' : 'btn-success'}`} 
                onClick={handleAddCheck}
              >
                Kaydı Tamamla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecksList;
