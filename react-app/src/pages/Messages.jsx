import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const Messages = () => {
    const [activeChat, setActiveChat] = useState(1);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [notificationEmails, setNotificationEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const chats = [
        { id: 1, name: 'Aydın Ertop', email: 'aydinertop@gmail.com', initials: 'AE', color: '#10b981', status: 'online' },
        { id: 2, name: 'Fevziye Mamak', email: 'fevziye.mamak35@gmail.com', initials: 'FM', color: '#6366f1', status: 'offline' },
        { id: 3, name: 'Ali Mamak', email: 'amamak1980@gmail.com', initials: 'AM', color: '#f59e0b', status: 'online' },
    ];

    useEffect(() => {
        const savedMsgs = JSON.parse(localStorage.getItem('chatMessages')) || [
            { id: 1, chatId: 1, text: 'Merhabalar, sisteme yeni e-faturalar girildi.', time: '11:15', type: 'incoming' },
            { id: 2, chatId: 1, text: 'Harika, hemen kontrol ediyorum Aydın Bey.', time: '11:20', type: 'outgoing' },
            { id: 3, chatId: 1, text: 'Banka mutabakatları için de bekliyorum.', time: '11:22', type: 'incoming' },
        ];
        const savedEmails = JSON.parse(localStorage.getItem('notificationEmails')) || ['info@makfaglobal.com'];
        setMessages(savedMsgs);
        setNotificationEmails(savedEmails);
    }, []);

    const currentChat = chats.find(c => c.id === activeChat);
    const activeMessages = messages.filter(m => m.chatId === activeChat);

    const handleSend = (e) => {
        if (e) e.preventDefault();
        if (!newMessage.trim()) return;
        const newMsg = { id: Date.now(), chatId: activeChat, text: newMessage, time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), type: 'outgoing' };
        setMessages([...messages, newMsg]);
        localStorage.setItem('chatMessages', JSON.stringify([...messages, newMsg]));
        setNewMessage('');
    };

    const addEmail = (e) => {
        e.preventDefault();
        if (!emailInput.trim() || notificationEmails.includes(emailInput)) return;
        const updated = [...notificationEmails, emailInput];
        setNotificationEmails(updated);
        localStorage.setItem('notificationEmails', JSON.stringify(updated));
        setEmailInput('');
    };

    return (
        <div className="page-container" style={{ background: '#f8fafc', height: 'calc(100vh - 100px)', padding: '20px' }}>
            <div style={{ display: 'flex', height: '100%', background: 'white', borderRadius: '30px', boxShadow: '0 15px 40px -10px rgba(0,0,0,0.1)', overflow: 'hidden', border: 'none' }}>
                
                {/* Chat Sidebar */}
                <div style={{ width: '400px', background: '#fcfdfe', borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>Mesajlar</h2>
                            <button onClick={() => setShowSettings(true)} style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-bell"></i>
                            </button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                            <input className="input-modern" placeholder="Sohbetlerde ara..." style={{ paddingLeft: '45px', borderRadius: '15px', background: '#f1f5f9', border: 'none' }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {chats.map(chat => (
                            <div key={chat.id} onClick={() => setActiveChat(chat.id)} style={{ display: 'flex', padding: '20px 30px', cursor: 'pointer', transition: '0.3s', background: activeChat === chat.id ? '#f0f9ff' : 'transparent', borderLeft: activeChat === chat.id ? '5px solid #3b82f6' : '5px solid transparent' }}>
                                <div style={{ width: '52px', height: '52px', borderRadius: '18px', background: chat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', marginRight: '15px', position: 'relative' }}>
                                    {chat.initials}
                                    {chat.status === 'online' && <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '14px', height: '14px', background: '#10b981', border: '3px solid white', borderRadius: '50%' }}></div>}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: '800', color: '#1e293b' }}>{chat.name}</span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>11:45</span>
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Son mesaj içeriği burada yer alacak...</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div style={{ flex: 1, background: 'white', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '20px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: currentChat.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginRight: '15px' }}>{currentChat.initials}</div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#1e293b' }}>{currentChat.name}</h3>
                            <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <i className="fa-solid fa-circle" style={{ fontSize: '8px' }}></i> Alternatif İletişim: {currentChat.email}
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {activeMessages.map(msg => (
                            <div key={msg.id} style={{ 
                                alignSelf: msg.type === 'incoming' ? 'flex-start' : 'flex-end',
                                maxWidth: '60%', 
                                padding: '15px 20px', 
                                borderRadius: '20px', 
                                background: msg.type === 'incoming' ? 'white' : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                                color: msg.type === 'incoming' ? '#1e293b' : 'white',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.03)',
                                position: 'relative',
                                borderBottomLeftRadius: msg.type === 'incoming' ? '4px' : '20px',
                                borderBottomRightRadius: msg.type === 'outgoing' ? '4px' : '20px',
                            }}>
                                <div style={{ fontSize: '15px', fontWeight: '500', lineHeight: '1.5' }}>{msg.text}</div>
                                <div style={{ fontSize: '10px', marginTop: '8px', opacity: 0.7, textAlign: 'right', fontWeight: '700' }}>{msg.time}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '30px 40px', background: 'white', borderTop: '1px solid #f1f5f9' }}>
                        <form onSubmit={handleSend} style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f1f5f9', padding: '8px 8px 8px 25px', borderRadius: '20px' }}>
                            <input style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '16px', color: '#1e293b', fontWeight: '500' }} placeholder="Bir mesaj yazın..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                            <button type="submit" style={{ width: '48px', height: '48px', borderRadius: '15px', background: '#1e293b', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Notification Settings Modal */}
            {showSettings && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: 'white', padding: '40px', borderRadius: '30px', width: '500px' }}>
                        <h2 style={{ marginBottom: '25px', color: '#1e293b', textAlign: 'center' }}>Bildirim Ayarları</h2>
                        <form onSubmit={addEmail} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                            <input className="input-modern" placeholder="E-posta ekle..." value={emailInput} onChange={e => setEmailInput(e.target.value)} />
                            <button style={{ background: '#1e293b', color: 'white', border: 'none', borderRadius: '12px', padding: '0 20px', cursor: 'pointer' }}>Ekle</button>
                        </form>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {notificationEmails.map(email => (
                                <div key={email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #f1f5f9' }}>
                                    <span style={{ fontWeight: '700', color: '#475569' }}>{email}</span>
                                    <i className="fa-solid fa-trash" style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => setNotificationEmails(notificationEmails.filter(e => e !== email))}></i>
                                </div>
                            ))}
                        </div>
                        <button className="btn" style={{ width: '100%', background: '#f1f5f9', color: '#64748b', borderRadius: '15px', height: '54px', marginTop: '30px', fontWeight: '800' }} onClick={() => setShowSettings(false)}>Pencereyi Kapat</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
