import re

with open('src/app/admin/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<div className="flex h-screen bg-gray-100 font-sans">', '<div className="flex h-screen bg-gray-100 font-sans min-w-[1024px]">')

with open('src/app/admin/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated admin layout responsiveness")
