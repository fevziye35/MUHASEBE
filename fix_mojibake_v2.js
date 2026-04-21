const fs = require('fs');
const path = require('path');

// Comprehensive mappings for various levels of mojibake
const mappings = [
    // Level 3 (Triple mangled)
    ['\u00c3\u0192\u00c2\u2030', '\u00c9'], // É
    ['\u00c3\u0192\u201c', '\u00d3'], // Ó
    ['\u00c3\u0192\u00e2\u20ac\u0161', '\u00dc'], // Ü
    ['\u00c3\u0192\u00c2\u00bc', '\u00fc'], // ü
    ['\u00c3\u0192\u00c2\u0153', '\u00dc'], // Ü
    ['\u00c3\u0192\u0178', '\u00df'], // ß
    ['\u00c3\u2026\u00e2\u20ac\u0153', '\u015e'], // Ş
    ['\u00c3\u2026\u00c2\u0178', '\u015f'], // ş
    ['\u00c3\u2026\u00c2\u00a1', '\u0131'], // ı
    ['\u00c3\u2026\u00e2\u20ac\u00a2', '\u0130'], // İ
    ['\u00c3\u201e\u00e2\u20ac\u017e', '\u011e'], // Ğ
    ['\u00c3\u201e\u00c2\u0178', '\u011f'], // ğ
    
    // Level 2 (Double mangled)
    ['\u00c3\u0192\u00bc', '\u00fc'], // ü
    ['\u00c3\u0192\u009c', '\u00dc'], // Ü
    ['\u00c3\u0192\u00a7', '\u00e7'], // ç
    ['\u00c3\u0192\u0087', '\u00c7'], // Ç
    ['\u00c3\u0192\u00b6', '\u00f6'], // ö
    ['\u00c3\u0192\u0096', '\u00d6'], // Ö
    ['\u00c3\u201e\u00b1', '\u0131'], // ı
    ['\u00c3\u201e\u00b0', '\u0130'], // İ
    ['\u00c3\u2026\u009f', '\u015f'], // ş
    ['\u00c3\u2026\u009e', '\u015e'], // Ş
    ['\u00c3\u201e\u009f', '\u011f'], // ğ
    ['\u00c3\u201e\u009e', '\u011e'], // Ğ
    ['\u00c3\u0192\u00a2', '\u00e2'], // â
    ['\u00c3\u0192\u00ae', '\u00ee'], // î

    // Additional Observed Patterns
    ['Ü', 'Ü'],
    ['ü', 'ü'],
    ['ç', 'ç'],
    ['Ç', 'Ç'],
    ['ö', 'ö'],
    ['Ö', 'Ö'],
    ['ı', 'ı'],
    ['İ', 'İ'],
    ['ş', 'ş'],
    ['Ş', 'Ş'],
    ['ğ', 'ğ'],
    ['Ğ', 'Ğ'],
    ['₺', '₺'],
    ['â', 'â'],
    ['î', 'î'],

    // Level 1 (Single mangled)
    ['\u00c5\u009f', '\u015f'], // ş
    ['\u00c4\u00b1', '\u0131'], // ı
    ['\u00c4\u00b0', '\u0130'], // İ
    ['\u00c5\u009e', '\u015e'], // Ş
    ['\u00c3\u009c', '\u00dc'], // Ü
    ['\u00c3\u00bc', '\u00fc'], // ü
    ['\u00c3\u0096', '\u00d6'], // Ö
    ['\u00c3\u00b6', '\u00f6'], // ö
    ['\u00c3\u0087', '\u00c7'], // Ç
    ['\u00c3\u00a7', '\u00e7'], // ç
    ['\u00c4\u009f', '\u011f'], // ğ
    ['\u00c4\u009e', '\u011e'], // Ğ
    ['\u00e2\u201a\u00ba', '\u20ba'], // ₺
    ['\u00c3\u00a2', '\u00e2'], // â
    ['\u00c3\u00ae', '\u00ee'], // î
];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (file === '.git' || file === 'node_modules') return;
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

const filesToFix = getAllFiles('.');

filesToFix.forEach(filePath => {
    try {
        let contentBuf = fs.readFileSync(filePath);
        let content = contentBuf.toString('utf8');
        let originalContent = content;

        // Perform multiple passes to catch nested mojibake
        let changed = true;
        let p = 0;
        while (changed && p < 5) {
            let startContent = content;
            for (const [key, value] of mappings) {
                while (content.includes(key)) {
                    content = content.split(key).join(value);
                }
            }
            changed = (content !== startContent);
            p++;
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
});
