$files = Get-ChildItem -Path "c:\Users\fevzi\Desktop\Muhasebe Programı" -Filter *.html -Recurse

foreach ($file in $files) {
    if ($file.Name -eq "taksit_takip.html") { continue } # Skip the file itself just in case
    
    $lines = Get-Content $file.FullName
    $newLines = @()
    $modified = $false
    
    foreach ($line in $lines) {
        # Check if line contains both href="#" and fa-calendar-days
        if ($line -match 'href="#"' -and $line -match 'fa-calendar-days') {
            # Replace only the href part
            $newLine = $line -replace 'href="#"', 'href="taksit_takip.html"'
            $newLines += $newLine
            $modified = $true
        }
        else {
            $newLines += $line
        }
    }
    
    if ($modified) {
        $newLines | Set-Content $file.FullName -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
