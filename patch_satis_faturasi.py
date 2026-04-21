import os
import re

file_path = 'satis_faturasi.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = [
    # Top info
    ('<h2 class="page-title">Sat&#305;&#351; Faturas&#305;</h2>', '<h2 class="page-title"><span data-i18n="sidebar.sales_invoice">Satış Faturası</span></h2>'),
    ('<label class="form-label-sm">&Uuml;nvan</label>', '<label class="form-label-sm"><span data-i18n="word.unvan">&Uuml;nvan</span></label>'),
    ('<label class="form-label-sm">Yetkili</label>', '<label class="form-label-sm"><span data-i18n="word.yetkili">Yetkili</span></label>'),
    ('<label class="form-label-sm">E-posta</label>', '<label class="form-label-sm"><span data-i18n="word.eposta">E-posta</span></label>'),
    ('<label class="form-label-sm">Vergi Dairesi</label>', '<label class="form-label-sm"><span data-i18n="mega.vergi_dairesi">Vergi Dairesi</span></label>'),
    ('<label class="form-label-sm">&Idot;l</label>', '<label class="form-label-sm"><span data-i18n="word.il">&Idot;l</span></label>'),
    ('<label class="form-label-sm">&Idot;l&ccedil;e</label>', '<label class="form-label-sm"><span data-i18n="word.ilce">&Idot;l&ccedil;e</span></label>'),
    ('<label class="form-label-sm">&Uuml;lke</label>', '<label class="form-label-sm"><span data-i18n="word.ulke">&Uuml;lke</span></label>'),
    
    # Right panel
    ('<div class="tab-item">Detay Bilgiler</div>', '<div class="tab-item"><span data-i18n="mega.detay_bilgiler">Detay Bilgiler</span></div>'),
    ('<label class="form-label-sm">Fatura Tarihi</label>', '<label class="form-label-sm"><span data-i18n="mega.fatura_tarihi">Fatura Tarihi</span></label>'),
    ('<label class="form-label-sm">Vade Tarihi</label>', '<label class="form-label-sm"><span data-i18n="mega.vade_tarihi">Vade Tarihi</span></label>'),
    ('<label class="form-label-sm">Fatura No</label>', '<label class="form-label-sm"><span data-i18n="mega.fatura_no">Fatura No</span></label>'),
    ('<label for="chkKdvDahil">KDV Dahil</label>', '<label for="chkKdvDahil"><span data-i18n="mega.kdv_dahil">KDV Dahil</span></label>'),
    ('<label class="form-label-sm">Para Birimleri</label>', '<label class="form-label-sm"><span data-i18n="mega.para_birimleri">Para Birimleri</span></label>'),
    ('<label class="form-label-sm">D&ouml;viz Kuru</label>', '<label class="form-label-sm"><span data-i18n="mega.doviz_kuru">D&ouml;viz Kuru</span></label>'),
    
    # Barcode
    ('class="barcode-input" placeholder="Barkod..."', 'class="barcode-input" placeholder="Barkod..." data-i18n="mega.barkod"'),
    ('id="btnToggleManualForm">&Uuml;r&uuml;n Ekle</button>', 'id="btnToggleManualForm"><span data-i18n="mega.urun_ekle">&Uuml;r&uuml;n Ekle</span></button>'),
    
    # Table headers
    ('<th class="w-10-pct">Birim Fiyat&#305;</th>', '<th class="w-10-pct"><span data-i18n="word.birim_fiyati">Birim Fiyatı</span></th>'),
    ('<th class="w-10-pct">Miktar</th>', '<th class="w-10-pct"><span data-i18n="word.miktar">Miktar</span></th>'),
    ('<th class="w-10-pct">Toplam</th>', '<th class="w-10-pct"><span data-i18n="word.toplam">Toplam</span></th>'),
    ('<th class="w-5-pct">&#304;sk %</th>', '<th class="w-5-pct"><span data-i18n="word.isk_percent">İsk %</span></th>'),
    ('<th class="w-10-pct">&#304;sk</th>', '<th class="w-10-pct"><span data-i18n="word.isk">İsk</span></th>'),
    ('<th class="w-10-pct">G. Toplam</th>', '<th class="w-10-pct"><span data-i18n="word.g_toplam">G. Toplam</span></th>'),
    ('<th class="w-15-pct text-right">&#304;&#351;lemler</th>', '<th class="w-15-pct text-right"><span data-i18n="word.islemler">İşlemler</span></th>'),
    
    # Totals 
    ('<div class="totals-tab active">Tutarlar</div>', '<div class="totals-tab active"><span data-i18n="mega.tutarlar">Tutarlar</span></div>'),
    ('<div class="totals-tab">Toplu &#304;skonto</div>', '<div class="totals-tab"><span data-i18n="mega.toplu_iskonto">Toplu İskonto</span></div>'),
    ('<td>Toplam</td>', '<td><span data-i18n="word.toplam">Toplam</span></td>'),
    ('<td>&#304;skonto</td>', '<td><span data-i18n="word.iskonto">İskonto</span></td>'),
    ('<td>Ara Toplam</td>', '<td><span data-i18n="word.ara_toplam">Ara Toplam</span></td>'),
    ('<td>KDV Tutar</td>', '<td><span data-i18n="mega.kdv_tutar">KDV Tutar</span></td>'),
    ('<td>&Ouml;TV Tutar</td>', '<td><span data-i18n="mega.otv_tutar">ÖTV Tutar</span></td>'),
    ('<td>Di& colonial;er Vergiler Tutar</td>', '<td><span data-i18n="mega.diger_vergiler">Diğer Vergiler Tutar</span></td>'),
    ('<td>\n                            Tevkifat\n                        </td>', '<td>\n                            <span data-i18n="mega.tevkifat">Tevkifat</span>\n                        </td>'),
    ('\n                        <td>Oran</td>', '\n                        <td><span data-i18n="mega.oran">Oran</span></td>'),
    ('<td class="border-top-2-ddd">G. Toplam</td>', '<td class="border-top-2-ddd"><span data-i18n="word.g_toplam">G. Toplam</span></td>'),
    
    # Bottom details
    ('<label class="form-label-sm">A&ccedil;&#305;klama Ba&#351;l&#305;&#287;&#305;</label>', '<label class="form-label-sm"><span data-i18n="mega.aciklama_basligi">Açıklama Başlığı</span></label>'),
    ('<label class="form-label-sm">A&ccedil;&#305;klamalar</label>', '<label class="form-label-sm"><span data-i18n="mega.aciklamalar">Açıklamalar</span></label>'),
    ('<label class="form-label-sm">A&ccedil;&#305;klama</label>', '<label class="form-label-sm"><span data-i18n="mega.aciklama">Açıklama</span></label>'),
    ('<button class="btn-desc-save">A&ccedil;&#305;klama Kaydet</button>', '<button class="btn-desc-save"><span data-i18n="mega.aciklama_kaydet">Açıklama Kaydet</span></button>'),
    ('<label class="form-label-sm">&Ouml;denen</label>', '<label class="form-label-sm"><span data-i18n="mega.odenen">Ödenen</span></label>'),
    ('<label class="form-label-sm">Depo Se&ccedil;iniz</label>', '<label class="form-label-sm"><span data-i18n="mega.depo_seciniz">Depo Seçiniz</span></label>'),
    ('<label class="form-label-sm">Merkez Kasa / &#350;ube Kasa</label>', '<label class="form-label-sm"><span data-i18n="mega.merkez_kasa">Merkez Kasa / Şube Kasa</span></label>'),
    ('<label class="form-label-sm">&Ouml;deme &#350;ekli</label>', '<label class="form-label-sm"><span data-i18n="mega.odeme_sekli">Ödeme Şekli</span></label>'),
]

for origin, dest in replacements:
    html = html.replace(origin, dest)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("satis_faturasi.html translated tags added.")
