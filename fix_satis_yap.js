const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'satis_yap.html'), 'utf8');

// I will just use a clean string replacement to fix the JS block and remove the garbage duplication.
// Let's find the first instance of 'function deleteCustomer(id) {'
const funcStart = 'function deleteCustomer(id) {';
const startIndex = html.indexOf(funcStart);

if (startIndex !== -1) {
    // Reconstruct the correct deleteCustomer logic and end the file properly.
    const goodSuffix = `function deleteCustomer(id) {
            if (!confirm('Bu cari hesabı silmek istediğinizden emin misiniz?')) return;
            let customers = JSON.parse(localStorage.getItem('customers')) || [];
            customers = customers.filter(c => c.id !== id);
            localStorage.setItem('customers', JSON.stringify(customers));
            loadSalesCustomers();
        }

        // Global functions must be added to window since module might scope
        window.selectCustomerForSale = selectCustomerForSale;
        window.deleteCustomer = deleteCustomer;
        window.selectCompany = function(c) {
             // Redirects the user to the sales invoice page with that selected ID
             window.location.href = 'satis_faturasi.html?cari_id=' + c.id;
        }
    </script>
</body>
</html>`;

    // Overwrite everything from the startIndex to the end of the file with the correct suffix
    html = html.substring(0, startIndex) + goodSuffix;
    fs.writeFileSync(path.join(__dirname, 'satis_yap.html'), html, 'utf8');
    console.log("Cleaned up duplicated file structure in satis_yap.html");
} else {
    console.log("Could not find deleteCustomer function");
}
