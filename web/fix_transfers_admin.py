import re

with open('src/app/admin/transfers/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    ".in('type', ['transfer', 'crypto_transfer'])",
    ".in('type', ['transfer', 'domestic_transfer', 'international_transfer', 'internal_transfer', 'crypto_transfer', 'crypto_withdrawal'])"
)

with open('src/app/admin/transfers/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated admin transfers page logic")
