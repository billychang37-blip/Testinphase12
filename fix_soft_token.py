import re

with open('src/app/dashboard/soft-token/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix active UI header sizes
content = content.replace('text-[32px] break-all sm:break-normal md:text-[42px] break-all sm:break-normal', 'text-[28px] md:text-[42px]')
content = content.replace('text-[32px] break-all sm:break-normal font-mono', 'text-[24px] sm:text-[32px] font-mono')

# Fix Purchase UI header sizes if any
content = content.replace('text-[42px] break-all sm:break-normal font-bold', 'text-[32px] md:text-[42px] font-bold')

# Fix paddings
content = content.replace('p-5 md:p-10 md:p-12', 'p-5 sm:p-8 md:p-10 lg:p-12')
content = content.replace('p-5 md:p-10 shadow', 'p-4 sm:p-6 md:p-10 shadow')
content = content.replace('p-6 bg-white', 'p-4 sm:p-6 bg-white')
content = content.replace('p-5 bg-gray-50', 'p-4 sm:p-5 bg-gray-50')
content = content.replace('p-5 md:p-8', 'p-4 sm:p-6 md:p-8')

with open('src/app/dashboard/soft-token/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated soft-token page styling")
