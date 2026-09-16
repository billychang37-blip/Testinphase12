import re

with open('src/app/dashboard/settings/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'const [isCopied, setIsCopied]' not in content:
    content = content.replace(
        'const [loading, setLoading] = useState(true);',
        'const [loading, setLoading] = useState(true);\n  const [isCopied, setIsCopied] = useState(false);'
    )

copy_button_old = '''onClick={() => {
                            navigator.clipboard.writeText(generatedTokenCode);
                            alert("Token copied to clipboard!");
                          }}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                          title="Copy Token"
                        >
                          <Copy className="w-4 h-4" />
                        </button>'''

copy_button_new = '''onClick={() => {
                            navigator.clipboard.writeText(generatedTokenCode);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }}
                          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                          title={isCopied ? "Copied!" : "Copy Token"}
                        >
                          {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>'''

content = content.replace(copy_button_old, copy_button_new)

with open('src/app/dashboard/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated settings copy button")
