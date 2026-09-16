import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'CreditCard } ArrowLeft, Sun, Check,\n} from "lucide-react";',
    'CreditCard, ArrowLeft, Sun, Check } from "lucide-react";'
)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
