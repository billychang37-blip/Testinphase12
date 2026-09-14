import sys
import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add to lucide-react if missing
lucide_match = re.search(r'import \{([^\}]+)\} from "lucide-react";', content)
if lucide_match:
    lucide_imports = [i.strip() for i in lucide_match.group(1).split(',')]
    for imp in ["Menu", "Moon", "CreditCard", "User", "Home", "Briefcase", "Send", "ArrowUpCircle", "Settings", "ArrowRightLeft", "Lock"]:
        if imp not in lucide_imports:
            lucide_imports.append(imp)
    new_lucide = 'import { ' + ', '.join(lucide_imports) + ' } from "lucide-react";'
    content = content.replace(lucide_match.group(0), new_lucide)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
