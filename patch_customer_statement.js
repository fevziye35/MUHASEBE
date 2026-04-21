const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'mega.cari_ekstre_filter': 'Cari Ekstre Filtresi',
        'mega.all_time': 'Tüm Zamanlar',
        'mega.start_date': 'Başlangıç Tarihi',
        'mega.end_date': 'Bitiş Tarihi',
        'mega.evrak_turu': 'Evrak Türü',
        'mega.evrak_no': 'Evrak No',
        'mega.devir': 'Devir',
        'mega.total': 'TOPLAM:',`,
    'en': `        'mega.cari_ekstre_filter': 'Customer Statement Filter',
        'mega.all_time': 'All Time',
        'mega.start_date': 'Start Date',
        'mega.end_date': 'End Date',
        'mega.evrak_turu': 'Document Type',
        'mega.evrak_no': 'Document No',
        'mega.devir': 'Transfer',
        'mega.total': 'TOTAL:',`,
    'de': `        'mega.cari_ekstre_filter': 'Kundenkontoauszug Filter',
        'mega.all_time': 'Gesamte Zeit',
        'mega.start_date': 'Startdatum',
        'mega.end_date': 'Enddatum',
        'mega.evrak_turu': 'Dokumententyp',
        'mega.evrak_no': 'Dokumentennr',
        'mega.devir': 'Übertrag',
        'mega.total': 'GESAMT:',`,
    'ru': `        'mega.cari_ekstre_filter': 'Фильтр выписки клиента',
        'mega.all_time': 'За все время',
        'mega.start_date': 'Дата начала',
        'mega.end_date': 'Дата окончания',
        'mega.evrak_turu': 'Тип документа',
        'mega.evrak_no': 'Номер документа',
        'mega.devir': 'Перенос',
        'mega.total': 'ИТОГО:',`,
    'zh': `        'mega.cari_ekstre_filter': '客户对账单过滤',
        'mega.all_time': '所有时间',
        'mega.start_date': '开始日期',
        'mega.end_date': '结束日期',
        'mega.evrak_turu': '文件类型',
        'mega.evrak_no': '文件编号',
        'mega.devir': '转移',
        'mega.total': '总计:',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'customer_statement.html'), 'utf8');

const replacements = [
    ['<h2 class="page-title">Cari Ekstre</h2>', '<h2 class="page-title"><span data-i18n="mega.cari_ekstre">Cari Ekstre</span></h2>'],
    ['Cari Ekstre Filteri', '<span data-i18n="mega.cari_ekstre_filter">Cari Ekstre Filtresi</span>'],
    ['Tüm Zamanlar', '<span data-i18n="mega.all_time">Tüm Zamanlar</span>'],
    ['<label class="input-label">Başlangıç Tarihi</label>', '<label class="input-label"><span data-i18n="mega.start_date">Başlangıç Tarihi</span></label>'],
    ['<label class="input-label">Bitiş Tarihi</label>', '<label class="input-label"><span data-i18n="mega.end_date">Bitiş Tarihi</span></label>'],
    ['<i class="fa-solid fa-bars"></i> Cari Ekstre', '<i class="fa-solid fa-bars"></i> <span data-i18n="mega.cari_ekstre">Cari Ekstre</span>'],
    ['<th>Evrak Türü</th>', '<th><span data-i18n="mega.evrak_turu">Evrak Türü</span></th>'],
    ['<th>Evrak No</th>', '<th><span data-i18n="mega.evrak_no">Evrak No</span></th>'],
    ['<th class="text-right">Borç</th>', '<th class="text-right"><span data-i18n="word.borc">Borç</span></th>'],
    ['<th class="text-right">Alacak</th>', '<th class="text-right"><span data-i18n="word.alacak">Alacak</span></th>'],
    ['<th class="text-right">Bakiye</th>', '<th class="text-right"><span data-i18n="word.bakiye">Bakiye</span></th>'],
    ['<td>Devir</td>', '<td><span data-i18n="mega.devir">Devir</span></td>'],
    ['<td>Açılış Bakiyesi</td>', '<td><span data-i18n="contact.opening_balance">Açılış Bakiyesi</span></td>'],
    ['<td colspan="4" class="text-right">TOPLAM:</td>', '<td colspan="4" class="text-right"><span data-i18n="mega.total">TOPLAM:</span></td>'],
    [/translations\.js\?v=\d+/g, 'translations.js?v=42']
];

for (const [target, replacement] of replacements) {
    if (target instanceof RegExp) {
        html = html.replace(target, replacement);
    } else {
        html = html.split(target).join(replacement);
    }
}

fs.writeFileSync(path.join(__dirname, 'customer_statement.html'), html, 'utf8');
console.log("Patched customer_statement.html successfully");
