const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'stok_kartlari.html'), 'utf8');

let target1 = `<button id="exportExcelBtn" class="btn btn-green"><i class="fa-solid fa-file-excel"></i> Excel'e\n                Aktar</button>`;
let target2 = `<button id="exportExcelBtn" class="btn btn-green"><i class="fa-solid fa-file-excel"></i> Excel'e\r\n                Aktar</button>`;
let repl1 = `<button id="exportExcelBtn" class="btn btn-green"><i class="fa-solid fa-file-excel"></i> <span data-i18n="mega.excel_aktar">Excel'e Aktar</span></button>`;
html = html.replace(target1, repl1).replace(target2, repl1);

let y1 = `<a href="stok_yeni.html" class="btn btn-dark-blue"><i class="fa-solid fa-circle-plus"></i> Yeni Stok\n                (F5)</a>`;
let y2 = `<a href="stok_yeni.html" class="btn btn-dark-blue"><i class="fa-solid fa-circle-plus"></i> Yeni Stok\r\n                (F5)</a>`;
let yr = `<a href="stok_yeni.html" class="btn btn-dark-blue"><i class="fa-solid fa-circle-plus"></i> <span data-i18n="mega.yeni_stok_f5">Yeni Stok (F5)</span></a>`;
html = html.replace(y1, yr).replace(y2, yr);

let p1 = `<a href="stok_paketgrup.html" class="btn btn-dark-blue"><i class="fa-solid fa-boxes-packing"></i> Stok Paket\n                Grupları</a>`;
let p2 = `<a href="stok_paketgrup.html" class="btn btn-dark-blue"><i class="fa-solid fa-boxes-packing"></i> Stok Paket\r\n                Grupları</a>`;
let pr = `<a href="stok_paketgrup.html" class="btn btn-dark-blue"><i class="fa-solid fa-boxes-packing"></i> <span data-i18n="mega.stok_paket_gruplari">Stok Paket Grupları</span></a>`;
html = html.replace(p1, pr).replace(p2, pr);

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=56');

fs.writeFileSync(path.join(__dirname, 'stok_kartlari.html'), html, 'utf8');
console.log('Fixed stragglers with literal matches');
