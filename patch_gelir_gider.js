const fs = require('fs');
const path = require('path');

const dict = {
    'Gelir-Gider Listesi': 'word.gelir_gider_listesi',
    'Tip': 'word.tip',
    'Tutar': 'word.tutar_kucuk',
    'Düzenle/Sil': 'word.duzenle_sil',
    'Detay': 'word.detay_baslik'
};

const tAdditions = {
    'tr': `        'word.duzenle_sil': 'Düzenle/Sil',
        'word.tip': 'Tip',
        'word.detay_baslik': 'Detay',`,
    'en': `        'word.duzenle_sil': 'Edit/Delete',
        'word.tip': 'Type',
        'word.detay_baslik': 'Details',`,
    'de': `        'word.duzenle_sil': 'Bearbeiten/Löschen',
        'word.tip': 'Typ',
        'word.detay_baslik': 'Details',`,
    'ru': `        'word.duzenle_sil': 'Редактировать/Удалить',
        'word.tip': 'Тип',
        'word.detay_baslik': 'Детали',`,
    'zh': `        'word.duzenle_sil': '编辑/删除',
        'word.tip': '类型',
        'word.detay_baslik': '详情',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Patch ALL files that have <span>Gelir Gider</span> in the Reports submenu
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Fix the submenu problem
    html = html.replace(/<span>Gelir Gider<\/span>/g, '<span><span data-i18n="sidebar.income_expense">Gelir Gider</span></span>');
    
    // Bump version globally
    html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=32');
    fs.writeFileSync(filePath, html, 'utf8');
});


// Now specifically patch gelir_gider.html
let html = fs.readFileSync(path.join(__dirname, 'gelir_gider.html'), 'utf8');

for (const [turkishText, key] of Object.entries(dict)) {
    const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'gi');
    if (rxTh.test(html)) {
        html = html.replace(rxTh, (m, p1, p2) => {
            return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
        });
    }
}

// "Kayıt bulunamadı" script patch
html = html.replace(/'<tr><td(.*?)>Gelir-Gider kaydı bulunamadı.<\/td><\/tr>'/g, 
    `'<tr><td$1><span data-i18n="word.kayit_bulunamadi">Kayıt Bulunamadı.</span></td></tr>'`);

// Ensure dynamic javascript that overwrites "Toplam X kayıt gösteriliyor" is translated:
// Looking at script.js or embedded script, usually it's `document.getElementById('footerInfoText').innerHTML = ...`
// Let's modify the html directly to have data-i18n wrapper around "Toplam" and "kayıt gösteriliyor."
html = html.replace(/<div>Toplam <span(.*?)>(.*?)<\/span> kayıt gösteriliyor\.<\/div>/g, 
    '<div><span data-i18n="word.toplam">Toplam</span> <span$1>$2</span> <span data-i18n="word.kayit_gosteriliyor">kayıt gösteriliyor.</span></div>');

// I also need to make sure 'word.toplam' and 'word.kayit_gosteriliyor' exist in translations.js
const extraAdditions = {
    'tr': `        'word.toplam': 'Toplam',
        'word.kayit_gosteriliyor': 'kayıt gösteriliyor.',`,
    'en': `        'word.toplam': 'Total',
        'word.kayit_gosteriliyor': 'records shown.',`,
    'de': `        'word.toplam': 'Insgesamt',
        'word.kayit_gosteriliyor': 'Einträge angezeigt.',`,
    'ru': `        'word.toplam': 'Всего',
        'word.kayit_gosteriliyor': 'записей показано.',`,
    'zh': `        'word.toplam': '总计',
        'word.kayit_gosteriliyor': '条记录显示。',`
};

let js2 = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(extraAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js2 = js2.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js2, 'utf8');

fs.writeFileSync(path.join(__dirname, 'gelir_gider.html'), html, 'utf8');

console.log('Patched gelir_gider.html and updated the sidebar link globally!');
