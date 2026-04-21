const fs = require('fs');
const path = require('path');

const correctDropdown = `                <div class="header-item header-lang-dropdown" onclick="toggleLanguageMenu(event)">
                    <i class="fa-solid fa-flag"></i> <span id="header-lang-text">Türkçe</span>
                    <div class="header-lang-menu" id="header-lang-menu">
                        <div class="header-lang-item" onclick="setLanguage('tr')"><i class="fa-solid fa-flag"></i> T&uuml;rk&ccedil;e</div>
                        <div class="header-lang-item" onclick="setLanguage('en')"><i class="fa-solid fa-flag-usa"></i> English</div>
                        <div class="header-lang-item" onclick="setLanguage('de')"><i class="fa-solid fa-flag"></i> Deutsch (Almanca)</div>
                        <div class="header-lang-item" onclick="setLanguage('ru')"><i class="fa-solid fa-flag"></i> Русский (Rus&ccedil;a)</div>
                        <div class="header-lang-item" onclick="setLanguage('zh')"><i class="fa-solid fa-flag"></i> 中文 (&Ccedil;ince)</div>
                    </div>
                </div>`;

const badPattern = /<div class="header-item">\s*<i class="fa-solid fa-flag"><\/i>\s*T&uuml;rk&ccedil;e\s*<\/div>/g;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(file => {
    let filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    if (badPattern.test(html)) {
        html = html.replace(badPattern, correctDropdown);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Fixed Language Dropdown in', file);
    }
});
