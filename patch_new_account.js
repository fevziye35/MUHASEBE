const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'new_account.html'), 'utf8');

const dict = {
    'Hesap/Firma Adı': 'contact.company_name',
    'Grup Adı': 'contact.group_name',
    'MÜŞTERİLER': 'contact.customers_group',
    'TEDARİKÇİLER': 'contact.suppliers_group',
    'TOPTANCILAR': 'contact.wholesalers_group',
    'Yetkili': 'contact.authorized',
    'Varsayılan Kasa': 'contact.default_cash',
    'Merkez Kasa': 'word.merkez_kasa',
    'Açılış Bakiyesi': 'contact.opening_balance',
    'Borç / Alacak': 'contact.debt_credit',
    'Borç': 'word.borc',
    'Alacak': 'word.alacak',
    'Risk Limiti Tanımlama': 'contact.risk_limit_def',
    'Risk Limiti Tutarı': 'contact.risk_limit_amount',
    'Risk Limiti Döviz Tür': 'contact.risk_currency',
    'Vade Günü': 'contact.due_days',
    'Risk Limiti Aşıldığında': 'contact.risk_action_exceed',
    'İşlem Yaptırma': 'contact.risk_no_action',
    'İşlem Yaptır': 'contact.risk_do_action',
    'İşlem Esnasında Onay Al': 'contact.risk_ask_approval',
    'İletişim Bilgileri': 'contact.communication_info',
    'Telefon': 'contact.phone',
    'Ülke': 'contact.country',
    'Fax': 'contact.fax',
    'İl': 'contact.city',
    'Cep Telefonu': 'contact.mobile',
    'İlçe': 'contact.district',
    'E-Mail': 'contact.email',
    'Adres': 'contact.address',
    'Web Adresi': 'contact.web_address',
    'Sevk Adresi': 'contact.shipping_address',
    'Posta Kodu': 'contact.zip_code',
    'Cari Kod': 'contact.current_code',
    'Vergi Adresi': 'contact.tax_address',
    'Açıklama': 'contact.description',
    'Vergi No': 'contact.tax_no',
    'Ticaret Sicil No': 'contact.trade_reg_no',
    'Sil': 'word.sil',
    'Yeni Sevk Adresi Ekle': 'contact.add_shipping'
};

