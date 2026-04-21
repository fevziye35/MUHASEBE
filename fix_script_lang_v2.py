import os
import re

def fix_script_ultimate():
    try:
        with open('script.js', 'rb') as f:
            content_bytes = f.read()
        
        try:
            content = content_bytes.decode('utf-8-sig')
        except:
            content = content_bytes.decode('utf-8', errors='ignore')
            
        # Target the specific object definition
        target_pattern = r"const langNames = \{.*?\};"
        replacement = """const langNames = {
                'tr': 'Türkçe', 'en': 'English', 'de': 'Deutsch', 'ru': 'Русский', 'zh': '中文'
            };"""
        
        # Using re.sub with S flag for multiline
        content = re.sub(target_pattern, replacement, content, flags=re.S)
        
        with open('script.js', 'wb') as f:
            f.write(content.encode('utf-8-sig'))
            
        print("Fixed script.js langNames perfectly")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_script_ultimate()
