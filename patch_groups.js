const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'mega.account_groups': 'Cari Grupları',
        'mega.new_group_name': 'Yeni grup adı',
        'mega.add_group': 'Grup Ekle',
        'mega.account_count': 'Cari Sayısı',
        'group.musteriler': 'MÜŞTERİLER',
        'group.toptancilar': 'TOPTANCILAR',
        'group.tedarikciler': 'TEDARİKÇİLER',`,
    'en': `        'mega.account_groups': 'Account Groups',
        'mega.new_group_name': 'New group name',
        'mega.add_group': 'Add Group',
        'mega.account_count': 'Account Count',
        'group.musteriler': 'CUSTOMERS',
        'group.toptancilar': 'WHOLESALERS',
        'group.tedarikciler': 'SUPPLIERS',`,
    'de': `        'mega.account_groups': 'Kontengruppen',
        'mega.new_group_name': 'Neuer Gruppenname',
        'mega.add_group': 'Gruppe hinzufügen',
        'mega.account_count': 'Anzahl Konten',
        'group.musteriler': 'KUNDEN',
        'group.toptancilar': 'GROSSHÄNDLER',
        'group.tedarikciler': 'LIEFERANTEN',`,
    'ru': `        'mega.account_groups': 'Группы счетов',
        'mega.new_group_name': 'Название новой группы',
        'mega.add_group': 'Добавить группу',
        'mega.account_count': 'Количество счетов',
        'group.musteriler': 'КЛИЕНТЫ',
        'group.toptancilar': 'ОПТОВИКИ',
        'group.tedarikciler': 'ПОСТАВЩИКИ',`,
    'zh': `        'mega.account_groups': '账户组',
        'mega.new_group_name': '新组名称',
        'mega.add_group': '添加组',
        'mega.account_count': '账户数量',
        'group.musteriler': '客户',
        'group.toptancilar': '批发商',
        'group.tedarikciler': '供应商',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'groups.html'), 'utf8');

const replacements = [
    ['<h2>Cari Grupları</h2>', '<h2><span data-i18n="mega.account_groups">Cari Grupları</span></h2>'],
    ['placeholder="Yeni grup adı"', 'placeholder="Yeni grup adı" data-i18n="mega.new_group_name"'],
    ['Grup Ekle</button>', '<span data-i18n="mega.add_group">Grup Ekle</span></button>'],
    ['<th>Grup Adı</th>', '<th><span data-i18n="word.grup">Grup Adı</span></th>'],
    ['<th>Cari Sayısı</th>', '<th><span data-i18n="mega.account_count">Cari Sayısı</span></th>'],
    ["<td>${group.name}</td>", "<td>${localize('group.' + group.name.toLowerCase().replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ı/g, 'i'), group.name)}</td>"],
    [/translations\\.js\\?v=\\d+/g, 'translations.js?v=41']
];

for (const [target, replacement] of replacements) {
    if (target instanceof RegExp) {
        html = html.replace(target, replacement);
    } else {
        html = html.split(target).join(replacement);
    }
}

fs.writeFileSync(path.join(__dirname, 'groups.html'), html, 'utf8');
console.log("Patched groups.html successfully");
