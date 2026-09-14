import sys
with open('src/components/home/Hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    
content = 'import Link from "next/link";\n' + content

with open('src/components/home/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
