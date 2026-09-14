import re

with open('src/app/dashboard/soft-token/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacement = '''// PENDING UI
  if (tokenTx && (tokenTx.status === 'pending' || tokenTx.status === 'processing')) {
    return (
      <div className="px-6 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
        <div className="w-full max-w-[850px] flex flex-col items-center justify-center pt-20">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center border-8 border-blue-100/50 relative z-10">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-20 animate-pulse"></div>
          </div>
          <h2 className="text-[28px] font-bold text-gray-900 mb-4 tracking-tight">Activating e-Token Security</h2>
          <p className="text-[15px] text-gray-500 text-center max-w-lg mb-8 leading-relaxed">
            Our systems are securely generating your unique encrypted Token credentials. 
            This process ensures your financial profile is protected by enterprise-grade cryptographic verification.
          </p>
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-[14px]">Security Protocol</span>
              <span className="bg-blue-50 text-blue-700 text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span> Processing
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-[14px]">Reference ID</span>
              <span className="text-gray-900 font-bold text-[14px] font-mono">#{tokenTx.id.substring(0,8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[14px]">Amount Locked</span>
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
          
          <div className="bg-[#0a0a0a] rounded-[2rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-full mb-6 border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-[11px] font-bold uppercase tracking-widest">Token Active & Secured</span>
                </div>
                <h2 className="text-[32px] md:text-[42px] font-bold mb-4 tracking-tight leading-tight">Master Security<br/>Token Generated</h2>
                <p className="text-gray-400 text-[15px] leading-relaxed max-w-md mx-auto md:mx-0">
                  Your account is now protected by enterprise-grade tokenization. This cryptographic key seamlessly authorizes your outgoing transfers.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-[12px] font-medium mb-3 uppercase tracking-widest text-center">Your Master e-Token</p>
                  
                  <div className="bg-black/50 border border-white/10 rounded-xl px-6 py-4 flex items-center justify-center">
                    <span className="text-[36px] font-mono font-bold tracking-[0.3em] text-white">
                      {code.substring(0,3)}-{code.substring(3,6)}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-green-400">
                    <Lock className="w-4 h-4" />
                    <span className="text-[12px] font-medium">End-to-End Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Auto-Synchronization</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Your token is perfectly synced with your transfer dashboard. No need to memorize it.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Cryptographic Security</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Every transaction authenticated by this token is protected by military-grade hashing.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Global Authorization</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Use this token to authorize massive fund movements across all supported regions.</p>
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
