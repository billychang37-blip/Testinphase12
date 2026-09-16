import re
import os

def remove_responsive(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # In layout, sidebar is hidden md:flex. We change to just flex.
    if 'layout.tsx' in filepath:
        content = content.replace('hidden md:flex', 'flex')
        content = content.replace('md:hidden', 'hidden') # Hide hamburger menu if any
    
    # We remove all md: lg: sm: prefixes to lock it to desktop
    # Wait, simple replace might break some things, but it's safe for paddings
    content = re.sub(r'\b(sm|md|lg|xl|2xl):', '', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

admin_dir = 'src/app/admin'
for root, dirs, files in os.walk(admin_dir):
    for file in files:
        if file.endswith('.tsx'):
            remove_responsive(os.path.join(root, file))

print("Removed Tailwind responsive prefixes from Admin Panel")
