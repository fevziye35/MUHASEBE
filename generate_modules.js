const fs = require('fs');

const indexHTML = fs.readFileSync('index.html', 'utf8');

// Dashboard içeriğini hedef sayfaya göre bir placeholder formuna sokalım
const replaceWidgetsContent = (title, iconClass, description) => {
    return `
    <div style="padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin: 20px;">
        <div style="display: flex; align-items: center; gap: 15px; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 20px;">
            <div style="width: 50px; height: 50px; border-radius: 10px; background: #3b82f6; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            <div>
                <h2 style="margin: 0; color: #1e293b;">${title}</h2>
                <span style="color: #64748b; font-size: 0.95rem;">${description}</span>
            </div>
        </div>
        
        <div style="padding: 40px 20px; text-align: center; border: 2px dashed #cbd5e1; border-radius: 12px; background: #f8fafc;">
            <i class="fa-solid fa-person-digging" style="font-size: 3rem; color: #94a3b8; margin-bottom: 15px; display: block;"></i>
            <h3 style="color: #475569; margin: 0 0 10px 0;">Modül Geliştirme Aşamasında</h3>
            <p style="color: #64748b; font-size: 0.95rem; max-width: 400px; margin: 0 auto;">
                Bu modül arayüzü kısa süre içerisinde tamamlanacaktır.
            </p>
        </div>
    </div>
    </main>`;
};

const basePattern = /<div class="dashboard-widgets">[\s\S]*?<\/main>/i;

let personelContent = indexHTML.replace(basePattern, replaceWidgetsContent('Personel Takip Sistemi', 'fa-user-clock', 'Çalışan performans, giriş/çıkış ve izin yönetimi'));
personelContent = personelContent.replace(/<title>.*?<\/title>/, '<title>Personel Takip</title>');
fs.writeFileSync('personel_takip.html', personelContent);

let ajandaContent = indexHTML.replace(basePattern, replaceWidgetsContent('Ajanda ve Planlama', 'fa-calendar-check', 'Kişisel ve kurumsal etkinlik, toplantı planlamaları'));
ajandaContent = ajandaContent.replace(/<title>.*?<\/title>/, '<title>Ajanda</title>');
fs.writeFileSync('ajanda.html', ajandaContent);

let kisiEkleContent = indexHTML.replace(basePattern, replaceWidgetsContent('Kişi Ekleme Paneli', 'fa-user-plus', 'Sisteme yeni kullanıcı, rehber kaydı ve yetkilendirmesi ekleme alanı'));
kisiEkleContent = kisiEkleContent.replace(/<title>.*?<\/title>/, '<title>Kişi Ekle</title>');
fs.writeFileSync('kisi_ekle.html', kisiEkleContent);

console.log("Pages generated successfully.");
