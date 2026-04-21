const fs = require('fs');
const path = require('path');

let fileHtml = fs.readFileSync(path.join(__dirname, 'stok_yeni.html'), 'utf8');

// Title
fileHtml = fileHtml.replace('<h2 class="section-header-title">Stok Kartı Ekle</h2>', '<h2 class="section-header-title"><span data-i18n="mega.add_stock_card">Stok Kartı Ekle</span></h2>');
fileHtml = fileHtml.replace('<title>Yeni Stok Ekle</title>', '<title><span data-i18n="mega.add_stock_card">Stok Kartı Ekle</span></title>');

// Inputs and Labels
fileHtml = fileHtml.replace('id="barkod" placeholder="Barkod"', 'id="barkod" placeholder="Barkod" data-i18n="mega.barkod"');
fileHtml = fileHtml.replace('Otomatik\\n                            Barkod', '<span data-i18n="mega.otomatik_barkod">Otomatik Barkod</span>');
fileHtml = fileHtml.replace('Otomatik\\r\\n                            Barkod', '<span data-i18n="mega.otomatik_barkod">Otomatik Barkod</span>');
fileHtml = fileHtml.replace('>Otomatik Barkod<', '><span data-i18n="mega.otomatik_barkod">Otomatik Barkod</span><');

fileHtml = fileHtml.replace('<label class="form-label-bold">Barkod Türü:</label>', '<label class="form-label-bold"><span data-i18n="mega.barkod_turu">Barkod Türü:</span></label>');
fileHtml = fileHtml.replace('>Standart Ürün</label>', '><span data-i18n="mega.standart_urun">Standart Ürün</span></label>');
fileHtml = fileHtml.replace('>Son Eklenen</label>', '><span data-i18n="mega.son_eklenen">Son Eklenen</span></label>');

fileHtml = fileHtml.replace('id="stokKodu" placeholder="Stok Kodu"', 'id="stokKodu" placeholder="Stok Kodu" data-i18n="mega.stok_kodu"');
fileHtml = fileHtml.replace('id="stokRafi" placeholder="Stok Rafı"', 'id="stokRafi" placeholder="Stok Rafı" data-i18n="mega.stok_rafi"');
fileHtml = fileHtml.replace('id="stokAdi" placeholder="Stok Adı"', 'id="stokAdi" placeholder="Stok Adı" data-i18n="mega.stok_adi"');

fileHtml = fileHtml.replace('<label class="form-label-bold">Grup:</label>', '<label class="form-label-bold"><span data-i18n="mega.grup_label">Grup:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">Marka:</label>', '<label class="form-label-bold"><span data-i18n="mega.marka_label">Marka:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">Depo:</label>', '<label class="form-label-bold"><span data-i18n="mega.depo_label">Depo:</span></label>');

fileHtml = fileHtml.replace('<label class="form-label-bold">Alış Fiyatı:</label>', '<label class="form-label-bold"><span data-i18n="mega.alis_fiyati">Alış Fiyatı:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">Alış Döviz Türü:</label>', '<label class="form-label-bold"><span data-i18n="mega.alis_doviz_turu">Alış Döviz Türü:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">Satış Fiyatı:</label>', '<label class="form-label-bold"><span data-i18n="mega.satis_fiyati_label">Satış Fiyatı:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">Satış Döviz Türü:</label>', '<label class="form-label-bold"><span data-i18n="mega.satis_doviz_turu">Satış Döviz Türü:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">KDV Oranı:</label>', '<label class="form-label-bold"><span data-i18n="mega.kdv_orani">KDV Oranı:</span></label>');
fileHtml = fileHtml.replace('<label class="form-label-bold">KDV Durumu:</label>', '<label class="form-label-bold"><span data-i18n="mega.kdv_durumu">KDV Durumu:</span></label>');

fileHtml = fileHtml.replace('<option>Dahil</option>', '<option><span data-i18n="mega.dahil">Dahil</span></option>');
fileHtml = fileHtml.replace('<option>Hariç</option>', '<option><span data-i18n="mega.haric">Hariç</span></option>');

