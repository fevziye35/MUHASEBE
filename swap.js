const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let html = fs.readFileSync(file, 'utf8');

const regex = /(<!-- Quick Stats Row -->[\s\S]*?)(<!-- Quick Access Module Cards -->[\s\S]*?)(?=<!-- Charts Section -->)/;

const match = html.match(regex);
if(match) {
    let qs = match[1];
    let qa = match[2];
    
    // Ensure there's a clean line break
    const newHtml = html.replace(regex, qa + "\n            " + qs);
    fs.writeFileSync(file, newHtml, 'utf8');
    console.log('Successfully swapped Quick Access with Quick Stats.');
} else {
    console.error('Could not find the swap markers in index.html.');
}
