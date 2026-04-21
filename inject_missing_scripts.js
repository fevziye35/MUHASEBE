const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

let missingFiles = [];

for (const file of files) {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let changed = false;
        
        if (!content.includes('translations.js') || !content.includes('script.js')) {
            missingFiles.push(file);
            console.log(`Missing scripts in: ${file}`);
            
            // Carefully inject right before </body>
            let injections = [];
            if (!content.includes('translations.js')) {
                injections.push('<script src="translations.js?v=500"></script>');
            } else {
                // If translations exists but script.js doesn't, still update cache
                content = content.replace(/translations\\.js(\\?v=\\d+)?/g, 'translations.js?v=500');
            }
            
            if (!content.includes('script.js')) {
                injections.push('<script src="script.js"></script>');
            }
            
            if (injections.length > 0) {
                if (content.includes('</body>')) {
                    content = content.replace('</body>', "\\n" + injections.join("\\n") + "\\n</body>");
                } else {
                    content += "\\n" + injections.join("\\n");
                }
                changed = true;
            }
        } else {
            // Update cache version to 500
            if (/translations\\.js\\?v=\\d+/.test(content)) {
                content = content.replace(/translations\\.js\\?v=\\d+/g, 'translations.js?v=500');
                changed = true;
            }
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

console.log(`Processed all html files. Updated scripts globally.`);
