import sys

def fix_file(filepath, bad_str, good_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace(bad_str, good_str)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

bad1 = '{isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}}'
good1 = '{isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}'
fix_file('src/app/dashboard/settings/page.tsx', bad1, good1)

bad2 = '{isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}}'
good2 = '{isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}'
fix_file('src/app/dashboard/soft-token/page.tsx', bad2, good2)
print('Fixed syntax error')
