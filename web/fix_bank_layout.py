import re

with open('src/app/dashboard/deposit/bank/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_row(content, label, value_code, id_val, extra_class=''):
    old_pattern = re.compile(
        r'<div className="flex flex-col md:flex-row md:items-center justify-between p-5 border-b border-gray-200 group.*?>\s*'
        r'<span.*?>(.*?)</span>\s*'
        r'<div className="flex items-center justify-end">\s*'
        r'<span.*?>(.*?)</span>\s*'
        r'<CopyButton.*?/>\s*'
        r'</div>\s*'
        r'</div>',
        re.DOTALL
    )
    
    # We will do a generic replacement for all such rows
    # Actually it's easier to just do a global replace for the structure

    return content

# The structure we want to change:
# <div className="flex items-center justify-end">
#   <span className="font-medium text-[15px] text-gray-900">{accDetails.bankName}</span>
#   <CopyButton text={accDetails.bankName} id="bankName" />
# </div>

# We change it to:
# <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
#   <span className="font-medium text-[14px] md:text-[15px] text-gray-900 text-left md:text-right break-words pr-3">{accDetails.bankName}</span>
#   <CopyButton ... />
# </div>

content = content.replace(
    '<div className="flex items-center justify-end">',
    '<div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">'
)
content = content.replace(
    'className="font-medium text-[15px] text-gray-900"',
    'className="font-medium text-[14px] md:text-[15px] text-gray-900 text-left md:text-right break-words pr-3 max-w-[85%] md:max-w-md"'
)
content = content.replace(
    'className="font-bold text-[15px] text-gray-900"',
    'className="font-bold text-[14px] md:text-[15px] text-gray-900 text-left md:text-right break-words pr-3 max-w-[85%] md:max-w-md"'
)
content = content.replace(
    'text-right',
    'text-left md:text-right'
)

# And change padding from p-5 to p-4 md:p-5
content = content.replace(
    'justify-between p-5 border-b border-gray-200 group',
    'justify-between p-4 md:p-5 border-b border-gray-200 group gap-1'
)

# The tracking label mb-2 is fine, but maybe too big margin.
content = content.replace(
    'mb-2 md:mb-0',
    'mb-1 md:mb-0'
)
content = content.replace(
    'text-[13px] text-gray-500',
    'text-[12px] md:text-[13px] text-gray-500'
)

with open('src/app/dashboard/deposit/bank/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated bank details page layout")
