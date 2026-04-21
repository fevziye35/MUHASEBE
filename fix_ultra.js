const fs = require('fs');
const path = require('path');

const mappings = [
    // ş (u015f)
    ['\u00c5\u009f', '\u015f'],
    ['\u00c3\u2026\u00c2\u0178', '\u015f'],
    ['\u00c3\u2026\u009f', '\u015f'],
    ['\u00c3\u2026\u0178', '\u015f'],

    // ı (u0131)
    ['\u00c4\u00b1', '\u0131'],
    ['\u00c3\u201e\u00c2\u00b1', '\u0131'],
    ['\u00c3\u201e\u00b1', '\u0131'],

    // İ (u0130)
    ['\u00c4\u00b0', '\u0130'],
    ['\u00c3\u201e\u00c2\u00b0', '\u0130'],
    ['\u00c3\u201e\u00b0', '\u0130'],

    // Ş (u015e)
    ['\u00c5\u009e', '\u015e'],
    ['\u00c3\u2026\u00e2\u20ac\u0153', '\u015e'],
    ['\u00c3\u2026\u009e', '\u015e'],

    // Ü (u00dc)
    ['\u00c3\u009c', '\u00dc'],
    ['\u00c3\u0192\u009c', '\u00dc'],
    ['\u00c3\u0192\u00e2\u20ac\u0161', '\u00dc'],

    // ü (u00fc)
    ['\u00c3\u00bc', '\u00fc'],
    ['\u00c3\u0192\u00bc', '\u00fc'],
    ['\u00c3\u0192\u00c2\u00bc', '\u00fc'],

    // ğ (u011f)
    ['\u00c4\u009f', '\u011f'],
    ['\u00c3\u201e\u00c2\u0178', '\u011f'],
    ['\u00c3\u201e\u009f', '\u011f'],

    // Ğ (u011e)
    ['\u00c4\u009e', '\u011e'],
    ['\u00c3\u201e\u00e2\u20ac\u017e', '\u011e'],
    ['\u00c3\u201e\u009e', '\u011e'],

    // ç (u00e7)
    ['\u00c3\u00a7', '\u00e7'],
    ['\u00c3\u0192\u00a7', '\u00e7'],
    ['\u00c3\u0192\u00c2\u00a7', '\u00e7'],

    // Ç (u00c7)
    ['\u00c3\u0087', '\u00c7'],
    ['\u00c3\u0192\u0087', '\u00c7'],
    ['\u00c3\u0192\u00e2\u20ac\u00a1', '\u00c7'],
    
    // ö (u00f6)
    ['\u00c3\u00b6', '\u00f6'],
    ['\u00c3\u0192\u00b6', '\u00f6'],
    ['\u00c3\u0192\u00c2\u00b6', '\u00f6'],

    // Ö (u00d6)
    ['\u00c3\u0096', '\u00d6'],
    ['\u00c3\u0192\u0096', '\u00d6'],
    ['\u00c3\u0192\u00e2\u20ac\u201c', '\u00d6'],

    // ₺ (u20ba)
    ['\u00e2\u201a\u00ba', '\u20ba'],
    ['\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00ba', '\u20ba'],
];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        if (file === '.git' || file === 'node_modules' || file === '.antigravity') return;
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
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
            console.log(`Fixed: ${f}`);
        }
    } catch (e) {}
});
