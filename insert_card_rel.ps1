$path = "index.html"
$content = Get-Content -Path $path -Raw -Encoding UTF8

$target = '<h3 data-i18n="sidebar.checks">Çek Senet</h3>
                    </div>
                </a>'

$replacement = '<h3 data-i18n="sidebar.checks">Çek Senet</h3>
                    </div>
                </a>
                <a href="teklif_siparis.html" class="module-card">
                    <div class="icon"><i class="fa-solid fa-file-contract"></i></div>
                    <div class="card-content">
                        <h3 data-i18n="sidebar.offers">Teklif Sipariş</h3>
                    </div>
                </a>'

if ($content -like '*href="teklif_siparis.html"*') {
    Write-Host "Card already exists."
}
elseif ($content -match 'Çek Senet') {
    # Using specific replace to ensure match despite whitespace
    # We will match vaguely and reconstruct
    # Actually, let's keep it simple: exact string match failed before?
    # Let's try matching a smaller unique part
    if ($content.Contains($target)) {
        $newContent = $content.Replace($target, $replacement)
        Set-Content -Path $path -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Successfully inserted Teklif Sipariş card."
    }
    else {
        Write-Host "Target string not found (Exact match failed). formatting might differ."
    }
}
else {
    Write-Host "Could not find 'Çek Senet' anchor."
}
