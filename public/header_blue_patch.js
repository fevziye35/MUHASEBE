const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const royalBlueHeaderCSS = `
/* ========================================================= */
/* MEGAPATCH: HEADER ROYAL BLUE L-SHAPE UNIFICATION          */
/* ========================================================= */
.header {
    /* Match the top of the sidebar exactly, then gradient across the top */
    background: linear-gradient(90deg, #1d428a 0%, #2552a4 100%) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

/* Ensure header icons and text remain pure white and beautiful */
.header-item, .header-item a, .sidebar-toggle-box, #header-lang-text {
    color: #ffffff !important;
    font-weight: 500 !important;
}

/* Hamburger menu hover needs to match the new background */
.sidebar-toggle-box:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}
`;

css += '\n' + royalBlueHeaderCSS;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully united the header with the Royal Blue sidebar.');
