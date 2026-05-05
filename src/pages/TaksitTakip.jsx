import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';

const TaksitTakip = () => {
    const navigate = useNavigate();
    const [installments, setInstallments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadInstallments();
    }, []);

    const loadInstallments = () => {
        let savedData = JSON.parse(localStorage.getItem('installments'));
        
        if (!savedData || savedData.length === 0) {
            // Initial mock data as seen in the HTML
            savedData = [
                { id: 1, title: 'SANCAK İLETİŞİM', total: 1179.40, totalPaid: 1179.40 },
                { id: 2, title: 'Akın Zahire', total: 1625.00, totalPaid: 710.00 }
            ];
            localStorage.setItem('installments', JSON.stringify(savedData));
        }
        setInstallments(savedData);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    };

    const filteredInstallments = installments.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExcelExport = () => {
        const headers = ['Ünvan', 'Tutar', 'Tahsilat', 'Kalan'];
        const data = filteredInstallments.map(item => [
            item.title, 
            item.total.toFixed(2) + ' ₺', 
            item.totalPaid.toFixed(2) + ' ₺', 
            (item.total - item.totalPaid).toFixed(2) + ' ₺'
        ]);
        exportToExcel(data, headers, 'taksit_listesi', 'Taksit Takip');
    };


    return (
    <div className="page-container">
      <div className="page-header-wrapper">
        <div style={{ flex: 1 }}>
          <h2 className="page-title-main"><i className="fa-solid fa-calendar-check"></i> Taksit Takip Sistemi</h2>
          <div className="page-actions-row" style={{ marginTop: '15px' }}>
            <button className="btn btn-dark" onClick={() => navigate('/raporlar/taksit')}>
              <i className="fa-solid fa-plus-circle"></i> Yeni Taksit Planı
            </button>
            <button className="btn btn-warning" onClick={() => navigate('/raporlar/taksit')}>
              <i className="fa-solid fa-file-invoice"></i> Genel Rapor
            </button>
            <button className="btn btn-success" onClick={handleExcelExport}>
              <i className="fa-solid fa-file-excel"></i> Excel'e Aktar
            </button>
          </div>
        </div>

        <div className="header-stats-mini-chart" style={{ flex: '0 0 320px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Genel Tahsilat Oranı</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }}></div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#10b981' }}>%65</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>Bekleyen toplam: 12.450,00 ₺</div>
        </div>
      </div>

      <div className="main-content-card">
        <div className="standard-filter-bar">
          <div className="filter-group">
            <input 
              type="text" 
              className="search-input-modern" 
              placeholder="Müşteri ünvanı ile ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '350px' }}
            />
          </div>
          <div className="filter-group">
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
               <i className="fa-solid fa-users" style={{ marginRight: '8px' }}></i>
               {installments.length} Aktif Plan
            </div>
          </div>
        </div>

        <div className="standard-table-wrapper">
          <table className="standard-data-table">
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Müşteri / Firma Ünvanı</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Toplam Tutar</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Ödenen</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Kalan Bakiye</th>
                <th style={{ width: '10%', textAlign: 'center' }}>Detay</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstallments.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: '700', color: '#1e293b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.total - item.totalPaid > 0 ? '#f59e0b' : '#10b981' }}></div>
                       {item.title}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '600' }}>{formatCurrency(item.total)}</td>
                  <td style={{ textAlign: 'right', color: '#059669', fontWeight: '700' }}>{formatCurrency(item.totalPaid)}</td>
                  <td style={{ textAlign: 'right', color: item.total - item.totalPaid > 0 ? '#ef4444' : '#94a3b8', fontWeight: '800' }}>
                    {formatCurrency(item.total - item.totalPaid)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-icon" onClick={() => navigate('/raporlar/taksit')}>
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInstallments.length === 0 && (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Eşleşen taksit kaydı bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default TaksitTakip;
