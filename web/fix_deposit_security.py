import re

with open('src/app/dashboard/deposit/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix security banner layout
content = content.replace(
    'flex items-center justify-between">\n          <div className="flex items-center gap-4">',
    'flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">\n          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">'
)
# Ensure button is not squashed on mobile
content = content.replace(
    '<button className="flex items-center gap-1.5 text-[13px] font-bold text-[#E81C24] hover:gap-2 transition-all whitespace-nowrap shrink-0">',
    '<button className="flex items-center gap-1.5 text-[13px] font-bold text-[#E81C24] hover:gap-2 transition-all whitespace-nowrap shrink-0 mt-2 md:mt-0">'
)

# And fix the gift card options list wrapper which we missed in the first script
content = content.replace(
    '<div className="flex items-center gap-5">\n                    <div className="flex items-center gap-1.5">\n                      <Zap',
    '<div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2">\n                    <div className="flex items-center gap-1.5">\n                      <Zap'
)

with open('src/app/dashboard/deposit/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
