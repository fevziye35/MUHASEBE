const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'doc.debit_voucher': 'Mahsup Fişi',
        'mega.hesap_sec': 'Hesap Seçiniz',
        'mega.debit_account': 'Borç Hesabı',
        'mega.credit_account': 'Alacak Hesabı',
        'mega.belge_no': 'Belge No',
        'mega.doviz_tipi': 'Döviz Tipi',
        'mega.kur': 'Kur',
        'mega.aciklama': 'Açıklama',
        'mega.saved_debit_vouchers': 'Kayıtlı Mahsup Fişleri',`,
    'en': `        'doc.debit_voucher': 'Debit Voucher',
        'mega.hesap_sec': 'Select Account',
        'mega.debit_account': 'Debit Account',
        'mega.credit_account': 'Credit Account',
        'mega.belge_no': 'Document Number',
        'mega.doviz_tipi': 'Currency Type',
        'mega.kur': 'Exchange Rate',
        'mega.aciklama': 'Description',
        'mega.saved_debit_vouchers': 'Saved Debit Vouchers',`,
    'de': `        'doc.debit_voucher': 'Verrechnungsbeleg',
        'mega.hesap_sec': 'Konto auswählen',
        'mega.debit_account': 'Sollkonto',
        'mega.credit_account': 'Habenkonto',
        'mega.belge_no': 'Belegnummer',
        'mega.doviz_tipi': 'Währungstyp',
        'mega.kur': 'Wechselkurs',
        'mega.aciklama': 'Beschreibung',
        'mega.saved_debit_vouchers': 'Gespeicherte Verrechnungsbelege',`,
    'ru': `        'doc.debit_voucher': 'Взаимозачетный ордер',
        'mega.hesap_sec': 'Выберите счет',
        'mega.debit_account': 'Дебетовый счет',
        'mega.credit_account': 'Кредитный счет',
        'mega.belge_no': 'Номер документа',
        'mega.doviz_tipi': 'Тип валюты',
        'mega.kur': 'Обменный курс',
        'mega.aciklama': 'Описание',
        'mega.saved_debit_vouchers': 'Сохраненные взаимозачетные ордера',`,
    'zh': `        'doc.debit_voucher': '转账作废凭证',
        'mega.hesap_sec': '选择账户',
        'mega.debit_account': '借方账户',
        'mega.credit_account': '贷方账户',
        'mega.belge_no': '文件编号',
        'mega.doviz_tipi': '货币类型',
        'mega.kur': '汇率',
        'mega.aciklama': '描述',
        'mega.saved_debit_vouchers': '已保存的转账凭证',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'debit_voucher.html'), 'utf8');

// Patch the HTML
const replacements = [
    ['<h2>Mahsup Fişi</h2>', '<h2><span data-i18n="doc.debit_voucher">Mahsup Fişi</span></h2>'],
    ['<label>Borç Hesabı (Debit Account) *</label>', '<label><span data-i18n="mega.debit_account">Borç Hesabı</span> *</label>'],
    ['<label>Alacak Hesabı (Credit Account) *</label>', '<label><span data-i18n="mega.credit_account">Alacak Hesabı</span> *</label>'],
    ['<option value="">Hesap Seçiniz</option>', '<option value="" data-i18n="mega.hesap_sec">Hesap Seçiniz</option>'],
    ['<label>Tarih (Date) *</label>', '<label><span data-i18n="mega.tarih">Tarih</span> *</label>'],
    ['<label>Belge No (Document Number)</label>', '<label><span data-i18n="mega.belge_no">Belge No</span></label>'],
    ['placeholder="Belge numarası"', 'placeholder="Belge numarası" data-i18n="mega.belge_no"'],
    ['<label>Döviz Tipi (Currency Type)</label>', '<label><span data-i18n="mega.doviz_tipi">Döviz Tipi</span></label>'],
    ['<label>Kur (Exchange Rate)</label>', '<label><span data-i18n="mega.kur">Kur</span></label>'],
    ['<label>Tutar (Amount) *</label>', '<label><span data-i18n="mega.tutar">Tutar</span> *</label>'],
    ['<label>Açıklama (Description)</label>', '<label><span data-i18n="mega.aciklama">Açıklama</span></label>'],
    ['placeholder="Açıklama giriniz"', 'placeholder="Açıklama giriniz" data-i18n="mega.aciklama"'],
    ['<h3>Kayıtlı Mahsup Fişleri</h3>', '<h3><span data-i18n="mega.saved_debit_vouchers">Kayıtlı Mahsup Fişleri</span></h3>'],
    ['<th class="voucher-th">Belge No</th>', '<th class="voucher-th"><span data-i18n="mega.belge_no">Belge No</span></th>'],
    ['<th class="voucher-th">Borç Hesabı</th>', '<th class="voucher-th"><span data-i18n="mega.debit_account">Borç Hesabı</span></th>'],
    ['<th class="voucher-th">Alacak Hesabı\\s*</th>', '<th class="voucher-th"><span data-i18n="mega.credit_account">Alacak Hesabı</span></th>'],
    ['<th class="voucher-th">Tutar</th>', '<th class="voucher-th"><span data-i18n="mega.tutar">Tutar</span></th>'],
    ['<th class="voucher-th">Döviz</th>', '<th class="voucher-th"><span data-i18n="mega.doviz_tipi">Döviz</span></th>'],
    [/translations\.js\?v=\d+/g, 'translations.js?v=38']
];

for (const [target, replacement] of replacements) {
    if (target instanceof RegExp) {
        html = html.replace(target, replacement);
    } else {
        html = html.split(target).join(replacement);
    }
}

fs.writeFileSync(path.join(__dirname, 'debit_voucher.html'), html, 'utf8');
console.log("Successfully patched debit_voucher.html and translations.js");
