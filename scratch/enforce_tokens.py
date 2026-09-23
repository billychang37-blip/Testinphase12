import os
import re

files_to_update = [
    "src/app/dashboard/transfer/crypto/page.tsx",
    "src/app/dashboard/transfer/domestic/page.tsx",
    "src/app/dashboard/transfer/internal/page.tsx",
    "src/app/dashboard/transfer/international/page.tsx",
]

password_state = 'const [password, setPassword] = useState("");'
new_state = '''const [pin, setPin] = useState("");
  const [softToken, setSoftToken] = useState("");'''

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, "r") as f:
        content = f.read()

    # 1. Replace state
    content = content.replace(password_state, new_state)

    # 2. Replace password validation check
    content = content.replace("|| !password", "|| !pin || !softToken")

    # 3. Replace the old Soft Token logic check in handleSubmit
    # The old logic looks like:
    # if (!profile?.soft_token) {
    #    const { data: txs } = await supabase.from("transactions").select("*").eq("user_id", currSession.user.id).eq("type", "soft_token_purchase").eq("status", "completed");
    #    if (!txs || txs.length === 0) {
    #        setErrorMsg("A Soft Token (e-Token OTP) is required to authorize transfers. Please activate one in the Soft Token menu.");
    #        return;
    #    }
    # }
    
    # We will use regex to find this entire block and replace it.
    old_logic_pattern = r'if \(!profile\?\.soft_token\) \{.*?return;\s*\}\s*\}'
    
    new_logic = '''if (!profile?.soft_token) {
      setErrorMsg("You do not have an active Soft Token. Please request one to make transfers.");
      return;
    }
    if (softToken !== profile.soft_token) {
      setErrorMsg("Invalid Soft Token. Transfer blocked.");
      return;
    }
    if (pin !== profile.generated_pin) {
      setErrorMsg("Invalid Account PIN. Transfer blocked.");
      return;
    }'''
    
    content = re.sub(old_logic_pattern, new_logic, content, flags=re.DOTALL)

    # 4. Replace UI
    # We find the {/* Account Password */} block and replace it.
    old_ui_pattern = r'\{\/\* Account Password \*\/\}.*?<\/div>\s*<\/div>'
    
    new_ui = '''{/* Account PIN */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Account PIN <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <KeyRound className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="password" 
                  required
                  placeholder="Enter Account PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Soft Token */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Soft Token (OTP) <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <KeyRound className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  required
                  placeholder="Enter 6-digit Soft Token"
                  value={softToken}
                  onChange={(e) => setSoftToken(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>'''
            
    content = re.sub(old_ui_pattern, new_ui, content, flags=re.DOTALL)

    with open(filepath, "w") as f:
        f.write(content)

print("Updated all transfer pages!")
