const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dict = {
    'E-İrsaliye Oluşturma': 'mega.e_irsaliye_create',
    'Gönderici Bilgileri': 'mega.gonderici_bilgileri',
    'Alıcı Bilgileri': 'mega.alici_bilgileri',
    'Vergi No': 'mega.vergi_no',
    'Firma Adı': 'mega.firma_adi',
    'Adres': 'mega.adres',
    'Şube': 'mega.sube',
    'ÜRÜN ADI/KODU': 'mega.urun_adi_kodu',
    'MİKTAR': 'mega.miktar',
    'BİRİM': 'mega.birim',
    'İrsaliye Bilgileri': 'mega.irsaliye_bilgileri',
    'İrsaliye No': 'mega.irsaliye_no',
    'T.C. Kimlik No': 'mega.tc_kimlik',
    'İl': 'mega.il',
    'İlçe': 'mega.ilce',
    'Telefon': 'mega.telefon',
    'E-Posta': 'mega.eposta',
    'Kaydet': 'mega.kaydet',
    'İptal': 'mega.iptal',
    'Düzenle': 'mega.duzenle',
    'Güncelle': 'mega.guncelle',
    'KDV': 'mega.kdv',
    'KDV TUTARI': 'mega.kdv_tutari',
    'TUTAR': 'mega.tutar',
    'TOPLAM': 'mega.toplam',
    'GENEL TOPLAM': 'mega.genel_toplam',
    'Fatura Bilgileri': 'mega.fatura_bilgileri',
    'Cari Bilgileri': 'mega.cari_bilgileri',
    'Ödeme Bilgileri': 'mega.odeme_bilgileri',
    'Tarih': 'mega.tarih',
    'Saat': 'mega.saat',
    'Açıklama': 'mega.aciklama',
    'BİRİM FİYATI': 'mega.birim_fiyati',
    'BİRİM FİYAT': 'mega.birim_fiyat',
    'İNDİRİM': 'mega.indirim',
    'TOPLAM TUTAR': 'mega.toplam_tutar'
};

let filesUpdated = 0;

files.forEach(file => {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Direct text nodes matching
    for (const [turkishText, key] of Object.entries(dict)) {
        const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        
        // Match >Word< or > Word <
        const rx = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
        if (rx.test(html)) {
            html = html.replace(rx, (m, p1, p2, p3, p4, p5) => {
                return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
            });
            changed = true;
        }

        const rxLabel = new RegExp('<label[^>]*>\\s*(' + safeWord + ')\\s*</label>', 'g');
        if (rxLabel.test(html)) {
            html = html.replace(rxLabel, (m, p1) => {
                return m.replace(p1, '<span data-i18n="' + key + '">' + p1 + '</span>');
            });
            changed = true;
        }
        
        const rxTh = new RegExp('<th[^>]*>\\s*(' + safeWord + ')\\s*</th>', 'g');
        if (rxTh.test(html)) {
            html = html.replace(rxTh, (m, p1) => {
                return m.replace(p1, '<span data-i18n="' + key + '">' + p1 + '</span>');
            });
            changed = true;
        }
    }
    
    // Also patch input placeholders like 'Ürün adı veya kodu...'
    if (html.includes('placeholder="Ürün adı veya kodu"')) {
        html = html.replace(/placeholder="Ürün adı veya kodu"/g, 'placeholder="Ürün adı veya kodu" data-i18n="mega.ph_urun"');
        changed = true;
    }
    if (html.includes('placeholder="Ürün adı veya kodu..."')) {
        html = html.replace(/placeholder="Ürün adı veya kodu..."/g, 'placeholder="Ürün adı veya kodu..." data-i18n="mega.ph_urun"');
        changed = true;
    }

    if (changed) {
        html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=9');
        if (html.includes('translations.js') && !html.includes('translations.js?v=9')) {
            html = html.replace('translations.js', 'translations.js?v=9');
        }
        fs.writeFileSync(filePath, html, 'utf8');
        filesUpdated++;
    }
});

console.log('Successfully patched ' + filesUpdated + ' HTML files with Mega Form dictionary words.');

