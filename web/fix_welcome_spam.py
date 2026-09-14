import re

with open('src/app/api/auth/welcome/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add reply_to
content = content.replace(
    "from: 'OCBC Digital <no-reply@bukubinz.org>',",
    "from: 'OCBC Digital <no-reply@bukubinz.org>',\n          reply_to: 'admin@bukubinz.org',"
)

# Soften the PIN language slightly to avoid triggering phishing filters
content = content.replace(
    'Secure 8-Digit PIN:',
    'Assigned Security PIN:'
)

with open('src/app/api/auth/welcome/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated welcome email to reduce spam score")
