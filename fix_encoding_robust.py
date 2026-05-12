
import os

file_path = 'translations.js'

# Try to read with different encodings
def try_read(path):
    for enc in ['utf-8', 'windows-1254', 'iso-8859-9', 'latin-1']:
        try:
            with open(path, 'rb') as f:
                raw = f.read()
            return raw.decode(enc), enc
        except:
            continue
    return None, None

content, detected_enc = try_read(file_path)

if content:
    print(f"Detected encoding: {detected_enc}")
    
    # If it was latin-1 or similar, we might need to fix the Turkish characters manually
    # if they were double-encoded or mangled.
    
    # But wait, if it was Windows-1254, then Turkish characters should be fine now.
    # Let's ensure it's saved as clean UTF-8.
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Also sync to react-app
    react_public_path = os.path.join('react-app', 'public', 'translations.js')
    if os.path.exists(react_public_path):
        with open(react_public_path, 'w', encoding='utf-8') as f:
            f.write(content)
    print("Rewritten as clean UTF-8.")
else:
    print("Could not read file with any standard encoding.")
