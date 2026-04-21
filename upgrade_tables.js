const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const appendCss = `

/* --- GLOBALLY FORCED PREMIUM TABLE AND FILTER STYLES --- */
.filter-row {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 16px !important;
    padding: 20px !important;
    background: #f8fafc !important;
    border-radius: 16px !important;
    border: 1px solid #e2e8f0 !important;
    margin-bottom: 24px !important;
    align-items: flex-end !important;
}

.filter-group label {
    display: block !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #475569 !important;
    margin-bottom: 8px !important;
}

.filter-group input[type="date"],
.filter-group input[type="text"],
.filter-group select,
.search-input-custom {
    background: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 10px !important;
    padding: 10px 14px !important;
    font-size: 14px !important;
    color: #1e293b !important;
    outline: none !important;
    transition: all 0.3s ease !important;
    min-width: 150px;
    box-sizing: border-box;
}

.filter-group input[type="date"]:focus,
.filter-group input[type="text"]:focus,
.filter-group select:focus,
.search-input-custom:focus {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
}

.input-with-btn {
    display: flex !important;
    background: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    transition: all 0.3s ease !important;
}

.input-with-btn:focus-within {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
}

.input-with-btn input {
    border: none !important;
    background: transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
}

.input-with-btn input:focus {
    box-shadow: none !important;
    border: none !important;
}

.btn-search-sm {
    background: #f1f5f9 !important;
    border: none !important;
    border-left: 1px solid #cbd5e1 !important;
    padding: 0 16px !important;
    color: #64748b !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.btn-search-sm:hover {
    background: #e2e8f0 !important;
    color: #3b82f6 !important;
}

/* --- PREMIUM SAAS DATA TABLE --- */
table, .data-table, .customer-table {
    width: 100% !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    border-radius: 12px !important;
    border: 1px solid #e2e8f0 !important;
    margin-bottom: 24px !important;
    background-color: white !important;
}

table th, .data-table th, .customer-table th {
    background: #f8fafc !important;
    color: #475569 !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    padding: 16px 20px !important;
    text-align: left !important;
    border-bottom: 1px solid #e2e8f0 !important;
    border-right: none !important;
}

table th:first-child { border-top-left-radius: 12px !important; }
table th:last-child { border-top-right-radius: 12px !important; }

table td, .data-table td, .customer-table td {
    padding: 16px 20px !important;
    font-size: 14px !important;
    color: #334155 !important;
    border-bottom: 1px solid #f1f5f9 !important;
    vertical-align: middle !important;
    border-right: none !important;
}

table tbody tr {
    transition: background-color 0.2s ease !important;
}

table tbody tr:hover {
    background-color: #f8fafc !important;
}

table tbody tr:last-child td {
    border-bottom: none !important;
}

table tbody tr:last-child td:first-child { border-bottom-left-radius: 12px !important; }
table tbody tr:last-child td:last-child { border-bottom-right-radius: 12px !important; }

/* --- PREMIUM PAGINATION INFO --- */
.pagination-info {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 16px 0 !important;
    border-top: none !important;
    font-size: 14px !important;
    color: #64748b !important;
    flex-wrap: wrap !important;
    gap: 16px !important;
}

.pagination-info select {
    background: #fff !important;
    border: 1px solid #cbd5e1 !important;
    border-radius: 8px !important;
    padding: 6px 12px !important;
    margin-left: 8px !important;
    outline: none !important;
    font-weight: 600 !important;
    color: #334155 !important;
}

.pagination-info .record-count {
    font-weight: 700 !important;
    color: #3b82f6 !important;
}
`;

if (!cssContent.includes('GLOBALLY FORCED PREMIUM TABLE AND FILTER STYLES')) {
    fs.writeFileSync(cssPath, cssContent + appendCss, 'utf8');
    console.log('Appended UI upgrade for tables and filters to styles.css');
} else {
    console.log('Table override already exists.');
}
