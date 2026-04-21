const fs = require('fs');
const path = require('path');

const dict = {
    'Kâr Zarar Analizi': 'report.kar_zarar',
    'Giriş Ekranına Dön': 'report.giris_don',
    'Analizi Hazırla': 'report.analizi_hazirla',
    'Analiz Kriterleri': 'report.analiz_kriterleri',
    'Tarih Seçiniz:': 'report.tarih_seciniz',
    'Gelir Kalemi': 'report.gelir_kalemi',
    'Gelir Tutarı': 'report.gelir_tutari',
    'Gider Kalemi': 'report.gider_kalemi',
    'Gider Tutarı': 'report.gider_tutari',
    'Net Durum': 'report.net_durum',
    'Kâr zarar tabloları henüz oluşturulmadı.': 'report.kar_zarar_empty'
};

const tAdditions = {
    'tr': `        'report.kar_zarar': 'Kâr Zarar Analizi',
        'report.giris_don': 'Giriş Ekranına Dön',
        'report.analizi_hazirla': 'Analizi Hazırla',
        'report.analiz_kriterleri': 'Analiz Kriterleri',
        'report.tarih_seciniz': 'Tarih Seçiniz:',
        'report.gelir_kalemi': 'Gelir Kalemi',
        'report.gelir_tutari': 'Gelir Tutarı',
        'report.gider_kalemi': 'Gider Kalemi',
        'report.gider_tutari': 'Gider Tutarı',
        'report.net_durum': 'Net Durum',
        'report.kar_zarar_empty': 'Kâr zarar tabloları henüz oluşturulmadı.',`,
    'en': `        'report.kar_zarar': 'Profit & Loss Analysis',
        'report.giris_don': 'Back to Dashboard',
        'report.analizi_hazirla': 'Generate Analysis',
        'report.analiz_kriterleri': 'Analysis Criteria',
        'report.tarih_seciniz': 'Select Date:',
        'report.gelir_kalemi': 'Income Item',
        'report.gelir_tutari': 'Income Amount',
        'report.gider_kalemi': 'Expense Item',
        'report.gider_tutari': 'Expense Amount',
        'report.net_durum': 'Net Status',
        'report.kar_zarar_empty': 'Profit & Loss tables have not been generated yet.',`,
    'de': `        'report.kar_zarar': 'Gewinn- und Verlustanalyse',
        'report.giris_don': 'Zurück zum Dashboard',
        'report.analizi_hazirla': 'Analyse Erstellen',
        'report.analiz_kriterleri': 'Analysekriterien',
        'report.tarih_seciniz': 'Datum Auswählen:',
        'report.gelir_kalemi': 'Einkommensposten',
        'report.gelir_tutari': 'Einkommensbetrag',
        'report.gider_kalemi': 'Ausgabenposten',
        'report.gider_tutari': 'Ausgabenbetrag',
        'report.net_durum': 'Netto-Status',
        'report.kar_zarar_empty': 'Gewinn- und Verlusttabellen wurden noch nicht erstellt.',`,
    'ru': `        'report.kar_zarar': 'Анализ Прибылей и Убытков',
        'report.giris_don': 'Вернуться на Главную',
        'report.analizi_hazirla': 'Создать Анализ',
        'report.analiz_kriterleri': 'Критерии Анализа',
        'report.tarih_seciniz': 'Выберите Дату:',
        'report.gelir_kalemi': 'Статья Доходов',
        'report.gelir_tutari': 'Сумма Доходов',
        'report.gider_kalemi': 'Статья Расходов',
        'report.gider_tutari': 'Сумма Расходов',
        'report.net_durum': 'Чистый Статус',
        'report.kar_zarar_empty': 'Таблицы прибылей и убытков еще не созданы.',`,
    'zh': `        'report.kar_zarar': '利润和损失分析',
        'report.giris_don': '返回主屏幕',
        'report.analizi_hazirla': '生成分析',
        'report.analiz_kriterleri': '分析标准',
        'report.tarih_seciniz': '选择日期:',
        'report.gelir_kalemi': '收入项目',
        'report.gelir_tutari': '收入金额',
        'report.gider_kalemi': '支出项目',
        'report.gider_tutari': '支出金额',
        'report.net_durum': '净状态',
        'report.kar_zarar_empty': '损益表尚未生成。',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'kar_zarar_analizi.html'), 'utf8');

for (const [turkishText, key] of Object.entries(dict)) {
    const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    
    // Direct matches
    const rx1 = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
    if (rx1.test(html)) {
        html = html.replace(rx1, (m, p1, p2, p3, p4, p5) => {
            return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
        });
    }

     // TH match
    const rxTh = new RegExp('<th([^>]*)>\\s*(' + safeWord + ')\\s*</th>', 'gi');
    if (rxTh.test(html)) {
        html = html.replace(rxTh, (m, p1, p2) => {
            return '<th' + p1 + '><span data-i18n="' + key + '">' + p2 + '</span></th>';
        });
    }

    // TD match
    const rxTd = new RegExp('<td([^>]*)>(\\s*)(' + safeWord + ')(\\s*)</td>', 'g');
    if (rxTd.test(html)) {
         html = html.replace(rxTd, (m, p1, p2, p3, p4) => {
             return '<td' + p1 + '>' + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + '</td>';
         });
    }
}

html = html.replace(/<h2 class="page-title">Kâr Zarar Analizi<\/h2>/g, 
    '<h2 class="page-title"><span data-i18n="report.kar_zarar">Kâr Zarar Analizi</span></h2>');

html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=31');

fs.writeFileSync(path.join(__dirname, 'kar_zarar_analizi.html'), html, 'utf8');

// I also promised to clean the rest if possible. I'll stick to this for now.
console.log('Patched kar_zarar_analizi.html');
