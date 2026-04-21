const fs = require('fs');
const path = require('path');

// 1. Inject translations.js if missing in ANY html file
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    if (!html.includes('translations.js') && html.includes('script.js')) {
        // Inject before script.js
        html = html.replace(/<script src="script\.js"><\/script>/, '<script src="translations.js?v=28"></script>\n    <script src="script.js"></script>');
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Injected translations.js into', file);
    } else if (html.includes('translations.js')) {
        // Bump version globally
        html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=28');
        fs.writeFileSync(filePath, html, 'utf8');
    }
});

// 2. Add Toplu Stok Raporu terms to translations.js
const dict = {
    'Toplu Stok Raporu': 'report.toplu_stok',
    'Stok Kartlarına Dön': 'report.stok_kartlarina_don',
    'Gruplama Türü Seçiniz:': 'report.gruplama_turu',
    'Ürüne Göre': 'report.urune_gore',
    'Markaya Göre': 'report.markaya_gore',
    'Kategoriye Göre': 'report.kategoriye_gore',
    'Sıfırları Göster': 'report.sifirlari_goster',
    'Stok Kodu': 'word.stok_kodu',
    'Stok Adı': 'word.stok_adi',
    'Birim': 'word.birim',
    'Giriş Miktarı': 'word.giris_miktari',
    'Çıkış Miktarı': 'word.cikis_miktari',
    'Lütfen rapor kriterlerini seçip "Raporu Oluştur" butonuna basınız.': 'report.stok_empty_msg',
    'Raporu Oluştur': 'report.raporu_olustur',
    'Rapor Kriterleri': 'report.kriterler',
    'Tarih Aralığı:': 'report.tarih_araligi',
    'Tüm Zamanlar': 'report.tum_zamanlar',
    'Bakiye': 'word.bakiye'
};

