import os
import re

directory = r'c:\Users\Jerome Igwike\Downloads\OVERSEA CHINESE BANKING CORPRATION\web\src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            modified = content
            modified = re.sub(r'new Resend\(process\.env\.RESEND_API_KEY(?:!)?\)', r"new Resend(process.env.RESEND_API_KEY || 'placeholder')", modified)
            # also replace the placeholder one if I accidentally modified it earlier to have parentheses 
            modified = modified.replace("new Resend((process.env.RESEND_API_KEY || 'placeholder'))", "new Resend(process.env.RESEND_API_KEY || 'placeholder')")
            
            if content != modified:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(modified)
                print(f'Updated {path}')
