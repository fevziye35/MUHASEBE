import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exportToExcel } from '../utils/excelExport';

const InvoiceDetail = () => {
  const { no } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    // Check both sales and purchase invoices
    const sales = JSON.parse(localStorage.getItem('salesInvoices')) || [];
    const purchase = JSON.parse(localStorage.getItem('purchaseInvoices')) || [];
    const all = [
      ...sales.map(inv => ({ ...inv, type: 'satis', typeLabel: 'Satış Faturası' })),
      ...purchase.map(inv => ({ ...inv, type: 'alis', typeLabel: 'Alış Faturası' }))
    ];
    
    const found = all.find(inv => inv.invoiceNo === no);
    if (found) {
      setInvoice(found);
    }
  }, [no]);

    const logo = localStorage.getItem('companyLogo') || null;

    const handlePrint = () => {
      window.print();
    };
  
    const handleExcel = () => {
      if (!invoice) return;
      
      const items = invoice.items || [];
      
      // Excel'e özel HTML yapısı - Logo eklendi
      let excelHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="UTF-8">
          <style>
            .header-title { font-size: 24px; font-weight: bold; text-align: left; }
            .label { font-weight: bold; width: 120px; }
            .table-header { background-color: #f2f2f2; font-weight: bold; border: 1pt solid black; }
            .table-cell { border: 1pt solid #ccc; }
            .total-label { font-weight: bold; text-align: right; }
            .total-value { font-weight: bold; text-align: right; }
          </style>
        </head>
        <body>
          <table>
            ${logo ? `<tr><td colspan="6"><img src="${logo}" width="150" height="80"></td></tr>` : ''}
            <tr><td colspan="6" class="header-title">FATURA</td></tr>
            <tr><td colspan="6"></td></tr>
            <tr><td class="label">Fatura No:</td><td colspan="5">${invoice.invoiceNo}</td></tr>
            <tr><td class="label">Tarih:</td><td colspan="5">${invoice.date}</td></tr>
            <tr><td class="label">Müşteri:</td><td colspan="5">${invoice.cariCode}</td></tr>
            <tr><td colspan="6"></td></tr>
            <thead>
              <tr>
                <th class="table-header">AÇIKLAMA</th>
                <th class="table-header">MİKTAR</th>
                <th class="table-header">BİRİM</th>
                <th class="table-header">FİYAT</th>
                <th class="table-header">KDV</th>
                <th class="table-header">TOPLAM</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td class="table-cell">${item.name || item.description || ''}</td>
                  <td class="table-cell" style="text-align:right">${item.quantity || 0}</td>
                  <td class="table-cell" style="text-align:center">${item.unit || ''}</td>
                  <td class="table-cell" style="text-align:right">${parseFloat(item.price || 0).toFixed(2)}</td>
                  <td class="table-cell" style="text-align:right">%${item.taxRate || 0}</td>
                  <td class="table-cell" style="text-align:right">${parseFloat(item.total || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tr><td colspan="6"></td></tr>
            <tr>
              <td colspan="4"></td>
              <td class="total-label">Ara Toplam:</td>
              <td class="total-value" style="text-align:right">${parseFloat(invoice.subTotal || invoice.total * 0.8 || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td class="total-label">KDV Toplamı:</td>
              <td class="total-value" style="text-align:right">${parseFloat(invoice.taxTotal || invoice.total * 0.2 || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td class="total-label">GENEL TOPLAM:</td>
              <td class="total-value" style="text-align:right">${parseFloat(invoice.grandTotal || invoice.total || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="4"></td>
              <td colspan="2" style="text-align:right; font-size:10px; color:#666">Yalnız: ${invoice.totalText || ''}</td>
            </tr>
          </table>
        </body>
        </html>
      `;
  
      const blob = new Blob([excelHtml], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `fatura_${invoice.invoiceNo}.xls`;
      document.body.appendChild(link);
      setTimeout(() => {
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);
      }, 50);
    };
  
    if (!invoice) {
      return (
        <div className="dash-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Fatura Bulunamadı</h2>
            <button onClick={() => navigate('/faturalar')} className="btn btn-dark-blue" style={{ marginTop: '20px' }}>Listeye Dön</button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="dash-container invoice-detail-page">
        <style>
          {`
            @media print {
              .sidebar, .header, .no-print, .fab-help {
                display: none !important;
              }
              .main-content { margin: 0 !important; padding: 0 !important; width: 100% !important; background: white !important; }
              .dash-container { padding: 0 !important; margin: 0 !important; width: 100% !important; }
              .invoice-card { 
                width: 100% !important; 
                max-width: 100% !important; 
                margin: 0 !important; 
                padding: 5mm !important; 
                border: none !important; 
                box-shadow: none !important; 
                min-height: auto !important;
                font-size: 11pt !important;
              }
              h1 { font-size: 20pt !important; }
              h3 { font-size: 14pt !important; }
              p, span, td, th { font-size: 9pt !important; }
              table { width: 100% !important; }
              .invoice-card img { max-height: 50px !important; }
              @page { size: A4; margin: 10mm; }
              body { background: white !important; -webkit-print-color-adjust: exact; }
            }
            .invoice-card { background: white; padding: 40px; border: 1px solid #ddd; min-height: 29.7cm; width: 21cm; margin: 0 auto; color: black; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          `}
        </style>
  
        {/* Action Header - Hidden during print */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e3a8a', margin: 0 }}>Fatura Detayı: {invoice.invoiceNo}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/faturalar')} className="btn btn-secondary">
              <i className="fa-solid fa-arrow-left"></i> Geri Dön
            </button>
            <button onClick={handleExcel} className="btn btn-success">
              <i className="fa-solid fa-file-excel"></i> Excel
            </button>
            <button onClick={handlePrint} className="btn btn-red">
              <i className="fa-solid fa-file-pdf"></i> PDF / Yazdır
            </button>
          </div>
        </div>
  
        {/* Invoice Document Layout */}
        <div className="invoice-card">
          
          {/* Document Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px' }}>
            <div>
              {logo && <img src={logo} alt="Logo" style={{ maxHeight: '80px', maxWidth: '200px', marginBottom: '15px', display: 'block' }} />}
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 10px 0' }}>FATURA</h1>
              <p style={{ margin: '2px 0', fontSize: '14px' }}><strong>Fatura No:</strong> {invoice.invoiceNo}</p>
              <p style={{ margin: '2px 0', fontSize: '14px' }}><strong>Tarih:</strong> {invoice.date}</p>
              <p style={{ margin: '2px 0', fontSize: '14px' }}><strong>Saat:</strong> {invoice.time}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
               <h3 style={{ margin: '0 0 5px 0' }}>{invoice.typeLabel}</h3>
               <p style={{ fontSize: '12px', color: '#666' }}>Resmi Evrak Hükmündedir</p>
            </div>
          </div>

        {/* Parties Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          {/* Düzenleyen (Sol Taraf) */}
          <div>
            <h4 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', textTransform: 'uppercase', fontSize: '14px', color: '#666' }}>Düzenleyen</h4>
            <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>MAKFA GLOBAL</strong></p>
            <p style={{ margin: '2px 0', fontSize: '14px' }}>Vergi Dairesi: Bornova</p>
            <p style={{ margin: '2px 0', fontSize: '14px' }}>VKN: 1234567890</p>
          </div>
          {/* Sayın Müşteri (Sağ Taraf) */}
          <div style={{ textAlign: 'right' }}>
            <h4 style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', textTransform: 'uppercase', fontSize: '14px', color: '#666' }}>Sayın (Müşteri)</h4>
            <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>{invoice.cariCode}</strong></p>
            <p style={{ margin: '2px 0', fontSize: '14px' }}>{invoice.descTitle || 'Açıklama belirtilmemiş'}</p>
          </div>
        </div>

        {/* Product Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
              <th style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>AÇIKLAMA</th>
              <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', width: '80px' }}>MİKTAR</th>
              <th style={{ padding: '10px', textAlign: 'center', fontSize: '12px', width: '80px' }}>BİRİM</th>
              <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', width: '100px' }}>B.FİYAT</th>
              <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', width: '60px' }}>KDV</th>
              <th style={{ padding: '10px', textAlign: 'right', fontSize: '12px', width: '120px' }}>TOPLAM</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).length > 0 ? invoice.items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 10px', fontSize: '13px' }}>{item.name || item.description}</td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'right' }}>{item.quantity}</td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'center' }}>{item.unit}</td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'right' }}>{parseFloat(item.price).toFixed(2)} ₺</td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'right' }}>%{item.taxRate}</td>
                <td style={{ padding: '12px 10px', fontSize: '13px', textAlign: 'right', fontWeight: 'bold' }}>{parseFloat(item.total).toFixed(2)} ₺</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>Kalem bilgisi bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
              <span>Ara Toplam:</span>
              <span>{parseFloat(invoice.subTotal || invoice.total * 0.8 || 0).toFixed(2)} ₺</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
              <span>KDV Toplamı:</span>
              <span>{parseFloat(invoice.taxTotal || invoice.total * 0.2 || 0).toFixed(2)} ₺</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '18px', fontWeight: 'bold', borderBottom: '2px solid #000' }}>
              <span>GENEL TOPLAM:</span>
              <span>{parseFloat(invoice.grandTotal || invoice.total || 0).toFixed(2)} ₺</span>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px', textAlign: 'right' }}>
              Yalnız: {invoice.totalText || '---'}
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '50px', borderTop: '1px dashed #ccc', paddingTop: '20px', fontSize: '12px', color: '#666' }}>
          <p><strong>Ödeme Şekli:</strong> {invoice.paymentMethod || 'Belirtilmemiş'}</p>
          <p style={{ marginTop: '20px', textAlign: 'center' }}>Bu belge elektronik ortamda oluşturulmuştur.</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
