const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
const transFile = path.join(__dirname, 'translations.js');

let html = fs.readFileSync(indexFile, 'utf8');

// Injecting data-i18n into index.html
html = html.replace('<h1 id="welcomeGreeting">Ho&#351; Geldiniz!</h1>', '<h1 id="welcomeGreeting" data-i18n="dashboard.welcome">Ho&#351; Geldiniz!</h1>');
html = html.replace('Hızlı İstatistikler', '<span data-i18n="dashboard.quick_stats">Hızlı İstatistikler</span>');
html = html.replace('Hızlı Erişim', '<span data-i18n="dashboard.quick_access">Hızlı Erişim</span>');
html = html.replace('Aylık Grafikler', '<span data-i18n="dashboard.monthly_charts">Aylık Grafikler</span>');
html = html.replace('Bakiye Durumu', '<span data-i18n="dashboard.balance_status">Bakiye Durumu</span>');
html = html.replace('<th>BANKA HESAP</th>', '<th data-i18n="dashboard.bank_account_th">BANKA HESAP</th>');
html = html.replace('<th>HESAP NO</th>', '<th data-i18n="dashboard.account_no_th">HESAP NO</th>');
html = html.replace('<th>BAKİYE</th>', '<th data-i18n="dashboard.balance_th">BAKİYE</th>');

fs.writeFileSync(indexFile, html, 'utf8');

// Now add the new keys to translations.js
let js = fs.readFileSync(transFile, 'utf8');

const additions = {
    'tr': `        'dashboard.welcome': 'Hoş Geldiniz!',
        'dashboard.quick_stats': 'Hızlı İstatistikler',
        'dashboard.quick_access': 'Hızlı Erişim',
        'dashboard.monthly_charts': 'Aylık Grafikler',
        'dashboard.balance_status': 'Bakiye Durumu',
        'dashboard.bank_account_th': 'BANKA HESAP',
        'dashboard.account_no_th': 'HESAP NO',
        'dashboard.balance_th': 'BAKİYE',`,
    'en': `        'dashboard.welcome': 'Welcome!',
        'dashboard.quick_stats': 'Quick Statistics',
        'dashboard.quick_access': 'Quick Access',
        'dashboard.monthly_charts': 'Monthly Charts',
        'dashboard.balance_status': 'Balance Status',
        'dashboard.bank_account_th': 'BANK ACCOUNT',
        'dashboard.account_no_th': 'ACCOUNT NO',
        'dashboard.balance_th': 'BALANCE',`,
    'de': `        'dashboard.welcome': 'Willkommen!',
        'dashboard.quick_stats': 'Schnellstatistik',
        'dashboard.quick_access': 'Schnellzugriff',
        'dashboard.monthly_charts': 'Monatliche Diagramme',
        'dashboard.balance_status': 'Kontostand',
        'dashboard.bank_account_th': 'BANKKONTO',
        'dashboard.account_no_th': 'KONTO-NR',
        'dashboard.balance_th': 'SALDO',`,
    'ru': `        'dashboard.welcome': 'Добро пожаловать!',
        'dashboard.quick_stats': 'Быстрая статистика',
        'dashboard.quick_access': 'Быстрый доступ',
        'dashboard.monthly_charts': 'Месячные графики',
        'dashboard.balance_status': 'Статус баланса',
        'dashboard.bank_account_th': 'БАНКОВСКИЙ СЧЕТ',
        'dashboard.account_no_th': 'НОМЕР СЧЕТА',
        'dashboard.balance_th': 'БАЛАНС',`,
    'zh': `        'dashboard.welcome': '欢迎！',
        'dashboard.quick_stats': '快速统计',
        'dashboard.quick_access': '快速访问',
        'dashboard.monthly_charts': '月度图表',
        'dashboard.balance_status': '余额状态',
        'dashboard.bank_account_th': '银行账户',
        'dashboard.account_no_th': '账号',
        'dashboard.balance_th': '余额',`
};

// We will inject these keys at the start of each language block
for (const [lang, extraKeys] of Object.entries(additions)) {
    const regex = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(regex, "$1\n" + extraKeys);
}

fs.writeFileSync(transFile, js, 'utf8');

console.log('Successfully added missing i18n tags for core dashboard headers and tables.');
