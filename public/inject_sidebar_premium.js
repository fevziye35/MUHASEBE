const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const premiumOverrides = `
/* ========================================================= */
/* PREMIUM SIDEBAR OVERRIDES - THE FINAL WORD                */
/* ========================================================= */
.sidebar {
    background: linear-gradient(180deg, #0f172a 0%, #17243b 60%, #1e293b 100%) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.25) !important;
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
    background: rgba(255, 255, 255, 0.06) !important;
    color: #ffffff !important;
    transform: translateX(4px) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}

.sidebar-menu li a.active {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 100%) !important;
    color: #ffffff !important;
    border-left-color: #3b82f6 !important;
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
    color: #38bdf8 !important;
}

.sidebar-menu li a.active i {
    color: #3b82f6 !important;
}

.sidebar-menu .submenu li a {
    margin: 2px 16px !important;
    border-radius: 8px !important;
    border-left: 2px solid transparent !important;
    padding: 10px 20px 10px 48px !important;
}

.sidebar-menu .submenu li a:hover {
    background: rgba(255, 255, 255, 0.04) !important;
    color: #e2e8f0 !important;
    border-left-color: #38bdf8 !important;
    transform: translateX(3px) !important;
    box-shadow: none !important;
}

.sidebar-menu .submenu li a.active {
    background: rgba(56, 189, 248, 0.08) !important;
    border-left-color: #38bdf8 !important;
    color: #ffffff !important;
    box-shadow: none !important;
}

.sidebar-logo {
    margin-bottom: 25px !important;
}
.sidebar-logo a img {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)) !important;
}
`;

css += '\n' + premiumOverrides;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Appended ultimate premium sidebar overrides.');
