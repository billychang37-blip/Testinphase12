import os

directory = r'c:\Users\Jerome Igwike\Downloads\OVERSEA CHINESE BANKING CORPRATION\web'

for root, _, files in os.walk(directory):
    # skip node_modules and .next
    if 'node_modules' in root or '.next' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.py', '.js', '.json')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception:
                continue
            
            modified = content
            # Replace emails
            modified = modified.replace('no-reply@bukubinz.org', 'no-reply@bukubinz.org')
            modified = modified.replace('admin@bukubinz.org', 'admin@bukubinz.org')
            
            # Replace fallback URL in emails
            modified = modified.replace("process.env.NEXT_PUBLIC_SITE_URL || 'https://bukubinz.org'", "process.env.NEXT_PUBLIC_SITE_URL || 'https://bukubinz.org'")
            
            # Since user gave us the resend API key directly and might not have set it in Vercel, 
            # let's set it as the fallback everywhere Resend is instantiated.
            modified = modified.replace("process.env.RESEND_API_KEY || 'placeholder'", "process.env.RESEND_API_KEY || 'placeholder'")
            
            if content != modified:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(modified)
                print(f'Updated {path}')
