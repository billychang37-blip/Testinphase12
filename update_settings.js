const fs = require('fs');
let settings = fs.readFileSync('src/app/dashboard/settings/page.tsx', 'utf8');

settings = settings.replace(
  '<h4 className="text-[15px] font-bold text-gray-900">Master Soft Token</h4>',
  '<h4 className="text-[15px] font-bold text-gray-900">Soft Token</h4>'
);

settings = settings.replace(
  'Purchase Soft Token',
  'Activate Soft Token'
);

fs.writeFileSync('src/app/dashboard/settings/page.tsx', settings);
console.log('Updated settings page');
