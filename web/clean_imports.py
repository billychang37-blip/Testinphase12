import sys

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import { CreditCard, Moon, ', 'import { ')

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
