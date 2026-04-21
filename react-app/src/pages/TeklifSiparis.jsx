import React, { useState, useEffect } from 'react';

const TeklifSiparis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [newEntry, setNewEntry] = useState({
    type: 'Offer',
    direction: 'Issued',
    no: '',
    firm: '',
    total: '',
    desc: '',
    status: 'Beklemede',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('teklifSiparisList')) || [];
    setData(saved);
  }, []);

  const handleOpenModal = (title, type, direction) => {
    setModalTitle(title);
    const date = new Date();
    const randomNo = Math.floor(Math.random() * 10000);
    const prefix = type === 'Offer' ? 'TK' : 'SP';
    setNewEntry({
      ...newEntry,
      type,
      direction,
      no: `${prefix}${date.getFullYear()}${randomNo}`,
      firm: '',
      total: '',
      desc: '',
      date: date.toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!newEntry.firm || !newEntry.total) {
      alert('Lütfen firma ve tutar alanlarını doldurunuz.');
      return;
    }
    const updated = [
      { id: Date.now(), ...newEntry, total: parseFloat(newEntry.total) },
      ...data
    ];
    localStorage.setItem('teklifSiparisList', JSON.stringify(updated));
    setData(updated);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu kaydı silmek istediğinizden emin misiniz?')) {
      const updated = data.filter(item => item.id !== id);
      localStorage.setItem('teklifSiparisList', JSON.stringify(updated));
      setData(updated);
    }
  };

  const filteredData = data.filter(item => {
    const firmMatch = item.firm && item.firm.toLowerCase().includes(searchTerm.toLowerCase());
    const noMatch = item.no && item.no.includes(searchTerm);
    const matchesSearch = firmMatch || noMatch;
    const matchesFilter = filterType === 'all' || (filterType === 'offer' ? item.type === 'Offer' : item.type === 'Order');
    return matchesSearch && matchesFilter;
  });

  const tableHeaderStyle = {
    background: '#7f8c8d',
    color: 'white',
    padding: '12px 15px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600'
  };

  const tableCellStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #eee',
    fontSize: '14px'
  };

  return (
    <div className="dash-container">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* Main Panel */}
        <div style={{ flex: 3, background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
          <h2 style={{ margin: '0 0 20px 0', fontWeight: '600', fontSize: '24px', color: '#1a2d4c' }}>Teklif/Sipariş</h2>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{ position: 'relative', display: 'flex', flex: 1, maxWidth: '300px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Ara"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingRight: '40px', height: '40px' }}
              />
              <button className="btn btn-dark-blue" style={{ position: 'absolute', right: 0, height: '40px', width: '40px', borderRadius: '0 4px 4px 0' }}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <select 
              className="form-control" 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ width: 'auto', minWidth: '150px', height: '40px' }}
            >
              <option value="all">Hepsi</option>
              <option value="offer">Teklif</option>
              <option value="order">Sipariş</option>
            </select>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>TÜR / YÖN</th>
                  <th style={tableHeaderStyle}>TARİH</th>
                  <th style={tableHeaderStyle}>NO</th>
                  <th style={tableHeaderStyle}>DURUM</th>
                  <th style={tableHeaderStyle}>ÜNVAN</th>
                  <th style={tableHeaderStyle}>TOPLAM</th>
                  <th style={tableHeaderStyle}>İŞLEM</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ ...tableCellStyle, textAlign: 'center', padding: '40px', color: '#999' }}>
                      Kayıt bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td style={tableCellStyle}>{item.type === 'Offer' ? 'Teklif' : 'Sipariş'} ({item.direction === 'Issued' ? 'Verilen' : 'Alınan'})</td>
                      <td style={tableCellStyle}>{item.date}</td>
                      <td style={tableCellStyle}>{item.no}</td>
                      <td style={tableCellStyle}>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', background: '#e1f5fe', color: '#01579b', fontWeight: 'bold' }}>{item.status}</span>
                      </td>
                      <td style={tableCellStyle}>{item.firm}</td>
                      <td style={{ ...tableCellStyle, fontWeight: 'bold' }}>{item.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</td>
                      <td style={tableCellStyle}>
                        <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '18px', color: '#1a2d4c', marginBottom: '15px', borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>Teklif</h3>
            <button onClick={() => handleOpenModal('Yeni Verilen Teklif', 'Offer', 'Issued')} className="btn btn-dark-blue" style={{ width: '100%', marginBottom: '10px', justifyContent: 'center', gap: '10px' }}>
              <i className="fa-solid fa-arrow-up"></i> Yeni Verilen Teklif
            </button>
            <button onClick={() => handleOpenModal('Yeni Alınan Teklif', 'Offer', 'Received')} className="btn btn-dark-blue" style={{ width: '100%', justifyContent: 'center', gap: '10px' }}>
              <i className="fa-solid fa-arrow-down"></i> Yeni Alınan Teklif
            </button>
          </div>

          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '18px', color: '#1a2d4c', marginBottom: '15px', borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>Sipariş</h3>
            <button onClick={() => handleOpenModal('Yeni Verilen Sipariş', 'Order', 'Issued')} className="btn btn-dark-blue" style={{ width: '100%', marginBottom: '10px', justifyContent: 'center', gap: '10px' }}>
              <i className="fa-solid fa-arrow-up"></i> Yeni Verilen Sipariş
            </button>
            <button onClick={() => handleOpenModal('Yeni Alınan Sipariş', 'Order', 'Received')} className="btn btn-dark-blue" style={{ width: '100%', justifyContent: 'center', gap: '10px' }}>
              <i className="fa-solid fa-arrow-down"></i> Yeni Alınan Sipariş
            </button>
          </div>

          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '18px', color: '#1a2d4c', marginBottom: '15px', borderBottom: '2px solid #ddd', paddingBottom: '5px' }}>Raporlar</h3>
            <button 
              onClick={() => {
                if (data.length === 0) { alert('Listelenecek veri bulunamadı.'); return; }
                const headers = ['Tür', 'Yön', 'Tarih', 'No', 'Durum', 'Firma', 'Toplam'];
                const exportData = data.map(item => [
                  item.type === 'Offer' ? 'Teklif' : 'Sipariş',
                  item.direction === 'Issued' ? 'Verilen' : 'Alınan',
                  item.date,
                  item.no,
                  item.status,
                  item.firm,
                  item.total.toFixed(2) + ' TL'
                ]);
                import('../utils/excelExport').then(module => {
                  module.exportToExcel(exportData, headers, 'teklif_siparis_raporu');
                });
              }} 
              className="btn btn-dark-blue" 
              style={{ width: '100%', background: '#e67e22', border: 'none', justifyContent: 'center', gap: '10px' }}
            >
              <i className="fa-solid fa-file-excel"></i> Excel Raporu Al
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '450px' }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{modalTitle}</h3>
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Tarih</label>
                <input type="date" value={newEntry.date} onChange={(e) => setNewEntry({...newEntry, date: e.target.value})} className="form-control" style={{ width: '100%', height: '35px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>No</label>
                <input type="text" value={newEntry.no} readOnly className="form-control" style={{ width: '100%', background: '#f1f5f9', height: '35px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Firma Ünvanı</label>
                <input type="text" value={newEntry.firm} onChange={(e) => setNewEntry({...newEntry, firm: e.target.value})} className="form-control" style={{ width: '100%', height: '35px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Toplam Tutar (TL)</label>
                <input type="number" value={newEntry.total} onChange={(e) => setNewEntry({...newEntry, total: e.target.value})} className="form-control" style={{ width: '100%', height: '35px' }} />
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ background: '#64748b', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '4px' }}>İptal</button>
              <button onClick={handleSave} className="btn btn-dark-blue" style={{ padding: '8px 20px' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeklifSiparis;
