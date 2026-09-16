import sys
import re

with open('src/app/dashboard/layout.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken backticks and missing props
broken_regex = re.compile(r'\{isMobileSidebarOpen && \(\n\s*<div className="md:hidden fixed inset-0 z-\[200\]">.*?</div>\n\s*\)\}\n\s*', re.DOTALL)

fixed_mobile_sidebar = """
        {/* ========================================================================= */}
        {/*                               MOBILE SIDEBAR                              */}
        {/* ========================================================================= */}
        {isMobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-[200]">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileSidebarOpen(false)}></div>
            <aside className="absolute top-0 left-0 bottom-0 w-[280px] bg-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
              <div className="h-20 flex items-center justify-between px-6 border-b border-gray-50 shrink-0">
                <img src="/logo_main.png" alt="OCBC Logo" className="w-[120px] h-auto object-contain cursor-pointer" onClick={() => { router.push('/dashboard'); setIsMobileSidebarOpen(false); }} />
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
                <div onClick={() => { router.push('/dashboard'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname === '/dashboard' ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Home className="w-5 h-5" /> <span className="text-[14px]">Dashboard</span>
                </div>
                <div onClick={() => { router.push('/dashboard/transfer'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/transfer') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Send className="w-5 h-5" /> <span className="text-[14px]">Transfers</span>
                </div>
                <div onClick={() => { router.push('/dashboard/deposit'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/deposit') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <ArrowUpCircle className="w-5 h-5" /> <span className="text-[14px]">Deposit</span>
                </div>
                <div onClick={() => { router.push('/dashboard/transactions'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/transactions') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <FileText className="w-5 h-5" /> <span className="text-[14px]">Transactions</span>
                </div>
                <div onClick={() => { router.push('/dashboard/savings'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/savings') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <PiggyBank className="w-5 h-5" /> <span className="text-[14px]">Savings</span>
                </div>
                <div onClick={() => { router.push('/dashboard/loan'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/loan') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Landmark className="w-5 h-5" /> <span className="text-[14px]">Loans</span>
                </div>
                <div onClick={() => { router.push('/dashboard/gift-card'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/gift-card') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Gift className="w-5 h-5" /> <span className="text-[14px]">Gift Cards</span>
                </div>
                <div onClick={() => { router.push('/dashboard/kyc'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/kyc') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <User className="w-5 h-5" /> <span className="text-[14px]">KYC Verification</span>
                </div>
                <div onClick={() => { router.push('/dashboard/settings'); setIsMobileSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer font-semibold transition-colors ${pathname.includes('/settings') ? 'bg-red-50 text-[#E81C24]' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Settings className="w-5 h-5" /> <span className="text-[14px]">Settings</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <div onClick={handleLogout} className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-red-50 text-[#E81C24] font-bold rounded-xl cursor-pointer hover:bg-[#E81C24] hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" /> <span>Log Out</span>
                </div>
              </div>
            </aside>
          </div>
        )}
"""

content = broken_regex.sub(fixed_mobile_sidebar, content)

with open('src/app/dashboard/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed backticks in layout.tsx")
