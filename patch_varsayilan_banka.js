const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const dict = {
    'Varsayılan Banka - -': 'word.varsayilan_banka_tire',
    'Varsayılan Banka': 'word.varsayilan_banka',
    'Ara': 'word.ara_btn'
};

const tAdditions = {
    'tr': `        'word.varsayilan_banka_tire': 'Varsayılan Banka - -',
        'word.varsayilan_banka': 'Varsayılan Banka',
        'word.ara_btn': 'Ara',`,
    'en': `        'word.varsayilan_banka_tire': 'Default Bank - -',
        'word.varsayilan_banka': 'Default Bank',
        'word.ara_btn': 'Search',`,
    'de': `        'word.varsayilan_banka_tire': 'Standardbank - -',
        'word.varsayilan_banka': 'Standardbank',
        'word.ara_btn': 'Suchen',`,
    'ru': `        'word.varsayilan_banka_tire': 'Банк по умолчанию - -',
        'word.varsayilan_banka': 'Банк по умолчанию',
        'word.ara_btn': 'Поиск',`,
    'zh': `        'word.varsayilan_banka_tire': '默认银行 - -',
        'word.varsayilan_banka': '默认银行',
        'word.ara_btn': '搜索',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'banka_ozet.html'), 'utf8');

html = html.replace(/>Varsayılan Banka\s*-\s*-</g, '><span data-i18n="word.varsayilan_banka_tire">Varsayılan Banka - -</span><');
html = html.replace(/<td>Varsayılan Banka - -<\/td>/g, '<td><span data-i18n="word.varsayilan_banka_tire">Varsayılan Banka - -</span></td>');
html = html.replace(/>Varsayılan Banka</g, '><span data-i18n="word.varsayilan_banka">Varsayılan Banka</span><');
html = html.replace(/<option value="varsayilan">Varsayılan Banka<\/option>/g, '<option value="varsayilan" data-i18n="word.varsayilan_banka">Varsayılan Banka</option>');

html = html.replace(/>\s*Ara\s*<\/button>/g, '><span data-i18n="word.ara_btn">Ara</span></button>');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=22');

fs.writeFileSync(path.join(__dirname, 'banka_ozet.html'), html, 'utf8');

console.log('Patched Varsayılan Banka in banka_ozet.html');
