// 1. SATIR: Temel araçlar
import React, { useEffect, useState } from 'react'; 

// 2. SATIR: Görsel kutucuklar
import { StatCard, ModuleCard } from '../components/DashboardWidgets';

// 3. SATIR: Dil ve Şube ayarları
import { useLanguage } from '../context/LanguageContext';
import { useBranch } from '../context/BranchContext';

const Dashboard = () => {
    // 1. DEĞİŞKEN TANIMLAMALARI
    const { t, lang } = useLanguage(); 
    const branchData = useBranch();
    
    // Şube ismini güvenli bir şekilde alıyoruz
    const currentBranch = branchData?.currentBranch?.name || 'Genel Merkez';

    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [stats, setStats] = useState({ 
        sales30: '0,00 ₺', 
        purchase30: '0,00 ₺', 
        profit30: '0,00 ₺', 
        kdv30: '0,00 ₺' 
    });

    // 2. ZAMAN VE SELAMLAŞMA GÜNCELLEME
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hour = now.getHours();
            
            // Dil anahtarına göre selamlaşma seçimi
            let greetKey = hour < 6 ? 'greeting_night' : hour < 12 ? 'greeting_morning' : hour < 18 ? 'greeting_day' : 'greeting_evening';
            setGreeting(t(greetKey));
            
            const months = lang === 'tr' 
                ? ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'] 
                : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            setCurrentDate(`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`);
            setCurrentTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [lang, t]);

    // 3. ARAYÜZ (Layout)
    return (
        <div className="w-full p-4"> 
            {/* Karşılama Banner'ı */}
            <div className="relative overflow-hidden rounded-3xl p-10 text-white shadow-xl mb-10"
                 style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                
                {/* Dekoratif Arka Plan Halkası */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <p className="text-indigo-100 font-medium mb-1 opacity-80">{currentDate} • {currentBranch}</p>
                        <h1 className="text-4xl font-black tracking-tight mb-2">{greeting} 👋</h1>
                        <p className="text-indigo-100/90 text-lg">İşletme tablonuza hoş geldiniz</p>
                    </div>
                    <div className="text-right border-l border-white/20 pl-10 mt-6 md:mt-0">
                        <div className="text-6xl font-black tracking-tighter leading-none">{currentTime}</div>
                        <div className="text-indigo-200/50 font-bold uppercase text-[10px] mt-2 tracking-widest">Sistem Saati</div>
                    </div>
                </div>
            </div>

            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title={t('stat_sales')} value={stats.sales30} icon="fa-arrow-trend-up" trend="up" color="#4f46e5" />
                <StatCard title={t('stat_purchase')} value={stats.purchase30} icon="fa-cart-shopping" trend="down" color="#f59e0b" />
                <StatCard title={t('stat_profit')} value={stats.profit30} icon="fa-sack-dollar" trend="up" color="#10b981" />
                <StatCard title={t('stat_kdv')} value={stats.kdv30} icon="fa-percent" trend="neutral" color="#6b7a8d" />
            </div>

            {/* Hızlı Erişim Modülleri */}
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Hızlı Erişim</h2>
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    <ModuleCard title={t('customers')} icon="fa-users" link="/customers" color="#4f46e5" />
                    <ModuleCard title={t('stocks')} icon="fa-boxes-stacked" link="/stocks" color="#0ea5e9" />
                    <ModuleCard title={t('sales')} icon="fa-cash-register" link="/sales" color="#10b981" />
                    <ModuleCard title={t('invoices')} icon="fa-file-invoice-dollar" link="/invoices" color="#8b5cf6" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;