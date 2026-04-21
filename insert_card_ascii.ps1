$path = "c:\Users\fevzi\Desktop\Muhasebe Programı\index.html"
$content = Get-Content -Path $path -Raw -Encoding UTF8

# Target ASCII string to avoid encoding issues
$targetAscii = 'data-i18n="sidebar.checks"'

if ($content -like '*href="teklif_siparis.html"*') {
    Write-Host "Card already exists."
}
elseif ($content -match $targetAscii) {
    # Find the closing tag of this card
    # We assume standard formatting: </h3>...</div>...</a>
    # Let's replace the whole card block end
    
    # We knwo the card ends with:
    # <div class="card-content">
    #    <h3 data-i18n="sidebar.checks">...</h3>
    # </div>
    # </a>
    
    # regex replace to find the closing </a> after sidebar.checks
    # (?s) allows . to match newline
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
    Write-Host "Successfully inserted Teklif Sipariş card using regex."
}
else {
    Write-Host "Target string 'sidebar.checks' not found."
}
