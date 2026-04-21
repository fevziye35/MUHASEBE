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

const badPattern1 = /<div class="header-item">\s*<i class="fa-solid fa-flag"><\/i>\s*Türkçe\s*<\/div>/g;
const badPattern2 = /<div class="header-item">\s*<i class="fa-solid fa-flag"><\/i>\s*<span id="header-lang-text">Türkçe<\/span>\s*<\/div>/g;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (badPattern1.test(html)) {
        html = html.replace(badPattern1, correctDropdown);
        changed = true;
    }
    
    // Some might have the span but missing the dropdown menu entirely
    if (!html.includes('header-lang-menu') && html.includes('<div class="header-item header-lang-dropdown"')) {
        // Wait, if it has header-lang-dropdown but no header-lang-menu, we would need to fix it. 
        // Let's just do a manual check. But the above badPattern1 catches toplu_stok_raporu at least.
    }

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Fixed Language Dropdown in', file);
    }
});

// Also let's check ALL files to see if any have "header-lang-dropdown" but NOT "header-lang-menu"
files.forEach(file => {
    let filePath = path.join(__dirname, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    const divHeader = html.indexOf('<div class="header-right">');
    if (divHeader !== -1) {
        const flagIndex = html.indexOf('fa-flag', divHeader);
        if (flagIndex !== -1 && !html.includes('header-lang-menu')) {
             console.log('WARNING: Missing lang menu in', file);
             // We can safely replace the exact line if we find it.
             // We'll use a regex to replace between `<div class="header-right">` and the next `header-item`
        }
    }
});
