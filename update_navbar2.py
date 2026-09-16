import sys

with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

mobile_menu_insert = """
          <div className="px-4 py-4 border-t border-gray-100 space-y-3">
            <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 text-lg font-bold text-gray-900 border-2 border-gray-100 rounded-full hover:bg-gray-50">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 text-lg font-bold text-white bg-[#E81C24] rounded-full hover:bg-[#c7131a]">
              Get Started
            </Link>
          </div>
"""

content = content.replace("          </div>\n        </div>\n      )}", "          </div>" + mobile_menu_insert + "        </div>\n      )}")

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
