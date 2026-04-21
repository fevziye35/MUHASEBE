const fs = require('fs');
const path = require('path');

const dict = {
    'Gelişmiş Satış Raporu': 'report.satis_gelismis',
    'Satış Ekranına Dön': 'report.satis_don',
    'Satış Belgesi Türü:': 'report.satis_belgesi_turu',
    'Tüm Satışlar': 'report.tum_satislar',
    'Sadece Faturalar': 'report.sadece_faturalar',
    'Sadece İrsaliyeler': 'report.sadece_irsaliyeler',
    'Satış İadeleri': 'report.satis_iadeleri',
    'Fatura / İrsaliye No': 'report.fatura_irsaliye_no',
    'Belge Türü': 'report.belge_turu',
    'Seçtiğiniz kriterlere uygun veri bulunamadı.': 'report.satis_no_data'
};

const tAdditions = {
    'tr': `        'report.satis_gelismis': 'Gelişmiş Satış Raporu',
        'report.satis_don': 'Satış Ekranına Dön',
        'report.satis_belgesi_turu': 'Satış Belgesi Türü:',
        'report.tum_satislar': 'Tüm Satışlar',
        'report.sadece_faturalar': 'Sadece Faturalar',
        'report.sadece_irsaliyeler': 'Sadece İrsaliyeler',
        'report.satis_iadeleri': 'Satış İadeleri',
        'report.fatura_irsaliye_no': 'Fatura / İrsaliye No',
        'report.belge_turu': 'Belge Türü',
        'report.satis_no_data': 'Seçtiğiniz kriterlere uygun veri bulunamadı.',`,
    'en': `        'report.satis_gelismis': 'Advanced Sales Report',
        'report.satis_don': 'Back to Sales',
        'report.satis_belgesi_turu': 'Sales Document Type:',
        'report.tum_satislar': 'All Sales',
        'report.sadece_faturalar': 'Invoices Only',
        'report.sadece_irsaliyeler': 'Waybills Only',
        'report.satis_iadeleri': 'Sales Returns',
        'report.fatura_irsaliye_no': 'Invoice / Waybill No',
        'report.belge_turu': 'Document Type',
        'report.satis_no_data': 'No data found matching your criteria.',`,
    'de': `        'report.satis_gelismis': 'Erweiterter Verkaufsbericht',
        'report.satis_don': 'Zurück zum Verkauf',
        'report.satis_belgesi_turu': 'Art des Verkaufsbelegs:',
        'report.tum_satislar': 'Alle Verkäufe',
        'report.sadece_faturalar': 'Nur Rechnungen',
        'report.sadece_irsaliyeler': 'Nur Lieferscheine',
        'report.satis_iadeleri': 'Verkaufsrückgaben',
        'report.fatura_irsaliye_no': 'Rechnungs- / Lieferschein-Nr',
        'report.belge_turu': 'Dokumententyp',
        'report.satis_no_data': 'Keine Daten für Ihre Kriterien gefunden.',`,
    'ru': `        'report.satis_gelismis': 'Расширенный Отчет по Продажам',
        'report.satis_don': 'Назад к Продажам',
        'report.satis_belgesi_turu': 'Тип документа продажи:',
        'report.tum_satislar': 'Все продажи',
        'report.sadece_faturalar': 'Только счета',
        'report.sadece_irsaliyeler': 'Только накладные',
        'report.satis_iadeleri': 'Возвраты продаж',
        'report.fatura_irsaliye_no': '№ Счета / Накладной',
        'report.belge_turu': 'Тип документа',
        'report.satis_no_data': 'По вашим критериям данные не найдены.',`,
    'zh': `        'report.satis_gelismis': '高级销售报告',
        'report.satis_don': '返回销售',
        'report.satis_belgesi_turu': '销售凭证类型:',
        'report.tum_satislar': '所有销售',
        'report.sadece_faturalar': '仅发票',
        'report.sadece_irsaliyeler': '仅运单',
        'report.satis_iadeleri': '销售退货',
        'report.fatura_irsaliye_no': '发票 / 运单号',
        'report.belge_turu': '单据类型',
        'report.satis_no_data': '未找到符合您条件的数据。',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'satis_raporu.html'), 'utf8');

for (const [turkishText, key] of Object.entries(dict)) {
    const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    
    // Direct html replacements
    const rx1 = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
    if (rx1.test(html)) {
        html = html.replace(rx1, (m, p1, p2, p3, p4, p5) => {
            return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
        });
    }

    // Option tags match
    const rxOpt = new RegExp('<option([^>]*)>\\s*(' + safeWord + ')\\s*</option>', 'gi');
    if (rxOpt.test(html)) {
        html = html.replace(rxOpt, (m, p1, p2) => {
            if(p1.includes('data-i18n')) return m; 
            return '<option' + p1 + ' data-i18n="' + key + '">' + p2 + '</option>';
        });
    }

     // TH match
    const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'gi');
    if (rxTh.test(html)) {
        html = html.replace(rxTh, (m, p1, p2) => {
            return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
        });
    }
}

// Special string replacement inside script for missing data
html = html.replace(/'<tr><td(.*?)>Seçtiğiniz kriterlere uygun veri bulunamadı.<\/td><\/tr>'/g, 
    `'<tr><td$1><span data-i18n="report.satis_no_data">Seçtiğiniz kriterlere uygun veri bulunamadı.</span></td></tr>'`);

// Title
html = html.replace(/<h2 class="page-title">Gelişmiş Satış Raporu<\/h2>/g, 
    '<h2 class="page-title"><span data-i18n="report.satis_gelismis">Gelişmiş Satış Raporu</span></h2>');

html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=30');

fs.writeFileSync(path.join(__dirname, 'satis_raporu.html'), html, 'utf8');

console.log('Patched satis_raporu.html!');
