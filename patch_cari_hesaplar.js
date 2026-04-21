const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'mega.cari_ekstre': 'Cari Ekstre',
        'mega.cari_islem_raporu': 'Cari İşlem Raporu',
        'mega.cari_rapor': 'Cari Rapor',
        'mega.babs_raporu': 'BA/BS Raporu',
        'mega.customer_list': 'Cari Hesap Listesi',
        'mega.all': 'Hepsi',
        'mega.aksiyonlar': 'Aksiyonlar',`,
    'en': `        'mega.cari_ekstre': 'Customer Statement',
        'mega.cari_islem_raporu': 'Customer Transaction Report',
        'mega.cari_rapor': 'Customer Report',
        'mega.babs_raporu': 'BA/BS Report',
        'mega.customer_list': 'Customer List',
        'mega.all': 'All',
        'mega.aksiyonlar': 'Actions',`,
    'de': `        'mega.cari_ekstre': 'Kontoauszug',
        'mega.cari_islem_raporu': 'Kundentransaktionsbericht',
        'mega.cari_rapor': 'Kundenbericht',
        'mega.babs_raporu': 'BA/BS-Bericht',
        'mega.customer_list': 'Kundenliste',
        'mega.all': 'Alle',
        'mega.aksiyonlar': 'Aktionen',`,
    'ru': `        'mega.cari_ekstre': 'Выписка по счету',
        'mega.cari_islem_raporu': 'Отчет о транзакциях клиента',
        'mega.cari_rapor': 'Отчет по клиенту',
        'mega.babs_raporu': 'Отчет BA/BS',
        'mega.customer_list': 'Список клиентов',
        'mega.all': 'Все',
        'mega.aksiyonlar': 'Действия',`,
    'zh': `        'mega.cari_ekstre': '客户对账单',
        'mega.cari_islem_raporu': '客户交易报告',
        'mega.cari_rapor': '客户报告',
        'mega.babs_raporu': 'BA/BS报告',
        'mega.customer_list': '客户列表',
        'mega.all': '全部',
        'mega.aksiyonlar': '操作',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'cari_hesaplar.html'), 'utf8');

const replacements = [
    ['<h2>Cari Hesaplar</h2>', '<h2><span data-i18n="sidebar.customers">Cari Hesaplar</span></h2>'],
    ['<i class="fa-solid fa-user-plus"></i> Yeni Cari</a>', '<i class="fa-solid fa-user-plus"></i> <span data-i18n="satis.new_customer">Yeni Cari</span></a>'],
    ['<i class="fa-solid fa-file-invoice"></i> Mahsup Fişi</a>', '<i class="fa-solid fa-file-invoice"></i> <span data-i18n="doc.debit_voucher">Mahsup Fişi</span></a>'],
    ['Cari Ekstre</a>', '<span data-i18n="mega.cari_ekstre">Cari Ekstre</span></a>'],
    ['Cari &#304;&#351;lem Raporu</a>', '<span data-i18n="mega.cari_islem_raporu">Cari İşlem Raporu</span></a>'],
    ['Cari Rapor</a>', '<span data-i18n="mega.cari_rapor">Cari Rapor</span></a>'],
    ['BA/BS Raporu</a>', '<span data-i18n="mega.babs_raporu">BA/BS Raporu</span></a>'],
    ['Cari Hesap Listesi', '<span data-i18n="mega.customer_list">Cari Hesap Listesi</span>'],
    ['<option value="">Hepsi</option>', '<option value="" data-i18n="mega.all">Hepsi</option>'],
    ['<button id="searchBtn" class="btn btn-dark-blue">Ara</button>', '<button id="searchBtn" class="btn btn-dark-blue"><span data-i18n="dashboard.search">Ara</span></button>'],
    ['<th style="width: 40%;">Cari Adı</th>', '<th style="width: 40%;"><span data-i18n="word.cari_adi">Cari Adı</span></th>'],
    ['<th style="width: 20%;">Grup</th>', '<th style="width: 20%;"><span data-i18n="word.grup">Grup</span></th>'],
    ['<th style="width: 20%;">Bakiye</th>', '<th style="width: 20%;"><span data-i18n="word.bakiye">Bakiye</span></th>'],
    ['<th style="width: 20%; text-align: center;">Aksiyonlar</th>', '<th style="width: 20%; text-align: center;"><span data-i18n="mega.aksiyonlar">Aksiyonlar</span></th>'],
    ["${c.cariGrubu || 'Müşteri'}", "${c.cariGrubu || localize('contact.customers', 'Müşteri')}"],
    [/translations\\.js\\?v=\\d+/g, 'translations.js?v=40']
];

for (const [target, replacement] of replacements) {
    if (target instanceof RegExp) {
        html = html.replace(target, replacement);
    } else {
        html = html.split(target).join(replacement);
    }
}

fs.writeFileSync(path.join(__dirname, 'cari_hesaplar.html'), html, 'utf8');
console.log("Patched cari_hesaplar.html successfully");
