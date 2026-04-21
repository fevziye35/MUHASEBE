const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'taksit_rapor.html');
let html = fs.readFileSync(filePath, 'utf8');

const newMainContent = `
    <main class="main-content">
        <h2 class="page-title">Taksit Takip Gelişmiş Rapor</h2>

        <div class="mb-20" style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="taksit_takip.html" class="btn btn-dark-blue p-20 mb-10" style="background: linear-gradient(135deg, #1f3a60 0%, #112240 100%); font-size: 15px; border: none; cursor: pointer;">
                <i class="fa-solid fa-arrow-left"></i> Taksit Takibe Dön
            </a>
            <button onclick="generateReport()" class="btn btn-dark-blue p-20 mb-10" style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); font-size: 15px; border: none; cursor: pointer;">
                <i class="fa-solid fa-chart-line"></i> Raporu Hazırla
            </button>
        </div>

        <div class="selection-section">
            <div class="section-header bg-gray-header">
                <i class="fa-solid fa-calendar-days"></i> Rapor Kriterleri
            </div>
            
            <div class="content-box">
                <div class="filter-row" style="display: flex; gap: 20px; align-items: flex-end; background-color: #f7f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ebf0f4; flex-wrap: wrap;">
                    
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <label style="font-size: 13px; font-weight: bold; color: #555;">Tarih Aralığı:</label>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #555; font-size: 14px; font-weight: 500;">
                                <input type="checkbox" id="allTimes" style="width: 16px; height: 16px; accent-color: #1f3a60;"> Tüm Zamanlar
                            </label>
                            <input type="text" class="form-control" id="startDate" placeholder="GG.AA.YYYY" style="border-radius: 8px; border: 1px solid #dce0e4; padding: 8px 12px; height: 40px; width: 140px;">
                            <span style="color: #888;">-</span>
                            <input type="text" class="form-control" id="endDate" placeholder="GG.AA.YYYY" style="border-radius: 8px; border: 1px solid #dce0e4; padding: 8px 12px; height: 40px; width: 140px;">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 5px; margin-left: 20px;">
                        <label style="font-size: 13px; font-weight: bold; color: #555;">Listelemek İstediğiniz Taksit Türünü Seçiniz:</label>
                        <select class="form-control" id="installmentType" style="border-radius: 8px; border: 1px solid #dce0e4; padding: 8px 12px; height: 40px; width: 250px;">
                            <option value="overdue" selected>Vadesi Geçen Taksitler</option>
                            <option value="upcoming">Gelecek Taksitler</option>
                            <option value="paid">Ödenen Taksitler</option>
                            <option value="all">Tüm Taksitler</option>
                        </select>
                    </div>

                </div>

                <div id="reportResult" style="margin-top: 30px; display: none;">
                    <div class="table-container">
                        <table class="customer-table w-100">
                            <thead>
                                <tr class="bg-gray-header">
                                    <th class="p-15" style="border-radius: 8px 0 0 0;">Cari / Müşteri</th>
                                    <th>Açıklama</th>
                                    <th>Vade Tarihi</th>
                                    <th>Tutar</th>
                                    <th style="border-radius: 0 8px 0 0;">Durum</th>
                                </tr>
                            </thead>
                            <tbody id="reportTableBody">
                                <tr>
                                    <td colspan="5" style="padding: 40px; text-align: center; color: #888; font-style: italic;">
                                        Henüz bir rapor oluşturulmadı. Kriterleri seçip "Raporu Hazırla" butonuna basınız.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
`;

html = html.replace(/<main class="main-content">[\s\S]*?(?=<\/main>)/, newMainContent.replace('</main>', ''));

// Update javascript for generateReport to actually show the result block
html = html.replace(/function generateReport\(\) \{ alert\('Rapor Hazirlaniyor\.\.\.'\); \}/, 
`function generateReport() { 
            document.getElementById('reportResult').style.display = 'block';
            document.getElementById('reportTableBody').innerHTML = '<tr><td colspan="5" style="padding: 40px; text-align: center; color: #888; font-style: italic;">Seçtiğiniz kriterlere uygun veri bulunamadı.</td></tr>';
        }`);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully modernized taksit_rapor.html UI');