// Update translations.js
const transFile = path.join(dir, 'translations.js');
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'mega.e_irsaliye_create': 'E-İrsaliye Oluşturma',
        'mega.gonderici_bilgileri': 'Gönderici Bilgileri',
        'mega.alici_bilgileri': 'Alıcı Bilgileri',
        'mega.vergi_no': 'Vergi No',
        'mega.firma_adi': 'Firma Adı',
        'mega.adres': 'Adres',
        'mega.sube': 'Şube',
        'mega.urun_adi_kodu': 'ÜRÜN ADI/KODU',
        'mega.miktar': 'MİKTAR',
        'mega.birim': 'BİRİM',
        'mega.irsaliye_bilgileri': 'İrsaliye Bilgileri',
        'mega.irsaliye_no': 'İrsaliye No',
        'mega.tc_kimlik': 'T.C. Kimlik No',
        'mega.il': 'İl',
        'mega.ilce': 'İlçe',
        'mega.telefon': 'Telefon',
        'mega.eposta': 'E-Posta',
        'mega.kaydet': 'Kaydet',
        'mega.iptal': 'İptal',
        'mega.duzenle': 'Düzenle',
        'mega.guncelle': 'Güncelle',
        'mega.kdv': 'KDV',
        'mega.kdv_tutari': 'KDV TUTARI',
        'mega.tutar': 'TUTAR',
        'mega.toplam': 'TOPLAM',
        'mega.genel_toplam': 'GENEL TOPLAM',
        'mega.fatura_bilgileri': 'Fatura Bilgileri',
        'mega.cari_bilgileri': 'Cari Bilgileri',
        'mega.odeme_bilgileri': 'Ödeme Bilgileri',
        'mega.tarih': 'Tarih',
        'mega.saat': 'Saat',
        'mega.aciklama': 'Açıklama',
        'mega.birim_fiyati': 'BİRİM FİYATI',
        'mega.birim_fiyat': 'BİRİM FİYAT',
        'mega.indirim': 'İNDİRİM',
        'mega.toplam_tutar': 'TOPLAM TUTAR',
        'mega.ph_urun': 'Ürün adı veya kodu...',`,
    'en': `        'mega.e_irsaliye_create': 'Create E-Waybill',
        'mega.gonderici_bilgileri': 'Sender Information',
        'mega.alici_bilgileri': 'Receiver Information',
        'mega.vergi_no': 'Tax No',
        'mega.firma_adi': 'Company Name',
        'mega.adres': 'Address',
        'mega.sube': 'Branch',
        'mega.urun_adi_kodu': 'PRODUCT NAME/CODE',
        'mega.miktar': 'QUANTITY',
        'mega.birim': 'UNIT',
        'mega.irsaliye_bilgileri': 'Waybill Information',
        'mega.irsaliye_no': 'Waybill No',
        'mega.tc_kimlik': 'ID Number',
        'mega.il': 'City',
        'mega.ilce': 'District',
        'mega.telefon': 'Phone',
        'mega.eposta': 'E-Mail',
        'mega.kaydet': 'Save',
        'mega.iptal': 'Cancel',
        'mega.duzenle': 'Edit',
        'mega.guncelle': 'Update',
        'mega.kdv': 'VAT',
        'mega.kdv_tutari': 'VAT AMOUNT',
        'mega.tutar': 'AMOUNT',
        'mega.toplam': 'TOTAL',
        'mega.genel_toplam': 'GRAND TOTAL',
        'mega.fatura_bilgileri': 'Invoice Information',
        'mega.cari_bilgileri': 'Customer Information',
        'mega.odeme_bilgileri': 'Payment Information',
        'mega.tarih': 'Date',
        'mega.saat': 'Time',
        'mega.aciklama': 'Description',
        'mega.birim_fiyati': 'UNIT PRICE',
        'mega.birim_fiyat': 'UNIT PRICE',
        'mega.indirim': 'DISCOUNT',
        'mega.toplam_tutar': 'TOTAL AMOUNT',
        'mega.ph_urun': 'Product name or code...',`,
    'de': `        'mega.e_irsaliye_create': 'E-Lieferschein Erstellen',
        'mega.gonderici_bilgileri': 'Absenderinformationen',
        'mega.alici_bilgileri': 'Empfängerinformationen',
        'mega.vergi_no': 'Steuernummer',
        'mega.firma_adi': 'Firmenname',
        'mega.adres': 'Adresse',
        'mega.sube': 'Filiale',
        'mega.urun_adi_kodu': 'PRODUKTNAME/CODE',
        'mega.miktar': 'MENGE',
        'mega.birim': 'EINHEIT',
        'mega.irsaliye_bilgileri': 'Lieferscheindaten',
        'mega.irsaliye_no': 'Lieferschein-Nr',
        'mega.tc_kimlik': 'Ausweisnummer',
        'mega.il': 'Stadt',
        'mega.ilce': 'Bezirk',
        'mega.telefon': 'Telefon',
        'mega.eposta': 'E-Mail',
        'mega.kaydet': 'Speichern',
        'mega.iptal': 'Abbrechen',
        'mega.duzenle': 'Bearbeiten',
        'mega.guncelle': 'Aktualisieren',
        'mega.kdv': 'MwSt.',
        'mega.kdv_tutari': 'MwSt. BETRAG',
        'mega.tutar': 'BETRAG',
        'mega.toplam': 'GESAMT',
        'mega.genel_toplam': 'GESAMTBETRAG',
        'mega.fatura_bilgileri': 'Rechnungsdaten',
        'mega.cari_bilgileri': 'Kundeninformationen',
        'mega.odeme_bilgileri': 'Zahlungsdaten',
        'mega.tarih': 'Datum',
        'mega.saat': 'Uhrzeit',
        'mega.aciklama': 'Beschreibung',
        'mega.birim_fiyati': 'EINZELPREIS',
        'mega.birim_fiyat': 'EINZELPREIS',
        'mega.indirim': 'RABATT',
        'mega.toplam_tutar': 'GESAMTSUMME',
        'mega.ph_urun': 'Produktname oder -code...',`,
    'ru': `        'mega.e_irsaliye_create': 'Создание Эл-Накладной',
        'mega.gonderici_bilgileri': 'Информация об отправителе',
        'mega.alici_bilgileri': 'Информация о получателе',
        'mega.vergi_no': 'Налоговый номер',
        'mega.firma_adi': 'Название компании',
        'mega.adres': 'Адрес',
        'mega.sube': 'Филиал',
        'mega.urun_adi_kodu': 'НАЗВАНИЕ/КОД ПРОДУКТА',
        'mega.miktar': 'КОЛИЧЕСТВО',
        'mega.birim': 'ЕДИНИЦА ИЗМЕРЕНИЯ',
        'mega.irsaliye_bilgileri': 'Данные накладной',
        'mega.irsaliye_no': 'Номер накладной',
        'mega.tc_kimlik': 'Идентификационный номер',
        'mega.il': 'Город',
        'mega.ilce': 'Район',
        'mega.telefon': 'Телефон',
        'mega.eposta': 'Эл. почта',
        'mega.kaydet': 'Сохранить',
        'mega.iptal': 'Отмена',
        'mega.duzenle': 'Изменить',
        'mega.guncelle': 'Обновить',
        'mega.kdv': 'НДС',
        'mega.kdv_tutari': 'СУММА НДС',
        'mega.tutar': 'СУММА',
        'mega.toplam': 'ИТОГО',
        'mega.genel_toplam': 'ОБЩИЙ ИТОГ',
        'mega.fatura_bilgileri': 'Данные счета',
        'mega.cari_bilgileri': 'Данные клиента',
        'mega.odeme_bilgileri': 'Данные об оплате',
        'mega.tarih': 'Дата',
        'mega.saat': 'Время',
        'mega.aciklama': 'Описание',
        'mega.birim_fiyati': 'ЦЕНА ЗА ЕД.',
        'mega.birim_fiyat': 'ЦЕНА ЗА ЕД.',
        'mega.indirim': 'СКИДКА',
        'mega.toplam_tutar': 'ОБЩАЯ СУММА',
        'mega.ph_urun': 'Название или код продукта...',`,
    'zh': `        'mega.e_irsaliye_create': '创建电子运单',
        'mega.gonderici_bilgileri': '发件人信息',
        'mega.alici_bilgileri': '收件人信息',
        'mega.vergi_no': '税号',
        'mega.firma_adi': '公司名称',
        'mega.adres': '地址',
        'mega.sube': '分行',
        'mega.urun_adi_kodu': '产品名称/代码',
        'mega.miktar': '数量',
        'mega.birim': '单位',
        'mega.irsaliye_bilgileri': '运单信息',
        'mega.irsaliye_no': '运单号',
        'mega.tc_kimlik': '身份证号',
        'mega.il': '城市',
        'mega.ilce': '区县',
        'mega.telefon': '电话',
        'mega.eposta': '电子邮件',
        'mega.kaydet': '保存',
        'mega.iptal': '取消',
        'mega.duzenle': '编辑',
        'mega.guncelle': '更新',
        'mega.kdv': '增值税',
        'mega.kdv_tutari': '增值税金额',
        'mega.tutar': '金额',
        'mega.toplam': '总计',
        'mega.genel_toplam': '总额',
        'mega.fatura_bilgileri': '发票信息',
        'mega.cari_bilgileri': '客户信息',
        'mega.odeme_bilgileri': '支付信息',
        'mega.tarih': '日期',
        'mega.saat': '时间',
        'mega.aciklama': '说明',
        'mega.birim_fiyati': '单价',
        'mega.birim_fiyat': '单价',
        'mega.indirim': '折扣',
        'mega.toplam_tutar': '总金额',
        'mega.ph_urun': '产品名称或代码...',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(transFile, js, 'utf8');

console.log('Successfully injected mega forms translated objects into translations.js');
