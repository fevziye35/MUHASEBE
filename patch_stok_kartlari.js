const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'mega.yeni_stok_f5': 'Yeni Stok (F5)',
        'mega.stok_paket_gruplari': 'Stok Paket Grupları',
        'mega.excel_aktar': 'Excel\\'e Aktar',
        'mega.kodu': 'Kodu',
        'mega.barkod': 'Barkod',
        'mega.stok_adi': 'Stok Adı',
        'mega.satis_fiyati': 'Satış Fiyatı',
        'mega.bakiye': 'Bakiye',
        'mega.marka': 'Marka',
        'mega.grup': 'Grup',
        'mega.detay': 'Detay',`,
    'en': `        'mega.yeni_stok_f5': 'New Stock (F5)',
        'mega.stok_paket_gruplari': 'Stock Package Groups',
        'mega.excel_aktar': 'Export to Excel',
        'mega.kodu': 'CODE',
        'mega.barkod': 'BARCODE',
        'mega.stok_adi': 'STOCK NAME',
        'mega.satis_fiyati': 'SALES PRICE',
        'mega.bakiye': 'BALANCE',
        'mega.marka': 'BRAND',
        'mega.grup': 'GROUP',
        'mega.detay': 'DETAILS',`,
    'de': `        'mega.yeni_stok_f5': 'Neuer Bestand (F5)',
        'mega.stok_paket_gruplari': 'Bestand Paketgruppen',
        'mega.excel_aktar': 'Nach Excel exportieren',
        'mega.kodu': 'CODE',
        'mega.barkod': 'BARCODE',
        'mega.stok_adi': 'BESTANDSNAME',
        'mega.satis_fiyati': 'VERKAUFSPREIS',
        'mega.bakiye': 'SALDO',
        'mega.marka': 'MARKE',
        'mega.grup': 'GRUPPE',
        'mega.detay': 'DETAILS',`,
    'ru': `        'mega.yeni_stok_f5': 'Новый запас (F5)',
        'mega.stok_paket_gruplari': 'Группы пакетов запасов',
        'mega.excel_aktar': 'Экспорт в Excel',
        'mega.kodu': 'КОД',
        'mega.barkod': 'ШТРИХ-КОД',
        'mega.stok_adi': 'НАЗВАНИЕ ЗАПАСА',
        'mega.satis_fiyati': 'ЦЕНА ПРОДАЖИ',
        'mega.bakiye': 'БАЛАНС',
        'mega.marka': 'МАРКА',
        'mega.grup': 'ГРУППА',
        'mega.detay': 'ДЕТАЛИ',`,
    'zh': `        'mega.yeni_stok_f5': '新库存 (F5)',
        'mega.stok_paket_gruplari': '库存套餐组',
        'mega.excel_aktar': '导出到 Excel',
        'mega.kodu': '代码',
        'mega.barkod': '条形码',
        'mega.stok_adi': '库存名称',
        'mega.satis_fiyati': '销售价格',
        'mega.bakiye': '余额',
        'mega.marka': '品牌',
        'mega.grup': '组别',
        'mega.detay': '详情',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    if (!js.includes("'mega.yeni_stok_f5'") || (lang === 'en' && !js.includes("'New Stock (F5)'"))) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    }
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Also update HTML
let html = fs.readFileSync(path.join(__dirname, 'stok_kartlari.html'), 'utf8');

const replacements = [
    ['Yeni Stok\\n                (F5)', '<span data-i18n="mega.yeni_stok_f5">Yeni Stok (F5)</span>'],
    ['Yeni Stok\\r\\n                (F5)', '<span data-i18n="mega.yeni_stok_f5">Yeni Stok (F5)</span>'],
    ['Yeni Stok (F5)', '<span data-i18n="mega.yeni_stok_f5">Yeni Stok (F5)</span>'],
    ['Stok Paket\\n                Grupları', '<span data-i18n="mega.stok_paket_gruplari">Stok Paket Grupları</span>'],
    ['Stok Paket\\r\\n                Grupları', '<span data-i18n="mega.stok_paket_gruplari">Stok Paket Grupları</span>'],
    ['Stok Paket Grupları', '<span data-i18n="mega.stok_paket_gruplari">Stok Paket Grupları</span>'],
    ["Excel'e\\n                Aktar", "<span data-i18n='mega.excel_aktar'>Excel'e Aktar</span>"],
    ["Excel'e\\r\\n                Aktar", "<span data-i18n='mega.excel_aktar'>Excel'e Aktar</span>"],
    ["Excel'e Aktar", "<span data-i18n='mega.excel_aktar'>Excel'e Aktar</span>"],
    ['<th>Kodu</th>', '<th><span data-i18n="mega.kodu">Kodu</span></th>'],
    ['<th>Barkod</th>', '<th><span data-i18n="mega.barkod">Barkod</span></th>'],
    ['<th>Stok Adı</th>', '<th><span data-i18n="mega.stok_adi">Stok Adı</span></th>'],
    ['<th>Satış Fiyatı</th>', '<th><span data-i18n="mega.satis_fiyati">Satış Fiyatı</span></th>'],
    ['<th>Bakiye</th>', '<th><span data-i18n="mega.bakiye">Bakiye</span></th>'],
    ['<th>Marka</th>', '<th><span data-i18n="mega.marka">Marka</span></th>'],
    ['<th>Grup</th>', '<th><span data-i18n="mega.grup">Grup</span></th>'],
    ['<th>Detay</th>', '<th><span data-i18n="mega.detay">Detay</span></th>']
];

for (const [target, repl] of replacements) {
    if (html.includes(target) && !html.includes(repl)) {
        html = html.split(target).join(repl);
    }
}

html = html.replace(/translations\\.js\\?v=\\d+/g, 'translations.js?v=52');
fs.writeFileSync(path.join(__dirname, 'stok_kartlari.html'), html, 'utf8');

console.log("Patched stok_kartlari.html translations successfully");
