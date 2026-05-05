const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

// Replace all occurrences of literal \n followed by mega config
js = js.replace(/\\{\\\\n/g, '{\\n'); // If it's `{\\n`
js = js.replace(/\\{\\n/g, '{\\n'); // If it's literally `{\n`
js = js.replace("{str", "{");

// Let's just do a string replacement for the exact literal broken pieces
js = js.replace("'tr': {\\n        'mega.add_stock_card'", "'tr': {\\n        'mega.add_stock_card'");
js = js.split("'tr': {\\n        'mega.add_stock_card'").join("'tr': {\\n        'mega.add_stock_card'");
js = js.replace("'en': {\\n        'mega.add_stock_card'", "'en': {\\n        'mega.add_stock_card'");
js = js.replace("'de': {\\n        'mega.add_stock_card'", "'de': {\\n        'mega.add_stock_card'");
js = js.replace("'ru': {\\n        'mega.add_stock_card'", "'ru': {\\n        'mega.add_stock_card'");
js = js.replace("'zh': {\\n        'mega.add_stock_card'", "'zh': {\\n        'mega.add_stock_card'");

// Wait, the file actually says:
// 'tr': {\n        'mega.add_stock_card':
// That means the string contains a literal backslash followed by 'n'.
js = js.replaceAll("'tr': {\\\\n        'mega.add_stock_card'", "'tr': {\\n        'mega.add_stock_card'");
js = js.replaceAll("'en': {\\\\n        'mega.add_stock_card'", "'en': {\\n        'mega.add_stock_card'");
js = js.replaceAll("'de': {\\\\n        'mega.add_stock_card'", "'de': {\\n        'mega.add_stock_card'");
js = js.replaceAll("'ru': {\\\\n        'mega.add_stock_card'", "'ru': {\\n        'mega.add_stock_card'");
js = js.replaceAll("'zh': {\\\\n        'mega.add_stock_card'", "'zh': {\\n        'mega.add_stock_card'");

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');
console.log("Fixed translations.js syntax error");
