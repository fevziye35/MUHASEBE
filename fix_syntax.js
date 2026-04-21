const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'script.js');
let text = fs.readFileSync(filePath, 'utf8');

const regex = /\}\s*\r?\n\s*\/\/ Apply Translations\s*\r?\n\s*applyTranslations\(lang\);\s*\r?\n\}/;
if (regex.test(text)) {
    text = text.replace(regex, '}');
    fs.writeFileSync(filePath, text, 'utf8');
    console.log('Fixed syntax error in script.js by removing orphaned translations call.');
} else {
    console.error('Regex did not match.');
}
