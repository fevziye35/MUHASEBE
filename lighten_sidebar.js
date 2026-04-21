const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

// The current background in the Corporate Blue overrides is:
// background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
const oldBackgroundRegex = /background:\s*linear-gradient\(180deg,\s*#1e293b\s*0%,\s*#0f172a\s*100%\)\s*!important;/g;

// We will change it to a much lighter, softer slate that matches the logo better
const newBackground = `background: linear-gradient(180deg, #2b394e 0%, #1f2a3a 100%) !important;`;

if (oldBackgroundRegex.test(css)) {
    css = css.replace(oldBackgroundRegex, newBackground);
    fs.writeFileSync(filePath, css, 'utf8');
    console.log('Successfully lightened sidebar background to #2b394e - #1f2a3a.');
} else {
    // Fallback if regex fails, just append an override to the very bottom
    css += `\n/* Quick lighten patch for sidebar */\n.sidebar { background: linear-gradient(180deg, #2b394e 0%, #1f2a3a 100%) !important; }\n`;
    fs.writeFileSync(filePath, css, 'utf8');
    console.log('Appended lightened sidebar background to end of file.');
}
