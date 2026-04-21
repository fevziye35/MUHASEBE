const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const regex = /<div class="header-item user-item">\s*<i class="fa-solid fa-user"><\/i>\s*fevziye\.mamak35@gmail\.com\s*<\/div>/g;
const regex2 = /<div class="header-item user-item"[^>]*>\s*<i class="fa-solid fa-user"><\/i>\s*fevziye\.mamak35@gmail\.com\s*<\/div>/g;

const replacement = `<div class="header-item user-item" style="position: relative;" onclick="document.getElementById('header-user-menu').classList.toggle('show')">
                    <i class="fa-solid fa-user"></i> fevziye.mamak35@gmail.com
                    <div class="header-lang-menu" id="header-user-menu" style="min-width: 220px; right: 0; left: auto; top: 100%; border-radius: 8px; padding: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                        <div class="header-lang-item" style="border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 6px; cursor: default; display: flex; flex-direction: column; align-items: flex-start;">
                            <strong style="color:#1e293b; font-size:14px; margin-bottom: 3px;">Fevziye Mamak</strong>
                            <span style="font-size:11px; color:#64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">Panel Yöneticisi</span>
                        </div>
                        <div class="header-lang-item" onclick="window.location.href='kisi_ekle.html'" style="padding: 10px; font-size: 13px;"><i class="fa-solid fa-user-gear" style="width: 20px;"></i> Profil Ayarları</div>
                        <div class="header-lang-item" onclick="window.location.href='kilit_ekrani.html'" style="padding: 10px; font-size: 13px;"><i class="fa-solid fa-lock" style="width: 20px;"></i> Ekranı Kilitle</div>
                        <div class="header-lang-item" onclick="alert('Kullanıcı değiştirme ekranına aktarılıyorsunuz...')" style="padding: 10px; font-size: 13px;"><i class="fa-solid fa-users" style="width: 20px;"></i> Kullanıcı Değiştir</div>
                        <div class="header-lang-item" style="color: #ef4444; padding: 10px; font-size: 13px; border-top: 1px solid #fee2e2; margin-top: 4px;" onclick="window.location.href='kilit_ekrani.html'"><i class="fa-solid fa-right-from-bracket" style="width: 20px;"></i> Çıkış Yap</div>
                    </div>
                </div>
                <script>
                    // Close the user dropdown if clicked outside
                    window.addEventListener('click', function(e) {
                        const userMenu = document.getElementById('header-user-menu');
                        if (userMenu && userMenu.classList.contains('show')) {
                            const userItem = document.querySelector('.user-item');
                            if (userItem && !userItem.contains(e.target)) {
                                userMenu.classList.remove('show');
                            }
                        }
                    });
                </script>`;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    
    files.forEach(function (file) {
        if (path.extname(file) === '.html' && file !== 'kilit_ekrani.html') {
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            let updated = false;
            
            if (regex.test(content)) {
                content = content.replace(regex, replacement);
                updated = true;
            } else if (regex2.test(content)) {
                content = content.replace(regex2, replacement);
                updated = true;
            }
            
            if (updated) {
                // To avoid duplicating the script tag on multiple runs or loops, we can inject script only if not present, 
                // but the easiest is just bundle it inline as we did. We just have to make sure it doesn't duplicate if they click multiple times.
                // It's a small event listener so it's fine.
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated User Dropdown in: ${file}`);
            }
        }
    });
    console.log("User Dropdown update complete.");
});
