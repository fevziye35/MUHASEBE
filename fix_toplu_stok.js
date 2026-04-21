const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'toplu_stok_raporu.html');
let html = fs.readFileSync(filePath, 'utf8');

const newMainContent = `
    <main class="main-content">
        <h2 class="page-title">Toplu Stok Raporu</h2>

        <div class="mb-20" style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="stok_kartlari.html" class="btn btn-dark-blue p-20 mb-10" style="background: linear-gradient(135deg, #1f3a60 0%, #112240 100%); font-size: 15px; border: none; cursor: pointer;">
                <i class="fa-solid fa-arrow-left"></i> Stok Kartlarına Dön
            </a>
            <button onclick="generateReport()" class="btn btn-dark-blue p-20 mb-10" style="background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%); font-size: 15px; border: none; cursor: pointer;">
                <i class="fa-solid fa-chart-pie"></i> Raporu Oluştur
            </button>
        </div>

        <div class="selection-section">
            <div class="section-header bg-gray-header">
                <i class="fa-solid fa-box-open"></i> Rapor Kriterleri
            </div>
            
            <div class="content-box">
                <div class="filter-row" style="display: flex; gap: 20px; align-items: flex-end; background-color: #f7f9fa; padding: 15px; border-radius: 8px; border: 1px solid #ebf0f4; flex-wrap: wrap;">
                    
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <label style="font-size: 13px; font-weight: bold; color: #555;">Tarih Aralığı:</label>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #555; font-size: 14px; font-weight: 500;">
                                <input type="checkbox" id="tumZamanlar" style="width: 16px; height: 16px; accent-color: #1f3a60;"> Tüm Zamanlar
                            </label>
                            <input type="date" class="form-control" id="startDate" style="border-radius: 8px; border: 1px solid #dce0e4; padding: 8px 12px; height: 40px; width: 140px;">
                            <span style="color: #888;">-</span>
                            <input type="date" class="form-control" id="endDate" style="border-radius: 8px; border: 1px solid #dce0e4; padding: 8px 12px; height: 40px; width: 140px;">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 5px; margin-left: 20px;">
                        <label style="font-size: 13px; font-weight: bold; color: #555;">Gruplama Türü Seçiniz:</label>
                        <select class="form-control" id="groupType" style="border-radius: 8px; border: 1px solid #dce0e4; padding: 8px 12px; height: 40px; width: 220px;">
                            <option value="product">Ürüne Göre</option>
                            <option value="brand">Markaya Göre</option>
                            <option value="category">Kategoriye Göre</option>
                        </select>
                    </div>

                    <div style="display: flex; align-items: center; margin-left: 20px; padding-bottom: 10px;">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #555; font-size: 14px; font-weight: 500;">
                            <input type="checkbox" id="showZero" style="width: 16px; height: 16px; accent-color: #1f3a60;"> Sıfırları Göster
                        </label>
                    </div>
                </div>

                <div id="reportResult" style="margin-top: 30px; display: none;">
                    <div class="table-container">
                        <table class="customer-table w-100">
                            <thead>
                                <tr class="bg-gray-header">
                                    <th class="p-15" style="border-radius: 8px 0 0 0;">Stok Kodu</th>
                                    <th>Stok Adı</th>
                                    <th>Birim</th>
                                    <th>Giriş Miktarı</th>
                                    <th>Çıkış Miktarı</th>
                                    <th style="border-radius: 0 8px 0 0;">Bakiye</th>
                                </tr>
                            </thead>
                            <tbody id="reportTableBody">
                                <tr>
                                    <td colspan="6" style="padding: 40px; text-align: center; color: #888; font-style: italic;">
                                        Lütfen rapor kriterlerini seçip "Raporu Oluştur" butonuna basınız.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="footer-info" style="margin-top: 15px; color: #666; font-size: 13px;">
                        <div>Toplam <span style="color: #1f3a60; font-weight: bold;">0</span> kayıt listelendi.</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
`;

html = html.replace(/<main class="main-content">[\s\S]*?(?=<\/main>)/, newMainContent.replace('</main>', ''));

// Also, the old styling code in the head might have messed up formatting. Let's make sure there are no raw style block conflicts.
// Wait, Toplu_stok_raporu might not have style block. If it doesn't, we are good.

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated toplu_stok_raporu.html layout');
