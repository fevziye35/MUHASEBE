const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let html = fs.readFileSync(file, 'utf8');

const regex = /<div class="dash-modules-grid">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Charts Section -->/;

const newGrid = `<div class="dash-modules-grid">
                <a href="fatura_merkezi.html" class="dash-module-card mod-indigo" id="mod-fatura">
                    <div class="mod-icon"><i class="fa-solid fa-file-invoice"></i></div>
                    <div class="mod-label">Faturalar</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="efatura.html" class="dash-module-card mod-violet" id="mod-efatura">
                    <div class="mod-icon"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                    <div class="mod-label">E-Fatura</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="mesajlar.html" class="dash-module-card mod-blue" id="mod-mesaj">
                    <div class="mod-icon"><i class="fa-solid fa-envelope"></i></div>
                    <div class="mod-label">Mesajlar</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="kisi_ekle.html" class="dash-module-card mod-teal" id="mod-cariekle">
                    <div class="mod-icon"><i class="fa-solid fa-user-plus"></i></div>
                    <div class="mod-label">Cari Ekle</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="cari_hesaplar.html" class="dash-module-card mod-emerald" id="mod-yenicari">
                    <div class="mod-icon"><i class="fa-solid fa-address-book"></i></div>
                    <div class="mod-label">Yeni Cari</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="doviz_ayarlari.html" class="dash-module-card mod-slate" id="mod-doviz">
                    <div class="mod-icon"><i class="fa-solid fa-dollar-sign"></i></div>
                    <div class="mod-label">Döviz Ayarları</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="kasa.html" class="dash-module-card mod-amber" id="mod-kasa">
                    <div class="mod-icon"><i class="fa-solid fa-wallet"></i></div>
                    <div class="mod-label">Kasa</div>
                    <div class="mod-glow"></div>
                </a>
                <a href="gelir_gider_ekle.html" class="dash-module-card mod-rose" id="mod-gelirgider_ekle">
                    <div class="mod-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                    <div class="mod-label">Gel/Gid. Ekle</div>
                    <div class="mod-glow"></div>
                </a>
            </div>
            </div>
            <!-- Charts Section -->`;

if(regex.test(html)) {
    html = html.replace(regex, newGrid);
    fs.writeFileSync(file, html, 'utf8');
    console.log('Successfully replaced modules grid exactly as requested.');
} else {
    console.error('Could not match dash-modules-grid in index.html');
}
