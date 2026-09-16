const fs = require('fs');

function fixAlert(path) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace('alert("Token copied to clipboard!");', 'setIsCopied(true); setTimeout(() => setIsCopied(false), 2000);');
  content = content.replace('title="Copy Token"', 'title={isCopied ? "Copied!" : "Copy Token"}');
  content = content.replace('<Copy className="w-5 h-5" />', '{isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}');
  content = content.replace('<Copy className="w-4 h-4" />', '{isCopied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}');
  fs.writeFileSync(path, content);
}

fixAlert('src/app/dashboard/soft-token/page.tsx');
fixAlert('src/app/dashboard/settings/page.tsx');
console.log('Fixed alerts');
