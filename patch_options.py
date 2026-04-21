import os

file_path = 'satis_faturasi.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = [
    # Options at top
    ('<option value="T&uuml;rkiye">T&uuml;rkiye</option>', '<option value="T&uuml;rkiye" data-i18n="mega.turkiye">Türkiye</option>'),
    ('<option>TEMELFATURA</option>', '<option data-i18n="mega.temel_fatura">TEMELFATURA</option>'),
    ('<option>TICARIFATURA</option>', '<option data-i18n="mega.ticari_fatura">TICARIFATURA</option>'),
    ('<option>SATIS</option>', '<option data-i18n="mega.satis">SATIS</option>'),
    ('<option>IADE</option>', '<option data-i18n="mega.iade">IADE</option>'),
    
    # Manual Add Unit
    ('<option>Adet</option>', '<option data-i18n="word.adet">Adet</option>'),
    ('<option>Kg</option>', '<option data-i18n="word.kg">Kg</option>'),
    ('<option>Ton</option>', '<option data-i18n="word.ton">Ton</option>'),
    ('<option>Container</option>', '<option data-i18n="word.container">Container</option>'),
    ('<option>Carton</option>', '<option data-i18n="word.carton">Carton</option>'),
    ('<option>Box</option>', '<option data-i18n="word.box">Box</option>'),
    ('<option>Net Ton</option>', '<option data-i18n="word.net_ton">Net Ton</option>'),
    ('<option>Gross Ton</option>', '<option data-i18n="word.gross_ton">Gross Ton</option>'),

    # KDV / OTV
    ('<option value="dahil">Kdv Dahil</option>', '<option value="dahil" data-i18n="mega.kdv_dahil">Kdv Dahil</option>'),
    ('<option value="haric">Kdv Hari&ccedil;</option>', '<option value="haric" data-i18n="mega.kdv_haric">Kdv Hariç</option>'),
    ('<option>&Ouml;tv Dahil</option>', '<option data-i18n="mega.otv_dahil">Ötv Dahil</option>'),
    ('<option>&Ouml;tv Hari&ccedil;</option>', '<option data-i18n="mega.otv_haric">Ötv Hariç</option>'),
    
    # Discount
    ('<option>Y&uuml;zde</option>', '<option data-i18n="word.yuzde">Yüzde</option>'),
    ('<option>Tutar</option>', '<option data-i18n="word.tutar">Tutar</option>'),
    
    # Tevkifat
    ('<option value="0">Yok</option>', '<option value="0" data-i18n="word.yok">Yok</option>'),
    
    # Bottom selections
    ('<option>Se&ccedil;iniz...</option>', '<option data-i18n="word.seciniz">Seçiniz...</option>'),
    ('<option>Genel A&ccedil;&#305;klama</option>', '<option data-i18n="mega.genel_aciklama">Genel Açıklama</option>'),
    ('<option>&Ouml;deme Notu</option>', '<option data-i18n="mega.odeme_notu">Ödeme Notu</option>'),
    ('<option>Teslimat Notu</option>', '<option data-i18n="mega.teslimat_notu">Teslimat Notu</option>'),

    ('<option>Merkez</option>', '<option data-i18n="mega.merkez">Merkez</option>'),
    ('<option>&#350;ube 1</option>', '<option data-i18n="mega.sube_1">Şube 1</option>'),
    
    ('<option>Merkez Kasa</option>', '<option data-i18n="mega.merkez_kasa">Merkez Kasa</option>'),
    ('<option>&#350;ube Kasa</option>', '<option data-i18n="mega.sube_kasa">Şube Kasa</option>'),
    
    ('<option>Nakit</option>', '<option data-i18n="word.nakit">Nakit</option>'),
    ('<option>Kredi Kart&#305;</option>', '<option data-i18n="mega.kredi_karti">Kredi Kartı</option>'),
    ('<option>Havale/EFT</option>', '<option data-i18n="mega.havale_eft">Havale/EFT</option>'),
    ('<option>&#199;ek</option>', '<option data-i18n="word.cek">Çek</option>'),
    ('<option>Senet</option>', '<option data-i18n="word.senet">Senet</option>'),
    
    # Syntax error fix
    ('<label class="form-label-sm)Kasa Se&ccedil;iniz</label>', '<label class="form-label-sm"><span data-i18n="mega.kasa_seciniz">Kasa Seçiniz</span></label>'),
    
]

for origin, dest in replacements:
    html = html.replace(origin, dest)

import re
html = re.sub(r'translations\.js\?v=\d+', 'translations.js?v=602', html)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Option tags patched.")
