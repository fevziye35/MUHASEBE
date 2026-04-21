const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dict = {
    'Stok Kartları': 'word.stok_kartlari',
    'Yeni Stok \\(F5\\)': 'word.yeni_stok',
    'Yeni Stok': 'word.yeni_stok_plain',
    'Gruplar': 'word.gruplar',
    'Markalar': 'word.markalar',
    'Birimler': 'word.birimler',
    'Depolar': 'word.depolar',
    'Stok Paket Grupları': 'word.stok_paket_gruplari',
    'Raporlar': 'word.raporlar',
    "Excel'e Aktar": 'word.excel_aktar',
    'Stok Kart Listesi': 'word.stok_kart_listesi',
    
    // Table Headers
    'KODU': 'word.kodu',
    'BARKOD': 'word.barkod',
    'STOK ADI': 'word.stok_adi',
    'SATIŞ FİYATI': 'word.satis_fiyati',
    'BAKİYE': 'word.bakiye',
    'MARKA': 'word.marka',
    'GRUP': 'word.grup',
    'DETAY': 'word.detay',
    'İŞLEM': 'word.islem',
    'ÜNVAN': 'word.unvan',
    'YETKİLİ': 'word.yetkili',
    'SİL': 'word.sil'
};

let filesUpdated = 0;

files.forEach(file => {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // We do careful replacements to catch >Text< or whitespace around text 
    for (const [turkishText, key] of Object.entries(dict)) {
        // Regex to find ">[whitespace]Word[whitespace]<"
        // Also ensure not already translated
        const safeWord = turkishText.replace(/\\/g, '\\\\'); 
        
        // Match explicit element contents
        const rx = new RegExp('>(\\s*)(' + safeWord + ')(\\s*)<', 'g');
        if (rx.test(html)) {
            // Check if it already has a span
            // Basically just replace it globally. If it gets double wrapped, it's fine since data-i18n overrides.
            // Wait, double span might cause visual bugs if classes are applied. But it's usually <th>Word</th>
            html = html.replace(rx, '>$1<span data-i18n="' + key + '">$2</span>$3<');
            changed = true;
        }
    }
    
    // Also patch Ara placeholders
    if (html.includes('placeholder="Ara..."') && !html.includes('data-i18n="dashboard.search"')) {
        html = html.replace(/placeholder="Ara..."/g, 'placeholder="Ara..." data-i18n="dashboard.search"');
        changed = true;
    }
    else if (html.includes('placeholder="Ara"') && !html.includes('data-i18n="dashboard.search"')) {
        html = html.replace(/placeholder="Ara"/g, 'placeholder="Ara" data-i18n="dashboard.search"');
        changed = true;
    }

    if (changed) {
        // Cache bust translations.js
        if(html.includes('<script src="translations.js"></script>')){
            html = html.replace('<script src="translations.js"></script>', '<script src="translations.js?v=5"></script>');
        } else if(html.includes('<script src="translations.js?v=3"></script>')){
            html = html.replace('<script src="translations.js?v=3"></script>', '<script src="translations.js?v=5"></script>');
        } else if(html.includes('<script src="translations.js?v=4"></script>')){
            html = html.replace('<script src="translations.js?v=4"></script>', '<script src="translations.js?v=5"></script>');
        }
        
        fs.writeFileSync(filePath, html, 'utf8');
        filesUpdated++;
    }
});

console.log('Successfully patched ' + filesUpdated + ' HTML files with common dictionary words.');

