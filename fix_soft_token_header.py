import re

with open('src/app/dashboard/soft-token/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the purchase UI header
content = re.sub(r'text-\[\d+px\] break-all sm:break-normal( md:text-\[\d+px\])*', 'text-[28px] sm:text-[36px] md:text-[42px]', content)

with open('src/app/dashboard/soft-token/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up typography in soft-token page")
