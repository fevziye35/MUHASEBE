$utf8 = New-Object System.Text.UTF8Encoding $false
$files = Get-ChildItem -Path . -Recurse -Include *.html, *.css, *.js

foreach ($f in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
        $original = $content
        
        # Mapping: Mojibake to Character
        $content = $content.Replace("ÅŸ", "ş")
        $content = $content.Replace("Ä±", "ı")
        $content = $content.Replace("Ä°", "İ")
        $content = $content.Replace("Åž", "Ş")
        $content = $content.Replace("Ãœ", "Ü")
        $content = $content.Replace("Ã¼", "ü")
        $content = $content.Replace("Ã–", "Ö")
        $content = $content.Replace("Ã¶", "ö")
        $content = $content.Replace("Ã‡", "Ç")
        $content = $content.Replace("Ã§", "ç")
        $content = $content.Replace("ÄŸ", "ğ")
        $content = $content.Replace("Äž", "Ğ")
        $content = $content.Replace("â‚º", "₺")
        $content = $content.Replace("Ã¢", "â")
        $content = $content.Replace("Ã®", "î")
        
        if ($content -ne $original) {
            [System.IO.File]::WriteAllText($f.FullName, $content, $utf8)
            Write-Host "Fixed: $($f.Name)"
        }
    } catch {
        # Skip
    }
}
