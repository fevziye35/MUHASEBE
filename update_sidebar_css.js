const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const regex = /\/\* Sidebar \(Unified\) \*\/[\s\S]*?\.sidebar-menu li\.has-submenu\.open > a \{[\s\S]*?\}/;

const newSidebarCss = `/* Sidebar (Unified Premium Design) */
.sidebar {
    width: 340px;
    height: 100vh;
    background: linear-gradient(180deg, #0f172a 0%, #17243b 60%, #1e293b 100%);
    position: fixed;
    left: 0;
    top: 0;
    padding-top: 10px;
    overflow-y: auto;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.25);
    z-index: 1000;
    color: #f8fafc;
}

.sidebar::-webkit-scrollbar {
    width: 6px;
}
.sidebar::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
}

.sidebar-logo {
    position: relative;
    width: 100%;
    height: auto;
    padding: 25px 0 15px 0;
    background: transparent;
    color: #ecf0f1;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 15px;
}

.sidebar-logo img {
    width: 300px !important;
    height: auto !important;
    max-width: 100%;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
}

.sidebar-logo i {
    color: #ecf0f1;
    margin-left: auto;
    cursor: pointer;
}

/* Logo Link */
.sidebar-logo a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
}

.btn-relative {
    position: relative;
}

.sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-menu li a {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 13px 20px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin: 4px 16px;
    border-radius: 10px;
    border-left: 4px solid transparent;
}

.sidebar-menu li a:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.sidebar-menu li a.active {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 100%);
    color: #ffffff;
    border-left-color: #3b82f6;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.sidebar-menu li a i {
    width: 22px;
    text-align: center;
    font-size: 15px;
    transition: transform 0.3s;
}

.sidebar-menu li a:hover i {
    transform: scale(1.15);
    color: #38bdf8;
}
.sidebar-menu li a.active i {
    color: #3b82f6;
}

/* Sidebar Submenu Styles */
.sidebar-menu li.has-submenu {
    position: relative;
}

.sidebar-menu .submenu {
    list-style: none;
    padding: 0;
    margin: 0;
    background: transparent;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-menu li.has-submenu.open > .submenu {
    max-height: 900px;
    margin-bottom: 8px;
}

.sidebar-menu .submenu li a {
    padding: 10px 20px 10px 48px !important;
    font-size: 13.5px;
    color: #64748b;
    margin: 2px 16px;
    border-radius: 8px;
    border-left: 2px solid transparent;
}

.sidebar-menu .submenu li a:hover {
    background: rgba(255, 255, 255, 0.04);
    color: #e2e8f0;
    border-left-color: #38bdf8;
    transform: translateX(3px);
}

.sidebar-menu .submenu li a.active {
    color: #ffffff;
    background: rgba(56, 189, 248, 0.08);
    border-left-color: #38bdf8;
}

.sidebar-menu .submenu li a i {
    font-size: 12px;
    opacity: 0.7;
    width: 18px;
}

.sidebar-menu .submenu li a:hover i {
    color: #38bdf8;
}

.sidebar-menu .arrow {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 11px;
    opacity: 0.6;
}

.sidebar-menu li.has-submenu.open > a .arrow {
    transform: rotate(90deg);
    opacity: 1;
}

.sidebar-menu li.has-submenu.open > a {
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    border-left-color: #64748b;
}`;

if (regex.test(css)) {
    css = css.replace(regex, newSidebarCss);
    fs.writeFileSync(filePath, css, 'utf8');
    console.log('Successfully updated styles.css with Premium Sidebar.');
} else {
    console.log('Failed to match Regex!');
}
