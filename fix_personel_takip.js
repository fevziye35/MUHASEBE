const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'personel_takip.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace everything from <style> to the end of main-content
const newLayout = `
        <h2 class="page-title">Personel ve İK Yönetimi</h2>

        <div class="mb-20" style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button onclick="openModal('addPersonnelModal')" class="btn btn-dark-blue p-20 mb-10" style="background: linear-gradient(135deg, #155724 0%, #0d3616 100%); font-size: 15px; border: none; cursor: pointer;">
                <i class="fa-solid fa-plus"></i> Yeni Personel Ekle
            </button>
            <button onclick="openModal('addLeaveModal')" class="btn btn-dark-blue p-20 mb-10" style="background: linear-gradient(135deg, #1f3a60 0%, #112240 100%); font-size: 15px; border: none; cursor: pointer;">
                <i class="fa-solid fa-umbrella-beach"></i> Planlı İzin Ekle
            </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: #eff6ff; color: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-users"></i></div>
                <div>
                    <div style="font-size: 0.85rem; color: #64748b; font-weight: 600;">TOPLAM PERSONEL</div>
                    <div style="font-size: 1.4rem; font-weight: 700; color: #1e293b;">12</div>
                </div>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: #f0fdf4; color: #22c55e; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-turkish-lira-sign"></i></div>
                <div>
                    <div style="font-size: 0.85rem; color: #64748b; font-weight: 600;">TOPLAM AYLIK MAAŞ</div>
                    <div style="font-size: 1.4rem; font-weight: 700; color: #1e293b;">345.500 ₺</div>
                </div>
            </div>

            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: #fff7ed; color: #f97316; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-umbrella-beach"></i></div>
                <div>
                    <div style="font-size: 0.85rem; color: #64748b; font-weight: 600;">İZİNDEKİ PERSONEL</div>
                    <div style="font-size: 1.4rem; font-weight: 700; color: #1e293b;">2</div>
                </div>
            </div>

            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 15px;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: #faf5ff; color: #a855f7; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"><i class="fa-solid fa-file-contract"></i></div>
                <div>
                    <div style="font-size: 0.85rem; color: #64748b; font-weight: 600;">PRİM / AVANS (Bekleyen)</div>
                    <div style="font-size: 1.4rem; font-weight: 700; color: #1e293b;">3 Adet</div>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
            
            <div class="selection-section">
                <div class="section-header bg-gray-header">
                    <i class="fa-solid fa-users"></i> Aktif Personel Listesi
                </div>
                <div class="content-box p-0">
                    <div class="table-container">
                        <table class="customer-table w-100 m-0" style="border-radius: 0;">
                            <thead>
                                <tr class="bg-gray-header">
                                    <th class="p-15">Ayrıntı</th>
                                    <th>Departman</th>
                                    <th>Maaş (Net)</th>
                                    <th>Durum</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="p-15">
                                        <div style="font-weight: 600; color:#1e293b;">Aydın Ertop</div>
                                        <div style="font-size: 0.8rem; color:#64748b;">aydinertop@gmail.com</div>
                                    </td>
                                    <td>Yönetim</td>
                                    <td style="font-weight: 600; color: #1f3a60;">90.000 ₺</td>
                                    <td><span style="background: #dcfce7; color: #166534; padding: 5px 12px; border-radius: 20px; font-weight: 600; font-size: 12px;">Aktif</span></td>
                                    <td>
                                        <button title="Düzenle" onclick="openModal('editPersonnelModal')" style="background: none; border: none; color: #3b82f6; font-size: 16px; margin-right: 15px; cursor: pointer;">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button title="Maaş Ödemesi/Avans" onclick="openModal('moneyModal')" style="background: none; border: none; color: #22c55e; font-size: 16px; cursor: pointer;">
                                            <i class="fa-solid fa-money-bill-wave"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <div style="font-weight: 600; color:#1e293b;">Fevziye Mamak</div>
                                        <div style="font-size: 0.8rem; color:#64748b;">fevziye.mamak35@gmail.com</div>
                                    </td>
                                    <td>Finans & Muhasebe</td>
                                    <td style="font-weight: 600; color: #1f3a60;">65.000 ₺</td>
                                    <td><span style="background: #dcfce7; color: #166534; padding: 5px 12px; border-radius: 20px; font-weight: 600; font-size: 12px;">Aktif</span></td>
                                    <td>
                                        <button title="Düzenle" onclick="openModal('editPersonnelModal')" style="background: none; border: none; color: #3b82f6; font-size: 16px; margin-right: 15px; cursor: pointer;">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button title="Maaş Ödemesi/Avans" onclick="openModal('moneyModal')" style="background: none; border: none; color: #22c55e; font-size: 16px; cursor: pointer;">
                                            <i class="fa-solid fa-money-bill-wave"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <div style="font-weight: 600; color:#1e293b;">Ali Mamak</div>
                                        <div style="font-size: 0.8rem; color:#64748b;">amamak1980@gmail.com</div>
                                    </td>
                                    <td>Satın Alma</td>
                                    <td style="font-weight: 600; color: #1f3a60;">60.000 ₺</td>
                                    <td><span style="background: #dcfce7; color: #166534; padding: 5px 12px; border-radius: 20px; font-weight: 600; font-size: 12px;">Aktif</span></td>
                                    <td>
                                        <button title="Düzenle" onclick="openModal('editPersonnelModal')" style="background: none; border: none; color: #3b82f6; font-size: 16px; margin-right: 15px; cursor: pointer;">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button title="Maaş Ödemesi/Avans" onclick="openModal('moneyModal')" style="background: none; border: none; color: #22c55e; font-size: 16px; cursor: pointer;">
                                            <i class="fa-solid fa-money-bill-wave"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-15">
                                        <div style="font-weight: 600; color:#1e293b;">Ahmet Yılmaz</div>
                                        <div style="font-size: 0.8rem; color:#64748b;">Lojistik Sorumlusu</div>
                                    </td>
                                    <td>Lojistik</td>
                                    <td style="font-weight: 600; color: #1f3a60;">35.000 ₺</td>
                                    <td><span style="background: #fef9c3; color: #854d0e; padding: 5px 12px; border-radius: 20px; font-weight: 600; font-size: 12px;">Yıllık İzinde</span></td>
                                    <td>
                                        <button title="Düzenle" onclick="openModal('editPersonnelModal')" style="background: none; border: none; color: #3b82f6; font-size: 16px; margin-right: 15px; cursor: pointer;">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button title="Maaş Ödemesi/Avans" onclick="openModal('moneyModal')" style="background: none; border: none; color: #22c55e; font-size: 16px; cursor: pointer;">
                                            <i class="fa-solid fa-money-bill-wave"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-header bg-gray-header" style="justify-content: flex-start; gap: 10px;">
                    <i class="fa-solid fa-umbrella-beach"></i> Planlı İzinler & Sağlık Raporları
                </div>
                <div class="content-box" style="padding: 10px;">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 15px; border-bottom: 1px solid #f1f5f9;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #64748b;">AY</div>
                                <div>
                                    <div style="font-weight: 600; color: #1e293b;">Ahmet Yılmaz</div>
                                    <div style="font-size: 13px; color: #64748b;">Yıllık İzin • 12-26 Mayıs</div>
                                </div>
                            </div>
                            <span style="background: #fee2e2; color: #ef4444; padding: 6px 15px; border-radius: 6px; font-weight: bold; font-size: 13px;">14 Gün</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 15px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #64748b;">SE</div>
                                <div>
                                    <div style="font-weight: 600; color: #1e293b;">Selin Ersoy</div>
                                    <div style="font-size: 13px; color: #64748b;">Sağlık Raporu • 21-23 Mayıs</div>
                                </div>
                            </div>
                            <span style="background: #fee2e2; color: #ef4444; padding: 6px 15px; border-radius: 6px; font-weight: bold; font-size: 13px;">3 Gün</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
`;

html = html.replace(/<style>[\s\S]*?<\/style>\s*<div class="personel-dashboard">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newLayout);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully modernized personel_takip.html');
