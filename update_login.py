import sys
import re

with open('src/app/login/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
if 'Eye' not in content:
    content = content.replace('import { supabase } from "@/lib/supabase";', 'import { supabase } from "@/lib/supabase";\nimport { Eye, EyeOff } from "lucide-react";')

# Add state for visibility
if 'showPass' not in content:
    content = content.replace('const [error, setError] = useState("");', 'const [error, setError] = useState("");\n  const [showPass, setShowPass] = useState(false);')

# Replace Password input
# In login/page.tsx it usually looks like:
# <input type="password" name="password" value={formData.password} onChange={handleChange} ... />
pass_regex = re.compile(r'<input[^>]*?type="password"[^>]*?>')
match = pass_regex.search(content)

if match:
    old_input = match.group(0)
    new_input = old_input.replace('type="password"', 'type={showPass ? "text" : "password"}')
    wrapper = f"""<div className="relative">
                    {new_input}
                    <button type="button" onClick={{() => setShowPass(!showPass)}} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
                      {{showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}}
                    </button>
                  </div>"""
    content = content.replace(old_input, wrapper)

with open('src/app/login/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Login page updated")
