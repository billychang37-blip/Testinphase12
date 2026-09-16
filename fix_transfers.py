import os
import re

directories = [
    'src/app/dashboard/transfer/internal/page.tsx',
    'src/app/dashboard/transfer/domestic/page.tsx',
    'src/app/dashboard/transfer/international/page.tsx',
    'src/app/dashboard/transfer/crypto/page.tsx'
]

soft_token_check = """
    // Soft Token Check
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    if (!profile?.soft_token) {
       const { data: txs } = await supabase.from("transactions").select("*").eq("user_id", session.user.id).eq("type", "soft_token_purchase").eq("status", "completed");
       if (!txs || txs.length === 0) {
           setErrorMsg("A Soft Token (e-Token OTP) is required to authorize transfers. Please activate one in the Soft Token menu.");
           return;
       }
    }
"""

for file_path in directories:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace balance card styles
        content = content.replace('py-9', 'py-6 md:py-9')
        content = content.replace('text-[34px] break-all sm:break-normal font-bold', 'text-[28px] sm:text-[34px] break-all sm:break-normal font-bold')
        content = content.replace('p-5 md:p-10 shadow-sm', 'p-4 md:p-10 shadow-sm')

        # Inject soft token check if not already there
        if "Soft Token (e-Token OTP)" not in content and "handleSubmit = async (e: React.FormEvent)" in content:
            content = content.replace(
                'setIsSubmitting(true);',
                soft_token_check + '\n    setIsSubmitting(true);'
            )
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Updated transfer pages")
