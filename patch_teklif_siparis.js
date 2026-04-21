const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'word.teklif_siparis_baslik': 'Teklif/Sipariş',
        'word.hepsi': 'Hepsi',
        'word.teklif_turu': 'Teklif/Sipariş Türü',
        'word.teklif_no': 'Teklif/Sipariş No',
        'word.islem_durumu': 'İşlem Durumu',
        'word.teklif_durumu': 'Teklif/Sipariş Durumu',
        'word.genel_toplam': 'Genel Toplam',
        'word.teklif_baslik': 'Teklif',
        'word.yeni_verilen_teklif': 'Yeni Verilen Teklif',
        'word.yeni_alinan_teklif': 'Yeni Alınan Teklif',
        'word.siparis_baslik': 'Sipariş',
        'word.yeni_verilen_siparis': 'Yeni Verilen Sipariş',
        'word.yeni_alinan_siparis': 'Yeni Alınan Sipariş',`,
    'en': `        'word.teklif_siparis_baslik': 'Offer/Order',
        'word.hepsi': 'All',
        'word.teklif_turu': 'Offer/Order Type',
        'word.teklif_no': 'Offer/Order No',
        'word.islem_durumu': 'Process Status',
        'word.teklif_durumu': 'Offer/Order Status',
        'word.genel_toplam': 'Grand Total',
        'word.teklif_baslik': 'Offer',
        'word.yeni_verilen_teklif': 'New Given Offer',
        'word.yeni_alinan_teklif': 'New Received Offer',
        'word.siparis_baslik': 'Order',
        'word.yeni_verilen_siparis': 'New Given Order',
        'word.yeni_alinan_siparis': 'New Received Order',`,
    'de': `        'word.teklif_siparis_baslik': 'Angebot/Bestellung',
        'word.hepsi': 'Alle',
        'word.teklif_turu': 'Angebots-/Bestellart',
        'word.teklif_no': 'Angebot/Bestellung Nr.',
        'word.islem_durumu': 'Bearbeitungsstatus',
        'word.teklif_durumu': 'Angebots-/Bestellstatus',
        'word.genel_toplam': 'Gesamtsumme',
        'word.teklif_baslik': 'Angebot',
        'word.yeni_verilen_teklif': 'Neues Abgegebenes Angebot',
        'word.yeni_alinan_teklif': 'Neues Erhaltenes Angebot',
        'word.siparis_baslik': 'Bestellung',
        'word.yeni_verilen_siparis': 'Neue Abgegebene Bestellung',
        'word.yeni_alinan_siparis': 'Neue Erhaltene Bestellung',`,
    'ru': `        'word.teklif_siparis_baslik': 'Предложение/Заказ',
        'word.hepsi': 'Все',
        'word.teklif_turu': 'Тип Предложения/Заказа',
        'word.teklif_no': '№ Предложения/Заказа',
        'word.islem_durumu': 'Статус Обработки',
        'word.teklif_durumu': 'Статус Предложения/Заказа',
        'word.genel_toplam': 'Общий Итог',
        'word.teklif_baslik': 'Предложение',
        'word.yeni_verilen_teklif': 'Новое Сделанное Предложение',
        'word.yeni_alinan_teklif': 'Новое Полученное Предложение',
        'word.siparis_baslik': 'Заказ',
        'word.yeni_verilen_siparis': 'Новый Сделанный Заказ',
        'word.yeni_alinan_siparis': 'Новый Полученный Заказ',`,
    'zh': `        'word.teklif_siparis_baslik': '报价/订单',
        'word.hepsi': '全部',
        'word.teklif_turu': '报价/订单类型',
        'word.teklif_no': '报价/订单号',
        'word.islem_durumu': '处理状态',
        'word.teklif_durumu': '报价/订单状态',
        'word.genel_toplam': '总计',
        'word.teklif_baslik': '报价',
        'word.yeni_verilen_teklif': '新提供报价',
        'word.yeni_alinan_teklif': '新收到报价',
        'word.siparis_baslik': '订单',
        'word.yeni_verilen_siparis': '新发出订单',
        'word.yeni_alinan_siparis': '新收到订单',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'teklif_siparis.html'), 'utf8');

// Title/Heading
html = html.replace(/Teklif\/Sipariş<\/h2>/g, '<span data-i18n="word.teklif_siparis_baslik">Teklif/Sipariş</span></h2>');

// Dropdown
html = html.replace(/>Hepsi</g, ' data-i18n="word.hepsi">Hepsi<');
html = html.replace(/>Teklif<\/option>/g, ' data-i18n="word.teklif_baslik">Teklif</option>');
html = html.replace(/>Sipariş<\/option>/g, ' data-i18n="word.siparis_baslik">Sipariş</option>');

// Table Headers
html = html.replace(/<th>Teklif\/Sipariş Türü<\/th>/g, '<th><span data-i18n="word.teklif_turu">Teklif/Sipariş Türü</span></th>');
html = html.replace(/<th>Teklif\/Sipariş No<\/th>/g, '<th><span data-i18n="word.teklif_no">Teklif/Sipariş No</span></th>');
html = html.replace(/<th>İşlem Durumu<\/th>/g, '<th><span data-i18n="word.islem_durumu">İşlem Durumu</span></th>');
html = html.replace(/<th>Teklif\/Sipariş Durumu<\/th>/g, '<th><span data-i18n="word.teklif_durumu">Teklif/Sipariş Durumu</span></th>');
html = html.replace(/<th>Ünvan<\/th>/g, '<th><span data-i18n="word.unvan_kucuk">Ünvan</span></th>');
html = html.replace(/<th>Genel Toplam<\/th>/g, '<th><span data-i18n="word.genel_toplam">Genel Toplam</span></th>');

// Multi-line empty row
html = html.replace(/Kayıt\s*bulunamadı\./gm, '<span data-i18n="word.kayit_bulunamadi">Kayıt bulunamadı.</span>');

// Sidebar Cards
html = html.replace(/<h3>Teklif<\/h3>/g, '<h3><span data-i18n="word.teklif_baslik">Teklif</span></h3>');
html = html.replace(/<h3>Sipariş<\/h3>/g, '<h3><span data-i18n="word.siparis_baslik">Sipariş</span></h3>');

// Buttons
html = html.replace(/Yeni Verilen Teklif\s*<\/button>/g, '<span data-i18n="word.yeni_verilen_teklif">Yeni Verilen Teklif</span></button>');
html = html.replace(/Yeni Alınan Teklif\s*<\/button>/g, '<span data-i18n="word.yeni_alinan_teklif">Yeni Alınan Teklif</span></button>');
html = html.replace(/Yeni Verilen Sipariş\s*<\/button>/g, '<span data-i18n="word.yeni_verilen_siparis">Yeni Verilen Sipariş</span></button>');
html = html.replace(/Yeni Alınan Sipariş\s*<\/button>/g, '<span data-i18n="word.yeni_alinan_siparis">Yeni Alınan Sipariş</span></button>');

// Rapor missing span
html = html.replace(/<\/i>\s*Rapor\s*<\/button>/g, '</i> <span data-i18n="word.rapor">Rapor</span></button>');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=24');

fs.writeFileSync(path.join(__dirname, 'teklif_siparis.html'), html, 'utf8');

console.log('Patched teklif_siparis.html completely!');
