import re

with open('src/app/dashboard/transfer/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Balance Card
content = content.replace('py-9', 'py-6 md:py-9')
content = content.replace('text-[34px] break-all sm:break-normal font-bold', 'text-[28px] sm:text-[34px] break-all sm:break-normal font-bold')

# Options List
content = content.replace('px-6 py-5', 'p-4 md:px-6 md:py-5')

# Right chevrons and texts
content = content.replace(
    'text-[#E81C24] text-[13.5px] font-semibold shrink-0 pl-4 group-hover:pr-1 transition-all',
    'text-[#E81C24] text-[13px] md:text-[13.5px] font-semibold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center'
)
content = content.replace(
    'text-gray-900 text-[13.5px] font-bold shrink-0 pl-4 group-hover:pr-1 transition-all',
    'text-gray-900 text-[13px] md:text-[13.5px] font-bold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center'
)

# Text of options
content = content.replace('text-[15px] font-semibold text-gray-900', 'text-[14.5px] md:text-[15px] font-semibold text-gray-900')
content = content.replace('text-[13px] text-gray-500', 'text-[12px] md:text-[13px] text-gray-500')

with open('src/app/dashboard/transfer/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated transfer page layout")
