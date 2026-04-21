document.addEventListener('DOMContentLoaded', () => {
    console.log('Application Loaded');

    // Global patch for any remaining '#' links to prevent scroll to top
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href') === '#') {
            const hasOnClick = link.hasAttribute('onclick');
            if (!hasOnClick) {
                e.preventDefault();
            }
        }
    });

    // Sidebar Scroll Persistence logic
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const saveSidebarScroll = () => {
            localStorage.setItem('sidebarScrollPos', sidebar.scrollTop);
        };
        sidebar.addEventListener('scroll', saveSidebarScroll);
        
        // Restore scroll position immediately and after layout
        const savedPos = localStorage.getItem('sidebarScrollPos');
        if (savedPos) {
            const pos = parseInt(savedPos, 10);
            sidebar.scrollTop = pos;
            // Retry a few times to fight layout shifts
            setTimeout(() => { sidebar.scrollTop = pos; }, 50);
            setTimeout(() => { sidebar.scrollTop = pos; }, 150);
        }
    }

    // Toggle Sidebar on Desktop and Mobile
    const toggleBox = document.querySelector('.sidebar-toggle-box');
    if (toggleBox) {
        toggleBox.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
        });
    }

    // Toggle Sidebar Submenus
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parentLi = toggle.closest('.has-submenu');
            if (parentLi) {
                parentLi.classList.toggle('open');
            }
        });
    });

    // Auto-open submenu if a child link is active
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const activeSubLink = document.querySelector(`.sidebar-menu a[href*="${currentPath}"]`);
    
    if (activeSubLink) {
        activeSubLink.classList.add('active');
        const parentLi = activeSubLink.closest('.has-submenu');
        if (parentLi) {
            const submenu = parentLi.querySelector('.submenu');
            if (submenu) {
                // Disable transition for initial opening to allow instant scrolling
                submenu.style.transition = 'none';
                parentLi.classList.add('open');
                
                // Restore scroll again after opening
                const savedPos = localStorage.getItem('sidebarScrollPos');
                if (savedPos) sidebar.scrollTop = parseInt(savedPos, 10);
                
                // Restore transition after a frame
                requestAnimationFrame(() => {
                    setTimeout(() => { submenu.style.transition = ''; }, 50);
                });
            }
        }
    }

    // Prevents redundant page reloads if clicking the link of the page we are already on
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                // Remove query parameters or fragments for comparison
                const targetFile = href.split('?')[0].split('#')[0];
                if (targetFile === currentPath) {
                    e.preventDefault();
                    console.log('Already on this page, ignoring navigation.');
                }
            }
        });
    });

    // "Back" button functionality
    const backBtn = document.querySelector('.header-item .fa-reply')?.closest('.header-item');
    if (backBtn) {
        backBtn.style.cursor = 'pointer';
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    // Close language dropdown when clicking outside
    document.addEventListener('click', function (event) {
        const dropdown = document.querySelector('.header-lang-dropdown');
        const menu = document.getElementById('header-lang-menu');

        if (dropdown && menu && !dropdown.contains(event.target)) {
            menu.classList.remove('show');
        }
    });

    // Initialize Language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang, true);
});

/* --- LANGUAGE DROPDOWN UTILITY --- */
function toggleLanguageMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('header-lang-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

function setLanguage(lang, isInitial = false) {
    try {
        console.log('Setting language to:', lang);
        // Save preference
        localStorage.setItem('language', lang);

        // Update Header Text
        const textSpan = document.getElementById('header-lang-text');
        if (textSpan) {
            const langNames = {
                'tr': 'Türkçe', 'en': 'English', 'de': 'Deutsch', 'ru': 'Русский', 'zh': '中文'
            };
            textSpan.textContent = langNames[lang] || lang.toUpperCase();
        }

        // Apply translations to all elements with data-i18n
        applyTranslations(lang);

        // Close menu after selection
        const menu = document.getElementById('header-lang-menu');
        if (menu) menu.classList.remove('show');

        // Dispatch event for other scripts (like the welcome banner)
        if (!isInitial) {
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
        }

        // Re-render dynamically generated dashboard tables
        if (typeof window.populateBankBalancesTable === 'function') {
            try { window.populateBankBalancesTable(); } catch(e) { console.warn('populateBankBalancesTable failed:', e); }
        }
        if (typeof window.populateCashBalancesTable === 'function') {
            try { window.populateCashBalancesTable(); } catch(e) { console.warn('populateCashBalancesTable failed:', e); }
        }
    } catch (error) {
        console.error('Critical failure in setLanguage:', error);
    }
}

function applyTranslations(lang) {
    const translations = window.translations;
    if (typeof translations === 'undefined') {
        console.error('Translations dictionary not found on window!');
        return;
    }
    
    if (!lang) {
        lang = localStorage.getItem('language') || 'tr';
    }
    
    console.log('Applying translations for:', lang);
    const dict = translations[lang];
    
    if (!dict) {
        console.error('Dictionary for ' + lang + ' not found!');
        return;
    }

    // 1. Standard text translations (innerText)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        try {
            const key = element.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'search' || element.type === 'password' || element.type === 'email')) {
                    element.placeholder = dict[key];
                } else if (element.tagName === 'OPTGROUP' || element.tagName === 'OPTION') {
                    element.label = dict[key];
                    if (element.tagName === 'OPTION') element.text = dict[key];
                } else if (element.tagName === 'TITLE') {
                    document.title = dict[key];
                } else {
                    // Use textContent for safety unless we specifically need innerHTML
                    element.textContent = dict[key];
                }
            }
        } catch (e) {
            console.error('Error translating element:', element, e);
        }
    });

    // 2. Placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        try {
            const key = element.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) element.placeholder = dict[key];
        } catch (e) {}
    });

    // 3. Value translations (for buttons, inputs)
    document.querySelectorAll('[data-i18n-value]').forEach(element => {
        try {
            const key = element.getAttribute('data-i18n-value');
            if (dict[key] !== undefined) element.value = dict[key];
        } catch (e) {}
    });

    // 4. Title/Tooltip translations
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        try {
            const key = element.getAttribute('data-i18n-title');
            if (dict[key] !== undefined) element.title = dict[key];
        } catch (e) {}
    });

    document.body.style.fontFamily = "'Outfit', sans-serif";
}

