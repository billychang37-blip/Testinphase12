"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Box, X } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    suspendedUsers: 0
  });

  const [txStats, setTxStats] = useState({
    ethDeposit: 0,
    ethWithdraw: 0,
    usdtDeposit: 0,
    usdtWithdraw: 0,
    
    ethMonthDeposit: 0,
    ethMonthWithdraw: 0,
    usdtMonthDeposit: 0,
    usdtMonthWithdraw: 0,
    bnbMonthDeposit: 0,
    bnbMonthWithdraw: 0
  });

  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    // Play voice greeting on mount
    try {
      const msg = new SpeechSynthesisUtterance("Good morning Admin, it's good to have you today.");
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    } catch (e) {
      console.log("SpeechSynthesis not supported or blocked");
    }

    const fetchDashboardData = async () => {
      // Fetch users
      const { data: users, error } = await supabase.from('profiles').select('kyc_status');
      
      if (users && !error) {
        let active = 0, blocked = 0, suspended = 0;
        users.forEach(u => {
          if (u.kyc_status === 'approved') active++;
          else if (u.kyc_status === 'rejected') blocked++;
          else suspended++;
        });
        
        setStats({
          totalUsers: users.length, 
          activeUsers: active,
          blockedUsers: blocked,
          suspendedUsers: suspended
        });
      }

      // Fetch transactions
      const { data: txs } = await supabase.from('transactions').select('type, amount, status, created_at, wallet_used');
      if (txs) {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

        let ethD = 0, ethW = 0, usdtD = 0, usdtW = 0;
        let ethMD = 0, ethMW = 0, usdtMD = 0, usdtMW = 0, bnbMD = 0, bnbMW = 0;

        txs.forEach(tx => {
          const txTime = new Date(tx.created_at).getTime();
          const amt = Number(tx.amount) || 0;
          const isToday = txTime >= startOfDay;
          const isThisMonth = txTime >= startOfMonth;
          const wallet = (tx.wallet_used || '').toLowerCase();

          if (tx.type === 'deposit') {
            if (wallet.includes('eth') || wallet.includes('ethereum')) {
              if (isToday) ethD += amt;
              if (isThisMonth) ethMD += amt;
            } else if (wallet.includes('usdt') || wallet.includes('tether')) {
              if (isToday) usdtD += amt;
              if (isThisMonth) usdtMD += amt;
            } else if (wallet.includes('bnb')) {
              if (isThisMonth) bnbMD += amt;
            }
          } else if (tx.type === 'transfer' || tx.type === 'crypto_transfer') {
            if (wallet.includes('eth') || wallet.includes('ethereum')) {
              if (isToday) ethW += amt;
              if (isThisMonth) ethMW += amt;
            } else if (wallet.includes('usdt') || wallet.includes('tether')) {
              if (isToday) usdtW += amt;
              if (isThisMonth) usdtMW += amt;
            } else if (wallet.includes('bnb')) {
              if (isThisMonth) bnbMW += amt;
            }
          }
        });

        setTxStats({
          ethDeposit: ethD,
          ethWithdraw: ethW,
          usdtDeposit: usdtD,
          usdtWithdraw: usdtW,
          ethMonthDeposit: ethMD,
          ethMonthWithdraw: ethMW,
          usdtMonthDeposit: usdtMD,
          usdtMonthWithdraw: usdtMW,
          bnbMonthDeposit: bnbMD,
          bnbMonthWithdraw: bnbMW
        });
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="w-full animate-in fade-in duration-300 relative font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-white border border-gray-200 shadow-xl rounded-sm flex items-start gap-3 px-6 py-4 z-50 w-max max-w-full animate-in slide-in-from-top-4">
          <span className="text-yellow-500 text-2xl">👋</span>
          <div className="text-left pr-8">
            <p className="text-[15px] font-bold text-gray-700">Good Morning, Admin@Gmail.com. It's Good</p>
            <p className="text-[15px] font-bold text-gray-700 text-center">To Have You Today.</p>
          </div>
          <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Top Stats Cards */}
      <div className="flex flex-row mt-16 mb-8 bg-white border border-gray-200 shadow-sm w-full overflow-hidden">
        
        {/* Total Users */}
        <div className="flex flex-1 border-r border-gray-200">
          <div className="w-32 bg-[#00AEEF] flex flex-col items-center justify-center text-white py-5 px-2">
            <Users className="w-10 h-10 mb-2 text-white fill-current" />
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Total]</span>
          </div>
          <div className="flex-1 py-4 flex items-center justify-center bg-white text-center">
            <span className="text-3xl text-gray-600">{stats.totalUsers}</span>
          </div>
        </div>

        {/* Active Users */}
        <div className="flex flex-1 border-r border-gray-200">
          <div className="w-32 bg-[#B76F40] flex flex-col items-center justify-center text-white py-5 px-2">
            <Users className="w-10 h-10 mb-2 text-white fill-current" />
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Active]</span>
          </div>
          <div className="flex-1 py-4 flex items-center justify-center bg-white text-center">
            <span className="text-3xl text-gray-600">{stats.activeUsers}</span>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="flex flex-1 border-r border-gray-200">
          <div className="w-32 bg-[#E74C3C] flex flex-col items-center justify-center text-white py-5 px-2">
            <Users className="w-10 h-10 mb-2 text-white fill-current" />
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Blocked]</span>
          </div>
          <div className="flex-1 py-4 flex items-center justify-center bg-white text-center">
            <span className="text-3xl text-gray-600">{stats.blockedUsers}</span>
          </div>
        </div>

        {/* Suspended Users */}
        <div className="flex flex-1">
          <div className="w-32 bg-[#1ABC9C] flex flex-col items-center justify-center text-white py-5 px-2">
            <Users className="w-10 h-10 mb-2 text-white fill-current" />
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Suspended]</span>
          </div>
          <div className="flex-1 py-4 flex items-center justify-center bg-white text-center">
            <span className="text-3xl text-gray-600">{stats.suspendedUsers}</span>
          </div>
        </div>

      </div>

      {/* Information Section */}
      <div className="bg-white border border-gray-300 rounded shadow-md overflow-hidden mb-8">
        
        <div className="bg-[#2196F3] text-white px-4 py-3 border-b-[5px] border-black flex items-center gap-3">
          <Box className="w-5 h-5 text-white" />
          <h3 className="font-bold tracking-widest text-sm uppercase">Transaction Information</h3>
        </div>

        <div className="p-0">
          
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <h4 className="text-red-600 font-bold uppercase tracking-widest text-sm">Today:</h4>
          </div>

          <div className="flex border-b border-gray-200 bg-[#EAEAEA]">
            <div className="flex-1 p-2 font-bold text-[11px] uppercase tracking-widest text-gray-700 pl-4 border-r border-white">
              Medium
            </div>
            <div className="flex-1 p-2 font-bold text-[11px] uppercase tracking-widest text-gray-700 text-center border-r border-white">
              Deposits
            </div>
            <div className="flex-1 p-2 font-bold text-[11px] uppercase tracking-widest text-gray-700 text-center">
              Withdrawal
            </div>
          </div>
          
          <div className="flex border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700">
            <div className="flex-1 p-3 pl-4 border-r border-gray-200 font-medium">Ethereum</div>
            <div className="flex-1 p-3 text-center border-r border-gray-200">{txStats.ethDeposit.toLocaleString('en-US', { minimumFractionDigits: 3 })} ETH</div>
            <div className="flex-1 p-3 text-center">{txStats.ethWithdraw.toLocaleString('en-US', { minimumFractionDigits: 2 })} ETH</div>
          </div>
          
          <div className="flex border-b border-gray-300 bg-[#f9f9f9] hover:bg-gray-50 transition-colors text-sm text-gray-700 shadow-inner">
            <div className="flex-1 p-3 pl-4 border-r border-gray-200 font-medium">USDT (ERC20)</div>
            <div className="flex-1 p-3 text-center border-r border-gray-200">{txStats.usdtDeposit.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</div>
            <div className="flex-1 p-3 text-center">{txStats.usdtWithdraw.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</div>
          </div>
          
          <div className="h-6 bg-gradient-to-b from-gray-200 to-transparent opacity-30"></div>

          <div className="bg-white px-4 py-3 border-b border-gray-200 border-t border-gray-200 mt-4">
            <h4 className="text-red-600 font-bold uppercase tracking-widest text-sm">This Month:</h4>
          </div>

          <div className="flex border-b border-gray-200 bg-[#EAEAEA]">
            <div className="flex-1 p-2 font-bold text-[11px] uppercase tracking-widest text-gray-700 pl-4 border-r border-white">
              Medium
            </div>
            <div className="flex-1 p-2 font-bold text-[11px] uppercase tracking-widest text-gray-700 text-center border-r border-white">
              Deposits
            </div>
            <div className="flex-1 p-2 font-bold text-[11px] uppercase tracking-widest text-gray-700 text-center">
              Withdrawal
            </div>
          </div>
          
          <div className="flex border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700">
            <div className="flex-1 p-3 pl-4 border-r border-gray-200 font-medium">USDT (ERC20)</div>
            <div className="flex-1 p-3 text-center border-r border-gray-200">{txStats.usdtMonthDeposit.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</div>
            <div className="flex-1 p-3 text-center">{txStats.usdtMonthWithdraw.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</div>
          </div>
          
          <div className="flex border-b border-gray-200 bg-[#f9f9f9] hover:bg-gray-50 transition-colors text-sm text-gray-700 shadow-inner">
            <div className="flex-1 p-3 pl-4 border-r border-gray-200 font-medium">Ethereum</div>
            <div className="flex-1 p-3 text-center border-r border-gray-200">{txStats.ethMonthDeposit.toLocaleString('en-US', { minimumFractionDigits: 0 })} ETH</div>
            <div className="flex-1 p-3 text-center">{txStats.ethMonthWithdraw.toLocaleString('en-US', { minimumFractionDigits: 4 })} ETH</div>
          </div>
          
          <div className="flex border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm text-gray-700">
            <div className="flex-1 p-3 pl-4 border-r border-gray-200 font-medium">BNB (BSC)</div>
            <div className="flex-1 p-3 text-center border-r border-gray-200">{txStats.bnbMonthDeposit.toLocaleString('en-US', { minimumFractionDigits: 4 })} BNB</div>
            <div className="flex-1 p-3 text-center">{txStats.bnbMonthWithdraw.toLocaleString('en-US', { minimumFractionDigits: 2 })} BNB</div>
          </div>

        </div>
      </div>

    </div>
  );
}
