$masterHeader = @"
        <header class="header">
            <div class="header-left">
                <div class="sidebar-toggle-box">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div class="logo-area">
                    <span class="brand-text" data-i18n="word.company_name">MAKFA GIDA ÜRÜNLERİ SANAYİ TİCARET A.Ş.</span>
                </div>
            </div>
            <div class="header-right">
                <div class="header-item header-lang-dropdown" onclick="toggleLanguageMenu(event)">
                    <i class="fa-solid fa-flag"></i> <span id="header-lang-text">Language</span>
                    <div class="header-lang-menu" id="header-lang-menu">
                        <div class="header-lang-item" onclick="setLanguage('tr')"><i class="fa-solid fa-flag"></i> Türkçe</div>
                        <div class="header-lang-item" onclick="setLanguage('en')"><i class="fa-solid fa-flag-usa"></i> English</div>
                        <div class="header-lang-item" onclick="setLanguage('de')"><i class="fa-solid fa-flag"></i> Deutsch (Almanca)</div>
                        <div class="header-lang-item" onclick="setLanguage('ru')"><i class="fa-solid fa-flag"></i> Русский (Rusça)</div>
                        <div class="header-lang-item" onclick="setLanguage('zh')"><i class="fa-solid fa-flag"></i> 中文 (Çince)</div>
                    </div>
                </div>
                <div class="header-item" style="cursor: pointer;" onclick="window.history.back()"><i class="fa-solid fa-reply"></i> <span data-i18n="header.back">Geri Dön</span></div>
                <div class="header-item" style="cursor: pointer;" title="Ekranı Kilitle" onclick="window.location.href='kilit_ekrani.html'"><i class="fa-solid fa-lock"></i></div>
                <div class="header-item"><i class="fa-solid fa-circle-info"></i></div>
                <div class="header-item"><i class="fa-solid fa-building"></i> <span data-i18n="header.center">Merkez</span></div>
                <div class="header-item"><i class="fa-solid fa-calendar-days"></i> 2025</div>
                <div class="header-item user-item"><i class="fa-solid fa-user"></i> fevziye.mamak35@gmail.com</div>
            </div>
        </header>
"@

# Force the masterHeader string to be treated as UTF8 correctly by prefixing with BOM if needed, 
# but PowerShell strings are already UTF16. The issue is WRITE-ING it.

$files = Get-ChildItem -Filter *.html

foreach ($file in $files) {
    if ($file.Name -eq "login.html") { continue }
    
    # Read as UTF8
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    $hasHeader = $content -match '(?s)<header class="header">.*?</header>'
    
    if ($hasHeader) {
        $newContent = [regex]::Replace($content, '(?s)<header class="header">.*?</header>', $masterHeader)
        if ($content -ne $newContent) {
            $newContent | Out-File $file.FullName -Encoding UTF8 -NoNewline
            Write-Host "Updated header in $($file.Name)"
        }
    } else {
        if ($content -match '<main class="main-content">') {
             $newContent = $content -replace '<main class="main-content">', "$masterHeader`n    <main class=`"main-content`">"
             $newContent | Out-File $file.FullName -Encoding UTF8 -NoNewline
             Write-Host "Injected header in $($file.Name)"
        }
    }
}
