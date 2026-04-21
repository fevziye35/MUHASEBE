const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'script.js');
let js = fs.readFileSync(filePath, 'utf8');

// I need to repair setLanguage
// Look for `function setLanguage(lang) {\n        menu.classList.remove('show');`
const regexError = /function setLanguage\(lang\) \{\s*menu\.classList\.remove\('show'\);\s*\}/;

const fixedFunction = `function setLanguage(lang) {
    // Save preference
    localStorage.setItem('language', lang);

    // Update Header Text
    const textSpan = document.getElementById('header-lang-text');
    if (textSpan) {
        if (lang === 'tr') {
            textSpan.textContent = 'Türkçe';
        } else if (lang === 'en') {
            textSpan.textContent = 'English';
        } else if (lang === 'de') {
            textSpan.textContent = 'Deutsch';
        } else if (lang === 'ru') {
            textSpan.textContent = 'Русский';
        } else if (lang === 'zh') {
            textSpan.textContent = '中文';
        }
    }

    // Close menu after selection
    const menu = document.getElementById('header-lang-menu');
    if (menu) {
        menu.classList.remove('show');
    }

    // Apply Translations
    if (typeof applyTranslations === 'function') {
        applyTranslations(lang);
    }
}`;

// Because the fuzzy patcher may have munged it, let's just replace the broken chunk.
// If it's mangled, we can use a more generic replace.
let replaced = false;

// Attempt 1: If it mangled exactly as shown in the diff
const mangleMatch = /function setLanguage\(lang\) \{[\s\S]*?menu\.classList\.remove\('show'\);[\s\S]*?\}/;
if (mangleMatch.test(js)) {
    js = js.replace(mangleMatch, fixedFunction);
    replaced = true;
}

if(replaced) {
    fs.writeFileSync(filePath, js, 'utf8');
    console.log('Successfully repaired script.js');
} else {
    console.error('Could not find the mangled setLanguage block.');
}
