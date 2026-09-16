"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    blockedUsers: 0,
    suspendedUsers: 0,
    pendingKYC: 0
  });

  const [txStats, setTxStats] = useState({
    depositsFiat: 0,
    withdrawalsFiat: 0,
    depositsCrypto: 0,
    withdrawalsCrypto: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch users
      const { data: users, error } = await supabase.from('profiles').select('kyc_status');
      
      if (users && !error) {
        let active = 0, blocked = 0, suspended = 0, pending = 0;
        users.forEach(u => {
          if (u.kyc_status === 'approved') active++;
          else if (u.kyc_status === 'rejected') blocked++;
          else pending++;
        });
        
        // As a mock for the specific structure, we'll map them like this:
        setStats({
          activeUsers: active || users.length, 
          blockedUsers: blocked,
          suspendedUsers: suspended,
          pendingKYC: pending
        });
      }

      // Fetch transactions
      const { data: txs } = await supabase.from('transactions').select('type, amount');
      
      if (txs) {
        let depFiat = 0, wFiat = 0, depCrypt = 0, wCrypt = 0;
        
        txs.forEach(tx => {
          if (tx.type === 'deposit') depFiat += Number(tx.amount) || 0;
          else if (tx.type === 'transfer' || tx.type === 'crypto_transfer') wFiat += Number(tx.amount) || 0;
          // Just using fiat for now in the demo logic
        });
        
        setTxStats({
          depositsFiat: depFiat,
          withdrawalsFiat: wFiat,
          depositsCrypto: depCrypt,
          withdrawalsCrypto: wCrypt,
        });
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="w-full animate-in fade-in duration-300">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 gap-0 mb-8 bg-white border border-gray-200 shadow-sm">
        
        {/* Active Users */}
        <div className="flex border-r border-b border-b-0 border-gray-200">
          <div className="flex-1 p-6 flex flex-col justify-center bg-white text-center">
            <span className="text-3xl font-light text-gray-700">{stats.activeUsers}</span>
          </div>
          <div className="w-32 bg-[#B76F40] flex flex-col items-center justify-center text-white py-4 px-2">
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Active]</span>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="flex border-r border-b border-b-0 border-gray-200">
          <div className="flex-1 p-6 flex flex-col justify-center bg-white text-center">
            <span className="text-3xl font-light text-gray-700">{stats.blockedUsers}</span>
          </div>
          <div className="w-32 bg-[#E74C3C] flex flex-col items-center justify-center text-white py-4 px-2">
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Blocked]</span>
          </div>
        </div>

        {/* Suspended Users */}
        <div className="flex border-r border-b border-b-0 border-gray-200">
          <div className="flex-1 p-6 flex flex-col justify-center bg-white text-center">
            <span className="text-3xl font-light text-gray-700">{stats.suspendedUsers}</span>
          </div>
          <div className="w-32 bg-[#1ABC9C] flex flex-col items-center justify-center text-white py-4 px-2">
            <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Suspended]</span>
          </div>
        </div>

        {/* Pending KYC / Misc */}
        <div className="flex">
          <div className="flex-1 p-6 flex flex-col justify-center bg-white text-center">
            <span className="text-3xl font-light text-gray-700">{stats.pendingKYC}</span>
          </div>
          <div className="w-32 bg-[#34495E] flex flex-col items-center justify-center text-white py-4 px-2">
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-bold text-sm tracking-wide">Users</span>
            <span className="text-xs">[Pending KYC]</span>
          </div>
        </div>

      </div>

      {/* Information Section */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden mb-8">
        
        <div className="bg-[#3498db] text-white px-4 py-3 border-b-4 border-black">
          <h3 className="font-bold tracking-widest text-sm uppercase">Information</h3>
        </div>

        <div className="p-0">
          
          <div className="flex text-center border-b border-gray-200">
            <div className="flex-1 p-3 bg-[#EAEAEA] font-bold text-xs uppercase tracking-widest border-r border-white">
              Deposits
            </div>
            <div className="flex-1 p-3 bg-[#EAEAEA] font-bold text-xs uppercase tracking-widest">
              Withdrawal
            </div>
          </div>
          
          <div className="flex text-center border-b border-gray-200">
            <div className="flex-1 p-4 border-r border-gray-200">
              <span className="text-sm font-medium">{txStats.depositsFiat.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
            </div>
            <div className="flex-1 p-4">
              <span className="text-sm font-medium">{txStats.withdrawalsFiat.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
            </div>
          </div>
          
          <div className="flex text-center bg-gray-50 border-b border-gray-200">
            <div className="flex-1 p-4 border-r border-gray-200">
              <span className="text-sm font-medium">0.0000 ETH</span>
            </div>
            <div className="flex-1 p-4">
              <span className="text-sm font-medium">0.0000 ETH</span>
            </div>
          </div>
          
          <div className="flex text-center border-b border-gray-200">
            <div className="flex-1 p-4 border-r border-gray-200">
              <span className="text-sm font-medium">0.00 USDT</span>
            </div>
            <div className="flex-1 p-4">
              <span className="text-sm font-medium">0.00 USDT</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
