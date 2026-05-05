const fs = require('fs');
const path = require('path');
const indexFile = path.join(__dirname, 'dist', 'index.html');
const transFile = path.join(__dirname, 'dist', 'total_i18n.js');

if (!fs.existsSync(indexFile)) { console.log('Hata: index.html bulunamadý!'); process.exit(1); }
let html = fs.readFileSync(indexFile, 'utf8');
html = html.replace('Hýzlý Ýstatistikler', '<span data-i18n="dashboard.quick_stats">Hýzlý Ýstatistikler</span>');
html = html.replace('Hýzlý Eriþim', '<span data-i18n="dashboard.quick_access">Hýzlý Eriþim</span>');
fs.writeFileSync(indexFile, html, 'utf8');

let js = fs.readFileSync(transFile, 'utf8');
const additions = {
    'tr': \"'dashboard.quick_stats': 'Hýzlý Ýstatistikler', 'dashboard.quick_access': 'Hýzlý Eriþim',\",
    'en': \"'dashboard.quick_stats': 'Quick Statistics', 'dashboard.quick_access': 'Quick Access',\",
    'de': \"'dashboard.quick_stats': 'Schnellstatistik', 'dashboard.quick_access': 'Schnellzugriff',\",
    'ru': \"'dashboard.quick_stats': '??????? ??????????', 'dashboard.quick_access': '??????? ??????',\",
    'zh': \"'dashboard.quick_stats': '????', 'dashboard.quick_access': '????',\"
};
for (const [lang, extraKeys] of Object.entries(additions)) {
    const regex = new RegExp(\"('\" + lang + \"'\\\\s*:\\\\s*\\\\{)\");
    js = js.replace(regex, \"\\n\" + extraKeys);
}
fs.writeFileSync(transFile, js, 'utf8');
console.log('Eksik diller baþarýyla eklendi!');
