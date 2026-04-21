const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    
    files.forEach(function (file) {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Regex to match the logo area and its span exactly as formatted
            const regex = /<div class="logo-area">\s*<span class="brand-text brand-text-header" data-i18n="dashboard\.title">MAKFA GIDA ÜRÜNLERİ SANAYİ TİCARET ANONİM ŞİRKETİ<\/span>\s*<\/div>/gi;
            // Also a fallback regex in case of slight formatting differences
             const regex2 = /<div class="logo-area">\s*<span class="brand-text brand-text-header"[^>]*>.*?<\/span>\s*<\/div>/gi;

            let stringToReplace = '';
            
            if(regex.test(content) || regex2.test(content)){
                content = content.replace(regex, stringToReplace);
                content = content.replace(regex2, stringToReplace);
                
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated: ${file}`);
            }
        }
    });
    console.log("All HTML files processed.");
});
