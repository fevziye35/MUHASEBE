$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Define the pattern to look for (handling potential newlines/spaces)
    # matching: href="#" ... Teklif Sipariş
    # replacing with: href="teklif_siparis.html" ... Teklif Sipariş
    
    if ($content -match 'href="#">\s*<i class="fa-solid fa-file-contract"></i>\s*<span data-i18n="sidebar.offers">Teklif\s*Sipariş</span>') {
        $content = $content -replace 'href="#">\s*<i class="fa-solid fa-file-contract"></i>\s*<span data-i18n="sidebar.offers">Teklif\s*Sipariş</span>', 'href="teklif_siparis.html"><i class="fa-solid fa-file-contract"></i> <span data-i18n="sidebar.offers">Teklif Sipariş</span>'
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated $($file.Name)"
    }
    else {
        # Check if already updated to avoid false negatives?
        if ($content -like '*href="teklif_siparis.html"*') {
            Write-Host "Already updated $($file.Name)"
        }
        else {
            # Try a simpler replace if regex fails due to exact whitespace
            # This targets the specific multiline structure seen in index.html
            $oldString = '<li><a href="#"><i class="fa-solid fa-file-contract"></i> <span data-i18n="sidebar.offers">Teklif
                        Sipariş</span></a></li>'
            $newString = '<li><a href="teklif_siparis.html"><i class="fa-solid fa-file-contract"></i> <span data-i18n="sidebar.offers">Teklif Sipariş</span></a></li>'
             
            if ($content.Contains($oldString)) {
                $content = $content.Replace($oldString, $newString)
                Set-Content -Path $file.FullName -Value $content -NoNewline
                Write-Host "Updated $($file.Name) using string replace"
            }
            elseif ($content -match 'href="#">\s*<i class="fa-solid fa-file-contract"></i>') {
                # Fallback regex for single line variance
                $content = $content -replace 'href="#">\s*<i class="fa-solid fa-file-contract"></i>\s*<span data-i18n="sidebar.offers">Teklif Sipariş</span>', 'href="teklif_siparis.html"><i class="fa-solid fa-file-contract"></i> <span data-i18n="sidebar.offers">Teklif Sipariş</span>'
                Set-Content -Path $file.FullName -Value $content -NoNewline
                Write-Host "Updated $($file.Name) using fallback regex"
            }
            else {
                Write-Host "Skipped $($file.Name) (Pattern not found)"
            }
        }
    }
}
