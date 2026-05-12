
import os
import re

def fix_content(content):
    # Mapping for Turkish mojibake (Windows-1254 read as UTF-8)
    mappings = {
        '\u00c5\u009f': '\u015f', # ş
        '\u00c4\u00b1': '\u0131', # ı
        '\u00c4\u00b0': '\u0130', # İ
        '\u00c5\u009e': '\u015e', # Ş
        '\u00c3\u009c': '\u00dc', # Ü
        '\u00c3\u00bc': '\u00fc', # ü
        '\u00c3\u0096': '\u00d6', # Ö
        '\u00c3\u00b6': '\u00f6', # ö
        '\u00c3\u0087': '\u00c7', # Ç
        '\u00c3\u00a7': '\u00e7', # ç
        '\u00c4\u009f': '\u011f', # ğ
        '\u00c4\u009e': '\u011e', # Ğ
        '\u00e2\u201a\u00ba': '\u20ba', # ₺
        '\u00c3\u00a2': '\u00e2', # â
        '\u00c3\u00ae': '\u00ee', # î
    }
    for k, v in mappings.items():
        content = content.replace(k, v)
    return content

file_path = 'translations.js'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

js = fix_content(js)

# Fix common English placeholders in non-English sections
# This is a heuristic fix for the most obvious ones.

# RU section fixes
ru_fixes = {
    "'confirm_delete': 'Are you sure you want to delete this item?'": "'confirm_delete': 'Вы уверены, что хотите удалить этот элемент?'",
    "'contact.web_address': 'Web Address'": "'contact.web_address': 'Веб-сайт'",
    "'mega.aksiyon_ekle': 'Add'": "'mega.aksiyon_ekle': 'Добавить'",
    "'mega.alis_iade': 'Purchase Return'": "'mega.alis_iade': 'Возврат покупки'",
    "'mega.ara_toplam': 'Subtotal'": "'mega.ara_toplam': 'Промежуточный итог'",
    "'mega.depo_seciniz_label': 'Select Warehouse:'": "'mega.depo_seciniz_label': 'Выберите склад:'",
    "'mega.fatura_no_gen': 'New Invoice Number'": "'mega.fatura_no_gen': 'Новый номер счета'",
    "'mega.iskonto': 'Discount'": "'mega.iskonto': 'Скидка'",
    "'month.1': 'January'": "'month.1': 'Январь'",
    "'word.aktif_sistem_kullanicilari': 'Active System Users'": "'word.aktif_sistem_kullanicilari': 'Активные пользователи системы'",
}

# DE section fixes
de_fixes = {
    "'mega.add_brand': 'Create New Brand'": "'mega.add_brand': 'Neue Marke erstellen'",
    "'mega.aksiyon_ekle': 'Add'": "'mega.aksiyon_ekle': 'Hinzufügen'",
    "'mega.alis_iade': 'Purchase Return'": "'mega.alis_iade': 'Einkaufsrückgabe'",
    "'mega.ara_toplam': 'Subtotal'": "'mega.ara_toplam': 'Zwischensumme'",
    "'mega.depo_seciniz_label': 'Select Warehouse:'": "'mega.depo_seciniz_label': 'Lager auswählen:'",
    "'mega.fatura_no_gen': 'New Invoice Number'": "'mega.fatura_no_gen': 'Neue Rechnungsnummer'",
    "'mega.iskonto': 'Discount'": "'mega.iskonto': 'Rabatt'",
    "'word.aktif_sistem_kullanicilari': 'Active System Users'": "'word.aktif_sistem_kullanicilari': 'Aktive Systembenutzer'",
}

for k, v in ru_fixes.items():
    js = js.replace(k, v)
for k, v in de_fixes.items():
    js = js.replace(k, v)

# Ensure UTF-8 with BOM for Windows friendliness (optional, but let's stick to standard UTF-8)
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(js)

# Sync to react-app
react_public_path = os.path.join('react-app', 'public', 'translations.js')
if os.path.exists(react_public_path):
    with open(react_public_path, 'w', encoding='utf-8') as f:
        f.write(js)

print("Translations fixed and synced.")
