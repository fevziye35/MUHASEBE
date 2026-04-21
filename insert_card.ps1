$path = "c:\Users\fevzi\Desktop\Muhasebe Programı\index.html"

# Read content (Get-Content -Raw reads as single string)
# Try detecting encoding or assume UTF8
$content = Get-Content -Path $path -Raw -Encoding UTF8

# Define target and replacement
# Using simpler matching to avoid whitespace issues if possible
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

# Check if already exists
if ($content -like '*href="teklif_siparis.html"*') {
    Write-Host "Card already exists."
}
elseif ($content.Contains($target)) {
    $newContent = $content.Replace($target, $replacement)
    Set-Content -Path $path -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Successfully inserted Teklif Sipariş card."
}
else {
    Write-Host "Target string not found. Content start:"
    $content.Substring(0, 100)
}
