import re

files_to_update = ['src/app/dashboard/transfer/crypto/page.tsx', 'src/app/dashboard/transfer/page.tsx']

for file_path in files_to_update:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace(r"\'/dashboard/soft-token\'", "'/dashboard/soft-token'")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file_path}")
    except Exception as e:
        print(f"Error on {file_path}: {e}")
