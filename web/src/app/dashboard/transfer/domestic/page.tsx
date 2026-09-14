"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft,
  ChevronDown,
  Wallet,
  Check,
  Building2,
  User,
  AlignLeft,
  KeyRound,
  Eye,
  Info,
  CreditCard,
  Building,
  Hash
} from "lucide-react";

export default function DomesticTransferPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  
  // Form State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("wallet");
  
  const [bankName, setBankName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchNumber, setBranchNumber] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [softToken, setSoftToken] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) setProfile(profileData);
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  let currencySymbol = '$';
  if (profile?.currency) {
    if (profile.currency.includes('USD') || profile.currency.includes('$')) currencySymbol = '$';
    else if (profile.currency.includes('EUR') || profile.currency.includes('€')) currencySymbol = '€';
    else if (profile.currency.includes('GBP') || profile.currency.includes('£')) currencySymbol = '£';
    else if (profile.currency.includes('YEN') || profile.currency.includes('¥')) currencySymbol = '¥';
    else currencySymbol = profile.currency; 
    if (currencySymbol.length > 3) currencySymbol = '$';
  }

  const formatCurrency = (val: number, isCrypto = false) => {
    if (isCrypto) return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    return currencySymbol + " " + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const wallets = [
    { id: 'wallet', name: 'Main Bank Balance', balance: profile?.wallet_balance || 0, isCrypto: false },
    { id: 'usdt_erc20', name: 'USDT (ERC20)', balance: profile?.usdt_erc20_balance || 0, isCrypto: true, symbol: 'USDT' },
    { id: 'usdt_trc20', name: 'USDT (TRC20)', balance: profile?.usdt_trc20_balance || 0, isCrypto: true, symbol: 'USDT' },
    { id: 'usdt_bep20', name: 'USDT (BEP20)', balance: profile?.usdt_bep20_balance || 0, isCrypto: true, symbol: 'USDT' },
    { id: 'usdc_solana', name: 'USDC (Solana)', balance: profile?.usdc_solana_balance || 0, isCrypto: true, symbol: 'USDC' },
    { id: 'usdc_bep20', name: 'USDC (BEP20)', balance: profile?.usdc_bep20_balance || 0, isCrypto: true, symbol: 'USDC' },
  ];

  const currentWallet = wallets.find(w => w.id === selectedWallet)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!bankName || !recipientName || !accountNumber || !amount || !softToken) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }

    if (numAmount > currentWallet.balance) {
      setErrorMsg(`Insufficient funds in ${currentWallet.name}.`);
      return;
    }

    
    // Soft Token Check
    const sessionRes = await supabase.auth.getSession();
    const currSession = sessionRes.data.session;
    if (!currSession) return;
    
    if (!profile?.soft_token) {
       const { data: txs } = await supabase.from("transactions").select("*").eq("user_id", currSession.user.id).eq("type", "soft_token_purchase").eq("status", "completed");
       if (!txs || txs.length === 0) {
           setErrorMsg("A Soft Token (e-Token OTP) is required to authorize transfers. Please activate one in the Soft Token menu.");
           return;
       }
    }

    setIsSubmitting(true);
    
    // Create pending transaction
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { error } = await supabase.from("transactions").insert({
        user_id: session.user.id,
        type: 'transfer',
        amount: numAmount,
        status: 'pending',
        description: description || 'Domestic Transfer',
        reference: `DOM-${Math.floor(Math.random() * 1000000)}`
      });

      if (error) {
        setErrorMsg("Failed to initiate transfer. Please try again later.");
        setIsSubmitting(false);
        return;
      }
    }

    // Success state
    setSuccess(true);
    setIsSubmitting(false);
  };

  if (loading) return null;

  if (success) {
    return (
      <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
        <div className="w-full max-w-[600px] flex flex-col items-center justify-center pt-20">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 border-8 border-green-50">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-[28px] font-bold text-gray-900 mb-4 tracking-tight">Transfer Initiated</h2>
          <p className="text-[15px] text-gray-500 text-center max-w-md mb-8 leading-relaxed">
            Your domestic transfer of <strong className="text-gray-900">{currentWallet.isCrypto ? "" : currencySymbol}{amount} {currentWallet.isCrypto ? currentWallet.symbol : ""}</strong> to <strong className="text-gray-900">{recipientName}</strong> at <strong className="text-gray-900">{bankName}</strong> is currently processing.
          </p>
          <button 
            onClick={() => router.push('/dashboard/transfer')}
            className="px-4 md:px-8 py-3.5 bg-[#E81C24] text-white font-bold rounded-xl hover:bg-[#d41920] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[850px] flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/dashboard/transfer')}
            className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Domestic Transfer</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Transfer funds to any bank in Singapore.</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#FFF0F2] to-[#FFE8EB] rounded-[1.5rem] px-4 md:px-10 py-6 md:py-9 shadow-[0_2px_15px_rgba(232,28,36,0.03)] border border-red-50 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-[280px] h-[280px] opacity-[0.04] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E81C24]">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 80c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"/>
              <path d="M25 50a25 25 0 0 1 50 0h-10a15 15 0 0 0-30 0h-10z"/>
            </svg>
          </div>
          
          <div className="relative z-10 mb-6">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <span className="text-[14px] font-medium">Available Balance</span>
              <Eye 
                className="w-4 h-4 cursor-pointer hover:text-gray-900 transition-colors" 
                onClick={() => setShowBalance(!showBalance)}
              />
            </div>
            <div className="text-[28px] sm:text-[34px] break-all sm:break-normal font-bold text-gray-900 tracking-tight leading-none mt-1">
              <span className="mr-1">{currencySymbol}</span>
              {showBalance ? (profile?.wallet_balance ? Number(profile.wallet_balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00') : '••••••••'}
            </div>
          </div>
        </div>

        {/* Transfer Form */}
        <div className="bg-white rounded-[1.5rem] p-4 md:p-10 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Select Payment Source */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Select Payment Source</label>
              <div className="relative">
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white flex items-center justify-between cursor-pointer focus-within:border-[#E81C24] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="text-[14.5px] text-gray-900 font-bold">{currentWallet.name}</div>
                      <div className="text-[12.5px] text-gray-500">
                        Balance: <span className="font-semibold text-[#16A34A]">{formatCurrency(currentWallet.balance, currentWallet.isCrypto)}</span> {currentWallet.symbol}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden z-20">
                    {wallets.map((w) => (
                      <div 
                        key={w.id}
                        onClick={() => {
                          setSelectedWallet(w.id);
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          <div>
                            <div className="text-[14px] text-gray-900 font-bold">{w.name}</div>
                            <div className="text-[12px] text-gray-500">
                              {formatCurrency(w.balance, w.isCrypto)} {w.symbol}
                            </div>
                          </div>
                        </div>
                        {selectedWallet === w.id && <Check className="w-4 h-4 text-[#E81C24]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Bank Name <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  required
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Recipient's Name */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Recipient's Name <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  required
                  placeholder="Enter recipient's full name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Account Number <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  required
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Branch Number & Sort Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium text-[14px] mb-2">Branch Number (optional)</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="e.g. 001"
                    value={branchNumber}
                    onChange={(e) => setBranchNumber(e.target.value)}
                    className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium text-[14px] mb-2">Sort Code (xx-xx-xx)</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                  <Hash className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="xx-xx-xx"
                    value={sortCode}
                    onChange={(e) => setSortCode(e.target.value)}
                    className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Enter Amount <span className="text-red-500">*</span></label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors bg-white">
                <div className="bg-gray-50 px-5 py-3.5 flex items-center justify-center text-gray-500 font-semibold text-[15px] border-r border-gray-200 shrink-0">
                  {currentWallet.isCrypto ? (currentWallet.symbol || '') : currencySymbol}
                </div>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3.5 outline-none text-[15px] font-bold text-gray-900 bg-transparent placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium text-[14px] mb-2">Description</label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <AlignLeft className="w-5 h-5 text-gray-400 mr-3 shrink-0 mt-0.5" />
                <textarea 
                  placeholder="What is this transfer for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400 resize-none h-20"
                />
              </div>
            </div>

            {/* Soft Token */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-700 font-medium text-[14px]">Soft Token <span className="text-red-500">*</span></label>
                <button 
                  type="button"
                  onClick={() => router.push('/dashboard/soft-token')}
                  className="text-[12.5px] text-[#E81C24] font-medium hover:underline"
                >
                  (Activate Soft Token)
                </button>
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors px-4 py-3.5 bg-white">
                <KeyRound className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="password" 
                  required
                  placeholder="Enter 6-digit token code"
                  value={softToken}
                  onChange={(e) => setSoftToken(e.target.value)}
                  className="w-full outline-none text-[15px] font-medium text-gray-900 bg-transparent placeholder:text-gray-400 tracking-widest"
                  maxLength={6}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl font-medium flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E81C24] hover:bg-[#d41920] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors mt-4 text-[15px]"
            >
              {isSubmitting ? "Processing..." : "Send Transfer"}
            </button>
            
          </form>
        </div>
        
      </div>
    </div>
  );
}
