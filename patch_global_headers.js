const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    let changed = false;

    if (html.includes('Geri Dön') && !html.includes('data-i18n="header.back"')) {
        html = html.replace(/>\s*Geri Dön\s*</g, '><span data-i18n="header.back">Geri Dön</span><');
        changed = true;
    }
    
    if (html.includes('Merkez') && !html.includes('data-i18n="header.center"')) {
        // Only target the header Merkez element, usually near lock icon
        html = html.replace(/(<div class="header-item"[^>]*>.*)Merkez(.*?<\/div>)/g, '$1<span data-i18n="header.center">Merkez</span>$2');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        updated++;
    }
});

console.log('Successfully patched universal headers in ' + updated + ' files.');
