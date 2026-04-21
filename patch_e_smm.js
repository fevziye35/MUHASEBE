const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'e_smm.html');
let html = fs.readFileSync(filePath, 'utf8');

const replacements = {
    'E-SMM Listesi': 'mega.e_smm_listesi',
    'Fatura Oluştur': 'mega.fatura_olustur',
    'Durum Sorgula': 'mega.durum_sorgula',
    'Ayarlar': 'mega.ayarlar',
    'E-SMM Yönetimi': 'mega.e_smm_yonetimi',
    'Başlangıç Tarihi:': 'mega.baslangic_tarihi',
    'Bitiş Tarihi:': 'mega.bitis_tarihi',
    'Listele': 'mega.listele',
    'Sayfada Gösterilecek Veri Sayısı:': 'mega.sayfada_gosterilecek',
    'Fatura No': 'mega.fatura_no_title',
    'Ünvan': 'mega.unvan_title',
    'Tutar': 'mega.tutar_title',
    'Durum': 'mega.durum_title',
    'Görüntüle': 'mega.goruntule_title',
    'E-SMM Ayarları': 'mega.e_smm_ayarlari',
    'Servis URL': 'mega.servis_url',
    'API Kullanıcı': 'mega.api_kullanici',
    'API Şifre': 'mega.api_sifre'
};

for (const [turkishText, key] of Object.entries(replacements)) {
    const rx = new RegExp('([>])(\\s*)(' + turkishText + ')(\\s*)([<\\r\\n])', 'g');
    html = html.replace(rx, (m, p1, p2, p3, p4, p5) => {
        return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
    });

    const rx2 = new RegExp('(' + turkishText + ')', 'g');
    // if not already replaced
    if(html.includes(turkishText) && !html.includes('data-i18n="' + key + '"')){
        // fallback replace ONLY if we can ensure it's not breaking tags
        // let's do safe targeted replace
    }
}

// More specific targeted replaces:
html = html.replace(/>Fatura Oluştur</g, '><span data-i18n="mega.fatura_olustur">Fatura Oluştur</span><');
html = html.replace(/>\s*Durum Sorgula\s*</g, '><span data-i18n="mega.durum_sorgula">Durum Sorgula</span><');
html = html.replace(/>\s*Ayarlar\s*</g, '><span data-i18n="mega.ayarlar">Ayarlar</span><');
html = html.replace(/>\s*E-SMM Yönetimi\s*</g, '><span data-i18n="mega.e_smm_yonetimi">E-SMM Yönetimi</span><');
html = html.replace(/>Başlangıç Tarihi:</g, '><span data-i18n="mega.baslangic_tarihi">Başlangıç Tarihi:</span><');
html = html.replace(/>Bitiş Tarihi:</g, '><span data-i18n="mega.bitis_tarihi">Bitiş Tarihi:</span><');
html = html.replace(/>Listele</g, '><span data-i18n="mega.listele">Listele</span><');
html = html.replace(/>Sayfada Gösterilecek Veri Sayısı:</g, '><span data-i18n="mega.sayfada_gosterilecek">Sayfada Gösterilecek Veri Sayısı:</span><');

html = html.replace(/>Fatura No</g, '><span data-i18n="mega.fatura_no_title">Fatura No</span><');
html = html.replace(/>Ünvan</g, '><span data-i18n="mega.unvan_title">Ünvan</span><');
html = html.replace(/>Tutar</g, '><span data-i18n="mega.tutar_title">Tutar</span><');
html = html.replace(/>Durum</g, '><span data-i18n="mega.durum_title">Durum</span><');
html = html.replace(/>Görüntüle</g, '><span data-i18n="mega.goruntule_title">Görüntüle</span><');

html = html.replace(/Sayfada listelecek veri sayısı: 0<br>\s*Toplam Kayıt Bulundu\./g, '<span data-i18n="mega.zero_records">Sayfada listelecek veri sayısı: 0<br>Toplam Kayıt Bulundu.</span>');

html = html.replace(/ translations\.js\?v=\d+ /g, 'translations.js?v=12');
if (html.includes('translations.js') && !html.includes('translations.js?v=12')) {
    html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=12');
}

fs.writeFileSync(filePath, html, 'utf8');

