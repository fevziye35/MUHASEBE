const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'e_irsaliye.html');
let html = fs.readFileSync(filePath, 'utf8');

// Fix multi-line 'Gönderici Bilgileri'
html = html.replace(/Gönderici\s+Bilgileri/g, '<span data-i18n="mega.gonderici_bilgileri">Gönderici Bilgileri</span>');

// Fix Table Headers (Title Case in HTML)
html = html.replace(/>\s*Ürün Adı\/Kodu\s*</g, '><span data-i18n="mega.urun_adi_kodu">Ürün Adı/Kodu</span><');
html = html.replace(/>\s*Miktar\s*</g, '><span data-i18n="mega.miktar">Miktar</span><');
html = html.replace(/>\s*Birim\s*</g, '><span data-i18n="mega.birim">Birim</span><');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=11');
fs.writeFileSync(filePath, html, 'utf8');

console.log('Fixed CSS-uppercase text inconsistencies and multi-line text.');
