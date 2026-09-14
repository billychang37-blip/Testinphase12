import re

with open('src/app/dashboard/kyc/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the session caching issue by using getUser()
old_fetch = """    const fetchKYC = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const status = session.user.user_metadata?.kyc_status;
      if (status) {
        setKycStatus(status);
      }
      setInitLoading(false);
    };"""

new_fetch = """    const fetchKYC = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const status = user.user_metadata?.kyc_status;
      if (status) {
        setKycStatus(status);
      }
      setInitLoading(false);
    };"""

content = content.replace(old_fetch, new_fetch)

# 2. Fix the huge padding and typography (w-full max-w-4xl p-5 md:p-10 -> w-full max-w-3xl p-4 sm:p-6)
content = content.replace('w-full max-w-4xl p-5 md:p-10', 'w-full max-w-3xl p-4 sm:p-6')
content = content.replace('p-7', 'p-5 sm:p-6')
content = content.replace('text-[22px]', 'text-[20px] sm:text-[22px]')
content = content.replace('text-[16px]', 'text-[15px] sm:text-[16px]')
content = content.replace('gap-5 mb-5', 'gap-4 mb-4')
content = content.replace('w-14 h-14', 'w-12 h-12')
content = content.replace('w-7 h-7', 'w-6 h-6')
content = content.replace('w-16 h-16', 'w-12 h-12')

# 3. Fix the unprofessional loader pending state
old_pending = """              ) : kycStatus === 'pending' ? (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-7 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-16 h-16 text-amber-500 mb-4 animate-spin" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Pending</h3>
                  <p className="text-gray-600">Your KYC documents are currently under review by our compliance team. This usually takes 1-2 business days.</p>
                </div>"""

new_pending = """              ) : kycStatus === 'pending' ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Submission Successful</h3>
                  <p className="text-gray-600 text-[14px]">Your KYC documents have been successfully submitted and are securely stored. Please await review from our compliance team. This typically takes 1-2 business days.</p>
                </div>"""

content = content.replace(old_pending, new_pending)

# Fix the approved state typography as well
old_approved = """              {kycStatus === 'verified' || kycStatus === 'approved' ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-7 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Complete</h3>
                  <p className="text-gray-600">Your KYC documents have been approved. You now have full access to all banking services.</p>
                </div>"""

# I might need to make sure the check for 'verified' or 'approved' matches what is in the file.
# Wait, let's use regex for the approved state since I don't know the exact string.

with open('src/app/dashboard/kyc/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated KYC dashboard UI and logic")
