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
    // Check if THIS SPECIFIC LANGUAGE has "mega.excel_aktar" in its block.
    // To do this simply, we'll check if the dictionary string extra is already in the file.
    // But since order might change or spacing, we just check if `'mega.excel_aktar'` exists AFTER the `lang: {` block, up to 500 chars later. Or just check uniquely.
    
    // Hard force inject if missing the English equivalent
    if (lang === 'en' && !js.includes("'Export to Excel'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    } else if (lang === 'de' && !js.includes("'Nach Excel exportieren'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    } else if (lang === 'ru' && !js.includes("'Экспорт в Excel'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    } else if (lang === 'zh' && !js.includes("'导出到 Excel'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    } else if (lang === 'tr' && !js.includes("'mega.excel_aktar'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    }
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');
console.log('Force injected final words to translations.js');
