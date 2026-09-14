"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  Leaf,
  ChevronDown,
  CheckCircle2,
  Wallet,
  Check,
  Clock,
  Copy,
  Key
} from "lucide-react";

export default function SoftTokenPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [tokenTx, setTokenTx] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string>("usdt_erc20");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const TOTAL_FEE = 5500;

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) setProfile(profileData);

      const { data: txs } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("type", "soft_token_purchase")
        .order("created_at", { ascending: false });

      if (txs && txs.length > 0) {
        setTokenTx(txs[0]);
      }
      setLoading(false);
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

  const formatCurrency = (val: number, isCrypto = false) => {
    if (isCrypto) return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
    return currencySymbol + " " + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const wallets = [
    
    { id: 'usdt_erc20', name: 'USDT (ERC20)', balance: profile?.usdt_erc20_balance || 0, isCrypto: true, symbol: 'USDT' },
    { id: 'usdt_trc20', name: 'USDT (TRC20)', balance: profile?.usdt_trc20_balance || 0, isCrypto: true, symbol: 'USDT' },
    { id: 'usdt_bep20', name: 'USDT (BEP20)', balance: profile?.usdt_bep20_balance || 0, isCrypto: true, symbol: 'USDT' },
    { id: 'usdc_solana', name: 'USDC (Solana)', balance: profile?.usdc_solana_balance || 0, isCrypto: true, symbol: 'USDC' },
    { id: 'usdc_bep20', name: 'USDC (BEP20)', balance: profile?.usdc_bep20_balance || 0, isCrypto: true, symbol: 'USDC' },
  ];

  const currentWallet = wallets.find(w => w.id === selectedWallet)!;

  const handleProceed = async () => {
    if (!profile) return;
    setErrorMsg("");

    if (currentWallet.balance < TOTAL_FEE) {
      setErrorMsg(`Insufficient funds in ${currentWallet.name}. Please top up your balance and try again.`);
      return;
    }

    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase.from("transactions").insert({
      user_id: session.user.id,
      type: 'soft_token_purchase',
      amount: TOTAL_FEE,
      status: 'pending',
      description: `Soft Token Activation (${currentWallet.name})`,
      wallet_used: currentWallet.id
    });

    if (!error) {
      // Reload tx
      const { data: txs } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("type", "soft_token_purchase")
        .order("created_at", { ascending: false });
      
      if (txs && txs.length > 0) {
        setTokenTx(txs[0]);
      }
    } else {
      setErrorMsg("An error occurred processing your request. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (loading) return null;

  // PENDING UI
  if (tokenTx && (tokenTx.status === 'pending' || tokenTx.status === 'processing')) {
    return (
      <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
        <div className="w-full max-w-[850px] flex flex-col items-center justify-center pt-20">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center border-8 border-orange-100/50 relative z-10">
              <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-10 animate-pulse"></div>
          </div>
          <h2 className="text-[28px] font-bold text-gray-900 mb-4 tracking-tight">Processing Request</h2>
          <p className="text-[15px] text-gray-500 text-center max-w-lg mb-8 leading-relaxed">
            Your Soft Token request is currently being processed. 
            Once activated, this token will provide an additional layer of security for your outgoing transactions.
          </p>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-[14px]">Status</span>
              <span className="bg-orange-50 text-orange-700 text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Pending
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-[14px]">Reference No.</span>
              <span className="text-gray-900 font-bold text-[14px] font-mono">{tokenTx.id.substring(0,8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[14px]">Amount</span>
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
      <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
        <div className="w-full max-w-[900px] flex flex-col gap-8 pt-8">
          
          <div className="bg-gradient-to-br from-[#FFF0F2] to-[#FFE5E8] rounded-[2rem] p-5 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden shadow-[0_8px_30px_rgb(232,28,36,0.08)] border border-red-50">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E81C24]">
                <path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z M50 90 C27.9 90 10 72.1 10 50 C10 27.9 27.9 10 50 10 C72.1 10 90 27.9 90 50 C90 72.1 72.1 90 50 90 Z"/>
                <path d="M50 20 C33.5 20 20 33.5 20 50 C20 66.5 33.5 80 50 80 C66.5 80 80 66.5 80 50 C80 33.5 66.5 20 50 20 Z"/>
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-red-100/50 text-[#E81C24] px-3 py-1.5 rounded-full mb-6 border border-red-100">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Active Status</span>
                </div>
                <h2 className="text-[28px] md:text-[42px] font-bold text-gray-900 mb-4 tracking-tight leading-tight">Soft Token<br/>Activated</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                  Your Soft Token is fully active. This token provides an additional layer of security and is seamlessly integrated for authorizing your outgoing transfers.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="bg-white border border-red-100 shadow-[0_10px_40px_rgba(232,28,36,0.06)] rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden group">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-[#E81C24]" />
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-[12px] font-bold mb-3 uppercase tracking-widest text-center">Your Soft Token ID</p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
                    <span className="text-[18px] sm:text-[32px] font-mono font-bold tracking-[0.1em] sm:tracking-[0.2em] text-gray-900">
                      {code.substring(0,3)}-{code.substring(3,6)}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        setIsCopied(true); setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500 hover:text-gray-700 cursor-pointer"
                      title={isCopied ? "Copied!" : "Copy Token"}
                    >
                      {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-[12px] font-medium">Multi-Factor Authenticated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Seamless Integration</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Your token securely autofills across your transfer dashboards.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Enhanced Security</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Transactions are protected by standard multi-factor authentication.</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 mb-1">Global Validation</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">Validates and secures international and domestic transfers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PURCHASE UI
  return (
    <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center min-h-screen">
      <div className="w-full max-w-[1000px] flex flex-col gap-6">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[2rem] p-5 sm:p-8 md:p-10 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-600/20 to-transparent pointer-events-none mix-blend-overlay"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#E81C24] blur-[100px] opacity-30 rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full mb-6 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span className="text-[13px] font-medium text-red-100">Advanced Account Security</span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[42px] font-bold mb-4 tracking-tight leading-tight">
              Activate your <span className="text-[#E81C24]">Soft Token</span>
            </h1>
            <p className="text-gray-300 text-[16px] leading-relaxed max-w-xl">
              Upgrade your banking experience with our state-of-the-art e-Token. 
              Securely authenticate transactions and protect your assets without carrying a physical device.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-[2rem] p-4 sm:p-6 md:p-8 md:p-12 shadow-sm border border-gray-100">
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="flex gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
              <div className="shrink-0 mt-1">
                <Smartphone className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-1">Instant Authentication</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">Approve transfers securely with a tap on your device.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
              <div className="shrink-0 mt-1">
                <Lock className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-1">Protects Your Account</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">Helps prevent unauthorised access and fraud.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50">
              <div className="shrink-0 mt-1">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-1">Go Paperless</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">No physical token required. Eco-friendly and efficient.</p>
              </div>
            </div>
          </div>

          {/* Charge Banner */}
          <div className="bg-[#FFF4F4] border border-[#FFE5E8] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex gap-4 max-w-3xl">
              <div className="shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-full border-2 border-[#E81C24] text-[#E81C24] flex items-center justify-center font-bold text-[12px]">!</div>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-1">Why is there a charge?</h3>
                <p className="text-[13.5px] text-gray-600 leading-relaxed">
                  The Soft Token service involves secure technology licensing, infrastructure, and round-the-clock support 
                  to keep your account protected. A one-time provisioning fee applies to cover these costs.
                </p>
              </div>
            </div>
            <div className="md:border-l border-red-100 md:pl-8 text-center shrink-0">
              <div className="text-[12px] text-gray-600 font-bold mb-1 uppercase tracking-wide">One-Time Fee</div>
              <div className="text-[#E81C24] text-[26px] font-bold mb-0.5">$5,000.00</div>
              <div className="text-[11px] text-gray-400">Inclusive of applicable taxes</div>
            </div>
          </div>

          {/* Bottom Section (Payment & Summary) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-10">
            
            {/* Payment Form */}
            <div className="space-y-6">
              {/* Select Payment */}
              <div>
                <label className="block text-gray-700 font-medium text-[14px] mb-2">Select Payment Source</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white flex items-center justify-between cursor-pointer focus-within:border-[#E81C24] transition-colors"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[14px] sm:text-[14.5px] text-gray-900 font-bold truncate">{currentWallet.name}</div>
                        <div className="text-[11px] sm:text-[12.5px] text-gray-500 truncate">
                          Balance: <span className="font-semibold text-[#16A34A]">{formatCurrency(currentWallet.balance, currentWallet.isCrypto)}</span> {currentWallet.symbol}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden z-20">
                      {wallets.map((w) => (
                        <div 
                          key={w.id}
                          onClick={() => {
                            setSelectedWallet(w.id);
                            setIsDropdownOpen(false);
                            setErrorMsg("");
                          }}
                          className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0"></div>
                            <div className="min-w-0">
                              <div className="text-[13px] sm:text-[14px] text-gray-900 font-bold truncate">{w.name}</div>
                              <div className="text-[11px] sm:text-[12px] text-gray-500 truncate">
                                {formatCurrency(w.balance, w.isCrypto)} {w.symbol}
                              </div>
                            </div>
                          </div>
                          {selectedWallet === w.id && <Check className="w-4 h-4 text-[#E81C24] shrink-0" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Enter Amount */}
              <div>
                <label className="block text-gray-700 font-medium text-[14px] mb-2">Amount to Deduct</label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-3 sm:px-5 flex items-center justify-center text-gray-500 font-semibold text-[13px] sm:text-[14.5px] border-r border-gray-200 shrink-0 max-w-[80px] sm:max-w-none truncate">
                    {currentWallet.isCrypto ? (currentWallet.symbol || '') : currencySymbol}
                  </div>
                  <input 
                    type="text" 
                    readOnly
                    value="5,500.00"
                    className="w-full px-4 py-3.5 outline-none text-[15px] font-bold text-gray-900 bg-white"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] px-4 py-3 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {!errorMsg && currentWallet.balance >= TOTAL_FEE && (
                <div className="flex items-center gap-2 text-[14px] font-medium pt-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Sufficient funds available</span>
                </div>
              )}

              {/* Proceed Button */}
              <button 
                onClick={handleProceed}
                disabled={isSubmitting}
                className="w-full bg-[#E81C24] hover:bg-[#d41920] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors mt-2 text-[15px]"
              >
                {isSubmitting ? "Processing..." : "Submit Application"}
              </button>
            </div>

            {/* Payment Summary */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-4 sm:mb-6">Payment Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-gray-600 font-medium">Soft Token (e-Token OTP) Fee</span>
                    <span className="text-gray-900 font-bold">
                      {currentWallet.isCrypto ? "5,000.00" : "$5,000.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-gray-600 font-medium">GST (10%)</span>
                    <span className="text-gray-900 font-bold">
                      {currentWallet.isCrypto ? "500.00" : "$500.00"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5 flex justify-between items-center">
                  <div>
                    <div className="text-[15px] font-bold text-gray-900 mb-0.5">Total Amount</div>
                    <div className="text-[12px] text-gray-400">Inclusive of GST</div>
                  </div>
                  <div className="text-[16px] sm:text-[20px] font-bold text-[#E81C24]">
                    {currentWallet.isCrypto ? "5,500.00" : "$5,500.00"}
                  </div>
                </div>
              </div>

              {/* What you get */}
              <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-100/50 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-[#E81C24]" />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900">What you get</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-[13px] text-gray-600 font-medium">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>Soft Token app activation on your device</span>
                  </li>
                  <li className="flex gap-3 text-[13px] text-gray-600 font-medium">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>Secure OTP generation for transactions & logins</span>
                  </li>
                  <li className="flex gap-3 text-[13px] text-gray-600 font-medium">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>24/7 account protection with advanced security</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
