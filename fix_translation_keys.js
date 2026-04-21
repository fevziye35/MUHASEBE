const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const locales = ['en', 'de', 'ru', 'zh'];

const fixes = {
    'en': `        'mega.cari_islem_filter': 'Customer Transaction Filter',
        'mega.babs_filter': 'BA/BS Report Filter',`,
    'de': `        'mega.cari_islem_filter': 'Kundentransaktionsfilter',
        'mega.babs_filter': 'BA/BS-Berichtsfilter',`,
    'ru': `        'mega.cari_islem_filter': 'Фильтр транзакций клиента',
        'mega.babs_filter': 'Фильтр отчета BA/BS',`,
    'zh': `        'mega.cari_islem_filter': '客户交易过滤',
        'mega.babs_filter': 'BA/BS报告过滤',`
};

for (const lang of locales) {
    if (!js.includes(fixes[lang])) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + fixes[lang]);
    }
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

console.log("Fixed missing filter keys in translations.js");
