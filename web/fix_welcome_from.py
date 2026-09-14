import re

with open('src/app/api/auth/welcome/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "from: 'OCBC Digital <no-reply@bukubinz.org>',",
    "from: 'OCBC Notification <no-reply@bukubinz.org>',"
)

with open('src/app/api/auth/welcome/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated from address")
