import sys

with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add noscript just inside the body
if '<noscript>Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>' not in content:
    content = content.replace('      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">\n        {children}', '      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">\n        <noscript>Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>\n        {children}')

with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
