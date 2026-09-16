const fs = require('fs');
let content = fs.readFileSync('src/app/admin/soft-tokens/page.tsx', 'utf8');

content = content.replace(
  'className= px-2',
  'className={px-2'
);

content = content.replace(
  '}  >',
  '}} >'
);

content = content.replace(
  '} >',
  '}}>'
);

content = content.replace(
  '} \n',
  '}}\n'
);

fs.writeFileSync('src/app/admin/soft-tokens/page.tsx', content);
console.log('Fixed');
