import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '} ArrowLeft, Sun, Check,\n} from "lucide-react";',
    ', ArrowLeft, Sun, Check } from "lucide-react";'
)

# And line 259 error: `error TS1381: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?`
# Let's print out lines around 259
