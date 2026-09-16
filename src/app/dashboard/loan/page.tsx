"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Briefcase,
  AlertCircle,
  FileText,
  CheckCircle2
} from "lucide-react";

export default function LoanPage() {
  const [profile, setProfile] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState(12);
  const [purpose, setPurpose] = useState("");

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

  const principal = parseFloat(amount.replace(/,/g, '')) || 0;
  const interestRate = 0.08; 
  let totalRepayment = 0;
  let monthlyRepayment = 0;

  if (principal > 0 && months > 0) {
    totalRepayment = principal + (principal * interestRate * (months / 12));
    monthlyRepayment = totalRepayment / months;
  }

  const isAmountTooLow = amount !== "" && principal > 0 && principal < 1000;

  const handleApply = async () => {
    if (principal < 1000 || months === 0 || purpose.trim().length === 0) return;
    alert("Loan application submitted successfully!");
    setAmount("");
    setPurpose("");
  };

  return (
    <div className="px-4 md:px-10 pb-12 pt-8 w-full animate-in fade-in duration-500">
      <div className="max-w-[1300px]">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-[#FFF0F2] to-[#FFE5E8] rounded-[2rem] p-5 md:p-10 mb-8 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-56 h-56 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E81C24]">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 80c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"/>
            </svg>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-gray-900 mb-2">Personal Loans</h1>
              <p className="text-gray-600 text-[15px] max-w-lg">
                Flexible financing solutions tailored to your personal goals. Apply in minutes with instant approval for eligible customers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 md:p-10">
              <h2 className="text-[20px] font-bold text-gray-900 mb-6">Loan Application</h2>
              
              <div className="mb-6">
                <label className="text-gray-900 font-semibold text-[14px] block mb-2">Loan Amount</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-500 font-bold">{currencySymbol}</span>
                  <input 
                    type="text" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      setAmount(val);
                    }}
                    className={`w-full bg-white border ${isAmountTooLow ? 'border-red-400' : 'border-gray-200'} rounded-xl pl-9 pr-24 py-3.5 text-[15px] font-medium text-gray-900 outline-none focus:border-[#E81C24] transition-all`}
                  />
                  <span className="absolute right-4 text-gray-400 text-[13px]">Min. {formatCurrency(1000)}</span>
                </div>
                {isAmountTooLow && (
                  <p className="text-[#E81C24] text-[13px] mt-2 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> Amount must be at least {formatCurrency(1000)}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="text-gray-900 font-semibold text-[14px] block mb-2">Loan Term (Months)</label>
                <select 
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-900 outline-none focus:border-[#E81C24] transition-all"
                >
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months</option>
                  <option value={24}>24 Months</option>
                  <option value={36}>36 Months</option>
                  <option value={48}>48 Months</option>
                  <option value={60}>60 Months</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="text-gray-900 font-semibold text-[14px] block mb-2">Loan Purpose</label>
                <textarea 
                  placeholder="Tell us what you plan to do with this loan..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-900 outline-none focus:border-[#E81C24] transition-all min-h-[120px] resize-none"
                />
              </div>

              <button 
                onClick={handleApply}
                disabled={principal < 1000 || purpose.trim().length === 0}
                className="w-full bg-[#E81C24] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl transition-colors hover:bg-red-700"
              >
                Submit Application
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-[2rem] p-5 md:p-8 border border-gray-100">
              <h3 className="text-[18px] font-bold text-gray-900 mb-6">Repayment Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 text-[14px] font-medium">Principal Amount</span>
                  <span className="font-bold text-gray-900">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 text-[14px] font-medium">Interest Rate</span>
                  <span className="font-bold text-gray-900">{(interestRate * 100).toFixed(1)}% APR</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 text-[14px] font-medium">Loan Term</span>
                  <span className="font-bold text-gray-900">{months > 0 ? `${months} Months` : "-"}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-700 text-[15px] font-bold">Monthly Payment</span>
                  <span className="text-[20px] font-bold text-[#E81C24]">{formatCurrency(monthlyRepayment)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-500 text-[13px] font-medium">Total Repayment</span>
                  <span className="text-[14px] font-bold text-gray-900">{formatCurrency(totalRepayment)}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3 border border-blue-100">
                <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[12px] text-blue-800 leading-relaxed font-medium">
                  By applying, you agree to our terms and conditions. A credit check will be performed to determine your eligibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}