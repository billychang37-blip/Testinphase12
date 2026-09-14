"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Eye, Send, ArrowUpCircle, ArrowRightLeft, Lock, MoreHorizontal, ChevronRight, Coffee, FileText, Info, PhoneCall, Settings, Landmark, ArrowDownToLine, ArrowUpRight, CreditCard
} from "lucide-react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showBalance, setShowBalance] = useState(true);
  const router = useRouter();

  const renderTransaction = (tx: any) => (
    <div key={tx.id} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer last:border-0 group">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          tx.type === 'deposit' 
            ? tx.wallet_used === 'main' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600' 
            : 'bg-red-50 text-red-600'
        }`}>
          {tx.type === 'deposit' ? (
            tx.wallet_used === 'main' ? <Landmark className="w-5 h-5" /> : <ArrowDownToLine className="w-5 h-5" />
          ) : (
            <ArrowUpRight className="w-5 h-5" />
          )}
        </div>
        
        {/* Details */}
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold text-gray-900 leading-tight mb-1">
            {tx.type === 'deposit' 
              ? tx.wallet_used === 'main' 
                ? tx.sender_name ? `From ${tx.sender_name}` : (tx.description?.includes('from') ? tx.description.split('from')[1].trim() : 'Bank Deposit')
                : `${tx.wallet_used.startsWith('usdt') ? 'USDT' : (tx.wallet_used.startsWith('usdc') ? 'USDC' : 'Crypto')} Deposit`
              : 'Withdrawal'
            }
          </h3>
          
          <div className="flex items-center text-[12px] text-gray-500 gap-1.5">
            <span>{new Date(tx.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} • {new Date(tx.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
            
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            
            <span className="truncate max-w-[120px] sm:max-w-[200px] font-medium">
              {tx.wallet_used === 'main' 
                ? tx.bank_name || 'Bank Transfer'
                : (tx.description?.includes('via') ? tx.description.split('via')[1].split('from')[0].trim() : 'Blockchain')
              }
            </span>
          </div>
        </div>
      </div>

      {/* Amount and Status */}
      <div className="flex flex-col items-end text-right">
        <span className={`text-[16px] font-bold ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-gray-900'}`}>
          {tx.type === 'deposit' ? '+' : '-'} {tx.wallet_used === 'main' ? currencySymbol : ''}{Number(tx.amount).toLocaleString('en-US', {minimumFractionDigits: 2})} {tx.wallet_used !== 'main' ? (tx.wallet_used.startsWith('usdt') ? 'USDT' : (tx.wallet_used.startsWith('usdc') ? 'USDC' : '')) : ''}
        </span>
        <div className="mt-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            (tx.status || 'completed').toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700' :
            (tx.status || 'completed').toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          }`}>
            {['rejected', 'unapproved', 'failed'].includes((tx.status || '').toLowerCase()) ? 'failed' : (tx.status || 'Completed')}
          </span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) setProfile(profileData);
      
      const { data: txData } = await supabase.from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(4);
        
      if (txData) setTransactions(txData);
    };
    fetchData();
  }, []);

  let currencySymbol = '$';
  if (profile?.currency) {
    if (profile.currency.includes('USD') || profile.currency.includes('$')) currencySymbol = '$';
    else if (profile.currency.includes('EUR') || profile.currency.includes('€')) currencySymbol = '€';
    else if (profile.currency.includes('GBP') || profile.currency.includes('£')) currencySymbol = '£';
    else if (profile.currency.includes('YEN') || profile.currency.includes('¥')) currencySymbol = '¥';
    else currencySymbol = profile.currency; 
    if (currencySymbol.length > 3) currencySymbol = '$';
  }

  return (
    <>
      {/* MOBILE DASHBOARD */}
      <div className="md:hidden px-4 py-4">
        {/* Sleek Light Balance Card matching EnnexCapital */}
        <div className="relative bg-[#FFF4F5] border border-red-100 rounded-xl p-5 mb-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
             <span className="text-[12px] font-semibold text-[#E81C24]">Account Balance</span>
             <span onClick={() => router.push('/dashboard/transactions')} className="text-[12px] font-medium text-[#1A408C] cursor-pointer">Transactions</span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center space-x-2">
               <span className="text-[28px] sm:text-[32px] break-all sm:break-normal font-bold text-gray-900 tracking-tight leading-none break-all max-w-[90%]">
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

      {/* DESKTOP DASHBOARD */}
      <div className="hidden md:block px-4 md:px-10 pb-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Soft Pink Balance Card */}
            <div className="bg-gradient-to-br from-[#FFF0F2] to-[#FFE5E8] rounded-3xl p-5 md:p-8 relative overflow-hidden shadow-sm border border-red-50">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[20px] border-red-500/5 rounded-full"></div>
              
              <div className="relative z-10 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <span className="text-[14px] font-medium">Total Balance</span>
                  <Eye className="w-4 h-4 cursor-pointer hover:text-gray-900 transition-colors" onClick={() => setShowBalance(!showBalance)} />
                </div>
                <div className="text-[40px] break-all sm:break-normal font-medium tracking-tight text-gray-900 mt-1 truncate pr-4">
                  {currencySymbol} {showBalance ? (profile?.total_assets ? Number(profile.total_assets).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00') : '••••••••'}
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-1.5 text-gray-600 mb-0.5">
                  <span className="text-[13px] font-medium">Available Balance</span>
                  <Info className="w-3.5 h-3.5" />
                </div>
                <div className="text-[16px] font-bold text-gray-900">
                  <span className="mr-1">{currencySymbol}</span>
                  {showBalance ? (profile?.wallet_balance ? Number(profile.wallet_balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00') : '••••••••'}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex justify-between items-center px-4 md:px-8">
              <div onClick={() => router.push('/dashboard/transfer')} className="flex flex-col items-center gap-2.5 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  <Send className="w-6 h-6 text-[#E81C24]" />
                </div>
                <span className="text-[12px] font-medium text-gray-700">Transfer</span>
              </div>
              <div onClick={() => router.push('/dashboard/deposit')} className="flex flex-col items-center gap-2.5 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  <ArrowUpCircle className="w-6 h-6 text-[#E81C24]" />
                </div>
                <span className="text-[12px] font-medium text-gray-700">Add Funds</span>
              </div>
              <div onClick={() => router.push('/dashboard/transfer/internal')} className="flex flex-col items-center gap-2.5 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  <ArrowRightLeft className="w-6 h-6 text-[#E81C24]" />
                </div>
                <span className="text-[12px] font-medium text-gray-700 whitespace-nowrap">Internal Transfer</span>
              </div>
              <div onClick={() => router.push('/dashboard/soft-token')} className="flex flex-col items-center gap-2.5 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  <Lock className="w-6 h-6 text-[#E81C24]" />
                </div>
                <span className="text-[12px] font-medium text-gray-700">Soft Token</span>
              </div>
              <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                  <MoreHorizontal className="w-6 h-6 text-[#E81C24]" />
                </div>
                <span className="text-[12px] font-medium text-gray-700">More</span>
              </div>
            </div>

            {/* Left Recent Transactions */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-end mb-6 px-2">
                <h2 className="text-[18px] font-bold text-[#1a1a1a]">Recent Transactions</h2>
                <button className="text-[#E81C24] text-[13px] font-bold flex items-center hover:opacity-80 transition-opacity">
                  View All <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="space-y-1">
                {transactions.length > 0 ? (
                  transactions.map(renderTransaction)
                ) : (
                  <div className="p-4 md:p-6 text-center text-gray-500 text-sm">No recent transactions.</div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Expanded Promo Card */}
            <div className="bg-gradient-to-b from-[#FFF0F2] to-[#FFE5E8] rounded-3xl p-5 md:p-8 shadow-sm border border-red-50 flex flex-col relative overflow-hidden h-[380px] group cursor-pointer hover:shadow-md transition-shadow">
              
              <div className="relative z-20">
                <h3 className="font-bold text-gray-900 mb-3 text-[22px] leading-tight">Elevate Your<br/>Spending.</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed max-w-[85%]">Experience premium benefits and worldwide acceptance with the new OCBC signature cards.</p>
              </div>
              
              <div className="absolute -bottom-8 -right-4 w-[320px] z-10 transition-transform group-hover:-translate-y-3 group-hover:-translate-x-3 duration-500">
                <img src="/cards_dasboard.png" alt="OCBC Cards" className="w-full h-auto drop-shadow-2xl" />
              </div>
              
              <div className="absolute bottom-8 left-8 z-20">
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#E81C24] transition-colors duration-300">
                  <ChevronRight className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Quick Help / Support block */}
            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 flex items-start gap-4 cursor-pointer hover:border-red-100 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#E81C24] transition-colors">
                <PhoneCall className="w-5 h-5 text-[#E81C24] group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Need Assistance?</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed">Our premium support team is available 24/7 to assist you.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

