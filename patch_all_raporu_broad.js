const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('_raporu.html') || f === 'customer_statement.html');

for (const file of files) {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Broad match for labels
    html = html.replace(/<label(.*?)>Başlangıç Tarihi<\/label>/g, '<label$1><span data-i18n="mega.start_date">Başlangıç Tarihi</span></label>');
    html = html.replace(/<label(.*?)>Bitiş Tarihi<\/label>/g, '<label$1><span data-i18n="mega.end_date">Bitiş Tarihi</span></label>');
    
    // Broad match for titles
    html = html.replace(/<h2(.*?)>Cari İşlem Raporu<\/h2>/g, '<h2$1><span data-i18n="mega.cari_islem_raporu">Cari İşlem Raporu</span></h2>');
    html = html.replace(/<h2(.*?)>BA\/BS Raporu<\/h2>/g, '<h2$1><span data-i18n="mega.babs_raporu">BA/BS Raporu</span></h2>');
    html = html.replace(/<h2(.*?)>Cari Rapor<\/h2>/g, '<h2$1><span data-i18n="mega.cari_rapor">Cari Rapor</span></h2>');
    html = html.replace(/<h2(.*?)>Satış Raporu<\/h2>/g, '<h2$1><span data-i18n="report.satis">Satış Raporu</span></h2>');
    html = html.replace(/<h2(.*?)>Kasa Raporu<\/h2>/g, '<h2$1><span data-i18n="report.kasa">Kasa Raporu</span></h2>');
    html = html.replace(/<h2(.*?)>Banka Raporu<\/h2>/g, '<h2$1><span data-i18n="report.banka">Banka Raporu</span></h2>');
    html = html.replace(/<h2(.*?)>Gün Sonu Raporu<\/h2>/g, '<h2$1><span data-i18n="report.gun_sonu">Gün Sonu Raporu</span></h2>');
    
    // Fallback bump
    html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=44');
    
    fs.writeFileSync(filePath, html, 'utf8');
}
console.log("Re-patched unhandled broad cases.");
