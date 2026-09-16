import re

files_to_update = [
    'src/app/dashboard/page.tsx',
    'src/app/dashboard/transactions/page.tsx'
]

for file_path in files_to_update:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the {tx.status || 'Completed'} render logic
    old_render = "{tx.status || 'Completed'}"
    new_render = "{['rejected', 'unapproved', 'failed'].includes((tx.status || '').toLowerCase()) ? 'failed' : (tx.status || 'Completed')}"
    
    content = content.replace(old_render, new_render)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated transaction status text in dashboard and transactions page")