function t(key) {
    const translations = window.translations;
    if (typeof translations === 'undefined') return key;
    const lang = localStorage.getItem('language') || 'tr';
    const dict = translations[lang] || translations['en'];
    return dict[key] || key;
}

/* --- SHARED TRANSACTION UTILITY --- */
function addStockTransaction(transactionData) {
    const transactions = JSON.parse(localStorage.getItem('stockTransactions')) || [];
    const maxId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) : 0;
    const newId = maxId + 1;

    const newTransaction = {
        id: newId,
        date: transactionData.date || new Date().toISOString().split('T')[0],
        type: transactionData.type || 'ISLEM',
        desc: transactionData.desc || '',
        warehouse: transactionData.warehouse || '-',
        amount: transactionData.amount || '0',
        stockId: transactionData.stockId || null
    };

    localStorage.setItem('stockTransactions', JSON.stringify(transactions));
    console.log('Transaction added:', newTransaction);
}

/* --- EXCEL EXPORT UTILITY --- */
function exportInstallmentsToExcel() {
    if (typeof XLSX === 'undefined') {
        alert('Excel kÃ¼tÃ¼phanesi yÃ¼klenemedi. LÃ¼tfen internet baÄlantÄ±nÄ±zÄ± kontrol ediniz.');
        return;
    }

    const btn = document.getElementById('btnExportExcel');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> HazÄ±rlanÄ±yor...';
    btn.disabled = true;

    setTimeout(() => {
        try {
            const table = document.getElementById('installmentTable');
            if (!table) throw new Error('Tablo bulunamadÄ±.');

            const clonedTable = table.cloneNode(true);
            const headerRow = clonedTable.querySelector('thead tr');
            if (headerRow) headerRow.removeChild(headerRow.lastElementChild);
            
            const bodyRows = clonedTable.querySelectorAll('tbody tr');
            bodyRows.forEach(row => {
                if (row.lastElementChild) row.removeChild(row.lastElementChild);
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.table_to_sheet(clonedTable);
            XLSX.utils.book_append_sheet(wb, ws, "Taksit Listesi");

            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const filename = `Makfa_Gida_Taksit_Listesi_${dd}.${mm}.${yyyy}.xlsx`;

            XLSX.writeFile(wb, filename);

        } catch (error) {
            console.error('Export Error:', error);
            alert('Excel oluÅturulurken bir hata oluÅtu: ' + error.message);
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }, 500);
}

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

/* --- MULTI-BRANCH (WORKSPACE) UTILITY --- */
function initBranchStatus() {
    const activeBranchName = localStorage.getItem('activeBranchName') || 'Merkez';
    const branchSpan = document.getElementById('header-branch-text');
    if (branchSpan) branchSpan.textContent = activeBranchName;
    
    // Auto-load branch list in dropdown if menu exists
    const menu = document.getElementById('branch-dropdown-menu');
    if (menu) {
        let warehouses = JSON.parse(localStorage.getItem('stockWarehouses')) || [];
        if (warehouses.length === 0) {
            warehouses = [{ id: 1, name: 'Merkez' }];
            localStorage.setItem('stockWarehouses', JSON.stringify(warehouses));
        }
        
        menu.innerHTML = '';
        warehouses.forEach(branch => {
            const item = document.createElement('div');
            item.className = 'header-lang-item'; // Reuse styling
            item.style.padding = '10px 15px';
            item.innerHTML = `<i class="fa-solid fa-building"></i> ${branch.name}`;
            item.onclick = function() { selectBranch(branch.id, branch.name); };
            menu.appendChild(item);
        });
        
        // Add "Manage Branches" link
        const hr = document.createElement('hr');
        hr.style.margin = '5px 0';
        hr.style.border = 'none';
        hr.style.borderTop = '1px solid #eee';
        menu.appendChild(hr);
        
        const manage = document.createElement('div');
        manage.className = 'header-lang-item';
        manage.style.fontWeight = '600';
        manage.innerHTML = `<i class="fa-solid fa-gear"></i> Şubeleri Yönet`;
        manage.onclick = function() { window.location.href = 'stok_depolari.html'; };
        menu.appendChild(manage);
    }
}

function toggleBranchMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('branch-dropdown-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

function selectBranch(id, name) {
    const currentName = localStorage.getItem('activeBranchName') || 'Merkez';
    if (currentName === name) return;
    
    if (confirm(name + ' şubesine geçiş yapılsın mı?')) {
        localStorage.setItem('activeBranchId', id);
        localStorage.setItem('activeBranchName', name);
        // Page will refresh and data will be scoped or filtered by activeBranchId in next updates
        location.reload();
    }
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initBranchStatus();
});
