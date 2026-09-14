import re

with open('src/app/dashboard/deposit/bank/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the remaining two rows that had bg-gray-50/50
content = content.replace(
    '<div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-gray-200 bg-gray-50/50 group">',
    '<div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-gray-200 bg-gray-50/50 group gap-1">'
)
content = content.replace(
    '<div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50/50 rounded-b group">',
    '<div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-gray-50/50 rounded-b group gap-1">'
)

with open('src/app/dashboard/deposit/bank/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed remaining rows")
