import os

def fix_script_branching():
    try:
        with open('script.js', 'rb') as f:
            content_bytes = f.read()
        
        try:
            content = content_bytes.decode('utf-8-sig')
        except:
            try:
                content = content_bytes.decode('utf-8')
            except:
                content = content_bytes.decode('latin-1')
        
        # Remove old dropdown/user utility from previous steps to avoid duplication if any
        # We will append the newest logic at the end or replace specific parts
        
        branch_logic = """
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
"""

        if "/* --- MULTI-BRANCH (WORKSPACE) UTILITY --- */" not in content:
            content += branch_logic

        with open('script.js', 'wb') as f:
            f.write(content.encode('utf-8-sig'))
            
        print("Integrated multi-branch logic into script.js")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_script_branching()
