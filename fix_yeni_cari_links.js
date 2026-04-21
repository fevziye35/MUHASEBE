const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(srcDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Use a regex to find <a href="kisi_ekle.html" ...> ... Yeni Cari ... </a>
    // We can just use a simple regex replacing href that happens just before a "Yeni Cari" text which is common in buttons.
    
    // Specifically looking for:
    // <a href="kisi_ekle.html" ...><i ...></i> Yeni Cari Ekle</a>
    // <a href="kisi_ekle.html" ...><i ...></i> <span ...>Yeni Cari Ekle</span></a>

    // A simpler regex: find 'href="kisi_ekle.html"' and replace with 'href="new_account.html"' 
    // ONLY IF the same <a> tag contains 'Yeni Cari'
    
    // We'll replace using a regex that captures the <a> block
    const regex = /<a\s+href="kisi_ekle\.html"([^>]*>.*?Yeni Cari.*?<\/a>)/gis;
    
    if (regex.test(html)) {
        html = html.replace(regex, '<a href="new_account.html"$1');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        fixedCount++;
        console.log(`Fixed href in ${file}`);
    }
}

console.log(`Finished fixing ${fixedCount} files.`);
