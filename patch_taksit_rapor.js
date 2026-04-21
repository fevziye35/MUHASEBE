const fs = require('fs');
const path = require('path');

const dict = {
    // Taksit Raporu specific
    'Taksit Takip Gelişmiş Rapor': 'report.taksit_gelismis',
    'Taksit Takibe Dön': 'report.taksit_don',
    'Listelemek İstediğiniz Taksit Türünü Seçiniz:': 'report.taksit_turu_sec',
    'Vadesi Geçen Taksitler': 'report.vadesi_gecen',
    'Gelecek Taksitler': 'report.gelecek_taksit',
    'Ödenen Taksitler': 'report.odenen_taksit',
    'Tüm Taksitler': 'report.tum_taksitler',
    'Cari / Müşteri': 'report.cari_musteri',
    'Vade Tarihi': 'word.vade_tarihi',
    'Durum': 'word.durum_baslik',
    'Tutar': 'word.tutar_kucuk', // Tutar is common
    'Henüz bir rapor oluşturulmadı. Kriterleri seçip "Raporu Hazırla" butonuna basınız.': 'report.taksit_empty_msg',
    
    // Generics across all reports
    'Rapor Kriterleri': 'report.kriterler',
    'Raporu Hazırla': 'report.hazirla',
    'Tarih Aralığı:': 'report.tarih_araligi',
    'Tüm Zamanlar': 'report.tum_zamanlar'
};

const tAdditions = {
    'tr': `        'report.taksit_gelismis': 'Taksit Takip Gelişmiş Rapor',
        'report.taksit_don': 'Taksit Takibe Dön',
        'report.taksit_turu_sec': 'Listelemek İstediğiniz Taksit Türünü Seçiniz:',
        'report.vadesi_gecen': 'Vadesi Geçen Taksitler',
        'report.gelecek_taksit': 'Gelecek Taksitler',
        'report.odenen_taksit': 'Ödenen Taksitler',
        'report.tum_taksitler': 'Tüm Taksitler',
        'report.cari_musteri': 'Cari / Müşteri',
        'word.vade_tarihi': 'Vade Tarihi',
        'word.durum_baslik': 'Durum',
        'report.taksit_empty_msg': 'Henüz bir rapor oluşturulmadı. Kriterleri seçip "Raporu Hazırla" butonuna basınız.',`,
    'en': `        'report.taksit_gelismis': 'Advanced Installment Report',
        'report.taksit_don': 'Back to Installments',
        'report.taksit_turu_sec': 'Select Installment Type to List:',
        'report.vadesi_gecen': 'Overdue Installments',
        'report.gelecek_taksit': 'Upcoming Installments',
        'report.odenen_taksit': 'Paid Installments',
        'report.tum_taksitler': 'All Installments',
        'report.cari_musteri': 'Account / Customer',
        'word.vade_tarihi': 'Maturity Date',
        'word.durum_baslik': 'Status',
        'report.taksit_empty_msg': 'No report generated yet. Select criteria and click "Generate Report".',`,
    'de': `        'report.taksit_gelismis': 'Erweiteter Ratenbericht',
        'report.taksit_don': 'Zurück zu Raten',
        'report.taksit_turu_sec': 'Ratenart für die Liste auswählen:',
        'report.vadesi_gecen': 'Überfällige Raten',
        'report.gelecek_taksit': 'Kommende Raten',
        'report.odenen_taksit': 'Bezahlte Raten',
        'report.tum_taksitler': 'Alle Raten',
        'report.cari_musteri': 'Konto / Kunde',
        'word.vade_tarihi': 'Fälligkeitsdatum',
        'word.durum_baslik': 'Status',
        'report.taksit_empty_msg': 'Noch kein Bericht erstellt. Wählen Sie die Kriterien und klicken Sie auf "Bericht Erstellen".',`,
    'ru': `        'report.taksit_gelismis': 'Расширенный Отчет по Рассрочке',
        'report.taksit_don': 'Назад к Рассрочке',
        'report.taksit_turu_sec': 'Выберите тип рассрочки для списка:',
        'report.vadesi_gecen': 'Просроченные Рассрочки',
        'report.gelecek_taksit': 'Предстоящие Рассрочки',
        'report.odenen_taksit': 'Оплаченные Рассрочки',
        'report.tum_taksitler': 'Все Рассрочки',
        'report.cari_musteri': 'Счет / Клиент',
        'word.vade_tarihi': 'Срок Оплаты',
        'word.durum_baslik': 'Статус',
        'report.taksit_empty_msg': 'Отчет еще не сформирован. Выберите критерии и нажмите "Создать Отчет".',`,
    'zh': `        'report.taksit_gelismis': '高级分期付款报告',
        'report.taksit_don': '返回分期付款',
        'report.taksit_turu_sec': '选择要列出的分期付款类型:',
        'report.vadesi_gecen': '逾期分期付款',
        'report.gelecek_taksit': '即将到期的分期付款',
        'report.odenen_taksit': '已付分期付款',
        'report.tum_taksitler': '全部分期付款',
        'report.cari_musteri': '账户 / 客户',
        'word.vade_tarihi': '到期日',
        'word.durum_baslik': '状态',
        'report.taksit_empty_msg': '尚未生成报告。选择过滤条件并点击"生成报告".',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');


const filesToPatch = [
    'taksit_rapor.html', 'satis_raporu.html', 'kasa_raporu.html', 
    'banka_raporu.html', 'cek_raporu.html', 'gun_sonu_raporu.html', 
    'kar_zarar_analizi.html'
];

filesToPatch.forEach(file => {
    let filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');

    for (const [turkishText, key] of Object.entries(dict)) {
        const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        
        // Direct matches
        const rx1 = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
        if (rx1.test(html)) {
            html = html.replace(rx1, (m, p1, p2, p3, p4, p5) => {
                return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
            });
        }

        // Option tags
        const rxOpt = new RegExp('<option([^>]*)>\\s*(' + safeWord + ')\\s*</option>', 'gi');
        if (rxOpt.test(html)) {
            html = html.replace(rxOpt, (m, p1, p2) => {
                if(p1.includes('data-i18n')) return m; 
                return '<option' + p1 + ' data-i18n="' + key + '">' + p2 + '</option>';
            });
        }

         // TH match
        const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'gi');
        if (rxTh.test(html)) {
            html = html.replace(rxTh, (m, p1, p2) => {
                return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
            });
        }

        // TD match
        const rxTd = new RegExp('<td([^>]*)>(\\s*)(' + safeWord + ')(\\s*)</td>', 'g');
        if (rxTd.test(html)) {
             html = html.replace(rxTd, (m, p1, p2, p3, p4) => {
                 return '<td' + p1 + '>' + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + '</td>';
             });
        }
    }

    if (file === 'taksit_rapor.html') {
         html = html.replace(/<h2 class="page-title">Taksit Takip Gelişmiş Rapor<\/h2>/g, '<h2 class="page-title"><span data-i18n="report.taksit_gelismis">Taksit Takip Gelişmiş Rapor</span></h2>');
         html = html.replace(/>\s*Taksit Takibe Dön\s*</g, '><span data-i18n="report.taksit_don">Taksit Takibe Dön</span><');
    }

    html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=29');
    fs.writeFileSync(filePath, html, 'utf8');
});

console.log('Patched taksit_rapor.html and bumped versions to v=29. Also targeted common strings across generic reports.');
