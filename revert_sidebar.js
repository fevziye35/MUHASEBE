const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const fullSidebarMenu = `
            <li><a href="index.html" class="active"><i class="fa-solid fa-house"></i> <span
                        data-i18n="sidebar.home">Giriş Ekranı</span></a></li>
            <li><a href="satis_yap.html"><i class="fa-solid fa-cart-shopping"></i> <span data-i18n="sidebar.sales">Satış
                        Yap</span></a></li>
            <li><a href="cari_hesaplar.html"><i class="fa-solid fa-users"></i> <span data-i18n="sidebar.customers">Cari
                        Hesaplar</span></a></li>
            <li><a href="stok_kartlari.html"><i class="fa-solid fa-boxes-stacked"></i> <span
                        data-i18n="sidebar.stock">Stok Kartları</span></a></li>
            <li><a href="fatura_merkezi.html"><i class="fa-solid fa-file-invoice"></i> <span
                        data-i18n="sidebar.invoices">Faturalar</span></a></li>
            <li><a href="efatura.html"><i class="fa-solid fa-file-invoice-dollar"></i> <span
                        data-i18n="sidebar.einvoice">E-Fatura</span></a></li>
            <li><a href="e_irsaliye.html"><i class="fa-solid fa-truck-fast"></i> <span
                        data-i18n="sidebar.ewaybill">E-İrsaliye</span></a></li>
            <li><a href="e_smm.html"><i class="fa-solid fa-file-signature"></i> <span
                        data-i18n="sidebar.esmm">E-Smm</span></a>
            </li>
            <li><a href="gelir_gider.html"><i class="fa-solid fa-chart-line"></i> <span
                        data-i18n="sidebar.income_expense">Gelir Gider</span></a></li>
            <li><a href="kasa.html"><i class="fa-solid fa-cash-register"></i> <span
                        data-i18n="sidebar.cash">Kasa</span></a></li>
            <li><a href="banka_ozet.html"><i class="fa-solid fa-building-columns"></i> <span
                        data-i18n="sidebar.bank">Banka</span></a></li>
            <li><a href="cek_senet.html"><i class="fa-solid fa-money-check"></i> <span
                        data-i18n="sidebar.checks">Çek Senet</span></a></li>
            <li><a href="taksit_takip.html"><i class="fa-solid fa-calendar-days"></i> <span
                        data-i18n="sidebar.installments">Taksit
                        Takip</span></a></li>
            <li><a href="teklif_siparis.html"><i class="fa-solid fa-file-contract"></i> <span
                        data-i18n="sidebar.offers">Teklif
                        Sipariş</span></a></li>
            <li><a href="doviz_ayarlari.html" id="doviz_settings_link"><i class="fa-solid fa-dollar-sign"></i> <span data-i18n="sidebar.currency">Döviz Ayarları</span></a></li>
            
            <li class="has-submenu">
                <a href="javascript:void(0)" class="submenu-toggle"><i class="fa-solid fa-file-lines"></i> <span
                        data-i18n="sidebar.reports">Raporlar</span> <i
                         class="fa-solid fa-chevron-right ms-auto arrow"></i></a>
                <ul class="submenu">
                    <li><a href="cari_raporu.html"><i class="fa-solid fa-users"></i> <span>Cari</span></a></li>
                    <li><a href="toplu_stok_raporu.html"><i class="fa-solid fa-box-open"></i> <span>Stok</span></a></li>
                    <li><a href="taksit_rapor.html"><i class="fa-solid fa-calendar-days"></i> <span>Taksit</span></a></li>
                    <li><a href="satis_raporu.html"><i class="fa-solid fa-cart-shopping"></i> <span>Satış</span></a></li>
                    <li><a href="kasa_raporu.html"><i class="fa-solid fa-cash-register"></i> <span>Kasa</span></a></li>
                    <li><a href="banka_raporu.html"><i class="fa-solid fa-building-columns"></i> <span>Banka</span></a></li>
                    <li><a href="cek_raporu.html"><i class="fa-solid fa-copy"></i> <span>Çek Senet</span></a></li>
                    <li><a href="gun_sonu_raporu.html"><i class="fa-solid fa-file-lines"></i> <span>Gün Sonu Raporu</span></a></li>
                    <li><a href="kar_zarar_analizi.html"><i class="fa-solid fa-file-lines"></i> <span>Kâr Zarar Analizi</span></a></li>
                    <li><a href="gelir_gider.html"><i class="fa-solid fa-calendar-days"></i> <span>Gelir Gider</span></a></li>
                </ul>
            </li>
            <li><a href="mesajlar.html"><i class="fa-solid fa-envelope"></i> <span data-i18n="sidebar.messages">Mesajlar</span></a></li>
            
            <li class="has-submenu">
                <a href="javascript:void(0)" class="submenu-toggle"><i class="fa-solid fa-layer-group"></i> <span
                        data-i18n="sidebar.modules">Ek Modüller</span> <i
                         class="fa-solid fa-chevron-right ms-auto arrow"></i></a>
                <ul class="submenu">
                    <li><a href="personel_takip.html"><i class="fa-solid fa-user-clock"></i> <span>Personel Takip</span></a></li>
                    <li><a href="ajanda.html"><i class="fa-solid fa-calendar-check"></i> <span>Ajanda</span></a></li>
                    <li><a href="kisi_ekle.html"><i class="fa-solid fa-user-plus"></i> <span>Kişi Ekleme Paneli</span></a></li>
                </ul>
            </li>
`;

htmlFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const sidebarRegex = /<ul class="sidebar-menu">[\s\S]*?(<\/nav>|\\n    <\/nav>)/gi;

    if (sidebarRegex.test(content)) {
        let fileSidebar = fullSidebarMenu;
        fileSidebar = fileSidebar.replace(/ class="active"/g, '');
        
        let activePattern = file;
        const activeRegex = new RegExp(`href="${activePattern}"`, 'g');
        fileSidebar = fileSidebar.replace(activeRegex, `href="${activePattern}" class="active"`);
        
        const replacement = '<ul class="sidebar-menu">\n' + fileSidebar + '        </ul>\n    </nav>';
        
        content = content.replace(sidebarRegex, replacement);
        
        // Final sanity check for double literals just in case
        content = content.replace(/\\n/g, '\n');
        
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log('Successfully reverted sidebar and routed Faturalar to fatura_merkezi.html');
