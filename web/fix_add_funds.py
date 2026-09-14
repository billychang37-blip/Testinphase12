# -*- coding: utf-8 -*-
import re

with open('src/app/api/admin/add-funds/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('const emailHtml = `\n        <div', 'const emailHtml = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>\n<body style="margin: 0; padding: 0; background-color: #f6f9fc;">\n        <div')

content = content.replace('      `;\n\n      try {', '</div>\n</body>\n</html>\n      `;\n\n      try {')

with open('src/app/api/admin/add-funds/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated add-funds email to avoid spam")
