const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const dict = {
    // Kasa
    'Kasalar': 'word.kasalar',
    'Kasa Ekle': 'word.kasa_ekle',
    'Rapor': 'word.rapor',
    'Kasa Listesi': 'word.kasa_listesi',
    'Kasa Adı': 'word.kasa_adi',
    'Bakiye': 'word.bakiye',
    'Düzenle/Sil': 'word.duzenle_sil_kucuk',
    'Detay': 'word.detay',
    // Banka
    'Bankalar': 'word.bankalar',
    'Yeni Banka Hesabı': 'word.yeni_banka_hesabi',
    'Bankadan Bankaya Virman': 'word.banka_virman',
    'Banka Detaylı Rapor': 'word.banka_detayli_rapor',
    'Banka Bakiye Raporu': 'word.banka_bakiye_raporu',
    'Banka Entegrasyonu': 'word.banka_entegrasyonu',
    'Banka Listesi': 'word.banka_listesi',
    'Banka Hesabı': 'word.banka_hesabi',
    'Hesap Numarası': 'word.hesap_numarasi',
    'Döviz Türü': 'word.doviz_turu',
    'YENİ': 'word.yeni_badge'
};

const tAdditions = {
    'tr': `        'word.kasalar': 'Kasalar',
        'word.kasa_ekle': 'Kasa Ekle',
        'word.rapor': 'Rapor',
        'word.kasa_listesi': 'Kasa Listesi',
        'word.kasa_adi': 'Kasa Adı',
        'word.bakiye': 'Bakiye',
        'word.duzenle_sil_kucuk': 'Düzenle/Sil',
        'word.detay': 'Detay',
        'word.bankalar': 'Bankalar',
        'word.yeni_banka_hesabi': 'Yeni Banka Hesabı',
        'word.banka_virman': 'Bankadan Bankaya Virman',
        'word.banka_detayli_rapor': 'Banka Detaylı Rapor',
        'word.banka_bakiye_raporu': 'Banka Bakiye Raporu',
        'word.banka_entegrasyonu': 'Banka Entegrasyonu',
        'word.banka_listesi': 'Banka Listesi',
        'word.banka_hesabi': 'Banka Hesabı',
        'word.hesap_numarasi': 'Hesap Numarası',
        'word.doviz_turu': 'Döviz Türü',
        'word.yeni_badge': 'YENİ',`,
    'en': `        'word.kasalar': 'Cash Registers',
        'word.kasa_ekle': 'Add Cash',
        'word.rapor': 'Report',
        'word.kasa_listesi': 'Cash List',
        'word.kasa_adi': 'Register Name',
        'word.bakiye': 'Balance',
        'word.duzenle_sil_kucuk': 'Edit/Delete',
        'word.detay': 'Detail',
        'word.bankalar': 'Banks',
        'word.yeni_banka_hesabi': 'New Bank Auth',
        'word.banka_virman': 'Bank to Bank Transfer',
        'word.banka_detayli_rapor': 'Detailed Bank Report',
        'word.banka_bakiye_raporu': 'Bank Balance Report',
        'word.banka_entegrasyonu': 'Bank Integration',
        'word.banka_listesi': 'Bank List',
        'word.banka_hesabi': 'Bank Account',
        'word.hesap_numarasi': 'Account Number',
        'word.doviz_turu': 'Currency Type',
        'word.yeni_badge': 'NEW',`,
    'de': `        'word.kasalar': 'Kassen',
        'word.kasa_ekle': 'Kasse Hinzufügen',
        'word.rapor': 'Bericht',
        'word.kasa_listesi': 'Kassenliste',
        'word.kasa_adi': 'Kassenname',
        'word.bakiye': 'Saldo',
        'word.duzenle_sil_kucuk': 'Bearbeiten/Löschen',
        'word.detay': 'Detail',
        'word.bankalar': 'Banken',
        'word.yeni_banka_hesabi': 'Neues Bankkonto',
        'word.banka_virman': 'Banküberweisung',
        'word.banka_detayli_rapor': 'Detaillierter Bankbericht',
        'word.banka_bakiye_raporu': 'Banksaldobericht',
        'word.banka_entegrasyonu': 'Bankintegration',
        'word.banka_listesi': 'Bankenliste',
        'word.banka_hesabi': 'Bankkonto',
        'word.hesap_numarasi': 'Kontonummer',
        'word.doviz_turu': 'Währung',
        'word.yeni_badge': 'NEU',`,
    'ru': `        'word.kasalar': 'Кассы',
        'word.kasa_ekle': 'Добавить кассу',
        'word.rapor': 'Отчет',
        'word.kasa_listesi': 'Список касс',
        'word.kasa_adi': 'Название кассы',
        'word.bakiye': 'Баланс',
        'word.duzenle_sil_kucuk': 'Изменить/Удалить',
        'word.detay': 'Деталь',
        'word.bankalar': 'Банки',
        'word.yeni_banka_hesabi': 'Новый банковский счет',
        'word.banka_virman': 'Перевод банк-банк',
        'word.banka_detayli_rapor': 'Детальный банковский отчет',
        'word.banka_bakiye_raporu': 'Отчет о балансе банка',
        'word.banka_entegrasyonu': 'Интеграция с банком',
        'word.banka_listesi': 'Список банков',
        'word.banka_hesabi': 'Банковский счет',
        'word.hesap_numarasi': 'Номер счета',
        'word.doviz_turu': 'Валюта',
        'word.yeni_badge': 'НОВЫЙ',`,
    'zh': `        'word.kasalar': '现金出纳机',
        'word.kasa_ekle': '添加现金',
        'word.rapor': '报告',
        'word.kasa_listesi': '出纳机列表',
        'word.kasa_adi': '出纳机名称',
        'word.bakiye': '余额',
        'word.duzenle_sil_kucuk': '编辑/删除',
        'word.detay': '详情',
        'word.bankalar': '银行',
        'word.yeni_banka_hesabi': '新银行账户',
        'word.banka_virman': '银行间转账',
        'word.banka_detayli_rapor': '详细银行报告',
        'word.banka_bakiye_raporu': '银行余额报告',
        'word.banka_entegrasyonu': '银行集成',
        'word.banka_listesi': '银行列表',
        'word.banka_hesabi': '银行账户',
        'word.hesap_numarasi': '账号',
        'word.doviz_turu': '货币类型',
        'word.yeni_badge': '新',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

const files = ['kasa.html', 'banka_ozet.html'];
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
        const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'g');
        if (rxTh.test(html)) {
             html = html.replace(rxTh, (m, p1, p2) => {
                return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
            });
        }
        
        // Match span contents
        const rxSpan = new RegExp('<span([^>]*)>\\s*(' + safeWord + ')\\s*</span>', 'g');
        if (rxSpan.test(html)) {
             html = html.replace(rxSpan, (m, p1, p2) => {
                if(p1.includes('data-i18n')) return m; // ignore already translated
                return '<span' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></span>';
            });
        }
    }
    
    html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=21');
    fs.writeFileSync(path.join(__dirname, file), html, 'utf8');
});

// Since Kasalar was specifically targeted, let's also hardcode replace some specific ones in case Regex missed
let kh = fs.readFileSync(path.join(__dirname, 'kasa.html'), 'utf8');
kh = kh.replace(/<h1 class="page-title">Kasalar<\/h1>/g, '<h1 class="page-title"><span data-i18n="word.kasalar">Kasalar</span></h1>');
fs.writeFileSync(path.join(__dirname, 'kasa.html'), kh, 'utf8');

let bh = fs.readFileSync(path.join(__dirname, 'banka_ozet.html'), 'utf8');
bh = bh.replace(/<h1 class="page-title">Bankalar<\/h1>/g, '<h1 class="page-title"><span data-i18n="word.bankalar">Bankalar</span></h1>');
fs.writeFileSync(path.join(__dirname, 'banka_ozet.html'), bh, 'utf8');

console.log('Precision patched kasa.html and banka_ozet.html!');
