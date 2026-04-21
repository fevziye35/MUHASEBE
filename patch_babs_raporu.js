const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'report.rapor_filtresi': 'Rapor Filtresi',
        'report.yil_seciniz': 'Yıl Seçiniz',
        'report.ay_seciniz': 'Ay Seçiniz',
        'report.tur_seciniz': 'Listelemek istediğiniz türü seçiniz',
        'report.ba_form': 'BA Bildirim Mutabakat Formu',
        'report.bs_form': 'BS Bildirim Mutabakat Formu',
        'report.babs_both': 'BA ve BS Bildirim Formu',
        'month.1': 'Ocak', 'month.2': 'Şubat', 'month.3': 'Mart', 'month.4': 'Nisan',
        'month.5': 'Mayıs', 'month.6': 'Haziran', 'month.7': 'Temmuz', 'month.8': 'Ağustos',
        'month.9': 'Eylül', 'month.10': 'Ekim', 'month.11': 'Kasım', 'month.12': 'Aralık',`,
        
    'en': `        'report.rapor_filtresi': 'Report Filter',
        'report.yil_seciniz': 'Select Year',
        'report.ay_seciniz': 'Select Month',
        'report.tur_seciniz': 'Select type to list',
        'report.ba_form': 'BA Notification Reconciliation Form',
        'report.bs_form': 'BS Notification Reconciliation Form',
        'report.babs_both': 'BA and BS Notification Form',
        'month.1': 'January', 'month.2': 'February', 'month.3': 'March', 'month.4': 'April',
        'month.5': 'May', 'month.6': 'June', 'month.7': 'July', 'month.8': 'August',
        'month.9': 'September', 'month.10': 'October', 'month.11': 'November', 'month.12': 'December',`,
        
    'de': `        'report.rapor_filtresi': 'Berichtsfilter',
        'report.yil_seciniz': 'Jahr auswählen',
        'report.ay_seciniz': 'Monat auswählen',
        'report.tur_seciniz': 'Listenart auswählen',
        'report.ba_form': 'BA Benachrichtigungsabstimmungsformular',
        'report.bs_form': 'BS Benachrichtigungsabstimmungsformular',
        'report.babs_both': 'BA und BS Benachrichtigungsformular',
        'month.1': 'Januar', 'month.2': 'Februar', 'month.3': 'März', 'month.4': 'April',
        'month.5': 'Mai', 'month.6': 'Juni', 'month.7': 'Juli', 'month.8': 'August',
        'month.9': 'September', 'month.10': 'Oktober', 'month.11': 'November', 'month.12': 'Dezember',`,
        
    'ru': `        'report.rapor_filtresi': 'Фильтр отчета',
        'report.yil_seciniz': 'Выберите год',
        'report.ay_seciniz': 'Выберите месяц',
        'report.tur_seciniz': 'Выберите тип списка',
        'report.ba_form': 'Форма согласования формы BA',
        'report.bs_form': 'Форма согласования формы BS',
        'report.babs_both': 'Форма уведомлений BA и BS',
        'month.1': 'январь', 'month.2': 'февраль', 'month.3': 'март', 'month.4': 'апрель',
        'month.5': 'май', 'month.6': 'июнь', 'month.7': 'июль', 'month.8': 'август',
        'month.9': 'сентябрь', 'month.10': 'октябрь', 'month.11': 'ноябрь', 'month.12': 'декабрь',`,
        
    'zh': `        'report.rapor_filtresi': '报告过滤',
        'report.yil_seciniz': '选择年份',
        'report.ay_seciniz': '选择月份',
        'report.tur_seciniz': '选择要列出的类型',
        'report.ba_form': 'BA 通知核对表',
        'report.bs_form': 'BS 通知核对表',
        'report.babs_both': 'BA 和 BS 通知表',
        'month.1': '一月', 'month.2': '二月', 'month.3': '三月', 'month.4': '四月',
        'month.5': '五月', 'month.6': '六月', 'month.7': '七月', 'month.8': '八月',
        'month.9': '九月', 'month.10': '十月', 'month.11': '十一月', 'month.12': '十二月',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    if (!js.includes("'report.rapor_filtresi'")) {
        const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
        js = js.replace(rx, "$1\n" + extra);
    }
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'babs_raporu.html'), 'utf8');

html = html.replace('Rapor Filtresi', '<span data-i18n="report.rapor_filtresi">Rapor Filtresi</span>');
html = html.replace('<label>Yıl Seçiniz</label>', '<label><span data-i18n="report.yil_seciniz">Yıl Seçiniz</span></label>');
html = html.replace('<label>Ay Seçiniz</label>', '<label><span data-i18n="report.ay_seciniz">Ay Seçiniz</span></label>');
html = html.replace('<label>Listelemek istediğiniz türü seçiniz</label>', '<label><span data-i18n="report.tur_seciniz">Listelemek istediğiniz türü seçiniz</span></label>');

html = html.replace('<option value="1">Ocak</option>', '<option value="1" data-i18n="month.1">Ocak</option>');
html = html.replace('<option value="2">Şubat</option>', '<option value="2" data-i18n="month.2">Şubat</option>');
html = html.replace('<option value="3">Mart</option>', '<option value="3" data-i18n="month.3">Mart</option>');
html = html.replace('<option value="4">Nisan</option>', '<option value="4" data-i18n="month.4">Nisan</option>');
html = html.replace('<option value="5">Mayıs</option>', '<option value="5" data-i18n="month.5">Mayıs</option>');
html = html.replace('<option value="6">Haziran</option>', '<option value="6" data-i18n="month.6">Haziran</option>');
html = html.replace('<option value="7">Temmuz</option>', '<option value="7" data-i18n="month.7">Temmuz</option>');
html = html.replace('<option value="8">Ağustos</option>', '<option value="8" data-i18n="month.8">Ağustos</option>');
html = html.replace('<option value="9">Eylül</option>', '<option value="9" data-i18n="month.9">Eylül</option>');
html = html.replace('<option value="10">Ekim</option>', '<option value="10" data-i18n="month.10">Ekim</option>');
html = html.replace('<option value="11">Kasım</option>', '<option value="11" data-i18n="month.11">Kasım</option>');
html = html.replace('<option value="12">Aralık</option>', '<option value="12" data-i18n="month.12">Aralık</option>');

html = html.replace('<option value="ba">BA Bildirim Mutabakat Formu</option>', '<option value="ba" data-i18n="report.ba_form">BA Bildirim Mutabakat Formu</option>');
html = html.replace('<option value="bs">BS Bildirim Mutabakat Formu</option>', '<option value="bs" data-i18n="report.bs_form">BS Bildirim Mutabakat Formu</option>');
html = html.replace('<option value="both">BA ve BS Bildirim Formu</option>', '<option value="both" data-i18n="report.babs_both">BA ve BS Bildirim Formu</option>');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=48');

fs.writeFileSync(path.join(__dirname, 'babs_raporu.html'), html, 'utf8');
console.log("Patched babs_raporu.html successfully");
