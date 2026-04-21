const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const goldOverrides = `
/* ========================================================= */
/* PREMIUM SIDEBAR OVERRIDES - GOLD & MIDNIGHT EDITION       */
/* ========================================================= */
.sidebar {
    /* True Midnight Blue from the Logo Background */
    background: linear-gradient(180deg, #0b1320 0%, #121c2f 60%, #172338 100%) !important;
    border-right: 1px solid rgba(212, 175, 55, 0.1) !important;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3) !important;
}

.sidebar-menu li a {
    margin: 4px 16px !important;
    border-radius: 10px !important;
    border-left: 4px solid transparent !important;
    padding: 13px 20px !important;
    color: #a0aec0 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.sidebar-menu li a:hover {
    background: rgba(255, 255, 255, 0.04) !important;
    color: #cca43b !important; /* Soft Gold Hover */
    transform: translateX(4px) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}

.sidebar-menu li a.active {
    /* Subtle Gold Tinted Active Block */
    background: linear-gradient(90deg, rgba(204, 164, 59, 0.12) 0%, rgba(204, 164, 59, 0) 100%) !important;
    color: #ffffff !important;
    border-left-color: #cca43b !important; /* Gold Active Ribbon */
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
    color: #cca43b !important;
}

.sidebar-menu li a.active i {
    color: #d4af37 !important; /* Brighter gold for active icon */
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
    color: #cca43b !important;
    border-left-color: #cca43b !important;
    transform: translateX(3px) !important;
}

.sidebar-menu .submenu li a.active {
    background: rgba(204, 164, 59, 0.08) !important;
    border-left-color: #d4af37 !important;
    color: #ffffff !important;
}

.sidebar-logo a img {
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)) !important;
}
`;

// we will append this directly to overwrite the previous overrides!
css += '\n' + goldOverrides;

fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully injected Gold & Midnight Blue sidebar aesthetics');
