$files = @(
    "kasa.html",
    "faturalar.html",
    "kasa_detay.html",
    "banka_ozet.html",
    "stok_kartlari.html",
    "satis_yap.html",
    "new_account.html",
    "groups.html",
    "gelir_gider.html",
    "fiyat_listesi.html",
    "depo_aktarim.html",
    "depo_stok_hareketleri.html",
    "customer_statement.html",
    "cek_senet.html",
    "cari_raporu.html",
    "cari_mutabakat_raporu.html",
    "cari_islem_raporu.html",
    "cari_bakiye_raporu.html",
    "debit_voucher.html",
    "babs_raporu.html",
    "b2b.html",
    "stok_gruplari.html",
    "stok_markalari.html",
    "stok_yeni.html",
    "toplu_stok_raporu.html",
    "stok_paketgrup.html",
    "stok_hareketleri.html",
    "stok_depolari.html",
    "stok_birimleri.html"
)

$basePath = "c:\Users\fevzi\Desktop\Muhasebe Programı\"
$count = 0

foreach ($file in $files) {
    $fullPath = Join-Path $basePath $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        $updated = $content -replace '(<span class="brand-text">MAKFA GIDA)', '<span class="brand-text brand-text-page">MAKFA GIDA'
        if ($content -ne $updated) {
            Set-Content $fullPath -Value $updated -Encoding UTF8 -NoNewline
            $count++
            Write-Output "Updated: $file"
        }
    }
}

Write-Output "Total files updated: $count"
