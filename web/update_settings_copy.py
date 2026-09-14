import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'Copy' not in content:
    content = content.replace('KeyRound,', 'KeyRound,\n  Copy,')

replacement = '''<div className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm inline-flex items-center gap-6">
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Your Token ID</p>
                          <p className="text-[20px] font-bold text-gray-900 tracking-widest font-mono">
                            {generatedTokenCode.substring(0,3)}-{generatedTokenCode.substring(3,6)}
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(generatedTokenCode);
                            alert("Token copied to clipboard!");
                          }}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                          title="Copy Token"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>'''

content = re.sub(
    r'<div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm inline-block">.*?</div>',
    replacement,
    content,
    flags=re.DOTALL
)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Added copy button to settings')