const transFile = path.join(__dirname, 'translations.js');
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'mega.e_smm_listesi': 'E-SMM Listesi',
        'mega.fatura_olustur': 'Fatura Oluştur',
        'mega.durum_sorgula': 'Durum Sorgula',
        'mega.ayarlar': 'Ayarlar',
        'mega.e_smm_yonetimi': 'E-SMM Yönetimi',
        'mega.baslangic_tarihi': 'Başlangıç Tarihi:',
        'mega.bitis_tarihi': 'Bitiş Tarihi:',
        'mega.listele': 'Listele',
        'mega.sayfada_gosterilecek': 'Sayfada Gösterilecek Veri Sayısı:',
        'mega.fatura_no_title': 'Fatura No',
        'mega.unvan_title': 'Ünvan',
        'mega.tutar_title': 'Tutar',
        'mega.durum_title': 'Durum',
        'mega.goruntule_title': 'Görüntüle',
        'mega.zero_records': 'Sayfada listelecek veri sayısı: 0<br>Toplam Kayıt Bulundu.',
        'mega.e_smm_ayarlari': 'E-SMM Ayarları',
        'mega.servis_url': 'Servis URL',
        'mega.api_kullanici': 'API Kullanıcı',
        'mega.api_sifre': 'API Şifre',`,
    'en': `        'mega.e_smm_listesi': 'E-SMM List',
        'mega.fatura_olustur': 'Create Invoice',
        'mega.durum_sorgula': 'Query Status',
        'mega.ayarlar': 'Settings',
        'mega.e_smm_yonetimi': 'E-SMM Management',
        'mega.baslangic_tarihi': 'Start Date:',
        'mega.bitis_tarihi': 'End Date:',
        'mega.listele': 'List',
        'mega.sayfada_gosterilecek': 'Rows Per Page:',
        'mega.fatura_no_title': 'Invoice No',
        'mega.unvan_title': 'Title',
        'mega.tutar_title': 'Amount',
        'mega.durum_title': 'Status',
        'mega.goruntule_title': 'View',
        'mega.zero_records': 'Rows rendered: 0<br>Total Records Found.',
        'mega.e_smm_ayarlari': 'E-SMM Settings',
        'mega.servis_url': 'Service URL',
        'mega.api_kullanici': 'API User',
        'mega.api_sifre': 'API Password',`,
    'de': `        'mega.e_smm_listesi': 'E-SMM Liste',
        'mega.fatura_olustur': 'Rechnung Erstellen',
        'mega.durum_sorgula': 'Status Abfragen',
        'mega.ayarlar': 'Einstellungen',
        'mega.e_smm_yonetimi': 'E-SMM Verwaltung',
        'mega.baslangic_tarihi': 'Startdatum:',
        'mega.bitis_tarihi': 'Enddatum:',
        'mega.listele': 'Auflisten',
        'mega.sayfada_gosterilecek': 'Zeilen Pro Seite:',
        'mega.fatura_no_title': 'Rechnungs-Nr',
        'mega.unvan_title': 'Titel',
        'mega.tutar_title': 'Betrag',
        'mega.durum_title': 'Status',
        'mega.goruntule_title': 'Anzeigen',
        'mega.zero_records': 'Zeilen gerendert: 0<br>Gesamte Datensätze Gefunden.',
        'mega.e_smm_ayarlari': 'E-SMM Einstellungen',
        'mega.servis_url': 'Service-URL',
        'mega.api_kullanici': 'API Benutzer',
        'mega.api_sifre': 'API Passwort',`,
    'ru': `        'mega.e_smm_listesi': 'Список E-SMM',
        'mega.fatura_olustur': 'Создать Счет',
        'mega.durum_sorgula': 'Запрос Статуса',
        'mega.ayarlar': 'Настройки',
        'mega.e_smm_yonetimi': 'Управление E-SMM',
        'mega.baslangic_tarihi': 'Начальная Дата:',
        'mega.bitis_tarihi': 'Конечная Дата:',
        'mega.listele': 'Перечислить',
        'mega.sayfada_gosterilecek': 'Строк На Странице:',
        'mega.fatura_no_title': 'Номер Счета',
        'mega.unvan_title': 'Название',
        'mega.tutar_title': 'Сумма',
        'mega.durum_title': 'Статус',
        'mega.goruntule_title': 'Посмотреть',
        'mega.zero_records': 'Отображено строк: 0<br>Всего Записей Найдено.',
        'mega.e_smm_ayarlari': 'Настройки E-SMM',
        'mega.servis_url': 'URL сервиса',
        'mega.api_kullanici': 'API Пользователь',
        'mega.api_sifre': 'API Пароль',`,
    'zh': `        'mega.e_smm_listesi': 'E-SMM 列表',
        'mega.fatura_olustur': '创建发票',
        'mega.durum_sorgula': '查询状态',
        'mega.ayarlar': '设置',
        'mega.e_smm_yonetimi': 'E-SMM 管理',
        'mega.baslangic_tarihi': '开始日期:',
        'mega.bitis_tarihi': '结束日期:',
        'mega.listele': '列出',
        'mega.sayfada_gosterilecek': '每页行数:',
        'mega.fatura_no_title': '发票号',
        'mega.unvan_title': '标题',
        'mega.tutar_title': '金额',
        'mega.durum_title': '状态',
        'mega.goruntule_title': '查看',
        'mega.zero_records': '显示的行数: 0<br>找到的总记录.',
        'mega.e_smm_ayarlari': 'E-SMM 设置',
        'mega.servis_url': '服务 URL',
        'mega.api_kullanici': 'API 用户',
        'mega.api_sifre': 'API 密码',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(transFile, js, 'utf8');

console.log('Successfully patched e_smm.html entirely.');
