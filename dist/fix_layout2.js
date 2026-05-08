const fs = require('fs');
const path = require('path');

function fixLayoutForFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove inline layout conflicts from <style>
    const styleStartIndex = content.indexOf('<style>');
    const formStyleMarker = '/* Refactored Form Styles */';
    const formStyleIndex = content.indexOf(formStyleMarker);

    if (styleStartIndex !== -1 && formStyleIndex !== -1 && styleStartIndex < formStyleIndex) {
        content = content.substring(0, styleStartIndex + 7) + '\n        ' + content.substring(formStyleIndex);
    }
    
    // Also remove the second <main class="main-content"> if it got duplicated. No wait let's just write replacing the whole thing properly.
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed styles in:', filePath);
}

// Fix stok_yeni.html
['stok_yeni.html', 'satis_yap.html', 'kisi_ekle.html', 'teklif_olustur.html', 'teklif_siparis.html', 'e_smm.html', 'taksit_yeni.html', 'satis_faturasi.html'].forEach(f => {
    fixLayoutForFile(path.join(__dirname, f));
});
