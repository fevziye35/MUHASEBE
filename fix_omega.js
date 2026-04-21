const fs = require('fs');
const path = require('path');

// THE ULTIMATE MOJIBAKE MAP based on char codes
const mappings = [
    ['\u00c3\u2026\u00c2\u017e', '\u015e'], // Ş (Ş)
    ['\u00c3\u2026\u0178', '\u015f'],       // ş (Ã…Å¸)
    ['\u00c3\u0192\u00e2\u20ac\u0161', '\u00dc'], // Ü (ÃƒÅ“)
    ['\u00c3\u0192\u00c2\u00bc', '\u00fc'],       // ü (ü)
    ['\u00c3\u201e\u00c2\u00b0', '\u0130'],       // İ (İ)
    ['\u00c3\u201e\u00c2\u00b1', '\u0131'],       // ı (ı)
    ['\u00c3\u0192\u00e2\u20ac\u201c', '\u00d6'], // Ö (Ö)
    ['\u00c3\u0192\u00c2\u00b6', '\u00f6'],       // ö (ö)
    ['\u00c3\u201e\u00e2\u20ac\u017e', '\u011e'], // Ğ (Ã„Å½)
    ['\u00c3\u201e\u00c2\u0178', '\u011f'],       // ğ (Ã„Å¸)
    ['\u00c3\u0192\u00e2\u20ac\u00a1', '\u00c7'], // Ç (Ãƒâ€‡)
    ['\u00c3\u0192\u00c2\u00a7', '\u00e7'],       // ç (ç)
    ['\u00c5\u009e', '\u015e'], // Level 1 Ş
    ['\u00c5\u009f', '\u015f'], // Level 1 ş
    ['\u00c4\u00b0', '\u0130'], // Level 1 İ
    ['\u00c4\u00b1', '\u0131'], // Level 1 ı
    ['\u00c3\u009c', '\u00dc'], // Level 1 Ü
    ['\u00c3\u00bc', '\u00fc'], // Level 1 ü
    ['\u00c3\u0096', '\u00d6'], // Level 1 Ö
    ['\u00c3\u00b6', '\u00f6'], // Level 1 ö
    ['\u00c3\u0087', '\u00c7'], // Level 1 Ç
    ['\u00c3\u00a7', '\u00e7'], // Level 1 ç
    ['\u00c4\u009e', '\u011e'], // Level 1 Ğ
    ['\u00c4\u009f', '\u011f'], // Level 1 ğ
    ['\u00e2\u201a\u00ba', '\u20ba'], // Level 1 ₺
    ['\u00c3\u00a2', '\u00e2'],       // Level 1 â
    ['\u00c3\u00ae', '\u00ee'],       // Level 1 î
];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (file === '.git' || file === 'node_modules' || file === '.antigravity') return;
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    return arrayOfFiles;
}

const files = getAllFiles('.');
files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        let orig = content;
        for (let pass = 0; pass < 3; pass++) {
            let start = content;
            for (const [key, val] of mappings) {
                while (content.includes(key)) {
                    content = content.replace(key, val);
                }
            }
            if (content === start) break;
        }
        if (content !== orig) {
            fs.writeFileSync(f, content, 'utf8');
            console.log(`Re-Fixed: ${f}`);
        }
    } catch (e) {}
});
