$path = "index.html"
# Force UTF8 reading
$content = Get-Content -Path $path -Raw -Encoding UTF8

$targetAscii = 'data-i18n="sidebar.checks"'

if ($content -like '*href="teklif_siparis.html"*') {
    Write-Host "Card already exists."
}
elseif ($content -match $targetAscii) {
    # Regex to find the closing </a> of the checks card
    $pattern = '(?s)(data-i18n="sidebar.checks".*?</a>)'
    
    $replacement = '$1
                <a href="teklif_siparis.html" class="module-card">
                    <div class="icon"><i class="fa-solid fa-file-contract"></i></div>
                    <div class="card-content">
                        <h3 data-i18n="sidebar.offers">Teklif Sipariş</h3>
                    </div>
                </a>'
    
    $newContent = $content -replace $pattern, $replacement
    
    Set-Content -Path $path -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Successfully inserted Teklif Sipariş card using regex and relative path."
}
else {
    Write-Host "Target string 'sidebar.checks' not found."
}
