const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

// Replace the older premium overrides
const corporateBlueOverrides = `
/* ========================================================= */
/* PREMIUM SIDEBAR OVERRIDES - MODERN CORPORATE BLUE SLATE   */
/* ========================================================= */
.sidebar {
    /* Very modern deep slate gray/charcoal, giving a 'clean' tech vibe */
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15) !important;
}

.sidebar-menu li a {
    margin: 4px 16px !important;
    border-radius: 10px !important;
    border-left: 4px solid transparent !important;
    padding: 13px 20px !important;
    color: #94a3b8 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.sidebar-menu li a:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    color: #f8fafc !important; 
    transform: translateX(4px) !important;
}

.sidebar-menu li a.active {
    /* Matching the uniform button blue gradient from styles.css */
    background: linear-gradient(90deg, rgba(68, 129, 235, 0.15) 0%, rgba(68, 129, 235, 0) 100%) !important;
    color: #ffffff !important;
    border-left-color: #4481eb !important; 
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02) !important;
}

.sidebar-menu li a i {
    width: 22px !important;
    text-align: center !important;
    font-size: 15px !important;
    transition: transform 0.3s !important;
}

.sidebar-menu li a:hover i {
    transform: scale(1.15) !important;
    color: #04befe !important; /* Bright Cyan highlight */
}

.sidebar-menu li a.active i {
    color: #4481eb !important; /* Strong Blue for active */
}

/* Submenu specifics */
.sidebar-menu .submenu li a {
    margin: 2px 16px !important;
    border-radius: 8px !important;
    border-left: 2px solid transparent !important;
    padding: 10px 20px 10px 48px !important;
}

.sidebar-menu .submenu li a:hover {
    background: rgba(255, 255, 255, 0.03) !important;
    color: #04befe !important;
    border-left-color: #04befe !important;
    transform: translateX(3px) !important;
}

.sidebar-menu .submenu li a.active {
    background: rgba(68, 129, 235, 0.08) !important;
    border-left-color: #4481eb !important;
    color: #ffffff !important;
}

.sidebar-logo a img {
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)) !important;
}
`;

// Remove the gold edition
css = css.replace(/\/\* ========================================================= \*\/[\s\S]*?\/\* PREMIUM SIDEBAR OVERRIDES - GOLD \& MIDNIGHT EDITION       \*\/[\s\S]*?filter: drop-shadow\(0 4px 8px rgba\(0,0,0,0\.4\)\) !important;\n}/, '');

css += '\n' + corporateBlueOverrides;

fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully injected Vibrant Corporate Blue sidebar aesthetics');