const tAdditions = {
    'tr': `        'contact.company_name': 'Hesap/Firma Adı',
        'contact.group_name': 'Grup Adı',
        'contact.customers_group': 'MÜŞTERİLER',
        'contact.suppliers_group': 'TEDARİKÇİLER',
        'contact.wholesalers_group': 'TOPTANCILAR',
        'contact.authorized': 'Yetkili',
        'contact.default_cash': 'Varsayılan Kasa',
        'contact.opening_balance': 'Açılış Bakiyesi',
        'contact.debt_credit': 'Borç / Alacak',
        'contact.risk_limit_def': 'Risk Limiti Tanımlama',
        'contact.risk_limit_amount': 'Risk Limiti Tutarı',
        'contact.risk_currency': 'Risk Limiti Döviz Tür',
        'contact.due_days': 'Vade Günü',
        'contact.risk_action_exceed': 'Risk Limiti Aşıldığında',
        'contact.risk_no_action': 'İşlem Yaptırma',
        'contact.risk_do_action': 'İşlem Yaptır',
        'contact.risk_ask_approval': 'İşlem Esnasında Onay Al',
        'contact.communication_info': 'İletişim Bilgileri',
        'contact.phone': 'Telefon',
        'contact.country': 'Ülke',
        'contact.fax': 'Fax',
        'contact.city': 'İl',
        'contact.mobile': 'Cep Telefonu',
        'contact.district': 'İlçe',
        'contact.email': 'E-Mail',
        'contact.address': 'Adres',
        'contact.web_address': 'Web Adresi',
        'contact.shipping_address': 'Sevk Adresi',
        'contact.zip_code': 'Posta Kodu',
        'contact.current_code': 'Cari Kod',
        'contact.tax_address': 'Vergi Adresi',
        'contact.description': 'Açıklama',
        'contact.tax_no': 'Vergi No',
        'contact.trade_reg_no': 'Ticaret Sicil No',
        'contact.add_shipping': 'Yeni Sevk Adresi Ekle',`,
    'en': `        'contact.company_name': 'Account/Company Name',
        'contact.group_name': 'Group Name',
        'contact.customers_group': 'CUSTOMERS',
        'contact.suppliers_group': 'SUPPLIERS',
        'contact.wholesalers_group': 'WHOLESALERS',
        'contact.authorized': 'Authorized Person',
        'contact.default_cash': 'Default Cash Register',
        'contact.opening_balance': 'Opening Balance',
        'contact.debt_credit': 'Debt / Credit',
        'contact.risk_limit_def': 'Risk Limit Definition',
        'contact.risk_limit_amount': 'Risk Limit Amount',
        'contact.risk_currency': 'Risk Limit Currency',
        'contact.due_days': 'Due Days',
        'contact.risk_action_exceed': 'On Risk Limit Exceed',
        'contact.risk_no_action': 'Block Transaction',
        'contact.risk_do_action': 'Allow Transaction',
        'contact.risk_ask_approval': 'Ask Approval During Transaction',
        'contact.communication_info': 'Communication Information',
        'contact.phone': 'Phone',
        'contact.country': 'Country',
        'contact.fax': 'Fax',
        'contact.city': 'City/Province',
        'contact.mobile': 'Mobile Phone',
        'contact.district': 'District',
        'contact.email': 'E-Mail',
        'contact.address': 'Address',
        'contact.web_address': 'Web Address',
        'contact.shipping_address': 'Shipping Address',
        'contact.zip_code': 'Zip Code',
        'contact.current_code': 'Current Code',
        'contact.tax_address': 'Tax Address',
        'contact.description': 'Description',
        'contact.tax_no': 'Tax No',
        'contact.trade_reg_no': 'Trade Registry No',
        'contact.add_shipping': 'Add New Shipping Address',`,
    'de': `        'contact.company_name': 'Konto-/Firmenname',
        'contact.group_name': 'Gruppenname',
        'contact.customers_group': 'KUNDEN',
        'contact.suppliers_group': 'LIEFERANTEN',
        'contact.wholesalers_group': 'GROßHÄNDLER',
        'contact.authorized': 'Berechtigte Person',
        'contact.default_cash': 'Standardkasse',
        'contact.opening_balance': 'Eröffnungssaldo',
        'contact.debt_credit': 'Soll / Haben',
        'contact.risk_limit_def': 'Risikolimit Definition',
        'contact.risk_limit_amount': 'Risikolimit Betrag',
        'contact.risk_currency': 'Risikolimit Währung',
        'contact.due_days': 'Fälligkeitstage',
        'contact.risk_action_exceed': 'Bei Überschreitung des Risikolimits',
        'contact.risk_no_action': 'Transaktion blockieren',
        'contact.risk_do_action': 'Transaktion zulassen',
        'contact.risk_ask_approval': 'Zustimmung während der Transaktion anfordern',
        'contact.communication_info': 'Kontaktinformationen',
        'contact.phone': 'Telefon',
        'contact.country': 'Land',
        'contact.fax': 'Fax',
        'contact.city': 'Stadt/Provinz',
        'contact.mobile': 'Handy',
        'contact.district': 'Bezirk',
        'contact.email': 'E-Mail',
        'contact.address': 'Adresse',
        'contact.web_address': 'Webadresse',
        'contact.shipping_address': 'Lieferadresse',
        'contact.zip_code': 'Postleitzahl',
        'contact.current_code': 'Aktueller Code',
        'contact.tax_address': 'Steueradresse',
        'contact.description': 'Beschreibung',
        'contact.tax_no': 'Steuernummer',
        'contact.trade_reg_no': 'Handelsregisternummer',
        'contact.add_shipping': 'Neue Lieferadresse hinzufügen',`,
    'ru': `        'contact.company_name': 'Имя Счета/Компании',
        'contact.group_name': 'Имя Группы',
        'contact.customers_group': 'КЛИЕНТЫ',
        'contact.suppliers_group': 'ПОСТАВЩИКИ',
        'contact.wholesalers_group': 'ОПТОВИКИ',
        'contact.authorized': 'Уполномоченное Лицо',
        'contact.default_cash': 'Касса по Умолчанию',
        'contact.opening_balance': 'Начальный Баланс',
        'contact.debt_credit': 'Долг / Кредит',
        'contact.risk_limit_def': 'Определение Лимита Риска',
        'contact.risk_limit_amount': 'Сумма Лимита Риска',
        'contact.risk_currency': 'Валюта Лимита Риска',
        'contact.due_days': 'Дни Оплаты',
        'contact.risk_action_exceed': 'При Превышении Лимита Риска',
        'contact.risk_no_action': 'Блокировать Транзакцию',
        'contact.risk_do_action': 'Разрешить Транзакцию',
        'contact.risk_ask_approval': 'Запросить Разрешение во Время Транзакции',
        'contact.communication_info': 'Контактная Информация',
        'contact.phone': 'Телефон',
        'contact.country': 'Страна',
        'contact.fax': 'Факс',
        'contact.city': 'Город/Провинция',
        'contact.mobile': 'Мобильный Телефон',
        'contact.district': 'Район',
        'contact.email': 'Эл. почта',
        'contact.address': 'Адрес',
        'contact.web_address': 'Веб-адрес',
        'contact.shipping_address': 'Адрес Доставки',
        'contact.zip_code': 'Почтовый Индекс',
        'contact.current_code': 'Текущий Код',
        'contact.tax_address': 'Налоговый Адрес',
        'contact.description': 'Описание',
        'contact.tax_no': 'Налоговый Номер',
        'contact.trade_reg_no': 'Номер Торгового Реестра',
        'contact.add_shipping': 'Добавить Новый Адрес Доставки',`,
    'zh': `        'contact.company_name': '账户/公司名称',
        'contact.group_name': '组名',
        'contact.customers_group': '客户',
        'contact.suppliers_group': '供应商',
        'contact.wholesalers_group': '批发商',
        'contact.authorized': '授权人',
        'contact.default_cash': '默认收银',
        'contact.opening_balance': '期初余额',
        'contact.debt_credit': '债务 / 信用',
        'contact.risk_limit_def': '风险限额定义',
        'contact.risk_limit_amount': '风险限额金额',
        'contact.risk_currency': '风险限额货币',
        'contact.due_days': '到期天数',
        'contact.risk_action_exceed': '超出风险限额时',
        'contact.risk_no_action': '阻止交易',
        'contact.risk_do_action': '允许交易',
        'contact.risk_ask_approval': '交易时请求批准',
        'contact.communication_info': '联系信息',
        'contact.phone': '电话',
        'contact.country': '国家',
        'contact.fax': '传真',
        'contact.city': '省/市',
        'contact.mobile': '手机',
        'contact.district': '区',
        'contact.email': '电子邮件',
        'contact.address': '地址',
        'contact.web_address': '网址',
        'contact.shipping_address': '送货地址',
        'contact.zip_code': '邮政编码',
        'contact.current_code': '当前代码',
        'contact.tax_address': '税务地址',
        'contact.description': '描述',
        'contact.tax_no': '税号',
        'contact.trade_reg_no': '商业登记号',
        'contact.add_shipping': '添加新的送货地址',`
};

