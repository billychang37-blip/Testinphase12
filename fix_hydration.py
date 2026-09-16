import re

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">',
    '<body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full" suppressHydrationWarning>'
)

content = content.replace(
    '<html lang="en"',
    '<html lang="en" suppressHydrationWarning'
)

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added suppressHydrationWarning to layout")
