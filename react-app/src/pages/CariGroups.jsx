import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CariGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [customerCounts, setCustomerCounts] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadGroupsAndCounts();
  }, []);

  const loadGroupsAndCounts = () => {
    let storedGroups = JSON.parse(localStorage.getItem('groups') || '[]');
    const defaultGroups = ['MÜŞTERİLER', 'TOPTANCILAR', 'TEDARİKÇİLER'];
    
    if (storedGroups.length === 0) {
      storedGroups = defaultGroups.map(name => ({ id: Date.now() + Math.random(), name: name }));
      localStorage.setItem('groups', JSON.stringify(storedGroups));
    }
    setGroups(storedGroups);

    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const counts = {};
    customers.forEach(c => {
      const gName = c.cariGrubu || c.group || 'DİĞER';
      counts[gName] = (counts[gName] || 0) + 1;
    });
    setCustomerCounts(counts);
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    const name = newGroupName.trim().toUpperCase();
    if (!name) return;

    if (groups.some(g => g.name === name)) {
      showMessage('Bu grup zaten mevcut!', 'error');
      return;
    }

    const updatedGroups = [...groups, { id: Date.now(), name: name }];
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    setNewGroupName('');
    showMessage('Grup başarıyla eklendi!', 'success');
  };

  const handleDeleteGroup = (groupName) => {
    // Immediate deletion without window.confirm to avoid browser blocking issues
    const updatedGroups = groups.filter(g => g.name !== groupName);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    showMessage(`'${groupName}' başarıyla silindi.`, 'success');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '24px', color: '#1f3a60' }}>Cari Grupları</h2>
        <button type="button" onClick={() => navigate('/cari-hesaplar')} className="btn btn-secondary" style={{ cursor: 'pointer' }}>
          <i className="fa-solid fa-arrow-left"></i> Geri Dön
        </button>
      </div>

      {message.text && (
        <div style={{ 
          padding: '10px 15px', 
          marginBottom: '20px', 
          borderRadius: '4px', 
          background: message.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: message.type === 'error' ? '#991b1b' : '#166534',
          borderLeft: `4px solid ${message.type === 'error' ? '#dc2626' : '#16a34a'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '25px' }}>
        <form onSubmit={handleAddGroup} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Yeni grup adı" 
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            style={{ flexGrow: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" className="btn btn-dark-blue" style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            <i className="fa-solid fa-plus"></i> Grup Ekle
          </button>
        </form>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '15px' }}>Grup Adı</th>
              <th style={{ padding: '15px' }}>Cari Sayısı</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 ? groups.map((group) => (
              <tr key={group.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{group.name}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ background: '#e2e8f0', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: '#334155' }}>
                    {customerCounts[group.name] || 0}
                  </span>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleDeleteGroup(group.name)} 
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                    title="Grubu Sil"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Henüz grup eklenmemiş.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CariGroups;
