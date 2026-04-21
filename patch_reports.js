const fs = require('fs');
const path = require('path');

const dict = {
    // Submenu Items
    'Cari': 'report.cari',
    'Stok': 'report.stok',
    'Taksit': 'report.taksit',
    'Satış': 'report.satis',
    'Kasa': 'report.kasa',
    'Banka': 'report.banka',
    'Gün Sonu Raporu': 'report.gun_sonu',
    'Kâr Zarar Analizi': 'report.kar_zarar',
    
    // Cari Raporu specific
    'Cari Raporu': 'report.cari_raporu',
    'Cari Hesaplara Dön': 'report.cari_don',
    'Raporu Hazırla': 'report.hazirla',
    'Rapor Kriterleri': 'report.kriterler',
    'Tarih Aralığı:': 'report.tarih_araligi',
    'Tüm Zamanlar': 'report.tum_zamanlar',
    'Cari Tipi:': 'report.cari_tipi',
    'Tüm Cariler': 'report.tum_cariler'
};

const tAdditions = {
    'tr': `        'report.cari': 'Cari',
        'report.stok': 'Stok',
        'report.taksit': 'Taksit',
        'report.satis': 'Satış',
        'report.kasa': 'Kasa',
        'report.banka': 'Banka',
        'report.gun_sonu': 'Gün Sonu Raporu',
        'report.kar_zarar': 'Kâr Zarar Analizi',
        'report.cari_raporu': 'Cari Raporu',
        'report.cari_don': 'Cari Hesaplara Dön',
        'report.hazirla': 'Raporu Hazırla',
        'report.kriterler': 'Rapor Kriterleri',
        'report.tarih_araligi': 'Tarih Aralığı:',
        'report.tum_zamanlar': 'Tüm Zamanlar',
        'report.cari_tipi': 'Cari Tipi:',
        'report.tum_cariler': 'Tüm Cariler',`,
    'en': `        'report.cari': 'Current Account',
        'report.stok': 'Stock',
        'report.taksit': 'Installment',
        'report.satis': 'Sales',
        'report.kasa': 'Cash',
        'report.banka': 'Bank',
        'report.gun_sonu': 'End of Day Report',
        'report.kar_zarar': 'P&L Analysis',
        'report.cari_raporu': 'Current Account Report',
        'report.cari_don': 'Back to Accounts',
        'report.hazirla': 'Generate Report',
        'report.kriterler': 'Report Criteria',
        'report.tarih_araligi': 'Date Range:',
        'report.tum_zamanlar': 'All Time',
        'report.cari_tipi': 'Current Type:',
        'report.tum_cariler': 'All Accounts',`,
    'de': `        'report.cari': 'Kontokorrent',
        'report.stok': 'Lager',
        'report.taksit': 'Raten',
        'report.satis': 'Verkauf',
        'report.kasa': 'Kasse',
        'report.banka': 'Bank',
        'report.gun_sonu': 'Tagesabschlussbericht',
        'report.kar_zarar': 'GuV-Analyse',
        'report.cari_raporu': 'Kontokorrent-Bericht',
        'report.cari_don': 'Zurück zu Konten',
        'report.hazirla': 'Bericht Erstellen',
        'report.kriterler': 'Berichtskriterien',
        'report.tarih_araligi': 'Datumsbereich:',
        'report.tum_zamanlar': 'Gesamte Zeit',
        'report.cari_tipi': 'Kontoart:',
        'report.tum_cariler': 'Alle Konten',`,
    'ru': `        'report.cari': 'Текущий счет',
        'report.stok': 'Склад',
        'report.taksit': 'Рассрочка',
        'report.satis': 'Продажи',
        'report.kasa': 'Касса',
        'report.banka': 'Банк',
        'report.gun_sonu': 'Отчет за Конец Дня',
        'report.kar_zarar': 'Анализ ПиУ',
        'report.cari_raporu': 'Отчет по Текущему Счету',
        'report.cari_don': 'Назад к Счетам',
        'report.hazirla': 'Создать Отчет',
        'report.kriterler': 'Критерии Отчета',
        'report.tarih_araligi': 'Диапазон Дат:',
        'report.tum_zamanlar': 'За все время',
        'report.cari_tipi': 'Тип Счета:',
        'report.tum_cariler': 'Все Счета',`,
    'zh': `        'report.cari': '往来账户',
        'report.stok': '库存',
        'report.taksit': '分期付款',
        'report.satis': '销售',
        'report.kasa': '出纳',
        'report.banka': '银行',
        'report.gun_sonu': '日终报告',
        'report.kar_zarar': '损益分析',
        'report.cari_raporu': '往来账户报告',
        'report.cari_don': '返回账户',
        'report.hazirla': '生成报告',
        'report.kriterler': '报告标准',
        'report.tarih_araligi': '日期范围:',
        'report.tum_zamanlar': '全部时间',
        'report.cari_tipi': '账户类型:',
        'report.tum_cariler': '全部账户',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(file => {
    let filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Submenu replacements
    const submenuTarget = [
        'Cari', 'Stok', 'Taksit', 'Satış', 'Kasa', 'Banka', 'Gün Sonu Raporu', 'Kâr Zarar Analizi'
    ];

    submenuTarget.forEach(word => {
        // We look for <span>Word</span> inside the submenu context.
        // Easiest is to look for >Word</span> or > Word </span>
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        const rxSp = new RegExp('>\\s*(' + safeWord + ')\\s*<\\/span>', 'g');
        if (rxSp.test(html)) {
            html = html.replace(rxSp, `><span data-i18n="${dict[word]}">${word}</span></span>`);
            changed = true;
        }
    });

    if (file === 'cari_raporu.html') {
        const specs = [
            'Cari Raporu', 'Cari Hesaplara Dön', 'Raporu Hazırla', 'Rapor Kriterleri', 
            'Tarih Aralığı:', 'Tüm Zamanlar', 'Cari Tipi:', 'Tüm Cariler'
        ];
        specs.forEach(word => {
             const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
             const rx = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
             if (rx.test(html)) {
                  html = html.replace(rx, (m, p1, p2, p3, p4, p5) => {
                      return p1 + p2 + '<span data-i18n="' + dict[word] + '">' + p3 + '</span>' + p4 + p5;
                  });
                  changed = true;
             }
        });
        
        // Match option tags that are direct
        html = html.replace(/<option value="all">Tüm Cariler<\/option>/g, '<option value="all" data-i18n="report.tum_cariler">Tüm Cariler</option>');
    }

    if (changed || file === 'cari_raporu.html') {
        html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=27');
        fs.writeFileSync(filePath, html, 'utf8');
    }
});

console.log('Massive patch applied for Raporlar Submenus and cari_raporu.html!');
