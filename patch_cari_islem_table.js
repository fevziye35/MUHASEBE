const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'cari_islem_raporu.html'), 'utf8');

const tableSnippet = `
        <div id="reportTableContainer" style="display:none; margin-top: 40px;">
            <table class="report-table" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background: #f0f0f0;">
                        <th style="padding: 10px; text-align: left;"><span data-i18n="mega.tarih">Tarih</span></th>
                        <th style="padding: 10px; text-align: left;"><span data-i18n="mega.evrak_turu">Evrak Türü</span></th>
                        <th style="padding: 10px; text-align: left;"><span data-i18n="mega.evrak_no">Evrak No</span></th>
                        <th style="padding: 10px; text-align: left;"><span data-i18n="mega.aciklama">Açıklama</span></th>
                        <th style="padding: 10px; text-align: right;"><span data-i18n="word.borc">Borç</span></th>
                        <th style="padding: 10px; text-align: right;"><span data-i18n="word.alacak">Alacak</span></th>
                        <th style="padding: 10px; text-align: right;"><span data-i18n="word.bakiye">Bakiye</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">15.02.2025</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">Satış Faturası</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">INV-2025-001</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee;">Hizmet Bedeli</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">5.000,00</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">0,00</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">5.000,00 (B)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`;

if (!html.includes('reportTableContainer')) {
    html = html.replace('</div>\r\n\r\n    <script src="translations.js', tableSnippet + '\r\n\    <script>\r\n        document.querySelector(".btn-report").addEventListener("click", () => {\r\n            document.getElementById("reportTableContainer").style.display = "block";\r\n        });\r\n    </script>\r\n    <script src="translations.js');
    html = html.replace('</div>\n\n    <script src="translations.js', tableSnippet + '\n\    <script>\n        document.querySelector(".btn-report").addEventListener("click", () => {\n            document.getElementById("reportTableContainer").style.display = "block";\n        });\n    </script>\n    <script src="translations.js');
}

fs.writeFileSync(path.join(__dirname, 'cari_islem_raporu.html'), html, 'utf8');
console.log("Added working table and button script to cari_islem_raporu.html");
