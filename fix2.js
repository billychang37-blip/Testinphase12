const fs = require('fs');
let content = fs.readFileSync('src/app/admin/soft-tokens/page.tsx', 'utf8');

content = content.replace(/className=\s*px-2/g, 'className={px-2');
content = content.replace(/}\s*\s*>/g, '}}>');

fs.writeFileSync('src/app/admin/soft-tokens/page.tsx', content);
console.log('Fixed');
