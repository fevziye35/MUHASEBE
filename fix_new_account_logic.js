const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'new_account.html'), 'utf8');

// The file got severely mangled between lines 372 and 420.
// Let's replace the whole script tag content for the onload logic.

const correctLogic = `        if (customerId) {
            const customer = customers.find(c => c.id == customerId);
            if (customer) {
                populateForm(customer);

                if (mode === 'view') {
                    document.title = 'Cari Detay';
                    document.getElementById('sectionTitle').innerHTML = '<span data-i18n="contact.customer_details">Cari Detayları</span>';
                    // Disable all inputs
                    const inputs = document.querySelectorAll('input, select, textarea, button:not(.sidebar-toggle-box i):not(.header-item i)');
                    inputs.forEach(input => {
                        if (input.classList.contains('form-control') || input.name === 'risk_action') {
                            input.disabled = true;
                        }
                    });
                    // Hide save button
                    const btnKaydet = document.getElementById('btnKaydet');
                    if (btnKaydet) btnKaydet.style.display = 'none';

                } else {
                    document.title = 'Customers Edited';
                    const sectionTitle = document.getElementById('sectionTitle');
                    sectionTitle.innerHTML = '<span data-i18n="contact.edit_customer">MÜŞTERİ DÜZENLEME</span><br><span style="font-size: 13px; font-weight: normal; color: #666;" data-i18n="contact.customer_details">Müşteri Bilgileri</span>';

                    // Change Save button text
                    document.getElementById('btnKaydet').innerHTML = '<i class="fa-solid fa-save"></i> <span data-i18n="mega.kaydet">Kaydet</span>';

                    // Show Delete Button
                    document.getElementById('btnDelete').classList.remove('d-none');
                }
            }
        }

        // Delete Button Logic
        const btnDelete = document.getElementById('btnDelete');
        if (btnDelete) {
            btnDelete.addEventListener('click', function (e) {
                e.preventDefault();
                if (confirm('Bu cariyi silmek istediğinizden emin misiniz?')) {
                    const index = customers.findIndex(c => c.id == customerId);
                    if (index !== -1) {
                        customers.splice(index, 1);
                        localStorage.setItem('customers', JSON.stringify(customers));
                        alert('Cari başarıyla silindi.');
                        window.location.href = 'cari_hesaplar.html';
                    }
                }
            });
        }`;

// Let's find "if (customerId) {" and replace until "document.getElementById('btnKaydet').addEventListener("

const startStr = "if (customerId) {";
const endStr = "document.getElementById('btnKaydet').addEventListener('click', function (e) {";

const startIndex = html.indexOf(startStr);
const endIndex = html.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + correctLogic + '\n\n        ' + html.substring(endIndex);
    fs.writeFileSync(path.join(__dirname, 'new_account.html'), html, 'utf8');
    console.log("Restored deleted logic in new_account.html");
} else {
    console.log("Could not find demarcations for logic restoration.");
}
