const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'stok_kartlari.html'), 'utf8');

// Replace multiline "Yeni Stok\n(F5)"
html = html.replace(/Yeni Stok\s*\(F5\)/g, '<span data-i18n="mega.yeni_stok_f5">Yeni Stok (F5)</span>');

// Replace multiline "Stok Paket\nGrupları"
html = html.replace(/Stok Paket\s*Grupları/g, '<span data-i18n="mega.stok_paket_gruplari">Stok Paket Grupları</span>');

// Replace multiline "Excel'e\nAktar"
html = html.replace(/Excel'e\\s*Aktar/g, "<span data-i18n='mega.excel_aktar'>Excel'e Aktar</span>");

// Bump version safely to v=53
html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=53');

fs.writeFileSync(path.join(__dirname, 'stok_kartlari.html'), html, 'utf8');
console.log("Stragglers regex replaced");
