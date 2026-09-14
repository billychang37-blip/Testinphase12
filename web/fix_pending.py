import re

with open('src/app/dashboard/kyc/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix pending state
content = re.sub(
    r"\) : kycStatus === 'pending' \? \([\s\S]*?\) : \(",
    """) : kycStatus === 'pending' ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Submission Successful</h3>
                  <p className="text-gray-600 text-[14px]">Your KYC documents have been successfully submitted and are securely stored. Please await review from our compliance team. This typically takes 1-2 business days.</p>
                </div>
              ) : (""",
    content
)

# Fix approved state kycStatus === 'verified' or 'approved'
content = content.replace("kycStatus === 'verified'", "kycStatus === 'verified' || kycStatus === 'approved'")

with open('src/app/dashboard/kyc/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed pending and approved states")
