import re

with open('src/app/admin/deposits/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    ".eq('type', 'deposit')",
    ".in('type', ['deposit', 'crypto_deposit'])"
)

with open('src/app/admin/deposits/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated admin deposits page logic")
