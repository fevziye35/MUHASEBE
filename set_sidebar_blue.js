const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

// We need to replace ANY of our previous premium backgrounds with the Royal Blue provided.
// The image provided is a Royal Blue: top ~ #1d428a, bottom ~ #2552a4.

const royalBlueCSS = `background: linear-gradient(180deg, #1d428a 0%, #2552a4 100%) !important;`;

// Replace the previous background patches
css = css.replace(/background:\s*linear-gradient\(180deg,\s*#1e293b\s*0%,\s*#0f172a\s*100%\)\s*!important;/g, royalBlueCSS);
css = css.replace(/background:\s*linear-gradient\(180deg,\s*#2b394e\s*0%,\s*#1f2a3a\s*100%\)\s*!important;/g, royalBlueCSS);

// Also check for the appended patch
if(css.includes('/* Quick lighten patch for sidebar */')) {
    css = css.replace(/\.sidebar\s*\{\s*background:\s*linear-gradient\(180deg,\s*#2b394e\s*0%,\s*#1f2a3a\s*100%\)\s*!important;\s*\}/g, `.sidebar { ${royalBlueCSS} }`);
}

// Add an ultimate override at the very end just to be 100% sure
css += `\n/* User Explicit Sidebar Color Override */\n.sidebar { ${royalBlueCSS} }\n`;

// Since the background is now a rich Blue, the active state colors should contrast cleanly.
// If active is #4481eb, it might blend too much with #2552a4. 
// A lighter cyan/white hover is better against this solid blue.
css += `
.sidebar-menu li a:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    color: #ffffff !important;
}
.sidebar-menu li a.active {
    background: rgba(255, 255, 255, 0.2) !important;
    border-left-color: #ffffff !important;
    color: #ffffff !important;
}
.sidebar-menu li a.active i {
    color: #ffffff !important;
}
`;

fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully applied the user-provided royal blue background to the sidebar.');
