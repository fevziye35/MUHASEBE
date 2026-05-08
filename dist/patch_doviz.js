const fs = require('fs');
const path = require('path');

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');

const tAdditions = {
    'tr': `        'word.doviz_listesi': 'Döviz Listesi',
        'word.doviz_ekle': 'Döviz Ekle',
        'word.alis_kuru': 'Alış Kuru',
        'word.satis_kuru': 'Satış Kuru',
        'word.yukleniyor': 'Yükleniyor...',
        'word.canli_piyasa': 'Canlı Piyasa Verileri ile Senkronize Ediliyor...',
        'word.son_guncelleme': 'Son Güncelleme:',
        'word.baglanti_hatasi': 'Bağlantı Hatası!',
        'word.yeni_doviz_ekle': 'Yeni Döviz Ekle',
        'word.doviz_kodu': 'Döviz Kodu',
        'word.vazgec': 'Vazgeç',`,
    'en': `        'word.doviz_listesi': 'Currency List',
        'word.doviz_ekle': 'Add Currency',
        'word.alis_kuru': 'Buying Rate',
        'word.satis_kuru': 'Selling Rate',
        'word.yukleniyor': 'Loading...',
        'word.canli_piyasa': 'Syncing with Live Market Data...',
        'word.son_guncelleme': 'Last Update:',
        'word.baglanti_hatasi': 'Connection Error!',
        'word.yeni_doviz_ekle': 'Add New Currency',
        'word.doviz_kodu': 'Currency Code',
        'word.vazgec': 'Cancel',`,
    'de': `        'word.doviz_listesi': 'Währungsliste',
        'word.doviz_ekle': 'Währung Hinzufügen',
        'word.alis_kuru': 'Kaufkurs',
        'word.satis_kuru': 'Verkaufskurs',
        'word.yukleniyor': 'Lädt...',
        'word.canli_piyasa': 'Synchronisierung mit Live-Marktdaten...',
        'word.son_guncelleme': 'Letztes Update:',
        'word.baglanti_hatasi': 'Verbindungsfehler!',
        'word.yeni_doviz_ekle': 'Neue Währung Hinzufügen',
        'word.doviz_kodu': 'Währungscode',
        'word.vazgec': 'Abbrechen',`,
    'ru': `        'word.doviz_listesi': 'Список Валют',
        'word.doviz_ekle': 'Добавить Валюту',
        'word.alis_kuru': 'Курс Покупки',
        'word.satis_kuru': 'Курс Продажи',
        'word.yukleniyor': 'Загрузка...',
        'word.canli_piyasa': 'Синхронизация с рыночными данными...',
        'word.son_guncelleme': 'Последнее Обновление:',
        'word.baglanti_hatasi': 'Ошибка Соединения!',
        'word.yeni_doviz_ekle': 'Добавить Новую Валюту',
        'word.doviz_kodu': 'Код Валюты',
        'word.vazgec': 'Отмена',`,
    'zh': `        'word.doviz_listesi': '货币列表',
        'word.doviz_ekle': '添加货币',
        'word.alis_kuru': '买入价',
        'word.satis_kuru': '卖出价',
        'word.yukleniyor': '加载中...',
        'word.canli_piyasa': '正在与实时市场数据同步...',
        'word.son_guncelleme': '最后更新:',
        'word.baglanti_hatasi': '连接错误！',
        'word.yeni_doviz_ekle': '添加新货币',
        'word.doviz_kodu': '货币代码',
        'word.vazgec': '取消',`
};

for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}

fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

let html = fs.readFileSync(path.join(__dirname, 'doviz_ayarlari.html'), 'utf8');

// Replacements
html = html.replace(/<span>Döviz Listesi<\/span>/g, '<span data-i18n="word.doviz_listesi">Döviz Listesi</span>');
html = html.replace(/>\s*Döviz Ekle\s*</g, '><span data-i18n="word.doviz_ekle">Döviz Ekle</span><');
html = html.replace(/<th>Döviz Türü<\/th>/g, '<th><span data-i18n="word.doviz_turu">Döviz Türü</span></th>'); // using existing word.doviz_turu
html = html.replace(/<th>Alış Kuru<\/th>/g, '<th><span data-i18n="word.alis_kuru">Alış Kuru</span></th>');
html = html.replace(/<th>Satış Kuru<\/th>/g, '<th><span data-i18n="word.satis_kuru">Satış Kuru</span></th>');
html = html.replace(/>Yükleniyor\.\.\.</g, ' data-i18n="word.yukleniyor">Yükleniyor...<');
html = html.replace(/<span>Canlı Piyasa Verileri \(Google\) ile Senkronize Ediliyor\.\.\.<\/span>/g, '<span data-i18n="word.canli_piyasa">Canlı Piyasa Verileri ile Senkronize Ediliyor...</span>');

// JS replacements
html = html.replace(/'Son Güncelleme: '/g, '(translations[currentLanguage]?.["word.son_guncelleme"] || "Son Güncelleme:") + " "');
html = html.replace(/'Bağlantı Hatası!'/g, 'translations[currentLanguage]?.["word.baglanti_hatasi"] || "Bağlantı Hatası!"');

html = html.replace(/<span id="last-update">Son Güncelleme: -<\/span>/g, '<span id="last-update"><span data-i18n="word.son_guncelleme">Son Güncelleme:</span> -</span>');

html = html.replace(/<h3>Yeni Döviz Ekle<\/h3>/g, '<h3><span data-i18n="word.yeni_doviz_ekle">Yeni Döviz Ekle</span></h3>');
html = html.replace(/<label class="form-label">Döviz Kodu<\/label>/g, '<label class="form-label"><span data-i18n="word.doviz_kodu">Döviz Kodu</span></label>');
html = html.replace(/>Vazgeç<\/button>/g, '><span data-i18n="word.vazgec">Vazgeç</span></button>');

html = html.replace(/translations\.js\?v=\d+/g, 'translations.js?v=25');

fs.writeFileSync(path.join(__dirname, 'doviz_ayarlari.html'), html, 'utf8');

console.log('Patched doviz_ayarlari.html completely!');
