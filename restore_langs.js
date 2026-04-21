const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const regex = /<div\s+class="header-lang-menu"\s+id="header-lang-menu">[\s\S]*?<\/div>\s*<\/div>\s*<div\s+class="header-item">/g;

const newLangMenu = `<div class="header-lang-menu" id="header-lang-menu">
                        <div class="header-lang-item" onclick="setLanguage('tr')"><i class="fa-solid fa-flag"></i> T&uuml;rk&ccedil;e</div>
                        <div class="header-lang-item" onclick="setLanguage('en')"><i class="fa-solid fa-flag-usa"></i> English</div>
                        <div class="header-lang-item" onclick="setLanguage('de')"><i class="fa-solid fa-flag"></i> Deutsch (Almanca)</div>
                        <div class="header-lang-item" onclick="setLanguage('ru')"><i class="fa-solid fa-flag"></i> Русский (Rus&ccedil;a)</div>
                        <div class="header-lang-item" onclick="setLanguage('zh')"><i class="fa-solid fa-flag"></i> 中文 (&Ccedil;ince)</div>
                    </div>
                </div>
                <div class="header-item">`;

let updatedCount = 0;
files.forEach(file => {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    if (regex.test(html)) {
        html = html.replace(regex, newLangMenu);
        fs.writeFileSync(filePath, html, 'utf8');
        updatedCount++;
    }
});

console.log('Restored languages to ' + updatedCount + ' HTML files.');
