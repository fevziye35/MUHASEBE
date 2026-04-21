const fs = require('fs');
const path = require('path');

const eFaturaFile = path.join(__dirname, 'efatura.html');
const transFile = path.join(__dirname, 'translations.js');

let html = fs.existsSync(eFaturaFile) ? fs.readFileSync(eFaturaFile, 'utf8') : '';

const replacements = [
    { turkish: 'E-Fatura Merkezi', key: 'word.efatura_merkezi' },
    { turkish: 'E-Fatura Sistemi Bağlantısı', key: 'word.efatura_sistemi_baglantisi' },
    { turkish: 'Luca E-Fatura Sistemine Geçiş Yapın', key: 'word.luca_gecis' },
    { turkish: 'E-Fatura portalına güvenli bir şekilde bağlanmak için aşağıdaki butona tıklayınız.', key: 'word.efatura_desc_1' },
    { turkish: 'Sistem sizi doğrudan resmi Luca E-Fatura platformuna yönlendirecektir.', key: 'word.efatura_desc_2' },
    { turkish: "Luca E-Fatura'ya Bağlan", key: 'word.luca_baglan' }
];

let changed = false;
if (html) {
    replacements.forEach(itm => {
        const safeWord = itm.turkish.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match explicit content
        const rx = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
        if (rx.test(html)) {
            html = html.replace(rx, (m, p1, p2, p3, p4, p5) => {
                return p1 + p2 + '<span data-i18n="' + itm.key + '">' + p3 + '</span>' + p4 + p5;
            });
            changed = true;
        }
    });

    if (changed) {
        // Cache bust
        html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=8');
        if(html.includes('translations.js') && !html.includes('translations.js?v=8')){
            html = html.replace('translations.js', 'translations.js?v=8');
        }
        fs.writeFileSync(eFaturaFile, html, 'utf8');
    }
}

// Update translations.js
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'word.efatura_merkezi': 'E-Fatura Merkezi',
        'word.efatura_sistemi_baglantisi': 'E-Fatura Sistemi Bağlantısı',
        'word.luca_gecis': 'Luca E-Fatura Sistemine Geçiş Yapın',
        'word.efatura_desc_1': 'E-Fatura portalına güvenli bir şekilde bağlanmak için aşağıdaki butona tıklayınız.',
        'word.efatura_desc_2': 'Sistem sizi doğrudan resmi Luca E-Fatura platformuna yönlendirecektir.',
        'word.luca_baglan': 'Luca E-Fatura\\'ya Bağlan',`,
    'en': `        'word.efatura_merkezi': 'E-Invoice Center',
        'word.efatura_sistemi_baglantisi': 'E-Invoice System Connection',
        'word.luca_gecis': 'Switch to Luca E-Invoice System',
        'word.efatura_desc_1': 'Click the button below to securely connect to the e-invoice portal.',
        'word.efatura_desc_2': 'The system will redirect you directly to the official Luca E-Invoice platform.',
        'word.luca_baglan': 'Connect to Luca E-Invoice',`,
    'de': `        'word.efatura_merkezi': 'E-Rechnungszentrum',
        'word.efatura_sistemi_baglantisi': 'E-Rechnungssystem-Verbindung',
        'word.luca_gecis': 'Wechseln Sie zum Luca E-Rechnungssystem',
        'word.efatura_desc_1': 'Klicken Sie auf die Schaltfläche unten, um sich sicher mit dem E-Rechnungsportal zu verbinden.',
        'word.efatura_desc_2': 'Das System leitet Sie direkt zur offiziellen Luca E-Rechnungsplattform weiter.',
        'word.luca_baglan': 'Mit Luca E-Rechnung verbinden',`,
    'ru': `        'word.efatura_merkezi': 'Центр Эл-Счетов',
        'word.efatura_sistemi_baglantisi': 'Подключение к системе Эл-счетов',
        'word.luca_gecis': 'Перейти в систему Luca E-Invoice',
        'word.efatura_desc_1': 'Нажмите кнопку ниже, чтобы безопасно подключиться к порталу эл. счетов.',
        'word.efatura_desc_2': 'Система напрямую перенаправит вас на официальную платформу Luca E-Invoice.',
        'word.luca_baglan': 'Подключиться к Luca',`,
    'zh': `        'word.efatura_merkezi': '电子发票中心',
        'word.efatura_sistemi_baglantisi': '电子发票系统连接',
        'word.luca_gecis': '切换至 Luca 电子发票系统',
        'word.efatura_desc_1': '点击下方的按钮以安全地连接到电子发票门户。',
        'word.efatura_desc_2': '系统将直接带您进入官方的 Luca 电子发票平台。',
        'word.luca_baglan': '连接到 Luca 电子发票',`
};

if (changed) {
    for (const [lang, extra] of Object.entries(tAdditions)) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    }
    fs.writeFileSync(transFile, js, 'utf8');
    console.log('Successfully patched efatura.html and translations.js');
} else {
    console.log('No matches found to patch in efatura.html');
}
