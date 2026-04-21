# PowerShell script to update E-Fatura links in all HTML files
# This adds an onclick handler to ensure reliable navigation

$directory = "c:\Users\fevzi\Desktop\Muhasebe Programı"
$searchPattern = '<a href="efatura.html">'
$replacement = '<a href="efatura.html" onclick="window.location.href=''efatura.html''; return false;">'

# Get all HTML files
$htmlFiles = Get-ChildItem -Path $directory -Filter "*.html" -File

$updatedCount = 0
$totalFiles = 0

foreach ($file in $htmlFiles) {
    $totalFiles++
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if the file contains the old pattern
    if ($content -match [regex]::Escape($searchPattern)) {
        # Replace the pattern
        $newContent = $content -replace [regex]::Escape($searchPattern), $replacement
        
        # Write back to file
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        
        Write-Host "Updated: $($file.Name)" -ForegroundColor Green
        $updatedCount++
    }
}

Write-Host "`nTotal files scanned: $totalFiles" -ForegroundColor Cyan
Write-Host "Files updated: $updatedCount" -ForegroundColor Cyan
Write-Host "`nE-Fatura links have been fixed!" -ForegroundColor Green
