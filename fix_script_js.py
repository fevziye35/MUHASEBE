import os

def fix_script():
    try:
        with open('script.js', 'rb') as f:
            content_bytes = f.read()
        
        # Try to decode safely
        try:
            content = content_bytes.decode('utf-8-sig')
        except UnicodeDecodeError:
            try:
                content = content_bytes.decode('utf-8')
            except UnicodeDecodeError:
                content = content_bytes.decode('latin-1')
        
        # Split into lines
        lines = content.splitlines(True)
        
        # Find the corrupted block start
        start_line_idx = -1
        for i, line in enumerate(lines):
            if "/* --- USER DROPDOWN UTILITY --- */" in line:
                start_line_idx = i
                break
        
        if start_line_idx != -1:
            lines = lines[:start_line_idx]
            
        new_code = """
/* --- USER DROPDOWN UTILITY --- */
function toggleUserMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

function switchUser() {
    const lang = localStorage.getItem('language') || 'tr';
    const msg = (window.translations && window.translations[lang] && window.translations[lang]['word.kullanici_degistir_onay']) || 'Kullanıcı değiştirmek istediğinize emin misiniz?';
    if(confirm(msg)) {
        window.location.href = 'login.html';
    }
}

function logout() {
    window.location.href = 'login.html';
}

// Global click handler to close dropdowns
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('user-dropdown-menu');
    if (userMenu && !event.target.closest('.user-item')) {
        userMenu.classList.remove('show');
    }
    const langMenu = document.getElementById('header-lang-menu');
    if (langMenu && !event.target.closest('.header-lang-dropdown')) {
        langMenu.classList.remove('show');
    }
});
"""
        
        fixed_content = "".join(lines) + new_code
        
        with open('script.js', 'wb') as f:
            f.write(fixed_content.encode('utf-8-sig'))
            
        print("Fixed script.js successfully")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_script()
