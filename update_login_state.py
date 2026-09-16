import sys

with open('src/app/login/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const [rememberMe, setRememberMe] = useState(false);', 'const [rememberMe, setRememberMe] = useState(false);\n  const [showPass, setShowPass] = useState(false);')

with open('src/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