// Select options
fileHtml = fileHtml.replace('<option>Seçiniz</option>', '<option><span data-i18n="word.seciniz">Seçiniz</span></option>');
fileHtml = fileHtml.replace('<option>Temel Gıda</option>', '<option><span data-i18n="mega.temel_gida">Temel Gıda</span></option>');
fileHtml = fileHtml.replace('<option>İçecek</option>', '<option><span data-i18n="mega.icecek">İçecek</span></option>');
fileHtml = fileHtml.replace('<option>Temizlik</option>', '<option><span data-i18n="mega.temizlik">Temizlik</span></option>');

fileHtml = fileHtml.replace(/translations\.js\?v=\d+/g, 'translations.js?v=105');

// Also NO CACHE
if (!fileHtml.includes('no-store')) {
    fileHtml = fileHtml.replace('    <title>', 
    '    <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0">\\n    <meta http-equiv="Pragma" content="no-cache">\\n    <meta http-equiv="Expires" content="0">\\n    <title>');
}

fs.writeFileSync(path.join(__dirname, 'stok_yeni.html'), fileHtml, 'utf8');

// Dictionary updates
let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
const additions = {
    "'tr': {": "        'mega.add_stock_card': 'Stok Kartı Ekle',\n" +
        "        'mega.otomatik_barkod': 'Otomatik Barkod',\n" +
        "        'mega.barkod_turu': 'Barkod Türü:',\n" +
        "        'mega.standart_urun': 'Standart Ürün',\n" +
        "        'mega.son_eklenen': 'Son Eklenen',\n" +
        "        'mega.stok_kodu': 'Stok Kodu',\n" +
        "        'mega.stok_rafi': 'Stok Rafı',\n" +
        "        'mega.grup_label': 'Grup:',\n" +
        "        'mega.marka_label': 'Marka:',\n" +
        "        'mega.depo_label': 'Depo:',\n" +
        "        'mega.alis_fiyati': 'Alış Fiyatı:',\n" +
        "        'mega.alis_doviz_turu': 'Alış Döviz Türü:',\n" +
        "        'mega.satis_fiyati_label': 'Satış Fiyatı:',\n" +
        "        'mega.satis_doviz_turu': 'Satış Döviz Türü:',\n" +
        "        'mega.kdv_orani': 'KDV Oranı:',\n" +
        "        'mega.kdv_durumu': 'KDV Durumu:',\n" +
        "        'mega.dahil': 'Dahil',\n" +
        "        'mega.haric': 'Hariç',\n" +
        "        'mega.temel_gida': 'Temel Gıda',\n" +
        "        'mega.icecek': 'İçecek',\n" +
        "        'mega.temizlik': 'Temizlik',",
    "'en': {": "        'mega.add_stock_card': 'Add Stock Card',\n" +
        "        'mega.otomatik_barkod': 'Auto Barcode',\n" +
        "        'mega.barkod_turu': 'Barcode Type:',\n" +
        "        'mega.standart_urun': 'Standard Product',\n" +
        "        'mega.son_eklenen': 'Last Added',\n" +
        "        'mega.stok_kodu': 'Stock Code',\n" +
        "        'mega.stok_rafi': 'Stock Shelf',\n" +
        "        'mega.grup_label': 'Group:',\n" +
        "        'mega.marka_label': 'Brand:',\n" +
        "        'mega.depo_label': 'Warehouse:',\n" +
        "        'mega.alis_fiyati': 'Purchase Price:',\n" +
        "        'mega.alis_doviz_turu': 'Purchase Currency:',\n" +
        "        'mega.satis_fiyati_label': 'Sales Price:',\n" +
        "        'mega.satis_doviz_turu': 'Sales Currency:',\n" +
        "        'mega.kdv_orani': 'VAT Rate:',\n" +
        "        'mega.kdv_durumu': 'VAT Status:',\n" +
        "        'mega.dahil': 'Included',\n" +
        "        'mega.haric': 'Excluded',\n" +
        "        'mega.temel_gida': 'Basic Food',\n" +
        "        'mega.icecek': 'Beverage',\n" +
        "        'mega.temizlik': 'Cleaning',",
    "'de': {": "        'mega.add_stock_card': 'Lagerkarte hinzufügen',\n" +
        "        'mega.otomatik_barkod': 'Auto-Barcode',\n" +
        "        'mega.barkod_turu': 'Barcode-Typ:',\n" +
        "        'mega.standart_urun': 'Standardprodukt',\n" +
        "        'mega.son_eklenen': 'Zuletzt hinzugefügt',\n" +
        "        'mega.stok_kodu': 'Lagercode',\n" +
        "        'mega.stok_rafi': 'Lagerregal',\n" +
        "        'mega.grup_label': 'Gruppe:',\n" +
        "        'mega.marka_label': 'Marke:',\n" +
        "        'mega.depo_label': 'Lager:',\n" +
        "        'mega.alis_fiyati': 'Einkaufspreis:',\n" +
        "        'mega.alis_doviz_turu': 'Einkaufswährung:',\n" +
        "        'mega.satis_fiyati_label': 'Verkaufspreis:',\n" +
        "        'mega.satis_doviz_turu': 'Verkaufswährung:',\n" +
        "        'mega.kdv_orani': 'MwSt-Satz:',\n" +
        "        'mega.kdv_durumu': 'MwSt-Status:',\n" +
        "        'mega.dahil': 'Inklusive',\n" +
        "        'mega.haric': 'Exklusive',\n" +
        "        'mega.temel_gida': 'Grundnahrungsmittel',\n" +
        "        'mega.icecek': 'Getränke',\n" +
        "        'mega.temizlik': 'Reinigung',",
    "'ru': {": "        'mega.add_stock_card': 'Добавить учетную карточку',\n" +
        "        'mega.otomatik_barkod': 'Автоматический штрих-код',\n" +
        "        'mega.barkod_turu': 'Тип штрих-кода:',\n" +
        "        'mega.standart_urun': 'Стандартный продукт',\n" +
        "        'mega.son_eklenen': 'Последнее добавленное',\n" +
        "        'mega.stok_kodu': 'Код товара',\n" +
        "        'mega.stok_rafi': 'Полка товара',\n" +
        "        'mega.grup_label': 'Группа:',\n" +
        "        'mega.marka_label': 'Марка:',\n" +
        "        'mega.depo_label': 'Склад:',\n" +
        "        'mega.alis_fiyati': 'Цена покупки:',\n" +
        "        'mega.alis_doviz_turu': 'Валюта покупки:',\n" +
        "        'mega.satis_fiyati_label': 'Цена продажи:',\n" +
        "        'mega.satis_doviz_turu': 'Валюта продажи:',\n" +
        "        'mega.kdv_orani': 'НДС По ставке:',\n" +
        "        'mega.kdv_durumu': 'Статус НДС:',\n" +
        "        'mega.dahil': 'Включено',\n" +
        "        'mega.haric': 'Исключено',\n" +
        "        'mega.temel_gida': 'Основные продукты питания',\n" +
        "        'mega.icecek': 'Напитки',\n" +
        "        'mega.temizlik': 'Очистка',",
    "'zh': {": "        'mega.add_stock_card': '添加库存卡',\n" +
        "        'mega.otomatik_barkod': '自动条形码',\n" +
        "        'mega.barkod_turu': '条形码类型:',\n" +
        "        'mega.standart_urun': '标准产品',\n" +
        "        'mega.son_eklenen': '最后添加',\n" +
        "        'mega.stok_kodu': '库存代码',\n" +
        "        'mega.stok_rafi': '库存货架',\n" +
        "        'mega.grup_label': '组别:',\n" +
        "        'mega.marka_label': '品牌:',\n" +
        "        'mega.depo_label': '仓库:',\n" +
        "        'mega.alis_fiyati': '进价:',\n" +
        "        'mega.alis_doviz_turu': '进价货币:',\n" +
        "        'mega.satis_fiyati_label': '售价:',\n" +
        "        'mega.satis_doviz_turu': '售价货币:',\n" +
        "        'mega.kdv_orani': '增值税率:',\n" +
        "        'mega.kdv_durumu': '增值税状态:',\n" +
        "        'mega.dahil': '包含',\n" +
        "        'mega.haric': '不包含',\n" +
        "        'mega.temel_gida': '基础食品',\n" +
        "        'mega.icecek': '饮料',\n" +
        "        'mega.temizlik': '清洁',"
};

if (!js.includes("'mega.add_stock_card'")) {
    for (const [target, extra] of Object.entries(additions)) {
        js = js.replace(target, target + "\\n" + extra);
    }
    fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');
}

console.log('stok_yeni.html and translations.js updated successfully!');
