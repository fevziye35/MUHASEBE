const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'personel_takip.html'), 'utf8');

// 1. Remove the duplicated, unstyled "stat-card" and "personel-content" junk (from line 295 to right before Footer)
// The chunk starts with `<div class="stat-card">` and ends before `<!-- Footer -->`
html = html.replace(/<div class="stat-card">([\s\S]*?)<!-- Footer -->/g, '<!-- Footer -->');

// 2. Add translation keys to translations.js
const dict = {
    'Personel ve İK Yönetimi': 'hr.title',
    'Yeni Personel Ekle': 'hr.add_personnel',
    'Planlı İzin Ekle': 'hr.add_leave',
    'TOPLAM PERSONEL': 'hr.total_personnel',
    'TOPLAM AYLIK MAAŞ': 'hr.total_salary',
    'İZİNDEKİ PERSONEL': 'hr.on_leave',
    'PRİM / AVANS (Bekleyen)': 'hr.pending_bonus_advance',
    'Aktif Personel Listesi': 'hr.active_list',
    'Ayrıntı': 'word.ayrinti',
    'Departman': 'word.departman',
    'Maaş (Net)': 'word.maas_net',
    'Yönetim': 'hr.management',
    'Finans & Muhasebe': 'hr.finance',
    'Satın Alma': 'hr.purchasing',
    'Lojistik Sorumlusu': 'hr.logistics_mgr',
    'Lojistik': 'hr.logistics',
    'Aktif': 'word.aktif',
    'Yıllık İzinde': 'hr.annual_leave',
    'Planlı İzinler & Sağlık Raporları': 'hr.planned_leaves_health',
    'Yıllık İzin': 'hr.annual_leave_short',
    'Sağlık Raporu': 'hr.health_report',
    '14 Gün': '14 <span data-i18n="word.gun">Gün</span>',
    '3 Gün': '3 <span data-i18n="word.gun">Gün</span>',
    '3 Adet': '3 <span data-i18n="word.adet_short">Adet</span>'
};

