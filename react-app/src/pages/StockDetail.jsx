import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const StockDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState(null);
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const loadStockData = () => {
            const initialData = [
                { id: 1, code: '-', barcode: '5', name: 'Brown', salesPrice: 0.75, buyPrice: 0.50, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Adet' },
                { id: 2, code: '-', barcode: '2', name: 'Buğday Ekmek', salesPrice: 3.00, buyPrice: 2.00, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Adet' },
                { id: 3, code: '-', barcode: '3', name: 'Çamlıca Beyaz', salesPrice: 3.50, buyPrice: 2.50, stock: 0, brand: 'Bilsoft', group: 'BİTKİSEL ÜRÜN', unit: 'Adet' },
                { id: 4, code: '-', barcode: '4', name: 'Çaykur Çiçek', salesPrice: 22.50, buyPrice: 18.00, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Adet' },
                { id: 5, code: '-', barcode: '6', name: 'Çubuk Kraker', salesPrice: 0.50, buyPrice: 0.40, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Adet' },
                { id: 6, code: '-', barcode: '7', name: 'Domates', salesPrice: 2.50, buyPrice: 1.50, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Kg' },
                { id: 7, code: '-', barcode: '8', name: 'Dondurma', salesPrice: 1.00, buyPrice: 0.75, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Adet' },
                { id: 8, code: '-', barcode: '1', name: 'İçim Peynir', salesPrice: 12.50, buyPrice: 10.00, stock: 0, brand: 'Bilsoft', group: 'TEMEL GIDA', unit: 'Adet' }
            ];

            const stocks = JSON.parse(localStorage.getItem('stockCards')) || initialData;
            const foundStock = stocks.find(s => s.id.toString() === id.toString());
            
            if (foundStock) {
                setStock(foundStock);
                
                // Get movements from invoices
                const salesInvoices = JSON.parse(localStorage.getItem('salesInvoices')) || [];
                const purchaseInvoices = JSON.parse(localStorage.getItem('purchaseInvoices')) || [];
                
                const moves = [];
                
                // Process Sales Invoices
                salesInvoices.forEach(inv => {
                    const items = Array.isArray(inv.items) ? inv.items : [];
                    items.forEach(item => {
                        if (item.id?.toString() === id.toString() || item.name === foundStock.name) {
                            moves.push({
                                date: inv.date,
                                docNo: inv.invoiceNo,
                                type: 'SATIŞ',
                                direction: 'out',
                                quantity: item.quantity,
                                unit: item.unit || foundStock.unit,
                                price: item.price,
                                total: item.total
                            });
                        }
                    });
                });

                // Process Purchase Invoices
                purchaseInvoices.forEach(inv => {
                    const items = Array.isArray(inv.items) ? inv.items : [];
                    items.forEach(item => {
                        if (item.id?.toString() === id.toString() || item.name === foundStock.name) {
                            moves.push({
                                date: inv.date,
                                docNo: inv.invoiceNo,
                                type: 'ALIŞ',
                                direction: 'in',
                                quantity: item.quantity,
                                unit: item.unit || foundStock.unit,
                                price: item.price,
                                total: item.total
                            });
                        }
                    });
                });

                // Sort by date descending
                setMovements(moves.sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
        };

        loadStockData();
    }, [id]);

    if (!stock) {
        return (
            <div className="dash-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h3>Stok Kaydı Bulunamadı</h3>
                <button onClick={() => navigate('/stok-kartlari')} className="btn btn-dark-blue">Listeye Dön</button>
            </div>
        );
    }

    const totalIn = movements.filter(m => m.direction === 'in').reduce((acc, m) => acc + parseFloat(m.quantity || 0), 0);
    const totalOut = movements.filter(m => m.direction === 'out').reduce((acc, m) => acc + parseFloat(m.quantity || 0), 0);

    return (
        <div className="dash-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 className="page-title" style={{ margin: 0 }}>Stok Hareket Detayı</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/stok-duzenle/${stock.id}`} className="btn btn-dark-blue" style={{ background: '#3b82f6' }}>Düzenle</Link>
                    <button onClick={() => navigate('/stok-kartlari')} className="btn btn-dark-blue">Listeye Dön</button>
                </div>
            </div>

            {/* Stock Info Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
                <div className="content-box" style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>Stok Adı</p>
                    <h3 style={{ margin: 0, color: '#1e293b' }}>{stock.name}</h3>
                </div>
                <div className="content-box" style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>Barkod / Kod</p>
                    <h3 style={{ margin: 0, color: '#1e293b' }}>{stock.barcode || '-'} / {stock.code || '-'}</h3>
                </div>
                <div className="content-box" style={{ padding: '20px', textAlign: 'center', borderLeft: '4px solid #10b981' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>Toplam Giriş</p>
                    <h3 style={{ margin: 0, color: '#10b981' }}>{totalIn} {stock.unit}</h3>
                </div>
                <div className="content-box" style={{ padding: '20px', textAlign: 'center', borderLeft: '4px solid #f43f5e' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>Toplam Çıkış</p>
                    <h3 style={{ margin: 0, color: '#f43f5e' }}>{totalOut} {stock.unit}</h3>
                </div>
                <div className="content-box" style={{ padding: '20px', textAlign: 'center', borderLeft: '4px solid #3b82f6' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>Mevcut Bakiye</p>
                    <h3 style={{ margin: 0, color: '#3b82f6' }}>{totalIn - totalOut} {stock.unit}</h3>
                </div>
            </div>

            {/* Movements Table */}
            <div className="content-box" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Tarih</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Evrak No</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>İşlem Türü</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Miktar</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Birim Fiyat</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid #eee' }}>Toplam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements.length > 0 ? movements.map((m, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '15px' }}>{m.date}</td>
                                <td style={{ padding: '15px', color: '#3b82f6', fontWeight: 'bold' }}>{m.docNo}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        borderRadius: '20px', 
                                        fontSize: '0.8rem', 
                                        fontWeight: 'bold',
                                        background: m.direction === 'in' ? '#dcfce7' : '#fee2e2',
                                        color: m.direction === 'in' ? '#166534' : '#991b1b'
                                    }}>
                                        {m.type}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', fontWeight: 'bold' }}>{m.quantity} {m.unit}</td>
                                <td style={{ padding: '15px' }}>{m.price} ₺</td>
                                <td style={{ padding: '15px', fontWeight: 'bold' }}>{m.total} ₺</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                                    Henüz bir hareket kaydı bulunmuyor.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockDetail;
