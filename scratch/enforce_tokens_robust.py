import re

files_to_update = [
    "src/app/dashboard/transfer/crypto/page.tsx",
    "src/app/dashboard/transfer/domestic/page.tsx",
    "src/app/dashboard/transfer/internal/page.tsx",
    "src/app/dashboard/transfer/international/page.tsx",
]

for filepath in files_to_update:
    with open(filepath, "r") as f:
        content = f.read()

    # 1. Ensure state variables exist. 
    # Remove any existing password, pin, or softToken states.
    content = re.sub(r'const \[password, setPassword\] = useState\(""\);\s*', '', content)
    content = re.sub(r'const \[pin, setPin\] = useState\(""\);\s*', '', content)
    content = re.sub(r'const \[softToken, setSoftToken\] = useState\(""\);\s*', '', content)
    
    # Inject both pin and softToken state after errorMsg (which is present in all)
    content = re.sub(
        r'(const \[errorMsg, setErrorMsg\] = useState\(""\);)',
        r'const [pin, setPin] = useState("");\n  const [softToken, setSoftToken] = useState("");\n  \1',
        content
    )

    # 2. Normalize validation check
    # We replace things like `!amount || !walletAddress || !softToken` or `!amount || !password` 
    # with a standard check that ends with `|| !pin || !softToken`.
    # First, let's just replace the exact check blocks.
    content = re.sub(
        r'if \(!amount \|\| !walletAddress \|\| !softToken\) \{',
        r'if (!amount || !walletAddress || !pin || !softToken) {',
        content
    )
    content = re.sub(
        r'if \(!accountNumber \|\| !amount \|\| !password\) \{',
        r'if (!accountNumber || !amount || !pin || !softToken) {',
        content
    )
    # Domestic/International might have different fields
    content = re.sub(
        r'if \(!accountNumber \|\| !amount \|\| !routingNumber \|\| !password\) \{',
        r'if (!accountNumber || !amount || !routingNumber || !pin || !softToken) {',
        content
    )
    content = re.sub(
        r'if \(!accountNumber \|\| !amount \|\| !swiftCode \|\| !bankName \|\| !password\) \{',
        r'if (!accountNumber || !amount || !swiftCode || !bankName || !pin || !softToken) {',
        content
    )
    
    # 3. Replace the Soft Token check block inside handleSubmit
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
    
    # Check if the old logic exists (it does in internal and domestic maybe)
    if re.search(old_logic_pattern, content, flags=re.DOTALL):
        content = re.sub(old_logic_pattern, new_logic, content, flags=re.DOTALL)
    else:
        # If the old logic doesn't exist, we inject it right before `setIsSubmitting(true);`
        content = re.sub(
            r'(setIsSubmitting\(true\);)',
            new_logic + r'\n\n      \1',
            content
        )

    # 4. Replace the UI block for Password/Soft Token
    # It might say "Account Password" or "Soft Token (e-Token OTP)"
    
    # Let's remove any block containing {/* Account Password */} or {/* Soft Token */} up to the next {/*
    content = re.sub(r'\{\/\* Account Password \*\/\}.*?<\/div>\s*<\/div>\s*', '', content, flags=re.DOTALL)
    content = re.sub(r'\{\/\* Soft Token .*?\*\/\}.*?<\/div>\s*<\/div>\s*', '', content, flags=re.DOTALL)

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
            </div>

            {/* Error Message */}'''

    content = content.replace('{/* Error Message */}', new_ui)

    with open(filepath, "w") as f:
        f.write(content)

print("Properly updated all transfer pages!")
