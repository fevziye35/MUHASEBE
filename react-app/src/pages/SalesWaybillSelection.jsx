import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SalesWaybillSelection = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, [searchTerm]);

  const loadCustomers = () => {
    let stored = JSON.parse(localStorage.getItem('customers')) || [];
    
    if (stored.length === 0) {
      stored = [
        { id: 1, name: 'ali', authorized: '-', email: 'ali@example.com', taxNo: '1234567890', address: 'İstanbul, Türkiye' },
        { id: 2, name: 'fevziye', authorized: '-', email: 'fevziye@example.com', taxNo: '0987654321', address: 'İzmir, Türkiye' }
      ];
      localStorage.setItem('customers', JSON.stringify(stored));
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      stored = stored.filter(c => 
        (c.name || '').toLowerCase().includes(lower) || 
        (c.authorized || '').toLowerCase().includes(lower)
      );
    }
    setCustomers(stored);
  };

  const handleSelectCustomer = (id) => {
    navigate(`/satis-irsaliye-detay?cari_id=${id}`);
  };

  return (
    <div className="dash-container">
      <h2 className="page-title">İrsaliye Kes</h2>

      <div style={{ marginBottom: '20px' }}>
        <Link to="/cari-yeni" className="btn btn-dark-blue p-20" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <i className="fa-solid fa-user-plus"></i> Yeni Cari Ekle
        </Link>
      </div>

      <div className="selection-section">
        <div className="section-header bg-gray-header" style={{ padding: '15px 20px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <i className="fa-solid fa-users"></i>
          İrsaliye Yapılacak Cari Seçimi
        </div>
        <div className="content-box" style={{ background: 'white', padding: '20px', borderRadius: '0 0 8px 8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div className="search-container mb-20">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
          </div>

          <div className="table-container" style={{ overflowX: 'auto' }}>
            <table className="customer-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-header" style={{ background: '#f8f9fa', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee', width: '150px' }}>İşlem</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee' }}>Ünvan</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #eee' }}>Yetkili</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? customers.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button className="btn btn-secondary" onClick={() => handleSelectCustomer(c.id)}>
                        <i className="fa-solid fa-arrow-right"></i> Cari Seç
                      </button>
                    </td>
                    <td style={{ padding: '12px' }}>{c.name || '-'}</td>
                    <td style={{ padding: '12px' }}>{c.authorized || '-'}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>Kayıt bulunamadı.</td>
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

export default SalesWaybillSelection;
