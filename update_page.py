import sys
import re

with open('src/app/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure imports are present
if "CreditCard" not in content:
    content = content.replace("ArrowUpRight", "ArrowUpRight, CreditCard")

mobile_regex = re.compile(r'\{\/\* MOBILE DASHBOARD \*\/\}.*?\{\/\* DESKTOP DASHBOARD \*\/\}', re.DOTALL)
new_mobile = '''{/* MOBILE DASHBOARD */}
      <div className="md:hidden px-4 py-4">
        {/* Sleek Light Balance Card matching EnnexCapital */}
        <div className="relative bg-[#FFF4F5] border border-red-100 rounded-xl p-5 mb-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
             <span className="text-[12px] font-semibold text-[#E81C24]">Account Balance</span>
             <span onClick={() => router.push('/dashboard/transactions')} className="text-[12px] font-medium text-[#1A408C] cursor-pointer">Transactions</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center space-x-2">
               <span className="text-[28px] sm:text-[32px] font-bold text-gray-900 tracking-tight leading-none break-all max-w-[90%]">
                 {currencySymbol}{showBalance ? (profile?.total_assets ? Number(profile.total_assets).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00') : '*****'}
               </span>
               <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-red-100/60">
            <div onClick={() => router.push('/dashboard/deposit')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
               <ArrowUpCircle className="w-5 h-5 text-[#1A408C]" />
               <span className="text-[10px] font-medium text-gray-700">Add fund</span>
            </div>
            <div onClick={() => router.push('/dashboard/transfer')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
               <Send className="w-5 h-5 text-[#1A408C]" />
               <span className="text-[10px] font-medium text-gray-700">Transfer</span>
            </div>
            <div onClick={() => router.push('/dashboard/savings')} className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
               <Landmark className="w-5 h-5 text-[#1A408C]" />
               <span className="text-[10px] font-medium text-gray-700">Saving</span>
            </div>
          </div>
        </div>

        {/* 3-Column Action Grid */}
        <div className="grid grid-cols-3 gap-y-7 gap-x-2 mb-6 bg-transparent rounded-xl px-2">
           {/* Internal Transfer */}
           <div onClick={() => router.push('/dashboard/transfer/internal')} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
              <ArrowRightLeft className="w-6 h-6 text-[#1A408C]" />
              <span className="text-[10px] font-medium text-gray-600 text-center">Internal transfer</span>
           </div>
           {/* Loan */}
           <div onClick={() => router.push('/dashboard/loan')} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
              <Landmark className="w-6 h-6 text-[#1A408C]" />
              <span className="text-[10px] font-medium text-gray-600 text-center">Loan</span>
           </div>
           {/* Deposit Gift Card */}
           <div onClick={() => router.push('/dashboard/gift-card')} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
              <CreditCard className="w-6 h-6 text-[#1A408C]" />
              <span className="text-[10px] font-medium text-gray-600 text-center">Deposit Gift Card</span>
           </div>
           
           {/* Connect Web3 */}
           <div onClick={() => router.push('/dashboard/connect-web3')} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
              <div className="w-6 h-6 text-[#1A408C] rounded flex items-center justify-center font-bold text-[14px]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <span className="text-[10px] font-medium text-gray-600 text-center">Connect(Web3)</span>
           </div>
           {/* Soft Token */}
           <div onClick={() => router.push('/dashboard/soft-token')} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
              <Lock className="w-6 h-6 text-[#1A408C]" />
              <span className="text-[10px] font-medium text-gray-600 text-center">Soft token</span>
           </div>
           {/* User / Settings */}
           <div onClick={() => router.push('/dashboard/settings')} className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80">
              <Settings className="w-6 h-6 text-[#1A408C]" />
              <span className="text-[10px] font-medium text-gray-600 text-center">Settings</span>
           </div>
        </div>

        {/* Promo banner */}
        <div className="bg-white rounded-lg p-3.5 flex justify-between items-center shadow-sm mb-6 cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-[12px] font-medium text-gray-800">Earn 7% weekly as you save</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

      </div>

      {/* DESKTOP DASHBOARD */}'''

content = mobile_regex.sub(new_mobile, content)

with open('src/app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('dashboard mobile updated')
