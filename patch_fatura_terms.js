const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dict = {
    'Fatura Listesi': 'word.fatura_listesi',
    'Yeni Satış Faturası': 'word.yeni_satis_faturasi',
    'Yeni Alış Faturası': 'word.yeni_alis_faturasi',
    'Satış İrsaliyesi': 'word.satis_irsaliyesi',
    'Alış İrsaliyesi': 'word.alis_irsaliyesi',
    'Satış İadesi': 'word.satis_iadesi',
    'Alış İadesi': 'word.alis_iadesi',
    'E-Müstahsil': 'word.e_mustahsil',
    'Fatura Raporu': 'word.fatura_raporu',
    'E-Fatura\\s*': 'sidebar.einvoice' // some minor spaces might linger
};

let filesUpdated = 0;

files.forEach(file => {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // We do careful replacements to catch >Text< or whitespace around text 
    for (const [turkishText, key] of Object.entries(dict)) {
        const safeWord = turkishText.replace(/\\/g, '\\\\'); 
        
        // This time explicitly matching > followed by optional whitespace, the word, optional whitespace and then EITHER < or end of line.
        // Actually, html usually has \n before <, so we just match > followed by text up to <.
        const rx = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
        if (rx.test(html)) {
            // we do a replace that skips if it's already inside an i18n span.
            const parts = html.split(rx); 
            // Better to just string.replace
            html = html.replace(rx, (match, p1, p2, p3, p4, p5) => {
                return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
            });
            changed = true;
        }

        // Special fallback: if it's literally an exact match between tags without whitespace capture groups breaking
        const rx2 = new RegExp('([>])(' + safeWord + ')([<])', 'g');
        if (rx2.test(html)) {
            html = html.replace(rx2, '$1<span data-i18n="' + key + '">$2</span>$3');
            changed = true;
        }

        // What if it is `</i> Satış İadesi\r\n` without `<`?
        const rx3 = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*\\r?\\n)', 'g');
        if (rx3.test(html)) {
            html = html.replace(rx3, '$1$2<span data-i18n="' + key + '">$3</span>$4');
            changed = true;
        }
        
       // Another case: heading `<h2 class="mb-0">Fatura Listesi</h2>`
       const rx4 = new RegExp('<h[1-6][^>]*>\\s*(' + safeWord + ')\\s*</h[1-6]>', 'g');
       if (rx4.test(html)) {
            html = html.replace(rx4, (match, p1) => {
                return match.replace(p1, '<span data-i18n="' + key + '">' + p1 + '</span>');
            });
            changed = true;
       }
    }
    
    // specifically target "Fatura Listesi" inside <h2> tag with any class
    if (html.includes('<h2>Fatura Listesi</h2>')) {
        html = html.replace('<h2>Fatura Listesi</h2>', '<h2><span data-i18n="word.fatura_listesi">Fatura Listesi</span></h2>');
        changed = true;
    }

    if (changed) {
        // Cache bust translations.js
        html = html.replace(/ translations\.js\?v=\d+ /g, 'translations.js?v=7');
        if(html.includes('translations.js?v=5')){
            html = html.replace('translations.js?v=5', 'translations.js?v=7');
        } else if(html.includes('translations.js?v=6')){
            html = html.replace('translations.js?v=6', 'translations.js?v=7');
        } else if(html.includes('translations.js') && !html.includes('translations.js?v=7')){
            html = html.replace('translations.js', 'translations.js?v=7');
        }
        
        fs.writeFileSync(filePath, html, 'utf8');
        filesUpdated++;
    }
});

console.log('Successfully patched ' + filesUpdated + ' HTML files with Invoice dictionary words.');

// Now update translations.js
const transFile = path.join(dir, 'translations.js');
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'word.fatura_listesi': 'Fatura Listesi',
        'word.yeni_satis_faturasi': 'Yeni Satış Faturası',
        'word.yeni_alis_faturasi': 'Yeni Alış Faturası',
        'word.satis_irsaliyesi': 'Satış İrsaliyesi',
        'word.alis_irsaliyesi': 'Alış İrsaliyesi',
        'word.satis_iadesi': 'Satış İadesi',
        'word.alis_iadesi': 'Alış İadesi',
        'word.e_mustahsil': 'E-Müstahsil',
        'word.fatura_raporu': 'Fatura Raporu',`,
    'en': `        'word.fatura_listesi': 'Invoice List',
        'word.yeni_satis_faturasi': 'New Sales Invoice',
        'word.yeni_alis_faturasi': 'New Purchase Invoice',
        'word.satis_irsaliyesi': 'Sales Waybill',
        'word.alis_irsaliyesi': 'Purchase Waybill',
        'word.satis_iadesi': 'Sales Return',
        'word.alis_iadesi': 'Purchase Return',
        'word.e_mustahsil': 'E-Producer Receipt',
        'word.fatura_raporu': 'Invoice Report',`,
    'de': `        'word.fatura_listesi': 'Rechnungsliste',
        'word.yeni_satis_faturasi': 'Neue Verkaufsrechnung',
        'word.yeni_alis_faturasi': 'Neue Einkaufsrechnung',
        'word.satis_irsaliyesi': 'Verkaufslieferschein',
        'word.alis_irsaliyesi': 'Einkaufslieferschein',
        'word.satis_iadesi': 'Verkaufsrückgabe',
        'word.alis_iadesi': 'Einkaufsrückgabe',
        'word.e_mustahsil': 'E-Erzeugerquittung',
        'word.fatura_raporu': 'Rechnungsbericht',`,
    'ru': `        'word.fatura_listesi': 'Список счетов',
        'word.yeni_satis_faturasi': 'Новый счет-фактура продажи',
        'word.yeni_alis_faturasi': 'Новый счет-фактура покупки',
        'word.satis_irsaliyesi': 'Накладная продажи',
        'word.alis_irsaliyesi': 'Накладная покупки',
        'word.satis_iadesi': 'Возврат продажи',
        'word.alis_iadesi': 'Возврат покупки',
        'word.e_mustahsil': 'Эл. квитанция производителя',
        'word.fatura_raporu': 'Отчет по счетам',`,
    'zh': `        'word.fatura_listesi': '发票列表',
        'word.yeni_satis_faturasi': '新销售发票',
        'word.yeni_alis_faturasi': '新采购发票',
        'word.satis_irsaliyesi': '销售运单',
        'word.alis_irsaliyesi': '采购运单',
        'word.satis_iadesi': '销售退货',
        'word.alis_iadesi': '采购退货',
        'word.e_mustahsil': '电子生产者收据',
        'word.fatura_raporu': '发票报表',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(transFile, js, 'utf8');

console.log('Successfully injected translated objects into translations.js');
