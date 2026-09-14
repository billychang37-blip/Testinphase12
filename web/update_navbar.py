import sys

with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# The mobile menu is inside the block:
#       {/* Mobile Menu */}
#      {isOpen && (
#        <div className="lg:hidden bg-white shadow-xl absolute top-full left-0 w-full border-t border-gray-100">
#          <div className="px-4 py-4 space-y-2">

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

# Find where the links end
if "          </div>\n        </div>\n      )}\n" in content:
    content = content.replace("          </div>\n        </div>\n      )}\n", f"          </div>{mobile_menu_insert}        </div>\n      )}\n")
elif "          </div>\n        </div>" in content:
     content = content.replace("          </div>\n        </div>", f"          </div>{mobile_menu_insert}        </div>")

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
