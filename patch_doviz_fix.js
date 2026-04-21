const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'doviz_ayarlari.html'), 'utf8');

// Fix headers
html = html.replace(/>Döviz Türü<\/th>/g, '><span data-i18n="word.doviz_turu">Döviz Türü</span></th>');
html = html.replace(/>Alış Kuru<\/th>/g, '><span data-i18n="word.alis_kuru">Alış Kuru</span></th>');
html = html.replace(/>Satış Kuru<\/th>/g, '><span data-i18n="word.satis_kuru">Satış Kuru</span></th>');

// Fix "Son Güncelleme: -" with the styling preserved
html = html.replace(/>Son Güncelleme:(\s*)-<\/span>/g, '><span data-i18n="word.son_guncelleme">Son Güncelleme:</span>$1-</span>');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=26');

fs.writeFileSync(path.join(__dirname, 'doviz_ayarlari.html'), html, 'utf8');

console.log('Fixed doviz_ayarlari styles mismatch!');
