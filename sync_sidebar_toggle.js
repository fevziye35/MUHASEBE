const fs = require('fs');
const path = require('path');

// 1. Update script.js
const scriptPath = path.join(__dirname, 'script.js');
let scriptJs = fs.readFileSync(scriptPath, 'utf8');

const oldToggleCode = /\/\/ Toggle Sidebar on mobile[\s\S]*?if \(toggleBox && sidebar\) \{[\s\S]*?toggleBox\.addEventListener\('click', \(\) => \{[\s\S]*?sidebar\.classList\.toggle\('active'\);[\s\S]*?\}\);[\s\S]*?\}/;

const newToggleCode = `// Toggle Sidebar on Desktop and Mobile
    const toggleBox = document.querySelector('.sidebar-toggle-box');
    
    if (toggleBox) {
        toggleBox.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }`;

scriptJs = scriptJs.replace(oldToggleCode, newToggleCode);
fs.writeFileSync(scriptPath, scriptJs, 'utf8');


// 2. Append CSS to styles.css
const cssPath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const newCSS = `

/* ========================================================= */
/* SIDEBAR TOGGLE MECHANISM (HIDDEN/COLLAPSED STATE)         */
/* ========================================================= */
.sidebar {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.main-content {
    transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.header {
    transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

body.sidebar-collapsed .sidebar {
    transform: translateX(-100%) !important;
}

body.sidebar-collapsed .main-content {
    margin-left: 0 !important;
}

body.sidebar-collapsed .header {
    left: 0 !important;
}

/* Ensure mobile sidebar toggle also works correctly via same principle */
@media (max-width: 1024px) {
    .sidebar {
        transform: translateX(-100%) !important;
    }
    body.sidebar-collapsed .sidebar {
        transform: translateX(0) !important;
    }
    .main-content {
        margin-left: 0 !important;
    }
    .header {
        left: 0 !important;
    }
}
`;

css += newCSS;
fs.writeFileSync(cssPath, css, 'utf8');

console.log('Successfully added functionality to hide/show sidebar.');
