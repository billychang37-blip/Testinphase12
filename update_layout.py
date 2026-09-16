import re

with open('src/app/admin/AdminLayoutClient.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the main div and add a scaling wrapper for mobile
# The main div is <div className="flex h-screen bg-gray-100 font-sans min-w-[1024px]">

replacement = """  return (
    <div className="admin-mobile-scaler bg-gray-100 min-h-screen overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .admin-mobile-scaler > div {
            transform: scale(calc(100vw / 1024));
            transform-origin: top left;
            width: 1024px;
            height: calc(100vh / (100vw / 1024));
          }
        }
      `}} />
      <div className="flex h-screen bg-gray-100 font-sans min-w-[1024px]">"""

content = content.replace('  return (\n    <div className="flex h-screen bg-gray-100 font-sans min-w-[1024px]">', replacement)
content = content.replace('    </div>\n  );\n}', '    </div>\n    </div>\n  );\n}')

with open('src/app/admin/AdminLayoutClient.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added CSS transform scaler to AdminLayoutClient")
