const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'report.cari_kodu': 'Cari Kodu',
        'report.unvan_ad_soyad': 'Unvan / Ad Soyad',
        'report.borc_bakiye': 'Borç Bakiyesi',
        'report.alacak_bakiye': 'Alacak Bakiyesi',
        'report.no_record': 'Seçilen kriterlere uygun cari hareket bulunamadı.',
        'report.only_buyers': 'Sadece Alıcılar (Müşteri)',
        'report.only_sellers': 'Sadece Satıcılar (Tedarikçi)',`,
    'en': `        'report.cari_kodu': 'Account Code',
        'report.unvan_ad_soyad': 'Title / Full Name',
        'report.borc_bakiye': 'Debit Balance',
        'report.alacak_bakiye': 'Credit Balance',
        'report.no_record': 'No account movements found for the selected criteria.',
        'report.only_buyers': 'Only Buyers (Customers)',
        'report.only_sellers': 'Only Sellers (Suppliers)',`,
    'de': `        'report.cari_kodu': 'Kontocode',
        'report.unvan_ad_soyad': 'Titel / Vollständiger Name',
        'report.borc_bakiye': 'Sollsaldo',
        'report.alacak_bakiye': 'Habensaldo',
        'report.no_record': 'Für die ausgewählten Kriterien wurden keine Kontobewegungen gefunden.',
        'report.only_buyers': 'Nur Käufer (Kunden)',
        'report.only_sellers': 'Nur Verkäufer (Lieferanten)',`,
    'ru': `        'report.cari_kodu': 'Код счета',
        'report.unvan_ad_soyad': 'Название / ФИО',
        'report.borc_bakiye': 'Дебетовый остаток',
        'report.alacak_bakiye': 'Кредитовый остаток',
        'report.no_record': 'По выбранным критериям движения по счету не найдены.',
        'report.only_buyers': 'Только покупатели (клиенты)',
        'report.only_sellers': 'Только продавцы (поставщики)',`,
    'zh': `        'report.cari_kodu': '账户代码',
        'report.unvan_ad_soyad': '名称/全名',
        'report.borc_bakiye': '借方余额',
        'report.alacak_bakiye': '贷方余额',
        'report.no_record': '未找到符合所选条件的账户活动。',
        'report.only_buyers': '仅买家（客户）',
        'report.only_sellers': '仅卖家（供应商）',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    if (!js.includes("'report.cari_kodu'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    }
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'cari_raporu.html'), 'utf8');

const replacements = [
    ['<th>Unvan / Ad Soyad</th>', '<th><span data-i18n="report.unvan_ad_soyad">Unvan / Ad Soyad</span></th>'],
    ['<th class="p-15" style="border-radius: 8px 0 0 0;">Cari Kodu</th>', '<th class="p-15" style="border-radius: 8px 0 0 0;"><span data-i18n="report.cari_kodu">Cari Kodu</span></th>'],
    ['<th>Cari Tipi</th>', '<th><span data-i18n="report.cari_tipi">Cari Tipi</span></th>'],
    ['<th>Borç Bakiyesi</th>', '<th><span data-i18n="report.borc_bakiye">Borç Bakiyesi</span></th>'],
    ['<th style="border-radius: 0 8px 0 0;">Alacak Bakiyesi</th>', '<th style="border-radius: 0 8px 0 0;"><span data-i18n="report.alacak_bakiye">Alacak Bakiyesi</span></th>'],
    ['Seçilen kriterlere uygun cari hareket bulunamadı.', '<span data-i18n="report.no_record">Seçilen kriterlere uygun cari hareket bulunamadı.</span>'],
    ['<option value="alici">Sadece Alıcılar (Müşteri)</option>', '<option value="alici" data-i18n="report.only_buyers">Sadece Alıcılar (Müşteri)</option>'],
    ['<option value="satici">Sadece Satıcılar (Tedarikçi)</option>', '<option value="satici" data-i18n="report.only_sellers">Sadece Satıcılar (Tedarikçi)</option>'],
    [/translations\.js\?v=\d+/g, 'translations.js?v=47']
];

for (const [target, replacement] of replacements) {
    if (target instanceof RegExp) {
        html = html.replace(target, replacement);
    } else {
        html = html.split(target).join(replacement);
    }
}

fs.writeFileSync(path.join(__dirname, 'cari_raporu.html'), html, 'utf8');
console.log("Patched cari_raporu.html translations successfully");