let js = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
for (const [lang, extra] of Object.entries(tAdditions)) {
    const rx = new RegExp("('" + lang + "'\\s*:\\s*\\{)");
    js = js.replace(rx, "$1\n" + extra);
}
fs.writeFileSync(path.join(__dirname, 'translations.js'), js, 'utf8');

// Patch new_account.html

const sortedKeys = Object.keys(dict).sort((a,b) => b.length - a.length);

for (const turkishText of sortedKeys) {
    const key = dict[turkishText];
    const safeWord = turkishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    
    // Labels, text nodes, spans
    const rxLabel = new RegExp('<label>(\\s*)' + safeWord + '(\\s*)<\/label>', 'g');
    html = html.replace(rxLabel, '<label><span data-i18n="' + key + '">' + turkishText + '</span></label>');
    
    // Headings
    const rxHeading = new RegExp('<h3 class="form-section-title">\\s*' + safeWord + '\\s*</h3>', 'g');
    html = html.replace(rxHeading, '<h3 class="form-section-title"><span data-i18n="' + key + '">' + turkishText + '</span></h3>');
    
    // Options
    const rxOption = new RegExp('<option>' + safeWord + '</option>', 'g');
    html = html.replace(rxOption, '<option data-i18n="' + key + '">' + turkishText + '</option>');

    // Buttons
    if (turkishText === 'Sil') {
        html = html.replace(/Sil<\/button>/g, '<span data-i18n="' + key + '">Sil</span></button>');
    }
    
    // Inputs (Placeholder) - IMPORTANT MUST USE EXACT MATCH
    // <input type="text" id="telefon" class="form-control" placeholder="Telefon">
    const rxPlaceholder = new RegExp('placeholder="' + safeWord + '"', 'g');
    html = html.replace(rxPlaceholder, 'placeholder="' + turkishText + '" data-i18n="' + key + '"');
}

// Complex radio button text replacement (Since they aren't enclosed in spans)
html = html.replace(/<label><input type="radio" name="risk_action" value="islem_yaptirma"> İşlem Yaptırma<\/label>/g, '<label><input type="radio" name="risk_action" value="islem_yaptirma"> <span data-i18n="contact.risk_no_action">İşlem Yaptırma</span></label>');
html = html.replace(/<label><input type="radio" name="risk_action" value="islem_yaptir" checked> <span data-i18n="word.islem">İşlem<\/span>\s*Yaptır<\/label>/g, '<label><input type="radio" name="risk_action" value="islem_yaptir" checked> <span data-i18n="contact.risk_do_action">İşlem Yaptır</span></label>');
html = html.replace(/<label><input type="radio" name="risk_action" value="onay_al"> İşlem Esnasında Onay\s*Al<\/label>/g, '<label><input type="radio" name="risk_action" value="onay_al"> <span data-i18n="contact.risk_ask_approval">İşlem Esnasında Onay Al</span></label>');

html = html.replace(/translations\.js(\?v=\d+)?/g, 'translations.js?v=35');

fs.writeFileSync(path.join(__dirname, 'new_account.html'), html, 'utf8');

console.log("Patched new_account.html and updated translations for contact page.");
