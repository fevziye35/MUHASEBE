const fs = require('fs');
const path = require('path');

const mappings = {
    '\u00c5\u009f': '\u015f', // ş
    '\u00c4\u00b1': '\u0131', // ı
    '\u00c4\u00b0': '\u0130', // İ
    '\u00c5\u009e': '\u015e', // Ş
    '\u00c3\u009c': '\u00dc', // Ü
    '\u00c3\u00bc': '\u00fc', // ü
    '\u00c3\u0096': '\u00d6', // Ö
    '\u00c3\u00b6': '\u00f6', // ö
    '\u00c3\u0087': '\u00c7', // Ç
    '\u00c3\u00a7': '\u00e7', // ç
    '\u00c4\u009f': '\u011f', // ğ
    '\u00c4\u009e': '\u011e', // Ğ
    '\u00e2\u201a\u00ba': '\u20ba', // ₺
    '\u00c3\u00a2': '\u00e2', // â
    '\u00c3\u00ae': '\u00ee', // î
};

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
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
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        for (const [key, value] of Object.entries(mappings)) {
            while (content.includes(key)) {
                content = content.split(key).join(value);
            }
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
});
