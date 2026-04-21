const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const dict = {
    // Çek Senet
    'Yeni Verilen Çek/Senet': 'word.yeni_verilen_cek',
    'Yeni Alınan Çek/Senet': 'word.yeni_alinan_cek',
    'Sıralama': 'word.siralama',
    'Tarihe Göre': 'word.tarihe_gore',
    'Vadeye Göre': 'word.vadeye_gore',
    'Tutara Göre': 'word.tutara_gore',
    'Vade': 'word.vade',
    'Firma': 'word.firma',
    'Durumu': 'word.durumu',
    'Tutar': 'word.tutar_kucuk',
    'Çek/Senet Listesi': 'word.cek_senet_listesi',
    
    // Taksit
    'Yeni Taksit Oluştur': 'word.yeni_taksit',
    'Taksit Listesi': 'word.taksit_listesi',
    'Ünvan': 'word.unvan_kucuk',
    'Tahsilat': 'word.tahsilat',
    'Kalan': 'word.kalan'
};

const tAdditions = {
    'tr': `        'word.yeni_verilen_cek': 'Yeni Verilen Çek/Senet',
        'word.yeni_alinan_cek': 'Yeni Alınan Çek/Senet',
        'word.siralama': 'Sıralama',
        'word.tarihe_gore': 'Tarihe Göre',
        'word.vadeye_gore': 'Vadeye Göre',
        'word.tutara_gore': 'Tutara Göre',
        'word.vade': 'Vade',
        'word.firma': 'Firma',
        'word.durumu': 'Durumu',
        'word.tutar_kucuk': 'Tutar',
        'word.cek_senet_listesi': 'Çek/Senet Listesi',
        'word.yeni_taksit': 'Yeni Taksit Oluştur',
        'word.taksit_listesi': 'Taksit Listesi',
        'word.unvan_kucuk': 'Ünvan',
        'word.tahsilat': 'Tahsilat',
        'word.kalan': 'Kalan',`,
    'en': `        'word.yeni_verilen_cek': 'New Issued Check/Note',
        'word.yeni_alinan_cek': 'New Received Check/Note',
        'word.siralama': 'Sort By',
        'word.tarihe_gore': 'By Date',
        'word.vadeye_gore': 'By Maturity',
        'word.tutara_gore': 'By Amount',
        'word.vade': 'Maturity',
        'word.firma': 'Company',
        'word.durumu': 'Status',
        'word.tutar_kucuk': 'Amount',
        'word.cek_senet_listesi': 'Check/Note List',
        'word.yeni_taksit': 'Create New Installment',
        'word.taksit_listesi': 'Installment List',
        'word.unvan_kucuk': 'Title',
        'word.tahsilat': 'Collection',
        'word.kalan': 'Remaining',`,
    'de': `        'word.yeni_verilen_cek': 'Neuer Ausgestellter Scheck',
        'word.yeni_alinan_cek': 'Neuer Erhaltener Scheck',
        'word.siralama': 'Sortierung',
        'word.tarihe_gore': 'Nach Datum',
        'word.vadeye_gore': 'Nach Fälligkeit',
        'word.tutara_gore': 'Nach Betrag',
        'word.vade': 'Fälligkeit',
        'word.firma': 'Firma',
        'word.durumu': 'Status',
        'word.tutar_kucuk': 'Betrag',
        'word.cek_senet_listesi': 'Scheckliste',
        'word.yeni_taksit': 'Neue Rate Erstellen',
        'word.taksit_listesi': 'Ratenliste',
        'word.unvan_kucuk': 'Titel',
        'word.tahsilat': 'Inkasso',
        'word.kalan': 'Verbleibend',`,
    'ru': `        'word.yeni_verilen_cek': 'Новый Выданный Чек/Вексель',
        'word.yeni_alinan_cek': 'Новый Полученный Чек/Вексель',
        'word.siralama': 'Сортировка',
        'word.tarihe_gore': 'По Дате',
        'word.vadeye_gore': 'По Сроку',
        'word.tutara_gore': 'По Сумме',
        'word.vade': 'Срок оплаты',
        'word.firma': 'Фирма',
        'word.durumu': 'Статус',
        'word.tutar_kucuk': 'Сумма',
        'word.cek_senet_listesi': 'Список Чеков',
        'word.yeni_taksit': 'Создать Рассрочку',
        'word.taksit_listesi': 'Список Рассрочек',
        'word.unvan_kucuk': 'Название',
        'word.tahsilat': 'Взыскание',
        'word.kalan': 'Остаток',`,
    'zh': `        'word.yeni_verilen_cek': '新开出支票/票据',
        'word.yeni_alinan_cek': '新收到支票/票据',
        'word.siralama': '排序方式',
        'word.tarihe_gore': '按日期',
        'word.vadeye_gore': '按到期日',
        'word.tutara_gore': '按金额',
        'word.vade': '到期日',
        'word.firma': '公司',
        'word.durumu': '状态',
        'word.tutar_kucuk': '金额',
        'word.cek_senet_listesi': '支票/票据列表',
        'word.yeni_taksit': '创建新分期付款',
        'word.taksit_listesi': '分期付款列表',
        'word.unvan_kucuk': '标题',
        'word.tahsilat': '收款',
        'word.kalan': '剩余',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

const files = ['cek_senet.html', 'taksit_takip.html'];

files.forEach(file => {
    let html = fs.readFileSync(path.join(__dirname, file), 'utf8');
    
    // Direct replacements for precise strings
    for (const [turkishText, key] of Object.entries(dict)) {
        const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        
        // Exact element match like >Kasa Ekle<
        const rx = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
        if (rx.test(html)) {
            html = html.replace(rx, (m, p1, p2, p3, p4, p5) => {
                return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
            });
        }
        
        // Match table headers <th ...>Text</th>
        const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'gi');
        if (rxTh.test(html)) {
             html = html.replace(rxTh, (m, p1, p2) => {
                return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
            });
        }
        
        // Match inside spans
        const rxSpan = new RegExp('<span([^>]*)>\\s*(' + safeWord + ')\\s*</span>', 'gi');
        if (rxSpan.test(html)) {
             html = html.replace(rxSpan, (m, p1, p2) => {
                if(p1.includes('data-i18n')) return m; 
                return '<span' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></span>';
            });
        }
        
        // options match
        const rxOpt = new RegExp('<option([^>]*)>\\s*(' + safeWord + ')\\s*</option>', 'gi');
        if (rxOpt.test(html)) {
             html = html.replace(rxOpt, (m, p1, p2) => {
                if(p1.includes('data-i18n')) return m; 
                return '<option' + p1 + ' data-i18n="' + key + '">' + p2 + '</option>';
            });
        }
    }

    // specific overwrites
    html = html.replace(/<span data-i18n="mega.tarih">Tarih<\/span>/g, '<span data-i18n="word.cek_senet_listesi">Çek/Senet Listesi</span>');
    html = html.replace(/<h1 class="page-title">Çek\/Senet<\/h1>/g, '<h1 class="page-title"><span data-i18n="word.cek_senet">Çek/Senet</span></h1>');
    
    // Rapor if missing
    html = html.replace(/>\s*Rapor\s*</g, '><span data-i18n="word.rapor">Rapor</span><');
    html = html.replace(/>\s*Detay\s*</g, '><span data-i18n="word.detay">Detay</span><');
    
    html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=23');
    fs.writeFileSync(path.join(__dirname, file), html, 'utf8');
});

console.log('Precision patched cek_senet.html and taksit_takip.html!');
