import re

with open('src/app/dashboard/soft-token/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix flex overflow and shrinking in the Wallet Dropdown
content = content.replace(
    '<div className="flex items-center gap-3">',
    '<div className="flex items-center gap-2 sm:gap-3 min-w-0">'
)

content = content.replace(
    '<div>\n                        <div className="text-[14.5px] text-gray-900 font-bold">{currentWallet.name}</div>',
    '<div className="min-w-0">\n                        <div className="text-[14px] sm:text-[14.5px] text-gray-900 font-bold truncate">{currentWallet.name}</div>'
)

content = content.replace(
    '<div className="text-[12.5px] text-gray-500">',
    '<div className="text-[11px] sm:text-[12.5px] text-gray-500 truncate">'
)

content = content.replace(
    '<Wallet className="w-5 h-5 text-gray-600" />',
    '<Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />'
)

content = content.replace(
    '<ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? \'rotate-180\' : \'\'}`} />',
    '<ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 transition-transform ${isDropdownOpen ? \'rotate-180\' : \'\'}`} />'
)

# Fix Dropdown List Items
content = content.replace(
    '<div>\n                              <div className="text-[14px] text-gray-900 font-bold">{w.name}</div>',
    '<div className="min-w-0">\n                              <div className="text-[13px] sm:text-[14px] text-gray-900 font-bold truncate">{w.name}</div>'
)

content = content.replace(
    '<div className="w-2 h-2 rounded-full bg-gray-300"></div>',
    '<div className="w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>'
)

content = content.replace(
    '<div className="text-[12px] text-gray-500">',
    '<div className="text-[11px] sm:text-[12px] text-gray-500 truncate">'
)

content = content.replace(
    '{selectedWallet === w.id && <Check className="w-4 h-4 text-[#E81C24]" />}',
    '{selectedWallet === w.id && <Check className="w-4 h-4 text-[#E81C24] shrink-0" />}'
)

# Fix "Enter Amount" Input
content = content.replace(
    '<div className="bg-gray-50 px-5 flex items-center justify-center text-gray-500 font-semibold text-[14.5px] border-r border-gray-200 shrink-0">',
    '<div className="bg-gray-50 px-3 sm:px-5 flex items-center justify-center text-gray-500 font-semibold text-[13px] sm:text-[14.5px] border-r border-gray-200 shrink-0 max-w-[80px] sm:max-w-none truncate">'
)

# Fix padding on Payment Summary
content = content.replace(
    '<div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">',
    '<div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">'
)

content = content.replace(
    '<h3 className="text-[16px] font-bold text-gray-900 mb-6">Payment Summary</h3>',
    '<h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-4 sm:mb-6">Payment Summary</h3>'
)

content = content.replace(
    '<div className="text-[20px] font-bold text-[#E81C24]">',
    '<div className="text-[16px] sm:text-[20px] font-bold text-[#E81C24]">'
)

# Fix ACTIVE UI paddings
content = content.replace(
    '<div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between gap-4">',
    '<div className="bg-gray-50 border border-gray-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">'
)

content = content.replace(
    '<span className="text-[24px] sm:text-[32px] font-mono font-bold tracking-[0.2em] text-gray-900">',
    '<span className="text-[18px] sm:text-[32px] font-mono font-bold tracking-[0.1em] sm:tracking-[0.2em] text-gray-900">'
)

with open('src/app/dashboard/soft-token/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied mobile responsiveness fixes to soft token page")
