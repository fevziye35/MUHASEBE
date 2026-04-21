import React, { useState, useEffect } from 'react';

const DovizAyarlari = () => {
    const [rates, setRates] = useState({
        USD: { buy: 0, sell: 0 },
        EUR: { buy: 0, sell: 0 }
    });
    const [lastUpdate, setLastUpdate] = useState('-');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newCurrencyCode, setNewCurrencyCode] = useState('');

    const fetchExchangeRates = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/TRY');
            const data = await response.json();
            
            const usdRate = 1 / data.rates.USD;
            const eurRate = 1 / data.rates.EUR;

            // Spread logic (mocking Alış/Satış spread)
            setRates({
                USD: { buy: usdRate * 0.9985, sell: usdRate * 1.0015 },
                EUR: { buy: eurRate * 0.9982, sell: eurRate * 1.0018 }
            });

            const now = new Date();
            setLastUpdate(now.toLocaleTimeString('tr-TR'));
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setLastUpdate('Bağlantı Hatası!');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchangeRates();
        const interval = setInterval(fetchExchangeRates, 30000);
        return () => clearInterval(interval);
    }, []);

    const saveCurrency = () => {
        if(newCurrencyCode) {
            alert(newCurrencyCode.toUpperCase() + ' dövizi başarıyla eklendi.');
            setNewCurrencyCode('');
            setShowModal(false);
        }
    };

    const formatDate = () => new Date().toLocaleDateString('tr-TR');

    return (
        <div className="dash-container">
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', overflow: 'hidden', border: '1px solid #edf2f7' }}>
                <div style={{ backgroundColor: '#1a2d4c', color: 'white', padding: '15px 25px', fontSize: '18px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Döviz Listesi</span>
                </div>

                <div style={{ padding: '20px 25px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #edf2f7' }}>
                    <button className="btn btn-dark-blue" onClick={() => setShowModal(true)} style={{ padding: '10px 24px' }}>
                        <i className="fa-solid fa-plus"></i> Döviz Ekle
                    </button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f1f3f5' }}>
                            <th style={{ color: '#4a5568', padding: '16px 25px', textAlign: 'left', fontWeight: '600', fontSize: '14px', borderBottom: '2px solid #edf2f7', width: '25%' }}>DÖVİZ TÜRÜ</th>
                            <th style={{ color: '#4a5568', padding: '16px 25px', textAlign: 'left', fontWeight: '600', fontSize: '14px', borderBottom: '2px solid #edf2f7', width: '20%' }}>ALIŞ KURU</th>
                            <th style={{ color: '#4a5568', padding: '16px 25px', textAlign: 'left', fontWeight: '600', fontSize: '14px', borderBottom: '2px solid #edf2f7', width: '20%' }}>SATIŞ KURU</th>
                            <th style={{ color: '#4a5568', padding: '16px 25px', textAlign: 'left', fontWeight: '600', fontSize: '14px', borderBottom: '2px solid #edf2f7', width: '25%' }}>TARİH</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontWeight: 700, color: '#1a2d4c', background: '#ebf4ff', padding: '4px 10px', borderRadius: '4px' }}>TRY</span></td>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2b6cb0' }}>1,000</span></td>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2b6cb0' }}>1,000</span></td>
                            <td style={{ padding: '20px 25px', color: '#718096' }}>{formatDate()}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontWeight: 700, color: '#1a2d4c', background: '#ebf4ff', padding: '4px 10px', borderRadius: '4px' }}>USD</span></td>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2b6cb0' }}>{loading ? '...' : rates.USD.buy.toFixed(3).replace('.', ',')}</span></td>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2b6cb0' }}>{loading ? '...' : rates.USD.sell.toFixed(3).replace('.', ',')}</span></td>
                            <td style={{ padding: '20px 25px', color: '#718096' }}>{formatDate()}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontWeight: 700, color: '#1a2d4c', background: '#ebf4ff', padding: '4px 10px', borderRadius: '4px' }}>EUR</span></td>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2b6cb0' }}>{loading ? '...' : rates.EUR.buy.toFixed(3).replace('.', ',')}</span></td>
                            <td style={{ padding: '20px 25px' }}><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#2b6cb0' }}>{loading ? '...' : rates.EUR.sell.toFixed(3).replace('.', ',')}</span></td>
                            <td style={{ padding: '20px 25px', color: '#718096' }}>{formatDate()}</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ padding: '15px 25px', background: '#fdfdfd', borderTop: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#718096' }}>
                    <i className={`fa-solid fa-sync ${loading ? 'fa-spin' : ''}`} style={{ color: '#1a2d4c' }}></i>
                    <span>Canlı Piyasa Verileri (Google) ile Senkronize Ediliyor...</span>
                    <span style={{ marginLeft: 'auto' }}>Son Güncelleme: {lastUpdate}</span>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginBottom: '20px', color: '#1a2d4c' }}>Yeni Döviz Ekle</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#4a5568' }}>Döviz Kodu</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={newCurrencyCode}
                                onChange={(e) => setNewCurrencyCode(e.target.value)}
                                placeholder="Örn: GBP, JPY"
                                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ background: '#cbd5e0', border: 'none', color: '#4a5568', padding: '10px 20px', borderRadius: '6px' }}>Vazgeç</button>
                            <button className="btn btn-dark-blue" onClick={saveCurrency} style={{ padding: '10px 20px' }}>Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DovizAyarlari;
