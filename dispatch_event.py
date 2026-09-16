import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '''setSaveMsg("Picture updated successfully!");''',
    '''setSaveMsg("Picture updated successfully!");
          window.dispatchEvent(new Event("profileUpdated"));'''
)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