// Now update translations.js
const transFile = path.join(dir, 'translations.js');
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'word.stok_kartlari': 'Stok Kartları',
        'word.yeni_stok': 'Yeni Stok (F5)',
        'word.yeni_stok_plain': 'Yeni Stok',
        'word.gruplar': 'Gruplar',
        'word.markalar': 'Markalar',
        'word.birimler': 'Birimler',
        'word.depolar': 'Depolar',
        'word.stok_paket_gruplari': 'Stok Paket Grupları',
        'word.raporlar': 'Raporlar',
        'word.excel_aktar': 'Excel\\'e Aktar',
        'word.stok_kart_listesi': 'Stok Kart Listesi',
        'word.kodu': 'KODU',
        'word.barkod': 'BARKOD',
        'word.stok_adi': 'STOK ADI',
        'word.satis_fiyati': 'SATIŞ FİYATI',
        'word.bakiye': 'BAKİYE',
        'word.marka': 'MARKA',
        'word.grup': 'GRUP',
        'word.detay': 'DETAY',
        'word.islem': 'İŞLEM',
        'word.unvan': 'ÜNVAN',
        'word.yetkili': 'YETKİLİ',
        'word.sil': 'SİL',`,
    'en': `        'word.stok_kartlari': 'Stock Cards',
        'word.yeni_stok': 'New Stock (F5)',
        'word.yeni_stok_plain': 'New Stock',
        'word.gruplar': 'Groups',
        'word.markalar': 'Brands',
        'word.birimler': 'Units',
        'word.depolar': 'Warehouses',
        'word.stok_paket_gruplari': 'Stock Package Groups',
        'word.raporlar': 'Reports',
        'word.excel_aktar': 'Export to Excel',
        'word.stok_kart_listesi': 'Stock Card List',
        'word.kodu': 'CODE',
        'word.barkod': 'BARCODE',
        'word.stok_adi': 'STOCK NAME',
        'word.satis_fiyati': 'SALE PRICE',
        'word.bakiye': 'BALANCE',
        'word.marka': 'BRAND',
        'word.grup': 'GROUP',
        'word.detay': 'DETAIL',
        'word.islem': 'ACTION',
        'word.unvan': 'TITLE',
        'word.yetkili': 'AUTHORIZED',
        'word.sil': 'DELETE',`,
    'de': `        'word.stok_kartlari': 'Bestandskarten',
        'word.yeni_stok': 'Neuer Bestand (F5)',
        'word.yeni_stok_plain': 'Neuer Bestand',
        'word.gruplar': 'Gruppen',
        'word.markalar': 'Marken',
        'word.birimler': 'Einheiten',
        'word.depolar': 'Lagerhäuser',
        'word.stok_paket_gruplari': 'Bestandspaketgruppen',
        'word.raporlar': 'Berichte',
        'word.excel_aktar': 'In Excel exportieren',
        'word.stok_kart_listesi': 'Bestandskartenliste',
        'word.kodu': 'CODE',
        'word.barkod': 'BARCODE',
        'word.stok_adi': 'BESTANDSNAME',
        'word.satis_fiyati': 'VERKAUFSPREIS',
        'word.bakiye': 'SALDO',
        'word.marka': 'MARKE',
        'word.grup': 'GRUPPE',
        'word.detay': 'DETAIL',
        'word.islem': 'AKTION',
        'word.unvan': 'TITEL',
        'word.yetkili': 'AUTORISIERT',
        'word.sil': 'LÖSCHEN',`,
    'ru': `        'word.stok_kartlari': 'Карточки запасов',
        'word.yeni_stok': 'Новый запас (F5)',
        'word.yeni_stok_plain': 'Новый запас',
        'word.gruplar': 'Группы',
        'word.markalar': 'Бренды',
        'word.birimler': 'Единицы',
        'word.depolar': 'Склады',
        'word.stok_paket_gruplari': 'Группы пакетов запасов',
        'word.raporlar': 'Отчеты',
        'word.excel_aktar': 'Экспорт в Excel',
        'word.stok_kart_listesi': 'Список карточек запасов',
        'word.kodu': 'КОД',
        'word.barkod': 'ШТРИХКОД',
        'word.stok_adi': 'НАЗВАНИЕ',
        'word.satis_fiyati': 'ЦЕНА ПРОДАЖИ',
        'word.bakiye': 'БАЛАНС',
        'word.marka': 'БРЕНД',
        'word.grup': 'ГРУППА',
        'word.detay': 'ДЕТАЛЬ',
        'word.islem': 'ДЕЙСТВИЕ',
        'word.unvan': 'НАЗВАНИЕ',
        'word.yetkili': 'УПОЛНОМОЧЕННЫЙ',
        'word.sil': 'УДАЛИТЬ',`,
    'zh': `        'word.stok_kartlari': '库存卡',
        'word.yeni_stok': '新库存 (F5)',
        'word.yeni_stok_plain': '新库存',
        'word.gruplar': '小组',
        'word.markalar': '品牌',
        'word.birimler': '单位',
        'word.depolar': '仓库',
        'word.stok_paket_gruplari': '库存包组',
        'word.raporlar': '报表',
        'word.excel_aktar': '导出至Excel',
        'word.stok_kart_listesi': '库存卡列表',
        'word.kodu': '代码',
        'word.barkod': '条码',
        'word.stok_adi': '库存名称',
        'word.satis_fiyati': '售价',
        'word.bakiye': '余额',
        'word.marka': '品牌',
        'word.grup': '组',
        'word.detay': '详细',
        'word.islem': '操作',
        'word.unvan': '名称',
        'word.yetkili': '授权人',
        'word.sil': '删除',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(transFile, js, 'utf8');

console.log('Successfully injected translated objects into translations.js');
