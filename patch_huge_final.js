const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dict = {
    'Gelir-Gider Listesi': 'word.gelir_gider_listesi',
    'Gelir-Gider Ekle': 'word.gelir_gider_ekle',
    'Gelir-Gider': 'word.gelir_gider',
    'Tümünü Göster': 'word.tumunu_goster',
    'Sadece Gelirler': 'word.sadece_gelirler',
    'Sadece Giderler': 'word.sadece_giderler',
    'Sayfada Gösterilecek:': 'word.sayfada_gosterilecek',
    'Sayfada Gösterilecek': 'word.sayfada_gosterilecek_no_colon',
    'TİP': 'word.tip',
    'AD': 'word.ad',
    'KOD': 'word.kod',
    'NO': 'word.no',
    'DÜZENLE/SİL': 'word.duzenle_sil',
    'Kayıt bulunamadı.': 'word.kayit_bulunamadi',
    'İşlemler': 'word.islemler',
    'İşlem': 'word.islem',
    'Mesajlar': 'word.mesajlar',
    'Personel Takip': 'word.personel_takip',
    'Ajanda': 'word.ajanda',
    'Kişi Ekleme Paneli': 'word.kisi_ekleme',
    'Döviz Ayarları': 'word.doviz_ayarlari',
    'Banka Ozet': 'word.banka_ozet',
    'Banka Özet': 'word.banka_ozet',
    'Çek Senet': 'word.cek_senet',
    'Taksit Takip': 'word.taksit_takip',
    'Teklif Sipariş': 'word.teklif_siparis'
};

files.forEach(file => {
    let filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // HTML tag content replace
    for (const [turkishText, key] of Object.entries(dict)) {
        const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        const rx = new RegExp('([>])(\\s*)(' + safeWord + ')(\\s*)([<\\r\\n])', 'g');
        if (rx.test(html)) {
            html = html.replace(rx, (m, p1, p2, p3, p4, p5) => {
                return p1 + p2 + '<span data-i18n="' + key + '">' + p3 + '</span>' + p4 + p5;
            });
            changed = true;
        }

        // Additional match for table headers (Title Case in HTML mismatch)
        const lowerRx = new RegExp('<th[^>]*>\\s*(' + safeWord + ')\\s*</th>', 'gi');
        if (lowerRx.test(html)) {
             html = html.replace(lowerRx, (m, p1) => {
                return m.replace(p1, '<span data-i18n="' + key + '">' + p1 + '</span>');
            });
            changed = true;
        }
    }

    if (changed) {
        html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=20');
        fs.writeFileSync(filePath, html, 'utf8');
    }
});

// Update translations.js
const transFile = path.join(dir, 'translations.js');
let js = fs.readFileSync(transFile, 'utf8');

