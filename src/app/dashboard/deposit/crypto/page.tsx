"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { QRCodeSVG } from "qrcode.react";
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Bitcoin
} from "lucide-react";

export default function CryptoDepositPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const [selectedCoin, setSelectedCoin] = useState<"USDT" | "USDC">("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ERC20");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) setProfile(data);
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    if (selectedCoin === "USDT") {
      setSelectedNetwork("ERC20");
    } else {
      setSelectedNetwork("BEP20");
    }
  }, [selectedCoin]);

  const networkOptions = {
    USDT: ["ERC20", "TRC20", "BEP20"],
    USDC: ["BEP20", "Solana"]
  };

  const getAddress = (coin: string, network: string) => {
    if (coin === "USDT") {
      if (network === "ERC20") return "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
      if (network === "TRC20") return "TFdVrsUjZgyQHmMuwp1qwBGVxo8cmmhm6T";
      if (network === "BEP20") return "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
    }
    if (coin === "USDC") {
      if (network === "BEP20") return "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
      if (network === "Solana") return "465xjijipUGSzW6xUiWzjk7PsZkgj3t22HkhnMm7PJvx";
    }
    return "0xE6bbb7D8A441C4212678188A77Af9701241CC65E";
  };

  const address = getAddress(selectedCoin, selectedNetwork);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[1200px] space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <div 
              onClick={() => router.push('/dashboard/deposit')}
              className="flex items-center gap-2 text-[#E81C24] font-medium text-[13px] mb-4 cursor-pointer hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Methods
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Cryptocurrency</h1>
                <p className="text-gray-500 text-[14px]">Fund your account via blockchain networks</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            
            <div className="p-5 md:p-8 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-[16px] font-bold text-gray-900 mb-1">Transfer Details</h2>
              <p className="text-[13px] text-gray-500 max-w-xl">
                Configure your deposit by selecting the asset and the receiving network.
              </p>
            </div>

            <div className="p-5 md:p-8">
              <div className="max-w-2xl mx-auto space-y-10">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">1. Select Asset</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setSelectedCoin("USDT")}
                      className={`relative p-5 rounded-xl border text-left transition-all overflow-hidden group ${
                        selectedCoin === "USDT" 
                        ? "border-[#E81C24] bg-red-50/20 ring-1 ring-[#E81C24]/10" 
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-8 h-8 flex items-center justify-center shadow-sm rounded-full bg-white shrink-0">
                          <img src="/usdt.svg" alt="USDT Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[15px]">USDT</div>
                          <div className="text-[12px] text-gray-500 font-medium">Tether USD</div>
                        </div>
                      </div>
                      {selectedCoin === "USDT" && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-5 h-5 text-[#E81C24]" />
                        </div>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => setSelectedCoin("USDC")}
                      className={`relative p-5 rounded-xl border text-left transition-all overflow-hidden group ${
                        selectedCoin === "USDC" 
                        ? "border-[#E81C24] bg-red-50/20 ring-1 ring-[#E81C24]/10" 
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-8 h-8 flex items-center justify-center shadow-sm rounded-full bg-white shrink-0">
                          <img src="/usdc.svg" alt="USDC Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[15px]">USDC</div>
                          <div className="text-[12px] text-gray-500 font-medium">USD Coin</div>
                        </div>
                      </div>
                      {selectedCoin === "USDC" && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-5 h-5 text-[#E81C24]" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">2. Select Network</label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {networkOptions[selectedCoin].map(net => (
                      <button
                        key={net}
                        onClick={() => setSelectedNetwork(net)}
                        className={`px-6 py-2.5 rounded-lg border text-[13px] font-bold transition-all ${
                          selectedNetwork === net
                          ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {net}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-5 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-inner">
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 shrink-0">
                    <QRCodeSVG 
                      value={address}
                      size={140}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"H"}
                      imageSettings={{
                        src: selectedCoin === "USDT" ? "/usdt.svg" : "/usdc.svg",
                        x: undefined,
                        y: undefined,
                        height: 32,
                        width: 32,
                        excavate: true,
                      }}
                    />
                  </div>
                  
                  <div className="w-full space-y-4 text-center md:text-left">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Deposit Address</h4>
                      <p className="text-[13px] text-gray-500">
                        Send only <strong className="text-gray-900">{selectedCoin}</strong> via <strong className="text-gray-900">{selectedNetwork}</strong>.
                      </p>
                    </div>
                    
                    <div className="w-full bg-white rounded-xl p-1 pl-4 flex justify-between items-center border border-gray-200 shadow-sm group hover:border-gray-300 transition-all">
                      <span className="text-[12px] md:text-[13px] font-mono font-medium text-gray-800 truncate pr-4">
                        {address}
                      </span>
                      <button 
                        onClick={() => handleCopy(address, 'crypto')}
                        className="bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-transparent hover:border-gray-200"
                        title="Copy Address"
                      >
                        {copied === 'crypto' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
                <h3 className="text-[14px] font-bold text-gray-900">Stablecoin Policy</h3>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
                To protect your account value from extreme market volatility, we exclusively support pegged stablecoins. Your deposits will always reflect a 1:1 USD equivalent.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                  <span className="text-[13px] text-gray-600 leading-relaxed">No exposure to price fluctuations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                  <span className="text-[13px] text-gray-600 leading-relaxed">Instantly settled and available for internal transfers.</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <h3 className="text-[13px] font-bold text-orange-800 uppercase tracking-wider">Network Warning</h3>
              </div>
              <p className="text-[13px] text-orange-800/90 leading-relaxed mb-4">
                Sending a different asset or using a mismatched network (e.g., sending ERC20 tokens to a BEP20 address) will result in a <strong>permanent loss of funds</strong>.
                <br /><br />
                Deposits are automatically credited once the required block confirmations are reached.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