const tAdditions = {
    'tr': `        'report.toplu_stok': 'Toplu Stok Raporu',
        'report.stok_kartlarina_don': 'Stok Kartlarına Dön',
        'report.gruplama_turu': 'Gruplama Türü Seçiniz:',
        'report.urune_gore': 'Ürüne Göre',
        'report.markaya_gore': 'Markaya Göre',
        'report.kategoriye_gore': 'Kategoriye Göre',
        'report.sifirlari_goster': 'Sıfırları Göster',
        'word.stok_kodu': 'Stok Kodu',
        'word.stok_adi': 'Stok Adı',
        'word.birim': 'Birim',
        'word.giris_miktari': 'Giriş Miktarı',
        'word.cikis_miktari': 'Çıkış Miktarı',
        'report.stok_empty_msg': 'Lütfen rapor kriterlerini seçip "Raporu Oluştur" butonuna basınız.',
        'report.raporu_olustur': 'Raporu Oluştur',`,
    'en': `        'report.toplu_stok': 'Batch Stock Report',
        'report.stok_kartlarina_don': 'Back to Stock Cards',
        'report.gruplama_turu': 'Select Grouping Type:',
        'report.urune_gore': 'By Product',
        'report.markaya_gore': 'By Brand',
        'report.kategoriye_gore': 'By Category',
        'report.sifirlari_goster': 'Show Zeros',
        'word.stok_kodu': 'Stock Code',
        'word.stok_adi': 'Stock Name',
        'word.birim': 'Unit',
        'word.giris_miktari': 'Entry Amount',
        'word.cikis_miktari': 'Exit Amount',
        'report.stok_empty_msg': 'Please select criteria and click "Generate Report".',
        'report.raporu_olustur': 'Generate Report',`,
    'de': `        'report.toplu_stok': 'Massen-Lagerbericht',
        'report.stok_kartlarina_don': 'Zurück zu Lagerkarten',
        'report.gruplama_turu': 'Gruppierung Auswählen:',
        'report.urune_gore': 'Nach Produkt',
        'report.markaya_gore': 'Nach Marke',
        'report.kategoriye_gore': 'Nach Kategorie',
        'report.sifirlari_goster': 'Nullen Anzeigen',
        'word.stok_kodu': 'Lagerkode',
        'word.stok_adi': 'Lagername',
        'word.birim': 'Einheit',
        'word.giris_miktari': 'Eingangsmenge',
        'word.cikis_miktari': 'Ausgangsmenge',
        'report.stok_empty_msg': 'Bitte Kriterien wählen und auf "Bericht Erstellen" klicken.',
        'report.raporu_olustur': 'Bericht Erstellen',`,
    'ru': `        'report.toplu_stok': 'Массовый Отчет по Складу',
        'report.stok_kartlarina_don': 'Назад к Складским Картам',
        'report.gruplama_turu': 'Выберите тип группировки:',
        'report.urune_gore': 'По Продукту',
        'report.markaya_gore': 'По Бренду',
        'report.kategoriye_gore': 'По Категории',
        'report.sifirlari_goster': 'Показывать Нули',
        'word.stok_kodu': 'Код Склада',
        'word.stok_adi': 'Название Склада',
        'word.birim': 'Единица',
        'word.giris_miktari': 'Количество Входа',
        'word.cikis_miktari': 'Количество Выхода',
        'report.stok_empty_msg': 'Пожалуйста, выберите критерии и нажмите "Создать Отчет".',
        'report.raporu_olustur': 'Создать Отчет',`,
    'zh': `        'report.toplu_stok': '批量库存报告',
        'report.stok_kartlarina_don': '返回库存卡',
        'report.gruplama_turu': '选择分组类型:',
        'report.urune_gore': '按产品',
        'report.markaya_gore': '按品牌',
        'report.kategoriye_gore': '按分类',
        'report.sifirlari_goster': '显示零项',
        'word.stok_kodu': '库存代码',
        'word.stok_adi': '库存名称',
        'word.birim': '单位',
        'word.giris_miktari': '入库数量',
        'word.cikis_miktari': '出库数量',
        'report.stok_empty_msg': '请选择标准并点击"生成报告".',
        'report.raporu_olustur': '生成报告',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// 3. Patch toplu_stok_raporu.html Text Nodes
let thtml = fs.readFileSync(path.join(__dirname, 'toplu_stok_raporu.html'), 'utf8');

for (const [turkishText, key] of Object.entries(dict)) {
    const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    
    // Direct matches
    const rx1 = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
    if (rx1.test(thtml)) {
        thtml = thtml.replace(rx1, (m, p1, p2, p3, p4, p5) => {
            return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
        });
    }

    // Option tags match
    const rxOpt = new RegExp('<option([^>]*)>\\s*(' + safeWord + ')\\s*</option>', 'gi');
    if (rxOpt.test(thtml)) {
        thtml = thtml.replace(rxOpt, (m, p1, p2) => {
            if(p1.includes('data-i18n')) return m; 
            return '<option' + p1 + ' data-i18n="' + key + '">' + p2 + '</option>';
        });
    }

     // TH match
    const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'gi');
    if (rxTh.test(thtml)) {
        thtml = thtml.replace(rxTh, (m, p1, p2) => {
            return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
        });
    }

    // TD match for the empty msg
    const rxTd = new RegExp('<td([^>]*)>(\\s*)(' + safeWord + ')(\\s*)</td>', 'g');
    if (rxTd.test(thtml)) {
         thtml = thtml.replace(rxTd, (m, p1, p2, p3, p4) => {
             return '<td' + p1 + '>' + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + '</td>';
         });
    }
}

// And the Toplu Stok Raporu heading specific
thtml = thtml.replace(/<h2 class="page-title">Toplu Stok Raporu<\/h2>/g, '<h2 class="page-title"><span data-i18n="report.toplu_stok">Toplu Stok Raporu</span></h2>');
thtml = thtml.replace(/>Stok Kartlarına Dön</g, '><span data-i18n="report.stok_kartlarina_don">Stok Kartlarına Dön</span><');
thtml = thtml.replace(/>Raporu Oluştur</g, '><span data-i18n="report.raporu_olustur">Raporu Oluştur</span><');


fs.writeFileSync(path.join(__dirname, 'toplu_stok_raporu.html'), thtml, 'utf8');

console.log('Patched toplu_stok_raporu.html and ensured translations.js is in all files.');