const tAdditions = {
    'tr': `        'word.gelir_gider_listesi': 'Gelir-Gider Listesi',
        'word.gelir_gider_ekle': 'Gelir-Gider Ekle',
        'word.gelir_gider': 'Gelir-Gider',
        'word.tumunu_goster': 'Tümünü Göster',
        'word.sadece_gelirler': 'Sadece Gelirler',
        'word.sadece_giderler': 'Sadece Giderler',
        'word.sayfada_gosterilecek': 'Sayfada Gösterilecek:',
        'word.sayfada_gosterilecek_no_colon': 'Sayfada Gösterilecek',
        'word.tip': 'TİP',
        'word.ad': 'AD',
        'word.kod': 'KOD',
        'word.no': 'NO',
        'word.duzenle_sil': 'DÜZENLE/SİL',
        'word.kayit_bulunamadi': 'Kayıt bulunamadı.',
        'word.islemler': 'İşlemler',
        'word.islem': 'İşlem',
        'word.mesajlar': 'Mesajlar',
        'word.personel_takip': 'Personel Takip',
        'word.ajanda': 'Ajanda',
        'word.kisi_ekleme': 'Kişi Ekleme Paneli',
        'word.doviz_ayarlari': 'Döviz Ayarları',
        'word.banka_ozet': 'Banka Özet',
        'word.cek_senet': 'Çek Senet',
        'word.taksit_takip': 'Taksit Takip',
        'word.teklif_siparis': 'Teklif Sipariş',`,
    'en': `        'word.gelir_gider_listesi': 'Income-Expense List',
        'word.gelir_gider_ekle': 'Add Income-Expense',
        'word.gelir_gider': 'Income-Expense',
        'word.tumunu_goster': 'Show All',
        'word.sadece_gelirler': 'Only Incomes',
        'word.sadece_giderler': 'Only Expenses',
        'word.sayfada_gosterilecek': 'Rows Per Page:',
        'word.sayfada_gosterilecek_no_colon': 'Rows Per Page',
        'word.tip': 'TYPE',
        'word.ad': 'NAME',
        'word.kod': 'CODE',
        'word.no': 'NO',
        'word.duzenle_sil': 'EDIT/DELETE',
        'word.kayit_bulunamadi': 'No record found.',
        'word.islemler': 'Actions',
        'word.islem': 'Action',
        'word.mesajlar': 'Messages',
        'word.personel_takip': 'Staff Tracking',
        'word.ajanda': 'Agenda',
        'word.kisi_ekleme': 'Add Person Panel',
        'word.doviz_ayarlari': 'Currency Settings',
        'word.banka_ozet': 'Bank Summary',
        'word.cek_senet': 'Checks & Notes',
        'word.taksit_takip': 'Installment Tracking',
        'word.teklif_siparis': 'Offers & Orders',`,
    'de': `        'word.gelir_gider_listesi': 'Einnahmen-Ausgaben-Liste',
        'word.gelir_gider_ekle': 'Einnahmen-Ausgaben Hinzufügen',
        'word.gelir_gider': 'Einnahmen-Ausgaben',
        'word.tumunu_goster': 'Alle Anzeigen',
        'word.sadece_gelirler': 'Nur Einnahmen',
        'word.sadece_giderler': 'Nur Ausgaben',
        'word.sayfada_gosterilecek': 'Zeilen Pro Seite:',
        'word.sayfada_gosterilecek_no_colon': 'Zeilen Pro Seite',
        'word.tip': 'TYP',
        'word.ad': 'NAME',
        'word.kod': 'CODE',
        'word.no': 'NR',
        'word.duzenle_sil': 'BEARBEITEN/LÖSCHEN',
        'word.kayit_bulunamadi': 'Kein Datensatz gefunden.',
        'word.islemler': 'Aktionen',
        'word.islem': 'Aktion',
        'word.mesajlar': 'Nachrichten',
        'word.personel_takip': 'Personalverfolgung',
        'word.ajanda': 'Agenda',
        'word.kisi_ekleme': 'Personen-Panel Hinzufügen',
        'word.doviz_ayarlari': 'Währungseinstellungen',
        'word.banka_ozet': 'Bankzusammenfassung',
        'word.cek_senet': 'Schecks und Schuldverschreibungen',
        'word.taksit_takip': 'Ratenverfolgung',
        'word.teklif_siparis': 'Angebote & Bestellungen',`,
    'ru': `        'word.gelir_gider_listesi': 'Список доходов и расходов',
        'word.gelir_gider_ekle': 'Добавить доход-расход',
        'word.gelir_gider': 'Доход-Расход',
        'word.tumunu_goster': 'Показать все',
        'word.sadece_gelirler': 'Только доходы',
        'word.sadece_giderler': 'Только расходы',
        'word.sayfada_gosterilecek': 'Строк на странице:',
        'word.sayfada_gosterilecek_no_colon': 'Строк на странице',
        'word.tip': 'ТИП',
        'word.ad': 'ИМЯ',
        'word.kod': 'КОД',
        'word.no': '№',
        'word.duzenle_sil': 'ИЗМЕНИТЬ/УДАЛИТЬ',
        'word.kayit_bulunamadi': 'Запись не найдена.',
        'word.islemler': 'Действия',
        'word.islem': 'Действие',
        'word.mesajlar': 'Сообщения',
        'word.personel_takip': 'Отслеживание Персонала',
        'word.ajanda': 'Повестка дня',
        'word.kisi_ekleme': 'Панель Добавления Пользователей',
        'word.doviz_ayarlari': 'Настройки Валюты',
        'word.banka_ozet': 'Банковская Сводка',
        'word.cek_senet': 'Чеки и Векселя',
        'word.taksit_takip': 'Отслеживание Рассрочек',
        'word.teklif_siparis': 'Предложения и Заказы',`,
    'zh': `        'word.gelir_gider_listesi': '收支列表',
        'word.gelir_gider_ekle': '添加收支',
        'word.gelir_gider': '收支',
        'word.tumunu_goster': '显示所有',
        'word.sadece_gelirler': '仅收入',
        'word.sadece_giderler': '仅支出',
        'word.sayfada_gosterilecek': '每页行数:',
        'word.sayfada_gosterilecek_no_colon': '每页行数',
        'word.tip': '类型',
        'word.ad': '名称',
        'word.kod': '代码',
        'word.no': '否',
        'word.duzenle_sil': '编辑/删除',
        'word.kayit_bulunamadi': '找不到记录.',
        'word.islemler': '操作',
        'word.islem': '操作',
        'word.mesajlar': '消息',
        'word.personel_takip': '员工跟踪',
        'word.ajanda': '议程',
        'word.kisi_ekleme': '添加人员面板',
        'word.doviz_ayarlari': '货币设置',
        'word.banka_ozet': '银行摘要',
        'word.cek_senet': '支票与票据',
        'word.taksit_takip': '分期付款跟踪',
        'word.teklif_siparis': '报价与订单',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(transFile, js, 'utf8');

console.log('Successfully applied mega patch 2.0 to all files.');
