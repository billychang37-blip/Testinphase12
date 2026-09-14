import sys
import re

with open('src/app/register/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
if 'lucide-react' not in content:
    content = content.replace('import { supabase } from "@/lib/supabase";', 'import { supabase } from "@/lib/supabase";\nimport { Eye, EyeOff } from "lucide-react";')

# Add state for visibility
if 'showPin' not in content:
    content = content.replace('const [captchaText, setCaptchaText] = useState("");', 'const [captchaText, setCaptchaText] = useState("");\n  const [showPin, setShowPin] = useState(false);\n  const [showPass, setShowPass] = useState(false);\n  const [showConfirm, setShowConfirm] = useState(false);')

# Replace PIN input
pin_input = '<input type="password" name="atm_pin" value={formData.atm_pin} onChange={handleChange} autoComplete="off" disabled={formData.noCard} maxLength={6} className={inputClass("atm_pin")} placeholder="      " />'
new_pin_input = """<div className="relative">
                    <input type={showPin ? "text" : "password"} name="atm_pin" value={formData.atm_pin} onChange={handleChange} autoComplete="off" disabled={formData.noCard} maxLength={6} className={inputClass("atm_pin")} placeholder="      " />
                    <button type="button" onClick={() => setShowPin(!showPin)} disabled={formData.noCard} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
                      {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>"""
content = content.replace(pin_input, new_pin_input)

# Replace Password input
pass_input = '<input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass("password")} placeholder="        " />'
new_pass_input = """<div className="relative">
                    <input type={showPass ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={inputClass("password")} placeholder="        " />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
                      {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>"""
content = content.replace(pass_input, new_pass_input)

# Replace Confirm Password input
confirm_input = '<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClass("confirmPassword")} placeholder="        " />'
new_confirm_input = """<div className="relative">
                    <input type={showConfirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClass("confirmPassword")} placeholder="        " />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>"""
content = content.replace(confirm_input, new_confirm_input)

# Replace redirect to homepage
content = content.replace(
    '<Link href="/" className="bg-[#E81C24] hover:bg-[#c7131a] active:bg-[#a60e14] transition-colors text-white px-10 py-3.5 rounded-sm font-semibold shadow-sm w-full md:w-auto inline-block text-[15px]">',
    '<Link href="/login" className="bg-[#E81C24] hover:bg-[#c7131a] active:bg-[#a60e14] transition-colors text-white px-10 py-3.5 rounded-sm font-semibold shadow-sm w-full md:w-auto inline-block text-[15px]">'
)
content = content.replace(
    'Return to Homepage\n                </Link>',
    'Log In Now\n                </Link>'
)
content = content.replace('>Return to Homepage<', '>Log In Now<')

with open('src/app/register/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Register page updated")
