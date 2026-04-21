const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const inlineModulesCSS = `

/* ========================================================= */
/* MEGAPATCH: SINGLE-ROW COMPACT HIZLI ERIŞIM (8 ITEMS)      */
/* ========================================================= */
.dash-modules-grid {
    grid-template-columns: repeat(8, 1fr) !important; /* Force all 8 to be on one single row */
    gap: 12px !important; /* Smaller gap to fit them all neatly */
    margin-bottom: 20px !important;
}

.dash-module-card {
    padding: 16px 8px !important; /* Extremely compact padding */
    min-height: 90px !important; /* Less tall */
    border-radius: 16px !important; /* Slightly less rounded out of proportion */
}

/* Make icons smaller so they don't dominate */
.dash-module-card .mod-icon {
    font-size: 1.4rem !important;
    margin-bottom: 8px !important;
}

/* Shrink text so "Döviz Ayarları" fits without breaking layout */
.dash-module-card .mod-label {
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    white-space: nowrap !important; /* Prevent text wrapping */
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

/* Ensure we respond to tablet/mobile cleanly so they don't squash into tiny slivers */
@media (max-width: 1400px) {
    .dash-modules-grid {
        grid-template-columns: repeat(4, 1fr) !important; /* 4x2 on smaller screens */
    }
}
@media (max-width: 992px) {
    .dash-modules-grid {
        grid-template-columns: repeat(2, 1fr) !important; /* 2x4 on mobile */
    }
}
`;

css += '\n' + inlineModulesCSS;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully applied inline compact CSS for dash modules.');
