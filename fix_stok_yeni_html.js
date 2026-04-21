const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'stok_yeni.html'), 'utf8');

const correctedForm = \`            <form id="stockForm" class="stock-form">
                <!-- Barcode Section -->
                <div class="form-row barcode-section">
                    <div class="barcode-input-container">
                        <input type="text" id="barkod" placeholder="Barkod" data-i18n="mega.barkod" class="form-control-styled mb-5">
                        <button type="button" class="btn btn-barcode" onclick="generateBarcode()"><span data-i18n="mega.otomatik_barkod">Otomatik Barkod</span></button>
                    </div>
                    <div class="barcode-options">
                        <label class="form-label-bold"><span data-i18n="mega.barkod_turu">Barkod Türü:</span></label>
                        <div class="checkbox-container">
                            <label class="checkbox-label"><input type="checkbox" class="mr-5"><span data-i18n="mega.standart_urun">Standart Ürün</span></label>
                            <label class="checkbox-label"><input type="checkbox" class="mr-5"><span data-i18n="mega.son_eklenen">Son Eklenen</span></label>
                        </div>
                    </div>
                </div>

                <!-- Stock Info -->
                <div class="form-group mb-15">
                    <input type="text" id="stokKodu" placeholder="Stok Kodu" data-i18n="mega.stok_kodu" class="form-control-styled">
                </div>
                <div class="form-group mb-15">
                    <input type="text" id="stokRafi" placeholder="Stok Rafı" data-i18n="mega.stok_rafi" class="form-control-styled">
                </div>
                <div class="form-group mb-15">
                    <input type="text" id="stokAdi" placeholder="Stok Adı" data-i18n="mega.stok_adi" class="form-control-styled">
                </div>

                <!-- Classification -->
                <div class="form-group mb-15">
                    <label class="form-label-bold"><span data-i18n="mega.grup_label">Grup:</span></label>
                    <select id="grup" class="form-control-styled">
                        <option data-i18n="mega.temel_gida">Temel Gıda</option>
                        <option data-i18n="mega.icecek">İçecek</option>
                        <option data-i18n="mega.temizlik">Temizlik</option>
                    </select>
                </div>

                <div class="form-group mb-15">
                    <label class="form-label-bold"><span data-i18n="mega.marka_label">Marka:</span></label>
                    <select id="marka" class="form-control-styled">
                        <option data-i18n="word.seciniz">Seçiniz</option>
                        <option>Uno</option>
                        <option>Çaykur</option>
                        <option>Sütaş</option>
                    </select>
                </div>

                <div class="form-group mb-15">
                    <label class="form-label-bold"><span data-i18n="mega.depo_label">Depo:</span></label>
                    <select id="depo" class="form-control-styled">
                        <option>Merkez</option>
                        <option data-i18n="mega.sube">Şube</option>
                    </select>
                </div>

                <!-- Pricing -->
                <div class="form-row-flex">
                    <div class="flex-1">
                        <label class="form-label-bold"><span data-i18n="mega.alis_fiyati">Alış Fiyatı:</span></label>
                        <input type="number" id="alisFiyati" value="0" class="form-control-styled">
                    </div>
                    <div class="flex-1">
                        <label class="form-label-bold"><span data-i18n="mega.alis_doviz_turu">Alış Döviz Türü:</span></label>
                        <select class="form-control-styled">
                            <option>TRY</option>
                            <option>USD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>

                <div class="form-row-flex">
                    <div class="flex-1">
                        <label class="form-label-bold"><span data-i18n="mega.satis_fiyati_label">Satış Fiyatı:</span></label>
                        <input type="number" id="satisFiyati" value="0" class="form-control-styled">
                    </div>
                    <div class="flex-1">
                        <label class="form-label-bold"><span data-i18n="mega.satis_doviz_turu">Satış Döviz Türü:</span></label>
                        <select class="form-control-styled">
                            <option>TRY</option>
                            <option>USD</option>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>

                <div class="form-row-flex">
                    <div class="flex-1">
                        <label class="form-label-bold"><span data-i18n="mega.kdv_orani">KDV Oranı:</span></label>
                        <select class="form-control-styled">
                            <option value="0">%0</option>
                            <option value="1">%1</option>
                            <option value="10">%10</option>
                            <option value="20" selected>%20</option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label class="form-label-bold"><span data-i18n="mega.kdv_durumu">KDV Durumu:</span></label>
                        <select class="form-control-styled">
                            <option data-i18n="mega.dahil">Dahil</option>
                            <option data-i18n="mega.haric">Hariç</option>
                        </select>
                    </div>
                </div>

                <div class="form-actions mt-30">
                    <button type="submit" class="btn btn-success btn-padding-lg"><i class="fa-solid fa-save"></i>
                        <span data-i18n="mega.kaydet">Kaydet</span></button>
                    <a href="stok_kartlari.html" class="btn btn-secondary btn-padding-md"><i
                            class="fa-solid fa-times"></i> <span data-i18n="mega.iptal">İptal</span></a>
                </div>
            </form>\`;

const startIdx = html.indexOf('<form id="stockForm" class="stock-form">');
const endIdx = html.indexOf('</form>') + '</form>'.length;

if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + correctedForm + html.substring(endIdx);
    
    // Also bump version
    html = html.replace(/translations\\.js\\?v=\\d+/g, 'translations.js?v=110');
    
    fs.writeFileSync(path.join(__dirname, 'stok_yeni.html'), html, 'utf8');
    console.log('Restored entire form successfully');
} else {
    console.log('Could not find form boundaries!');
}
