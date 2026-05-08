const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('_raporu.html') || f === 'customer_statement.html');

for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Quick replacements for filters
    html = html.replace(/<label class="input-label">Başlangıç Tarihi<\/label>/g, '<label class="input-label"><span data-i18n="mega.start_date">Başlangıç Tarihi</span></label>');
    html = html.replace(/<label class="input-label">Bitiş Tarihi<\/label>/g, '<label class="input-label"><span data-i18n="mega.end_date">Bitiş Tarihi</span></label>');
    html = html.replace(/Tüm Zamanlar<\/label>/g, '<span data-i18n="mega.all_time">Tüm Zamanlar</span></label>');
    html = html.replace(/Tüm Zamanlar\s*<\/label>/g, '<span data-i18n="mega.all_time">Tüm Zamanlar</span></label>');
    html = html.replace(/<input type="checkbox"[^>]*>\s*Tüm Zamanlar/g, match => match.replace('Tüm Zamanlar', '<span data-i18n="mega.all_time">Tüm Zamanlar</span>'));
    
    // Page Title & Header replacements
    html = html.replace(/<h2 class="page-title">Cari İşlem Raporu<\/h2>/g, '<h2 class="page-title"><span data-i18n="mega.cari_islem_raporu">Cari İşlem Raporu</span></h2>');
    html = html.replace(/Cari İşlem Raporu Filteri/g, '<span data-i18n="mega.cari_islem_filter">Cari İşlem Raporu Filteri</span>');
    html = html.replace(/<i class="fa-solid fa-bars"><\/i>\s*Cari İşlem Raporu/g, '<i class="fa-solid fa-bars"></i> <span data-i18n="mega.cari_islem_raporu">Cari İşlem Raporu</span>');
    
    html = html.replace(/<h2 class="page-title">BA\/BS Raporu<\/h2>/g, '<h2 class="page-title"><span data-i18n="mega.babs_raporu">BA/BS Raporu</span></h2>');
    html = html.replace(/BA\/BS Raporu Filteri/g, '<span data-i18n="mega.babs_filter">BA/BS Raporu Filteri</span>');
    html = html.replace(/<i class="fa-solid fa-bars"><\/i>\s*BA\/BS Raporu/g, '<i class="fa-solid fa-bars"></i> <span data-i18n="mega.babs_raporu">BA/BS Raporu</span>');

    // Generic fallback for any other reports to just translate the start/end date logic
    html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=43');
    
    fs.writeFileSync(filePath, html, 'utf8');
}

// Ensure the specific names are in translations.js
let js = fs.readFileSync(path.join(dir, 'translations.js'), 'utf8');
const tAdditions = {
    'tr': `        'mega.cari_islem_filter': 'Cari İşlem Raporu Filtresi',
        'mega.babs_filter': 'BA/BS Raporu Filtresi',`,
    'en': `        'mega.cari_islem_filter': 'Customer Transaction Filter',
        'mega.babs_filter': 'BA/BS Report Filter',`,
    'de': `        'mega.cari_islem_filter': 'Kundentransaktionsfilter',
        'mega.babs_filter': 'BA/BS-Berichtsfilter',`,
    'ru': `        'mega.cari_islem_filter': 'Фильтр транзакций клиента',
        'mega.babs_filter': 'Фильтр отчета BA/BS',`,
    'zh': `        'mega.cari_islem_filter': '客户交易过滤',
        'mega.babs_filter': 'BA/BS报告过滤',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    if (!js.includes(extra.split(':')[0].trim())) { // naive check
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    }
}
fs.writeFileSync(path.join(dir, 'translations.js'), js, 'utf8');

console.log("Patched all raporu files with date and filter translations");
