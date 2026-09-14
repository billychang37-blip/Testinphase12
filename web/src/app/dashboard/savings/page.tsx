"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Eye,
  Info,
  ChevronRight,
  PlusCircle
} from "lucide-react";

export default function SavingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [showBalance, setShowBalance] = useState(true);
  
  const [amount, setAmount] = useState("");
  const [pocketName, setPocketName] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number | null>(12);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) setProfile(profileData);
    };
    fetchUser();
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

  const formatCurrency = (val: number) => {
    return currencySymbol + " " + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const durations = [
    { months: 3, rate: 7 },
    { months: 6, rate: 9 },
    { months: 12, rate: 12 },
    { months: 24, rate: 15 },
    { months: 36, rate: 17 }
  ];

  const selectedRate = durations.find(d => d.months === selectedDuration)?.rate || 0;
  const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  
  // Assuming APY is annual, estimated monthly profit = (Amount * (Rate/100)) / 12
  const estimatedProfit = numAmount > 0 ? (numAmount * (selectedRate / 100)) / 12 : 0;

  return (
    <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
      <div className="w-full max-w-[950px] flex flex-col gap-6">
        
        {/* Balance Card Container */}
        <div className="rounded-[1.5rem] shadow-[0_2px_15px_rgba(232,28,36,0.03)] border border-red-50 overflow-hidden flex flex-col">
          
          {/* Top Pink Half */}
          <div className="bg-[#FFF0F2] px-4 md:px-10 py-9 relative overflow-hidden">
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-[0.04] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E81C24]">
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 80c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"/>
                <path d="M25 50a25 25 0 0 1 50 0h-10a15 15 0 0 0-30 0h-10z"/>
              </svg>
            </div>
            
            <div className="relative z-10 mb-6">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <span className="text-[14px] font-medium">Savings Balance</span>
                <Eye 
                  className="w-4 h-4 cursor-pointer hover:text-gray-900 transition-colors" 
                  onClick={() => setShowBalance(!showBalance)}
                />
              </div>
              <div className="text-[34px] break-all sm:break-normal font-bold text-gray-900 tracking-tight leading-none mt-1">
                {showBalance ? formatCurrency(profile?.savings_balance || 0) : '••••••••'}
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-1.5 text-gray-500 mb-1">
                <span className="text-[13px] font-medium">Available Balance</span>
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="text-[15px] font-bold text-gray-800">
                {showBalance ? formatCurrency(profile?.wallet_balance || 0) : '••••••••'}
              </div>
            </div>
          </div>

          {/* Bottom White Half */}
          <div className="bg-white px-4 md:px-10 py-6 flex flex-col md:flex-row md:items-center justify-between border-t border-red-50">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-[13px] font-medium text-gray-500">Expected Profit (per month)</span>
              </div>
              <div className="text-[16px] font-bold text-gray-900 flex items-center gap-1.5">
                {formatCurrency(profile?.expected_profit || 0)} <Info className="w-3.5 h-3.5 text-gray-300" />
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-2.5 rounded-full border border-[#E81C24] text-[#E81C24] font-semibold text-[14px] hover:bg-red-50/50 transition-colors">
              Transfer To Balance
            </button>
          </div>
        </div>

        {/* History Box */}
        <div 
          onClick={() => router.push('/dashboard/transactions')}
          className="bg-white rounded-[1.25rem] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 px-6 md:px-10 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-gray-400 text-gray-400 rounded-full flex items-center justify-center">
              <span className="text-[18px] leading-none mb-0.5 font-bold">+</span>
            </div>
            <span className="font-semibold text-gray-900 text-[15px]">History</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-[1.5rem] shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 p-5 md:p-10 mb-10">
          <h2 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight">Create A Fixed Savings Pocket With Us!</h2>
          <p className="text-[14px] text-gray-500 mb-8 font-medium">Get a Monthly 7% - 17% Interest.</p>

          {/* Pocket Name */}
          <div className="mb-6">
            <label className="block text-[14px] font-bold text-gray-900 mb-2">Pocket Name</label>
            <input 
              type="text" 
              placeholder="Enter pocket name" 
              value={pocketName}
              onChange={(e) => setPocketName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[14.5px] outline-none focus:border-[#E81C24] transition-colors" 
            />
          </div>

          {/* Pay From */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[14px] font-bold text-gray-900">Pay From</label>
              <span className="text-[13px] text-gray-500 font-medium">
                Available Balance: <span className="text-[#16A34A] font-bold">{formatCurrency(profile?.wallet_balance || 0)}</span>
              </span>
            </div>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[14.5px] text-gray-500 outline-none focus:border-[#E81C24] transition-colors appearance-none bg-white">
                <option>Select account</option>
                <option>Main Wallet</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Set Duration */}
          <div className="mb-8">
            <label className="block text-[14px] font-bold text-gray-900 mb-3">Set Duration</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {durations.map((d) => {
                const isSelected = selectedDuration === d.months;
                const isPopular = d.months === 12;
                return (
                  <div 
                    key={d.months}
                    onClick={() => setSelectedDuration(d.months)}
                    className={`relative border rounded-xl p-4 text-center cursor-pointer transition-colors ${isSelected ? 'border-[#E81C24] bg-red-50/30' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-2.5 -right-2 bg-[#E81C24] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                        Popular
                      </div>
                    )}
                    <div className={`font-bold text-[14px] ${isSelected ? 'text-[#E81C24]' : 'text-gray-900'}`}>
                      {isSelected && isPopular && <span className="inline-block w-1 h-1 bg-[#E81C24] rounded-full mr-1.5 align-middle"></span>}
                      {d.months} Months
                      {isSelected && isPopular && <span className="inline-block w-1 h-1 bg-[#E81C24] rounded-full ml-1.5 align-middle"></span>}
                    </div>
                    <div className="text-[12px] text-gray-500 mt-1">{d.rate}% p.a.</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deposit Amount */}
          <div className="mb-10">
            <label className="block text-[14px] font-bold text-gray-900 mb-2">Deposit Amount</label>
            <div className="relative flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors">
              <div className="bg-gray-50 px-5 py-3.5 text-gray-600 font-bold border-r border-gray-200 text-[14.5px]">
                {currencySymbol}
              </div>
              <input 
                type="text" 
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, '');
                  setAmount(val);
                }}
                className="w-full px-4 py-3.5 text-[15px] font-medium text-gray-900 outline-none" 
              />
              <div className="absolute right-4 text-[12.5px] text-gray-400 font-medium bg-white pl-2">
                Minimum: {formatCurrency(1000)}
              </div>
            </div>
          </div>

          {/* Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 px-2 md:px-8 mb-10">
            <div className="text-center md:text-left">
              <p className="text-[12px] text-gray-500 font-medium mb-1">You will deposit</p>
              <p className="text-[15px] font-bold text-gray-900">{formatCurrency(numAmount)}</p>
            </div>
            <div className="text-center">
              <p className="text-[12px] text-gray-500 font-medium mb-1">Monthly Interest Rate</p>
              <p className="text-[15px] font-bold text-[#E81C24]">{selectedRate.toFixed(2)}% p.a.</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[12px] text-gray-500 font-medium mb-1">Estimated Profit (Monthly)</p>
              <p className="text-[15px] font-bold text-[#16A34A]">{formatCurrency(estimatedProfit)}</p>
            </div>
          </div>

          {/* Button */}
          <button 
            disabled={numAmount < 1000 || !pocketName}
            className="w-full bg-[#E81C24] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors text-[15px]"
          >
            Create Pocket
          </button>
          
        </div>

      </div>
    </div>
  );
}