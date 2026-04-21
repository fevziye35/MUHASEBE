const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(filePath, 'utf8');

const bannerShrinkCSS = `
/* ========================================================= */
/* MEGAPATCH: SHRINK WELCOME BANNER FOR SLEEKER LOOK         */
/* ========================================================= */
.dash-welcome-banner {
    min-height: 100px !important;
    padding: 18px 25px !important;
    margin-bottom: 20px !important;
}

.welcome-text h1 {
    font-size: 1.7rem !important;
    margin-bottom: 4px !important;
}

.welcome-subtitle {
    font-size: 0.9rem !important;
}

.welcome-clock {
    font-size: 1.6rem !important;
    padding: 10px 20px !important;
    min-width: 150px !important;
    border-radius: 14px !important;
}

/* Adjust the decorative wave so it doesn't look weird on a thinner banner */
.welcome-wave {
    height: 60px !important;
    bottom: -10px !important;
}
`;

css += '\n' + bannerShrinkCSS;
fs.writeFileSync(filePath, css, 'utf8');
console.log('Successfully applied CSS to shrink the welcome banner.');
