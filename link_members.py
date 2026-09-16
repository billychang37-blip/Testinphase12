import re

with open('src/app/admin/members/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the button with a Link tag. We have to import Link if it's not imported, but it's likely already there? Wait, I will just import it.
if "import Link from" not in content:
    content = content.replace('import { useState', 'import Link from "next/link";\nimport { useState')

content = content.replace(
    '<button className="bg-[#3498db] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#2980b9] transition-colors">\n                        View Details\n                      </button>',
    '<Link href={`/admin/members/${user.id}`} className="inline-block bg-[#3498db] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#2980b9] transition-colors">\n                        View Details\n                      </Link>'
)

with open('src/app/admin/members/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Linked members page to details")
