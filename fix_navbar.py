import sys

def fix_navbar(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Make Navbar relative and add gradient so it blends with Hero seamlessly
    content = content.replace('className="absolute top-0 z-50 w-full"', 'className="relative z-50 w-full bg-gradient-to-r from-white via-[#EAF7FA] to-[#FFF3EB]"')
    
    # Hide utility strip on mobile
    content = content.replace('className="bg-[#111827] text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8 w-full"', 'className="hidden md:block bg-[#111827] text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8 w-full"')
    
    # Hide the AlertBanner on mobile? No, the user just wants it to stop crashing. Being relative fixes the crash.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_navbar('src/components/layout/Navbar.tsx')
print('Fixed Navbar')
