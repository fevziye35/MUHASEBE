const fs = require('fs');
const path = require('path');

const tAdditions = {
    'tr': `        'word.varsayilan_banka': 'Varsayılan Banka',
        'word.banka_isim': 'Banka',
        'word.merkez_kasa': 'Merkez Kasa',
        'word.kasa_isim': 'Kasa',
        'dashboard.bank_balances': 'Banka Bakiyeleri',
        'dashboard.cash_balances': 'Kasa Bakiyeleri',
        'dashboard.bank_account': 'Banka Hesap',
        'dashboard.account_no': 'Hesap No',
        'dashboard.cash': 'Kasa',
        'dashboard.balance': 'Bakiye',`,
    'en': `        'word.varsayilan_banka': 'Default Bank',
        'word.banka_isim': 'Bank',
        'word.merkez_kasa': 'Main Cash Register',
        'word.kasa_isim': 'Register',
        'dashboard.bank_balances': 'Bank Balances',
        'dashboard.cash_balances': 'Cash Balances',
        'dashboard.bank_account': 'Bank Account',
        'dashboard.account_no': 'Account No',
        'dashboard.cash': 'Cash',
        'dashboard.balance': 'Balance',`,
    'de': `        'word.varsayilan_banka': 'Standardbank',
        'word.banka_isim': 'Bank',
        'word.merkez_kasa': 'Hauptkasse',
        'word.kasa_isim': 'Kasse',
        'dashboard.bank_balances': 'Bankguthaben',
        'dashboard.cash_balances': 'Kassenbestand',
        'dashboard.bank_account': 'Bankkonto',
        'dashboard.account_no': 'Kontonummer',
        'dashboard.cash': 'Kasse',
        'dashboard.balance': 'Guthaben',`,
    'ru': `        'word.varsayilan_banka': 'Банк по Умолчанию',
        'word.banka_isim': 'Банк',
        'word.merkez_kasa': 'Главная Касса',
        'word.kasa_isim': 'Касса',
        'dashboard.bank_balances': 'Баланс Банков',
        'dashboard.cash_balances': 'Баланс Касс',
        'dashboard.bank_account': 'Банковский Счет',
        'dashboard.account_no': 'Номер Счета',
        'dashboard.cash': 'Касса',
        'dashboard.balance': 'Баланс',`,
    'zh': `        'word.varsayilan_banka': '默认银行',
        'word.banka_isim': '银行',
        'word.merkez_kasa': '主收银台',
        'word.kasa_isim': '收银机',
        'dashboard.bank_balances': '银行余额',
        'dashboard.cash_balances': '现金余额',
        'dashboard.bank_account': '银行账户',
        'dashboard.account_no': '账号',
        'dashboard.cash': '现金',
        'dashboard.balance': '余额',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Update version in index.html to blow cache
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=34');
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');

console.log("Added balance section keys to translation dictionary.");
