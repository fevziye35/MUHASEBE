import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const Agenda = () => {
    const [viewMode, setViewMode] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '10:00', type: 'genel', sendToGoogle: true });

    useEffect(() => {
        const stored = localStorage.getItem('agendaEvents');
        if (stored) setEvents(JSON.parse(stored));
        else {
            const defaultEvents = [
                { id: 1, title: 'Kira Ödemeleri', start: new Date().toISOString().split('T')[0], type: 'odeme', time: '09:00' },
                { id: 3, title: 'Operasyon Toplantısı', start: new Date().toISOString().split('T')[0], time: '14:30', type: 'toplanti' },
            ];
            setEvents(defaultEvents);
            localStorage.setItem('agendaEvents', JSON.stringify(defaultEvents));
        }
    }, []);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

    const saveEvent = () => {
        if (!newEvent.title || !newEvent.date) return;
        const newEvtObj = { id: Date.now(), title: newEvent.title, start: newEvent.date, time: newEvent.time, type: newEvent.type };
        const updated = [...events, newEvtObj];
        setEvents(updated);
        localStorage.setItem('agendaEvents', JSON.stringify(updated));
        setShowModal(false);
    };

    const deleteEvent = (id, e) => {
        e.stopPropagation();
        if (window.confirm('Bu etkinliği silmek istediğinize emin misiniz?')) {
            const updated = events.filter(ev => ev.id !== id);
            setEvents(updated);
            localStorage.setItem('agendaEvents', JSON.stringify(updated));
        }
    };

    const renderCalendar = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const totalDays = daysInMonth(month, year);
        const startDay = firstDayOfMonth(month, year);
        const calendarDays = [];

        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div key={`prev-${i}`} style={{ height: '120px', background: '#f8fafc', border: '1px solid #f1f5f9' }}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.start === dateStr);
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            calendarDays.push(
                <div key={day} onClick={() => { setNewEvent({...newEvent, date: dateStr}); setShowModal(true); }} style={{ height: '120px', border: '1px solid #f1f5f9', padding: '10px', background: isToday ? '#eff6ff' : 'white', cursor: 'pointer', transition: '0.2s', borderTop: isToday ? '3px solid #3b82f6' : '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 800, color: isToday ? '#3b82f6' : '#64748b', fontSize: '14px' }}>{day}</div>
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {dayEvents.map(event => (
                            <div key={event.id} style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '6px', background: event.type === 'toplanti' ? '#4f46e5' : (event.type === 'odeme' ? '#ef4444' : '#10b981'), color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</span>
                                <i className="fa-solid fa-times" onClick={(e) => deleteEvent(event.id, e)} style={{ marginLeft: '5px', opacity: 0.7, cursor: 'pointer' }}></i>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return calendarDays;
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', minHeight: '100vh', padding: '0 0 50px 0' }}>
            {/* Premium Header Banner */}
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)', padding: '50px 30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-30px', bottom: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>Kurumsal Takvim & Ajanda</h1>
                        <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '16px' }}>İş hedeflerinizi, toplantılarınızı ve finansal ödeme takviminizi senkronize edin.</p>
                    </div>
                    <div>
                        <button className="btn" style={{ background: 'white', color: '#4f46e5', fontWeight: '700', borderRadius: '12px', height: '48px', padding: '0 25px', border: 'none', cursor: 'pointer' }} onClick={() => setShowModal(true)}>
                            <i className="fa-solid fa-plus-circle" style={{ marginRight: '8px' }}></i> Yeni Plan Oluştur
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1600px', margin: '-40px auto 0', padding: '0 30px', position: 'relative', zIndex: 2 }}>
                {/* Agenda Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { label: 'BUGÜNKÜ PLANLAR', value: events.filter(e => e.start === new Date().toISOString().split('T')[0]).length, icon: 'fa-calendar-day', color: '#10b981' },
                        { label: 'YAKLAŞAN TOPLANTILAR', value: events.filter(e => e.type === 'toplanti').length, icon: 'fa-video', color: '#3b82f6' },
                        { label: 'ÖDEME HATIRLATICILAR', value: events.filter(e => e.type === 'odeme').length, icon: 'fa-money-bill-wave', color: '#ef4444' },
                        { label: 'TOPLAM KAYIT', value: events.length, icon: 'fa-database', color: '#6366f1' }
                    ].map((stat, i) => (
                        <div key={i} className="main-content-card" style={{ padding: '25px', background: 'white', borderRadius: '24px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em', marginBottom: '5px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{stat.value}</div>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                    <i className={`fa-solid ${stat.icon}`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-content-card" style={{ background: 'white', borderRadius: '24px', padding: '30px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                         <div style={{ display: 'flex', gap: '15px' }}>
                            <button className="btn-icon" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}><i className="fa-solid fa-chevron-left"></i></button>
                            <h2 style={{ margin: 0, fontWeight: '800', color: '#1e293b' }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                            <button className="btn-icon" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}><i className="fa-solid fa-chevron-right"></i></button>
                         </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', border: '1px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden' }}>
                        {dayNames.map(day => (
                            <div key={day} style={{ padding: '15px', background: '#f8fafc', textAlign: 'center', color: '#1e293b', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>{day}</div>
                        ))}
                        {renderCalendar()}
                    </div>
                </div>
            </div>

            {/* Premium Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '450px' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'center' }}>Yeni Plan / Not</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input className="input-modern" placeholder="Plan Başlığı" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} autoFocus />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <input className="input-modern" type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                                <input className="input-modern" type="time" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
                            </div>
                            <select className="input-modern" value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}>
                                <option value="genel">Genel Not</option>
                                <option value="toplanti">Toplantı & Telefon</option>
                                <option value="odeme">Ödeme Takibi</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button className="btn" style={{ flex: 1, background: '#1e293b', color: 'white', borderRadius: '12px', height: '48px' }} onClick={saveEvent}>Takvime İşle</button>
                            <button className="btn" style={{ flex: 1, background: '#f1f5f9', color: '#64748b', borderRadius: '12px', height: '48px' }} onClick={() => setShowModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agenda;
