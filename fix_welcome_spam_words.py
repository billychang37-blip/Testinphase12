import re

with open('src/app/api/auth/welcome/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Soften words that trigger spam filters
content = content.replace(
    'Assigned Security PIN:',
    'Temporary PIN:'
)
content = content.replace(
    'Security Notice: Please memorize your PIN.',
    'Note: Please keep this information safe.'
)
content = content.replace(
    'Your Access Details',
    'Your Account Details'
)
content = content.replace(
    'User ID (Access Code)',
    'User ID'
)

with open('src/app/api/auth/welcome/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated welcome email to soften spam trigger words")
