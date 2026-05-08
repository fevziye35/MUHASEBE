const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const mainContentFixCSS = `

/* ========================================================= */
/* MEGAPATCH: MAIN CONTENT FULL WIDTH FLEX FIX               */
/* ========================================================= */
/* Since body is display: flex, .main-content needs flex: 1 
   to natively stretch and fill all available screen space. 
   Otherwise, it shrinks to contents when the sidebar closes! */
.main-content {
    flex: 1 !important;
    width: 100% !important;
    min-width: 0 !important; /* allow flex item to shrink below content size if necessary */
    overflow-x: hidden !important; /* prevent horizontal scrollbars */
}
`;

css += mainContentFixCSS;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully fixed main content flex scaling issue.');
