"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Filter,
  FileText,
  Landmark,
  ArrowDownToLine,
  ArrowUpRight
} from "lucide-react";

export default function TransactionsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('currency')
        .eq('id', session.user.id)
        .single();
        
      setProfile(userProfile);

      const { data: txs } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (txs) {
        setTransactions(txs);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  const currencySymbol = profile?.currency === 'EUR' ? '‘' : profile?.currency === 'GBP' ? '£' : '$';

  const renderTransaction = (tx: any) => (
    <div key={tx.id} className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer last:border-0 group">
      <div className="flex items-center gap-5">
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

        <div className="flex flex-col">
          <h3 className="text-[16px] font-semibold text-gray-900 leading-tight mb-1">
            {tx.type === 'deposit' 
              ? tx.wallet_used === 'main' 
                ? tx.sender_name ? `From ${tx.sender_name}` : (tx.description?.includes('from') ? tx.description.split('from')[1].trim() : 'Bank Deposit')
                : `${tx.wallet_used.startsWith('usdt') ? 'USDT' : (tx.wallet_used.startsWith('usdc') ? 'USDC' : 'Crypto')} Deposit`
              : 'Withdrawal'
            }
          </h3>

          <div className="flex items-center text-[13px] text-gray-500 gap-2">
            <span>{new Date(tx.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} • {new Date(tx.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>

            <span className="w-1 h-1 rounded-full bg-gray-300"></span>

            <span className="truncate max-w-[200px] font-medium">
              {tx.wallet_used === 'main' 
                ? tx.bank_name || 'Bank Transfer'
                : (tx.description?.includes('via') ? tx.description.split('via')[1].split('from')[0].trim() : 'Blochchain')
              }
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end text-right">
        <span className={`text-[16px] font-bold ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-gray-900'}`}>
          {tx.type === 'deposit' ? '+' : '-'} {tx.wallet_used === 'main' ? currencySymbol : ''}{Number(tx.amount).toLocaleString('en-US', {minimumFractionDigits: 2})} {tx.wallet_used !== 'main' ? (tx.wallet_used.startsWith('usdt') ? 'USDT' : (tx.wallet_used.startsWith('usdc') ? 'USDC' : '')) : ''}
        </span>
        <div className="mt-1">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full $|
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

  const filteredTransactions = transactions.filter((t: any) => {
    if (filter === "All") return true;
    if (filter === "Deposits") return t.type === "deposit";
    if (filter === "Withdrawals") return t.type !== "deposit";
    return true;
  });

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[1200px]">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#FFF0F2] to-[#FFE5E8] rounded-[2rem] p-5 md:p-10 mb-8 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-56 h-56 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E81C24]">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 80c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-[28px] font-bold text-gray-900 mb-2">Transaction History</h1>
            <p className="text-gray-600 text-[15px] max-w-lg">
              View and download your past financial activities, including deposits and transfers.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 mb-6">
          {["All", "Deposits", "Withdrawals"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all ${filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500 font-medium">Loading transactions...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-1">No transactions found</h3>
              <p className="text-[14px] text-gray-500">You haven't made any {filter.toLowerCase()} yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredTransactions.map(renderTransaction)}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}