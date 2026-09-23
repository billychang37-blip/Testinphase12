import re

def remove_button(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to remove:
    # <button 
    #   onClick={() => window.open(`/login`, '_blank')}
    #   className="flex items-center gap-2 bg-[#f0f0f0] text-gray-700 px-4 py-2 rounded font-bold hover:bg-gray-200 transition-colors border border-gray-300"
    # >
    #   <ExternalLink className="w-4 h-4" />
    #   Open User Acc
    # </button>

    pattern = r'<button\s+onClick=\{\(\) => window\.open\(`\/login`, \'_blank\'\)\}.*?Open User Acc\s*<\/button>'
    content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # Also remove the ExternalLink import if it's no longer used
    # Just in case, it's safer to leave the import or regex it carefully
    content = re.sub(r'ExternalLink,\s*', '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

remove_button("src/app/admin/members/[id]/page.tsx")
# add/page.tsx doesn't have the button in my script, but just in case:
remove_button("src/app/admin/members/add/page.tsx")

print("Removed the 'Open User Acc' button.")
