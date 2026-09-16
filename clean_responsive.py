import os
import re

dir_path = 'src/app/dashboard'

for root, dirs, files in os.walk(dir_path):
    for filename in files:
        if filename.endswith('.tsx'):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Clean up duplicate and stacked tailwind md: responsive classes
            content = content.replace('px-4 md:px-4 md:px-10', 'px-4 md:px-10')
            content = content.replace('px-4 md:px-6 md:px-10', 'px-4 md:px-10')
            content = content.replace('px-4 md:px-8 md:px-10', 'px-4 md:px-10')
            content = content.replace('px-4 md:px-10 md:px-10', 'px-4 md:px-10')
            
            content = content.replace('p-5 md:p-5 md:p-10', 'p-5 md:p-10')
            content = content.replace('p-5 md:p-6 md:p-10', 'p-5 md:p-10')
            content = content.replace('p-4 md:p-6 md:p-8', 'p-5 md:p-8')
            content = content.replace('p-5 md:p-8 md:p-10', 'p-5 md:p-10')
            
            content = content.replace('px-4 md:px-4 md:px-8', 'px-4 md:px-8')
            content = content.replace('px-4 md:px-6 md:px-8', 'px-4 md:px-8')
            
            # Make balances responsive
            content = re.sub(r'text-\[3[0-9]px\]|text-\[4[0-9]px\]', lambda m: m.group(0) + ' break-all sm:break-normal', content)
            
            # Remove any double break-all
            content = content.replace('break-all break-all sm:break-normal sm:break-normal', 'break-all sm:break-normal')
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print('Cleaned up responsive classes')
