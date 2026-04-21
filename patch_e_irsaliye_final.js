const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'e_irsaliye.html');
let html = fs.readFileSync(filePath, 'utf8');

// Patch remaining stray words
html = html.replace(/<label class="form-label-sm">Sevk Tarihi<\/label>/g, '<label class="form-label-sm"><span data-i18n="mega.sevk_tarihi">Sevk Tarihi</span></label>');
html = html.replace(/<\/i>\s*Ekle\s*<\/button>/g, '</i> <span data-i18n="mega.ekle">Ekle</span></button>');
html = html.replace(/<\/i>\s*E-İrsaliye Oluştur\s*<\/button>/g, '</i> <span data-i18n="mega.e_irsaliye_olustur">E-İrsaliye Oluştur</span></button>');
html = html.replace(/placeholder="Otomatik oluşturulacak"/g, 'placeholder="Otomatik oluşturulacak" data-i18n="mega.otomatik_olusturulacak"');

// Dropdowns
html = html.replace(/<option>Adet<\/option>/g, '<option data-i18n="mega.adet">Adet</option>');
html = html.replace(/<option>Kg<\/option>/g, '<option data-i18n="mega.kg">Kg</option>');
html = html.replace(/<option>Ton<\/option>/g, '<option data-i18n="mega.ton">Ton</option>');
html = html.replace(/<option>Litre<\/option>/g, '<option data-i18n="mega.litre">Litre</option>');
html = html.replace(/<option>Metre<\/option>/g, '<option data-i18n="mega.metre">Metre</option>');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=10');
fs.writeFileSync(filePath, html, 'utf8');

// Update translations.js
const transFile = path.join(__dirname, 'translations.js');
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'mega.sevk_tarihi': 'Sevk Tarihi',
        'mega.ekle': 'Ekle',
        'mega.e_irsaliye_olustur': 'E-İrsaliye Oluştur',
        'mega.otomatik_olusturulacak': 'Otomatik oluşturulacak',
        'mega.adet': 'Adet',
        'mega.kg': 'Kg',
        'mega.ton': 'Ton',
        'mega.litre': 'Litre',
        'mega.metre': 'Metre',`,
    'en': `        'mega.sevk_tarihi': 'Dispatch Date',
        'mega.ekle': 'Add',
        'mega.e_irsaliye_olustur': 'Create E-Waybill',
        'mega.otomatik_olusturulacak': 'Will be auto-generated',
        'mega.adet': 'Piece',
        'mega.kg': 'Kg',
        'mega.ton': 'Ton',
        'mega.litre': 'Liter',
        'mega.metre': 'Meter',`,
    'de': `        'mega.sevk_tarihi': 'Versanddatum',
        'mega.ekle': 'Hinzufügen',
        'mega.e_irsaliye_olustur': 'E-Lieferschein Erstellen',
        'mega.otomatik_olusturulacak': 'Wird automatisch generiert',
        'mega.adet': 'Stück',
        'mega.kg': 'Kg',
        'mega.ton': 'Ton',
        'mega.litre': 'Liter',
        'mega.metre': 'Meter',`,
    'ru': `        'mega.sevk_tarihi': 'Дата отправки',
        'mega.ekle': 'Добавить',
        'mega.e_irsaliye_olustur': 'Создать Эл-Накладную',
        'mega.otomatik_olusturulacak': 'Будет создано автоматически',
        'mega.adet': 'Шт',
        'mega.kg': 'Кг',
        'mega.ton': 'Тонна',
        'mega.litre': 'Литр',
        'mega.metre': 'Метр',`,
    'zh': `        'mega.sevk_tarihi': '发货日期',
        'mega.ekle': '添加',
        'mega.e_irsaliye_olustur': '创建电子运单',
        'mega.otomatik_olusturulacak': '将自动生成',
        'mega.adet': '件',
        'mega.kg': '公斤',
        'mega.ton': '吨',
        'mega.litre': '升',
        'mega.metre': '米',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(transFile, js, 'utf8');
console.log('Final polish applied to e_irsaliye.html');
