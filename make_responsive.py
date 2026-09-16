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
            
            # Common page padding
            content = content.replace('className="px-10', 'className="px-4 md:px-10')
            content = content.replace('className="px-8', 'className="px-4 md:px-8')
            content = content.replace('className="px-6', 'className="px-4 md:px-6')
            content = content.replace('className="px-12', 'className="px-4 md:px-12')
            
            # Common card padding
            content = content.replace('className="p-10', 'className="p-5 md:p-10')
            content = content.replace('className="p-8', 'className="p-5 md:p-8')
            content = content.replace('className="p-6', 'className="p-4 md:p-6')
            content = content.replace(' p-10', ' p-5 md:p-10')
            content = content.replace(' p-8', ' p-5 md:p-8')
            content = content.replace(' p-6', ' p-4 md:p-6')
            content = content.replace(' px-10', ' px-4 md:px-10')
            content = content.replace(' px-8', ' px-4 md:px-8')
            
            # Fix duplicate md: if we accidentally applied it twice
            content = content.replace('md:px-10 md:px-10', 'md:px-10')
            content = content.replace('md:px-4 md:px-10', 'md:px-10')
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print('Responsive padding applied to all dashboard pages')
