import re

file_path = 'src/app/admin/soft-tokens/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix className= ... -> className={...}
content = re.sub(
    r'className=\s*([^]+)',
    r'className={\1}',
    content
)

# Also check for any other missing braces around template literals
content = content.replace('className= ', 'className={')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed template literal syntax error')
