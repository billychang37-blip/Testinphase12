"use client";

import { useRouter } from "next/navigation";
import { 
  Building2, 
  Bitcoin, 
  Gift, 
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  List,
  Headphones,
  DollarSign,
  Globe,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";

export default function DepositPage() {
  const router = useRouter();

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[1200px] space-y-6">
        
        {/* Back Button */}
        <div 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#E81C24] font-semibold text-[15px] cursor-pointer hover:opacity-80 transition-opacity w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </div>



        {/* Deposit Methods */}
        <div>
          <h2 className="text-[16px] font-bold text-gray-900 mb-4 px-2">Choose a deposit method</h2>
          
          <div className="space-y-4">
            
            {/* Bank Transfer (Recommended) */}
            <div 
              onClick={() => router.push('/dashboard/deposit/bank')}
              className="bg-white rounded-2xl p-4 md:p-6 flex items-center justify-between cursor-pointer border-2 border-[#E81C24] shadow-[0_4px_20px_rgba(232,28,36,0.05)] hover:shadow-[0_4px_20px_rgba(232,28,36,0.1)] transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-[20px] h-[20px] text-[#E81C24] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 22h20v-2H2v2zm10-20L2 7h20L12 2zM6 18h2v-8H6v8zm4 0h2v-8h-2v8zm4 0h2v-8h-2v8zm4 0h2v-8h-2v8z"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <h3 className="text-[16px] font-bold text-gray-900">Bank Transfer</h3>
                    <span className="bg-[#E81C24] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">Recommended</span>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-3 font-medium">Add money via mobile or internet banking</p>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Instant Credit</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">No Fees</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">High Security</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#E81C24]" strokeWidth={2.5} />
            </div>

            {/* Cryptocurrency */}
            <div 
              onClick={() => router.push('/dashboard/deposit/crypto')}
              className="bg-white rounded-2xl p-4 md:p-6 flex items-center justify-between cursor-pointer border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-full bg-[#F4F6F8] flex items-center justify-center shrink-0 relative">
                  <div className="absolute left-[6px] top-[6px] w-[20px] h-[20px] rounded-full bg-white shadow-sm flex items-center justify-center z-20 border border-gray-50">
                    <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg" alt="USDT" className="w-[12px] h-[12px] object-contain" />
                  </div>
                  <div className="absolute right-[6px] top-[12px] w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center shadow-sm z-10 border border-gray-50">
                    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" alt="BTC" className="w-[12px] h-[12px] object-contain" />
                  </div>
                  <div className="absolute left-[14px] bottom-[6px] w-[20px] h-[20px] rounded-full bg-white shadow-sm flex items-center justify-center z-30 border border-gray-50">
                    <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" alt="ETH" className="w-[12px] h-[12px] object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-0.5">Cryptocurrency</h3>
                  <p className="text-[13px] text-gray-500 mb-3 font-medium">Fund account using crypto (USDT, USDC, BUSD and more)</p>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Fast Settlement</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Low Fees</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Global Access</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" strokeWidth={2.5} />
            </div>

            {/* Gift Card */}
            <div 
              onClick={() => router.push('/dashboard/gift-card')}
              className="bg-white rounded-2xl p-4 md:p-6 flex items-center justify-between cursor-pointer border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <Gift className="w-[20px] h-[20px] text-[#E81C24]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-0.5">Gift Card</h3>
                  <p className="text-[13px] text-gray-500 mb-3 font-medium">Instantly deposit using gift cards</p>
                  
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Instant Credit</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Wide Acceptance</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11.5px] text-gray-600 font-semibold">Simple & Easy</span>
                    </div>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition-colors" strokeWidth={2.5} />
            </div>

          </div>
        </div>

        {/* Bottom Security Banner */}
        <div className="bg-[#FFF4F4] rounded-2xl p-4 md:p-6 border border-[#FFE5E8] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-red-100 shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[#E81C24]" />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-gray-900 mb-0.5">Your security is our priority</h4>
              <p className="text-[13px] text-gray-600 font-medium">
                We use bank-grade encryption and advanced fraud protection to keep your transactions and data safe at all times.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#E81C24] hover:gap-2 transition-all whitespace-nowrap shrink-0 mt-2 md:mt-0">
            Learn more about security <ShieldCheck className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