const tAdditions = {
    'tr': `        'hr.title': 'Personel ve İK Yönetimi',
        'hr.add_personnel': 'Yeni Personel Ekle',
        'hr.add_leave': 'Planlı İzin Ekle',
        'hr.total_personnel': 'TOPLAM PERSONEL',
        'hr.total_salary': 'TOPLAM AYLIK MAAŞ',
        'hr.on_leave': 'İZİNDEKİ PERSONEL',
        'hr.pending_bonus_advance': 'PRİM / AVANS (Bekleyen)',
        'hr.active_list': 'Aktif Personel Listesi',
        'word.ayrinti': 'Ayrıntı',
        'word.departman': 'Departman',
        'word.maas_net': 'Maaş (Net)',
        'hr.management': 'Yönetim',
        'hr.finance': 'Finans & Muhasebe',
        'hr.purchasing': 'Satın Alma',
        'hr.logistics_mgr': 'Lojistik Sorumlusu',
        'hr.logistics': 'Lojistik',
        'word.aktif': 'Aktif',
        'hr.annual_leave': 'Yıllık İzinde',
        'hr.planned_leaves_health': 'Planlı İzinler & Sağlık Raporları',
        'hr.annual_leave_short': 'Yıllık İzin',
        'hr.health_report': 'Sağlık Raporu',
        'word.gun': 'Gün',
        'word.adet_short': 'Adet',`,
    'en': `        'hr.title': 'Personnel & HR Management',
        'hr.add_personnel': 'Add New Personnel',
        'hr.add_leave': 'Add Planned Leave',
        'hr.total_personnel': 'TOTAL PERSONNEL',
        'hr.total_salary': 'TOTAL MONTHLY SALARY',
        'hr.on_leave': 'PERSONNEL ON LEAVE',
        'hr.pending_bonus_advance': 'PENDING BONUS / ADVANCE',
        'hr.active_list': 'Active Personnel List',
        'word.ayrinti': 'Details',
        'word.departman': 'Department',
        'word.maas_net': 'Net Salary',
        'hr.management': 'Management',
        'hr.finance': 'Finance & Accounting',
        'hr.purchasing': 'Purchasing',
        'hr.logistics_mgr': 'Logistics Manager',
        'hr.logistics': 'Logistics',
        'word.aktif': 'Active',
        'hr.annual_leave': 'On Annual Leave',
        'hr.planned_leaves_health': 'Planned Leaves & Health Reports',
        'hr.annual_leave_short': 'Annual Leave',
        'hr.health_report': 'Health Report',
        'word.gun': 'Days',
        'word.adet_short': 'Pcs',`,
    'de': `        'hr.title': 'Personal- und HR-Management',
        'hr.add_personnel': 'Neues Personal hinzufügen',
        'hr.add_leave': 'Geplanten Urlaub hinzufügen',
        'hr.total_personnel': 'GESAMTPERSONAL',
        'hr.total_salary': 'GESAMT MONATSGEHALT',
        'hr.on_leave': 'PERSONAL IM URLAUB',
        'hr.pending_bonus_advance': 'AUSSTEHENDE BONI / VORSCHÜSSE',
        'hr.active_list': 'Aktive Personalliste',
        'word.ayrinti': 'Details',
        'word.departman': 'Abteilung',
        'word.maas_net': 'Nettogehalt',
        'hr.management': 'Management',
        'hr.finance': 'Finanzen & Buchhaltung',
        'hr.purchasing': 'Einkauf',
        'hr.logistics_mgr': 'Logistikmanager',
        'hr.logistics': 'Logistik',
        'word.aktif': 'Aktiv',
        'hr.annual_leave': 'Im Jahresurlaub',
        'hr.planned_leaves_health': 'Geplante Urlaube & Gesundheitsberichte',
        'hr.annual_leave_short': 'Jahresurlaub',
        'hr.health_report': 'Gesundheitsbericht',
        'word.gun': 'Tage',
        'word.adet_short': 'Stk',`,
    'ru': `        'hr.title': 'Управление Персоналом и Кадрами',
        'hr.add_personnel': 'Добавить Новый Персонал',
        'hr.add_leave': 'Добавить Запланированный Отпуск',
        'hr.total_personnel': 'ВСЕГО ПЕРСОНАЛА',
        'hr.total_salary': 'ОБЩАЯ ЗАРПЛАТА ЗА МЕСЯЦ',
        'hr.on_leave': 'ПЕРСОНАЛ В ОТПУСКЕ',
        'hr.pending_bonus_advance': 'ОЖИДАЮЩИЕ БОНУСЫ / АВАНСЫ',
        'hr.active_list': 'Список Активного Персонала',
        'word.ayrinti': 'Детали',
        'word.departman': 'Отдел',
        'word.maas_net': 'Чистая Зарплата',
        'hr.management': 'Управление',
        'hr.finance': 'Финансы и Бухгалтерия',
        'hr.purchasing': 'Закупки',
        'hr.logistics_mgr': 'Менеджер по Логистике',
        'hr.logistics': 'Логистика',
        'word.aktif': 'Активный',
        'hr.annual_leave': 'В Ежегодном Отпуске',
        'hr.planned_leaves_health': 'Запланированные Отпуска и Мед. Отчеты',
        'hr.annual_leave_short': 'Ежегодный Отпуск',
        'hr.health_report': 'Мед. Отчет',
        'word.gun': 'Дней',
        'word.adet_short': 'Шт',`,
    'zh': `        'hr.title': '人事及人力资源管理',
        'hr.add_personnel': '添加新人员',
        'hr.add_leave': '添加计划休假',
        'hr.total_personnel': '总人员',
        'hr.total_salary': '总月薪',
        'hr.on_leave': '休假人员',
        'hr.pending_bonus_advance': '待发奖金 / 预支',
        'hr.active_list': '在职人员名单',
        'word.ayrinti': '详细信息',
        'word.departman': '部门',
        'word.maas_net': '净工资',
        'hr.management': '管理',
        'hr.finance': '财务与会计',
        'hr.purchasing': '采购',
        'hr.logistics_mgr': '物流经理',
        'hr.logistics': '物流',
        'word.aktif': '活跃',
        'hr.annual_leave': '休年假',
        'hr.planned_leaves_health': '计划休假及健康报告',
        'hr.annual_leave_short': '年假',
        'hr.health_report': '健康报告',
        'word.gun': '天',
        'word.adet_short': '个',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Ensure we don't double replace simple words. Process longer words first.
const sortedKeys = Object.keys(dict).sort((a,b) => b.length - a.length);

for (const turkishText of sortedKeys) {
    const key = dict[turkishText];
    if (turkishText.includes('<span')) {
        // Handle HTML replacement
        const safeText = turkishText.replace(/([0-9]+)\sGün/, '$1 Gün').replace(/([0-9]+)\sAdet/, '$1 Adet');
        // This is tricky. Let's do a direct replace for 14 Gün, 3 Gün, 3 Adet
        if (turkishText === '14 Gün') html = html.replace(/14 Gün/g, '14 <span data-i18n="word.gun">Gün</span>');
        if (turkishText === '3 Gün') html = html.replace(/3 Gün/g, '3 <span data-i18n="word.gun">Gün</span>');
        if (turkishText === '3 Adet') html = html.replace(/3 Adet/g, '3 <span data-i18n="word.adet_short">Adet</span>');
        continue;
    }

    const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    
    // Title inside H2
    html = html.replace(new RegExp('<h2 class="page-title">\\s*' + safeWord + '\\s*</h2>', 'g'), 
                        '<h2 class="page-title"><span data-i18n="' + key + '">' + turkishText + '</span></h2>');
    
    // Direct matches inside TD, DIV, TH, SPAN, BUTTON without a nested tag
    const rx1 = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
    if (rx1.test(html)) {
        html = html.replace(rx1, (m, p1, p2, p3, p4, p5) => {
            return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
        });
    }

    // Direct matches that are followed by • or something else (For Yıllık İzin • 12-26 Mayıs) text nodes inside DIV
    const rx2 = new RegExp('([^>]*?)(' + safeWord + ')([^<]*)', 'g');
    // Using a simpler approach for compound lines: 
    if (turkishText === 'Yıllık İzin' || turkishText === 'Sağlık Raporu') {
         html = html.replace(new RegExp('(' + safeWord + ') (•)', 'g'), '<span data-i18n="' + key + '">$1</span> $2');
    }
}

// Special case replacement for "Durum" since it wasn't wrapped
html = html.replace(/<th>Durum<\/th>/g, '<th><span data-i18n="word.durum_baslik">Durum</span></th>');

// Extra checks for remaining untranslated button content
html = html.replace(/> Yeni Personel Ekle/g, '> <span data-i18n="hr.add_personnel">Yeni Personel Ekle</span>');
html = html.replace(/> Planlı İzin Ekle/g, '> <span data-i18n="hr.add_leave">Planlı İzin Ekle</span>');
html = html.replace(/<div style="font-size: 0\.85rem; color: #64748b; font-weight: 600;">TOPLAM PERSONEL<\/div>/g, 
                    '<div style="font-size: 0.85rem; color: #64748b; font-weight: 600;"><span data-i18n="hr.total_personnel">TOPLAM PERSONEL</span></div>');
html = html.replace(/<div style="font-size: 0\.85rem; color: #64748b; font-weight: 600;">TOPLAM AYLIK MAAŞ<\/div>/g, 
                    '<div style="font-size: 0.85rem; color: #64748b; font-weight: 600;"><span data-i18n="hr.total_salary">TOPLAM AYLIK MAAŞ</span></div>');
html = html.replace(/<div style="font-size: 0\.85rem; color: #64748b; font-weight: 600;">İZİNDEKİ PERSONEL<\/div>/g, 
                    '<div style="font-size: 0.85rem; color: #64748b; font-weight: 600;"><span data-i18n="hr.on_leave">İZİNDEKİ PERSONEL</span></div>');
html = html.replace(/<div style="font-size: 0\.85rem; color: #64748b; font-weight: 600;">PRİM \/ AVANS \(Bekleyen\)<\/div>/g, 
                    '<div style="font-size: 0.85rem; color: #64748b; font-weight: 600;"><span data-i18n="hr.pending_bonus_advance">PRİM / AVANS (Bekleyen)</span></div>');

html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=33');

fs.writeFileSync(path.join(__dirname, 'personel_takip.html'), html, 'utf8');

console.log('Patched personel_takip.html and removed duplicate layout bug.');
