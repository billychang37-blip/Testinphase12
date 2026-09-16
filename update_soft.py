import re

with open('src/app/dashboard/soft-token/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove wallet from wallets array
content = re.sub(
    r"\{\s*id:\s*'wallet'.*?\},",
    "",
    content
)

# 2. Change initial state
content = content.replace(
    'useState<string>("wallet")',
    'useState<string>("usdt_erc20")'
)

# 3. Add isCopied state
if 'const [isCopied, setIsCopied]' not in content:
    content = content.replace(
        'const [isSubmitting, setIsSubmitting] = useState(false);',
        'const [isSubmitting, setIsSubmitting] = useState(false);\n  const [isCopied, setIsCopied] = useState(false);'
    )

# 4. Update copy button logic
copy_button_old = '''onClick={() => {
                      navigator.clipboard.writeText(code);
                      alert("Token copied to clipboard!");
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700 cursor-pointer"
                    title="Copy Token"
                  >
                    <Copy className="w-5 h-5" />
                  </button>'''

copy_button_new = '''onClick={() => {
                      navigator.clipboard.writeText(code);
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700 cursor-pointer"
                    title={isCopied ? "Copied!" : "Copy Token"}
                  >
                    {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>'''

content = content.replace(copy_button_old, copy_button_new)

with open('src/app/dashboard/soft-token/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated soft token page crypto and copy")
