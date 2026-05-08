const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'currency.try': 'TRY - Türk Lirası',
        'currency.usd': 'USD - Amerikan Doları',
        'currency.eur': 'EUR - Euro',
        'currency.gbp': 'GBP - İngiliz Sterlini',`,
    'en': `        'currency.try': 'TRY - Turkish Lira',
        'currency.usd': 'USD - US Dollar',
        'currency.eur': 'EUR - Euro',
        'currency.gbp': 'GBP - British Pound',`,
    'de': `        'currency.try': 'TRY - Türkische Lira',
        'currency.usd': 'USD - US-Dollar',
        'currency.eur': 'EUR - Euro',
        'currency.gbp': 'GBP - Britisches Pfund',`,
    'ru': `        'currency.try': 'TRY - Турецкая лира',
        'currency.usd': 'USD - Доллар США',
        'currency.eur': 'EUR - Евро',
        'currency.gbp': 'GBP - Британский фунт',`,
    'zh': `        'currency.try': 'TRY - 土耳其里拉',
        'currency.usd': 'USD - 美元',
        'currency.eur': 'EUR - 欧元',
        'currency.gbp': 'GBP - 英镑',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'debit_voucher.html'), 'utf8');

const replacements = [
    ['<option value="TRY">TRY - Türk Lirası</option>', '<option value="TRY" data-i18n="currency.try">TRY - Türk Lirası</option>'],
    ['<option value="USD">USD - Amerikan Doları</option>', '<option value="USD" data-i18n="currency.usd">USD - Amerikan Doları</option>'],
    ['<option value="EUR">EUR - Euro</option>', '<option value="EUR" data-i18n="currency.eur">EUR - Euro</option>'],
    ['<option value="GBP">GBP - İngiliz Sterlini</option>', '<option value="GBP" data-i18n="currency.gbp">GBP - İngiliz Sterlini</option>'],
    [/translations\.js\?v=\d+/g, 'translations.js?v=39']
];

for (const [target, replacement] of replacements) {
    if (target instanceof RegExp) {
        html = html.replace(target, replacement);
    } else {
        html = html.split(target).join(replacement);
    }
}

fs.writeFileSync(path.join(__dirname, 'debit_voucher.html'), html, 'utf8');
console.log("Patched currencies.");
