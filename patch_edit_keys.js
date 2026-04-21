const fs = require('fs');
const path = require('path');

const tAdditions = {
    'tr': `        'contact.edit_customer': 'MÜŞTERİ DÜZENLEME',
        'contact.customer_details': 'Müşteri Bilgileri',`,
    'en': `        'contact.edit_customer': 'EDIT CUSTOMER',
        'contact.customer_details': 'Customer Details',`,
    'de': `        'contact.edit_customer': 'KUNDE BEARBEITEN',
        'contact.customer_details': 'Kundendetails',`,
    'ru': `        'contact.edit_customer': 'РЕДАКТИРОВАТЬ КЛИЕНТА',
        'contact.customer_details': 'Данные Клиента',`,
    'zh': `        'contact.edit_customer': '编辑客户',
        'contact.customer_details': '客户详情',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Update version in new_account.html to blow cache
let html = fs.readFileSync(path.join(__dirname, 'new_account.html'), 'utf8');
html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=36');
fs.writeFileSync(path.join(__dirname, 'new_account.html'), html, 'utf8');

console.log("Added edit customer keys to translation dictionary.");
