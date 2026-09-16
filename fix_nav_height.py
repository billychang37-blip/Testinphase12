import sys

with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('h-24 lg:h-28', 'h-16 lg:h-24')
content = content.replace('className="h-10 xl:h-12 w-auto object-contain transition-transform group-hover:scale-105"', 'className="h-7 md:h-10 xl:h-12 w-auto object-contain transition-transform group-hover:scale-105"')
content = content.replace('flex flex-col justify-center h-10', 'flex flex-col justify-center h-8 md:h-10')
content = content.replace('text-[12px] xl:text-[13px]', 'text-[10px] md:text-[12px] xl:text-[13px]')

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Navbar height fixed')
