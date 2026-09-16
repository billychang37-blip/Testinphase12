import re

file_path = 'src/app/admin/soft-tokens/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<td colSpan=7>className="p-6', '<td colSpan={7} className="p-6')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed colSpan syntax error')
