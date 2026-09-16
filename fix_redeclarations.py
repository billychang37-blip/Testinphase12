import os

directories = [
    'src/app/dashboard/transfer/internal/page.tsx',
    'src/app/dashboard/transfer/domestic/page.tsx',
    'src/app/dashboard/transfer/international/page.tsx',
    'src/app/dashboard/transfer/crypto/page.tsx'
]

for file_path in directories:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # The second redeclaration looks like:
        # const { data: { session } } = await supabase.auth.getSession();
        # if (session) {
        
        # We replace the second instance only by splitting and re-joining
        parts = content.split('const { data: { session } } = await supabase.auth.getSession();')
        if len(parts) > 2:
            # Reconstruct string, removing the second occurrence
            new_content = parts[0] + 'const { data: { session } } = await supabase.auth.getSession();' + parts[1] + parts[2]
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
print("Fixed redeclarations")
