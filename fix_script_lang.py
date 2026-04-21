import os

def fix_script_final():
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
        
        # Correcting the langNames object using string replacement or regex
        # Pattern to find: 'tr': 'TÃ¼rkÃ§e' or similar
        content = content.replace("'tr': 'TÃ¼rkÃ§e'", "'tr': 'Türkçe'")
        content = content.replace("'ru': 'Ð ÑƒÑ Ñ ÐºÐ¸Ð¹'", "'ru': 'Русский'")
        content = content.replace("'zh': 'ä¸\xadæ–‡'", "'zh': '中文'")
        
        # Double check any other corrupted versions
        content = content.replace("TÃ¼rkÃ§e", "Türkçe")
        
        with open('script.js', 'wb') as f:
            f.write(content.encode('utf-8-sig'))
            
        print("Fixed script.js language corruption successfully")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_script_final()
