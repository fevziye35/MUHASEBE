const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'personel_takip.html'), 'utf8');

// Fix the mangled spans
html = html.replace(/<span data-i18n="14 <span data-i18n=&quot;word.gun&quot;>Gün<\/span>">14 Gün<\/span>/g, '14 <span data-i18n="word.gun">Gün</span>');
// Sometimes JS replace without regex escaping outputs:
html = html.replace(/<span data-i18n="14 <span data-i18n="word\.gun">Gün<\/span>">14 Gün<\/span>/g, '14 <span data-i18n="word.gun">Gün</span>');

// Alternatively, let's just use a loose regex to strip the mangled wrapper:
html = html.replace(/<span data-i18n="14 <span data-i18n=\\?"word\.gun\\?">Gün<\/span>">14 Gün<\/span>/g, '14 <span data-i18n="word.gun">Gün</span>');
html = html.replace(/<span data-i18n="3 <span data-i18n=\\?"word\.gun\\?">Gün<\/span>">3 Gün<\/span>/g, '3 <span data-i18n="word.gun">Gün</span>');

// Let's just find "Gün\">14 Gün" context directly to be safest:
// In the original file it was:
// <span style="background: #fee2e2; color: #ef4444; padding: 6px 15px; border-radius: 6px; font-weight: bold; font-size: 13px;">...</span>
// Let's replace the whole span content for 14 Days and 3 Days if they contain the exact text
html = html.replace(/<span([^>]*)>(.*?)14 Gün(.*?)<\/span>/g, (m, p1) => {
    // Check if it's the specific badge span
    if (m.includes('fee2e2')) {
        return '<span' + p1 + '>14 <span data-i18n="word.gun">Gün</span></span>';
    }
    return m;
});

html = html.replace(/<span([^>]*)>(.*?)3 Gün(.*?)<\/span>/g, (m, p1) => {
    if (m.includes('fee2e2')) {
        return '<span' + p1 + '>3 <span data-i18n="word.gun">Gün</span></span>';
    }
    return m;
});

// Also check "3 Adet" just in case it got mangled too.
html = html.replace(/<div class="stat-val">(.*?)3 Adet(.*?)<\/div>/g, '<div class="stat-val">3 <span data-i18n="word.adet_short">Adet</span></div>');
html = html.replace(/<div style="font-size: 1\.4rem; font-weight: 700; color: #1e293b;">(.*?)3 Adet(.*?)<\/div>/g, '<div style="font-size: 1.4rem; font-weight: 700; color: #1e293b;">3 <span data-i18n="word.adet_short">Adet</span></div>');

// I also noticed in the screenshot: "12-26 Mayıs" and "21-23 Mayıs" are untranslated.
// Let's not try to translate the months inside the hardcoded text unless asked, since the date is a single string.
// I will just fix the mangled HTML.

fs.writeFileSync(path.join(__dirname, 'personel_takip.html'), html, 'utf8');
console.log('Fixed mangled inline spans.');
