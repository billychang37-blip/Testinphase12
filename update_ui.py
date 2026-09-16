import re

with open('src/app/dashboard/soft-token/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add Copy to imports if not there
if 'Copy' not in content:
    content = content.replace('Clock,', 'Clock,\n  Copy,')

replacement = '''// PENDING UI
  if (tokenTx && (tokenTx.status === 'pending' || tokenTx.status === 'processing')) {
    return (
      <div className="px-6 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
        <div className="w-full max-w-[850px] flex flex-col items-center justify-center pt-20">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center border-8 border-orange-100/50 relative z-10">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-10 animate-pulse"></div>
          </div>
          <h2 className="text-[28px] font-bold text-gray-900 mb-4 tracking-tight">Processing Request</h2>
          <p className="text-[15px] text-gray-500 text-center max-w-lg mb-8 leading-relaxed">
            Your Soft Token request is currently being processed. 
            Once activated, this token will provide an additional layer of security for your outgoing transactions.
          </p>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-[14px]">Status</span>
              <span className="bg-orange-50 text-orange-700 text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Pending
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-[14px]">Reference No.</span>
              <span className="text-gray-900 font-bold text-[14px] font-mono">{tokenTx.id.substring(0,8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[14px]">Amount</span>
              <span className="text-gray-900 font-bold text-[14px]">{currencySymbol} 5,500.00</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE UI
  if (tokenTx && tokenTx.status === 'completed') {
    const code = profile.soft_token || "------";
    
    return (
      <div className="px-6 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
        <div className="w-full max-w-[900px] flex flex-col gap-8 pt-8">
          
          <div className="bg-gradient-to-br from-[#FFF0F2] to-[#FFE5E8] rounded-[2rem] p-10 md:p-12 relative overflow-hidden shadow-[0_8px_30px_rgb(232,28,36,0.08)] border border-red-50">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E81C24]">
                <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 90 C27.9 90 10 72.1 10 50 C10 27.9 27.9 10 50 10 C72.1 10 90 27.9 90 50 C90 72.1 72.1 90 50 90 Z"/>
                <path d="M50 20 C33.5 20 20 33.5 20 50 C20 66.5 33.5 80 50 80 C66.5 80 80 66.5 80 50 C80 33.5 66.5 20 50 20 Z"/>
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-red-100/50 text-[#E81C24] px-3 py-1.5 rounded-full mb-6 border border-red-100">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Active Status</span>
                </div>
                <h2 className="text-[32px] md:text-[42px] font-bold text-gray-900 mb-4 tracking-tight leading-tight">Soft Token<br/>Activated</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                  Your Soft Token is fully active. This token provides an additional layer of security and is seamlessly integrated for authorizing your outgoing transfers.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="bg-white border border-red-100 shadow-[0_10px_40px_rgba(232,28,36,0.06)] rounded-2xl p-8 relative overflow-hidden group">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-[#E81C24]" />
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-[12px] font-bold mb-3 uppercase tracking-widest text-center">Your Soft Token ID</p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between gap-4">
                    <span className="text-[32px] font-mono font-bold tracking-[0.2em] text-gray-900">
                      {code.substring(0,3)}-{code.substring(3,6)}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        alert("Token copied to clipboard!");
                      }}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700 cursor-pointer"
                      title="Copy Token"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-[12px] font-medium">Multi-Factor Authenticated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Seamless Integration</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Your token securely autofills across your transfer dashboards.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Enhanced Security</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Transactions are protected by standard multi-factor authentication.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Global Validation</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Validates and secures international and domestic transfers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PURCHASE UI'''

new_content = re.sub(r'// PENDING UI.*?// PURCHASE UI', replacement, content, flags=re.DOTALL)

with open('src/app/dashboard/soft-token/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated soft token page")
