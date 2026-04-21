const fs = require('fs');
const path = require('path');

const tAdditions = {
    'tr': `        'word.borc': 'Borç',
        'word.alacak': 'Alacak',`,
    'en': `        'word.borc': 'Debt',
        'word.alacak': 'Credit',`,
    'de': `        'word.borc': 'Schuld',
        'word.alacak': 'Haben',`,
    'ru': `        'word.borc': 'Долг',
        'word.alacak': 'Кредит',`,
    'zh': `        'word.borc': '债务',
        'word.alacak': '信用',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Update version in new_account.html to blow cache
let html = fs.readFileSync(path.join(__dirname, 'new_account.html'), 'utf8');
html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=37');
fs.writeFileSync(path.join(__dirname, 'new_account.html'), html, 'utf8');

console.log("Added borc/alacak to translation dictionary.");
