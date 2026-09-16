"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ChevronRight,
  Eye,
  Info,
  FileText
} from "lucide-react";

export default function TransferSelectorPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [hasSoftToken, setHasSoftToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (profileData) setProfile(profileData);
      if (profileData.soft_token) setHasSoftToken(true);

      const { data: txs } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("type", "soft_token_purchase")
        .eq("status", "completed");

      if (txs && txs.length > 0) {
        setHasSoftToken(true);
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

  return (
    <div className="px-4 md:px-10 pb-20 pt-8 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[850px] flex flex-col gap-6">
        
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
              <span className="text-[14px] font-medium">Balance</span>
              <Eye 
                className="w-4 h-4 cursor-pointer hover:text-gray-900 transition-colors" 
                onClick={() => setShowBalance(!showBalance)}
              />
            </div>
            <div className="text-[28px] sm:text-[34px] break-all sm:break-normal font-bold text-gray-900 tracking-tight leading-none mt-1">
              <span className="mr-1">{currencySymbol}</span>
              {showBalance ? (profile?.total_assets ? Number(profile.total_assets).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00') : '••••••••'}
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-1.5 text-gray-500 mb-1">
              <span className="text-[13px] font-medium">Available Balance</span>
              <Info className="w-3.5 h-3.5" />
            </div>
            <div className="text-[15px] font-bold text-gray-800">
              <span className="mr-1">{currencySymbol}</span>
              {showBalance ? (profile?.wallet_balance ? Number(profile.wallet_balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '0.00') : '••••••••'}
            </div>
          </div>
        </div>

        {!loading && !profile?.soft_token && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-[#E81C24]" />
                <p className="text-[13px] text-red-900 font-medium">A Soft Token (e-Token OTP) is required to authorise outgoing transfers.</p>
              </div>
              <button 
                onClick={() => router.push('/dashboard/soft-token')}
                className="text-[13px] font-bold text-[#E81C24] hover:underline"
              >
                Activate Now
              </button>
            </div>
          )}

        {/* Transfer List */}
        <div className="bg-white rounded-[1.25rem] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
          
          <div 
            onClick={() => router.push('/dashboard/transfer/internal')}
            className="flex items-center justify-between p-4 md:px-6 md:py-5 hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-[42px] h-[42px] bg-[#FFF0F2] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#E81C24]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M240 18.2C246 14.3 253.2 12 261 12s15 2.3 21 6.2l192 128C488.3 155.8 496 170.8 496 186.7V224c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V186.7c0-15.9 7.7-30.9 20-40.5l192-128zM64 288v160c0 17.7 14.3 32 32 32h24c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zm128 0v160c0 17.7 14.3 32 32 32h24c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32h-24c-17.7 0-32 14.3-32 32zm128 0v160c0 17.7 14.3 32 32 32h24c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32h-24c-17.7 0-32 14.3-32 32zm128 0v160c0 17.7 14.3 32 32 32h24c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32h-24c-17.7 0-32 14.3-32 32z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[14.5px] md:text-[15px] font-semibold text-gray-900 mb-[2px]">Internal Transfer</h3>
                <p className="text-[12px] md:text-[13px] text-gray-500">Transfer to OCBC Account or other OCBC users instantly with 0% charge fee</p>
              </div>
            </div>
            <div className="flex items-center text-[#E81C24] text-[13px] md:text-[13.5px] font-semibold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center">
              Proceed <ChevronRight className="w-4 h-4 ml-1 opacity-80" strokeWidth={2.5} />
            </div>
          </div>

          <div 
            onClick={() => router.push('/dashboard/transfer/domestic')}
            className="flex items-center justify-between p-4 md:px-6 md:py-5 hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-[42px] h-[42px] bg-[#FFF0F2] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#E81C24]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24V64 350.5 400v88c0 13.3 10.7 24 24 24s24-10.7 24-24V388l80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22.7-113.5-14.5L48 40.5V24z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[14.5px] md:text-[15px] font-semibold text-gray-900 mb-[2px]">Domestic Transfer</h3>
                <p className="text-[12px] md:text-[13px] text-gray-500">Transfer to any bank in Singapore</p>
              </div>
            </div>
            <div className="flex items-center text-[#E81C24] text-[13px] md:text-[13.5px] font-semibold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center">
              View Payments <ChevronRight className="w-4 h-4 ml-1 opacity-80" strokeWidth={2.5} />
            </div>
          </div>

          <div 
            onClick={() => router.push('/dashboard/transfer/international')}
            className="flex items-center justify-between p-4 md:px-6 md:py-5 hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-[42px] h-[42px] bg-[#FFF0F2] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#E81C24]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.4c2.2 20.4 3.3 41.8 3.3 64zm28.8-64h123.1c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-41.9 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 41.9-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.7H344.3c-6.1 36.4-15.5 68.6-27 94.7c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM321.4 503.6c25.5-34.2 45.3-87.7 55.3-151.6h116.7c-29.9 74.1-93.6 130.9-172 151.6zM190.6 503.6c-78.3-20.7-142-77.5-171.9-151.6h116.7c10 63.9 29.8 117.4 55.3 151.6z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[14.5px] md:text-[15px] font-semibold text-gray-900 mb-[2px]">International Transfer</h3>
                <p className="text-[12px] md:text-[13px] text-gray-500">Make transfer to any Global Bank</p>
              </div>
            </div>
            <div className="flex items-center text-[#E81C24] text-[13px] md:text-[13.5px] font-semibold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center">
              View Orders <ChevronRight className="w-4 h-4 ml-1 opacity-80" strokeWidth={2.5} />
            </div>
          </div>

          <div 
            onClick={() => router.push('/dashboard/transfer/crypto')}
            className="flex items-center justify-between p-4 md:px-6 md:py-5 hover:bg-gray-50/50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-[42px] h-[42px] bg-[#FFF0F2] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#E81C24]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.086-50.739-54.55-62.573l11.146-44.702-27.213-6.781-10.851 43.524c-7.154-1.783-14.502-3.464-21.803-5.13l10.929-43.81-27.198-6.781-11.153 44.736c-5.918-1.282-11.758-2.585-17.447-3.955l.004-.018-37.625-9.378-7.253 29.083s20.21 4.566 19.8 4.938c11.059 2.756 13.067 10.075 12.723 15.827l-12.7 50.941c.767.19.191.191.688.423l-1.026 4.116c-1.233 3.498-4.444 8.761-12.639 6.721.365.372-19.808-4.935-19.808-4.935l-13.627 31.644 35.32 8.802c6.586 1.637 13.12 3.328 19.64 4.966l-11.3 45.362 27.202 6.782 11.109-44.57c7.404 1.954 14.654 3.791 21.724 5.539l-11.065 44.382 27.227 6.787 11.285-45.244c45.962 8.656 80.575 5.176 95.029-36.438 11.666-33.6-.967-52.92-25.045-65.571 17.818-4.117 31.258-15.684 34.697-39.73zm-68.514 74.887c-5.19 20.803-40.428 10.662-51.849 7.81l9.206-36.932c11.411 2.846 47.935 8.167 42.643 29.122zm10.75-53.513c-4.73 18.966-33.628 10.158-43.088 7.801l8.368-33.568c9.444 2.348 39.526 6.64 34.72 25.767z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-[14.5px] md:text-[15px] font-semibold text-gray-900 mb-[2px]">Cryptocurrency Transfer</h3>
                <p className="text-[12px] md:text-[13px] text-gray-500">Securely transfer cryptocurrency with ease and confidence</p>
              </div>
            </div>
            <div className="flex items-center text-[#E81C24] text-[13px] md:text-[13.5px] font-semibold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center">
              History <ChevronRight className="w-4 h-4 ml-1 opacity-80" strokeWidth={2.5} />
            </div>
          </div>

        </div>

        {/* Recent History */}
        <div 
          onClick={() => router.push('/dashboard/transactions')}
          className="bg-white rounded-[1.25rem] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 p-4 md:px-6 md:py-5 flex items-center justify-between hover:bg-gray-50/50 cursor-pointer transition-colors group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-[42px] h-[42px] bg-gray-50 rounded-full flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-gray-600" strokeWidth={2} />
            </div>
            <h3 className="text-[14.5px] md:text-[15px] font-semibold text-gray-900">Recent History</h3>
          </div>
          <div className="flex items-center text-gray-900 text-[13px] md:text-[13.5px] font-bold shrink-0 pl-3 md:pl-4 group-hover:pr-1 transition-all flex flex-col md:flex-row items-end md:items-center">
            View All <ChevronRight className="w-4 h-4 ml-1 opacity-80" strokeWidth={2.5} />
          </div>
        </div>

      </div>
    </div>
  );
}