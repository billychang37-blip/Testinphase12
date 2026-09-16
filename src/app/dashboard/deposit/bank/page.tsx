"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  Building2, 
  Copy, 
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Info
} from "lucide-react";

export default function BankTransferPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      
      if (data) {
        // Fallback: If user was created before account number implementation, generate one on the fly.
        if (!data.account_number) {
          setIsGenerating(true);
          let newAccountNumber = '';
          for (let i = 0; i < 10; i++) {
            newAccountNumber += Math.floor(Math.random() * 10).toString();
          }
          
          await supabase.from('profiles').update({ account_number: newAccountNumber }).eq('id', session.user.id);
          data.account_number = newAccountNumber;
          setIsGenerating(false);
        }
        
        setProfile(data);
      }
    };
    fetchUser();
  }, [router]);

  const handleCopy = (text: string, id: string) => {
    if (!text || text === "Loading...") return;
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getBankAccountDetails = () => {
    return {
      bankName: "Oversea-Chinese Banking Corporation Limited (OCBC)",
      bankAddress: "65 Chulia Street, OCBC Centre, Singapore 049513",
      accountName: profile ? `${profile.first_name} ${profile.last_name}` : "Loading...",
      accountNumber: isGenerating ? "Generating..." : (profile?.account_number || "Loading..."),
      swiftCode: "OCBCSGSGXXXY",
      userAddress: profile?.address || "Loading..."
    };
  };

  const CopyButton = ({ text, id }: { text: string, id: string }) => (
    <button 
      onClick={() => handleCopy(text, id)} 
      className="text-gray-400 hover:text-gray-900 transition-colors shrink-0 ml-3"
      title="Copy"
    >
      {copied === id ? <CheckCircle2 className="w-4 h-4 text-gray-900" /> : <Copy className="w-4 h-4" />}
    </button>
  );

  const accDetails = getBankAccountDetails();

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500 flex justify-center">
      <div className="w-full max-w-[1200px] space-y-6">
        
        {/* Header Section */}
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
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Bank Transfer</h1>
                <p className="text-gray-500 text-[14px]">Domestic & International Wire Transfer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Deposit Form / Instructions */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded p-0 overflow-hidden shadow-sm">
            
            <div className="p-5 md:p-8 border-b border-gray-100">
              <h2 className="text-[18px] font-bold text-gray-900 mb-2">Transfer Instructions</h2>
              <p className="text-[14px] text-gray-600 leading-relaxed max-w-2xl">
                Please transfer your funds to the account details provided below. We highly recommend copying the values exactly as they appear. Your account name must match the sender's name precisely to comply with AML regulations.
              </p>
            </div>

            <div className="p-5 md:p-8 bg-[#FAFAFA]">
              <div className="space-y-0 border border-gray-200 rounded bg-white shadow-sm">
                
                {/* Bank Name */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-gray-200 group gap-1">
                  <span className="text-[12px] md:text-[13px] text-gray-500 font-semibold uppercase tracking-wider mb-1 md:mb-0">Receiving Bank</span>
                  <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
                    <span className="font-medium text-[14px] md:text-[15px] text-gray-900 text-left md:text-left md:text-right break-words pr-3 max-w-[85%] md:max-w-md">{accDetails.bankName}</span>
                    <CopyButton text={accDetails.bankName} id="bankName" />
                  </div>
                </div>

                {/* Bank Address */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-gray-200 group gap-1">
                  <span className="text-[12px] md:text-[13px] text-gray-500 font-semibold uppercase tracking-wider mb-1 md:mb-0">Bank Address</span>
                  <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
                    <span className="font-medium text-[15px] text-gray-900 text-left md:text-right">{accDetails.bankAddress}</span>
                    <CopyButton text={accDetails.bankAddress} id="bankAddress" />
                  </div>
                </div>
                
                {/* Beneficiary Name */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-gray-200 group gap-1">
                  <span className="text-[12px] md:text-[13px] text-gray-500 font-semibold uppercase tracking-wider mb-1 md:mb-0">Beneficiary Name</span>
                  <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
                    <span className="font-bold text-[14px] md:text-[15px] text-gray-900 text-left md:text-left md:text-right break-words pr-3 max-w-[85%] md:max-w-md">{accDetails.accountName}</span>
                    <CopyButton text={accDetails.accountName} id="accName" />
                  </div>
                </div>

                {/* Beneficiary Address */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-gray-200 group gap-1">
                  <span className="text-[12px] md:text-[13px] text-gray-500 font-semibold uppercase tracking-wider mb-1 md:mb-0">Beneficiary Address</span>
                  <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
                    <span className="font-medium text-[15px] text-gray-900 text-left md:text-right max-w-sm">{accDetails.userAddress}</span>
                    <CopyButton text={accDetails.userAddress} id="accAddress" />
                  </div>
                </div>
                
                {/* Account Number */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 border-b border-gray-200 bg-gray-50/50 group gap-1">
                  <span className="text-[12px] md:text-[13px] text-gray-500 font-semibold uppercase tracking-wider mb-1 md:mb-0">Account Number</span>
                  <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
                    <span className="font-bold text-[18px] text-gray-900 font-mono tracking-widest">
                      {accDetails.accountNumber}
                    </span>
                    <CopyButton text={accDetails.accountNumber} id="accNumber" />
                  </div>
                </div>
                
                {/* SWIFT */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-gray-50/50 rounded-b group gap-1">
                  <span className="text-[12px] md:text-[13px] text-gray-500 font-semibold uppercase tracking-wider mb-1 md:mb-0">SWIFT / BIC Code</span>
                  <div className="flex items-start md:items-center justify-between md:justify-end w-full md:w-auto mt-1 md:mt-0">
                    <span className="font-bold text-[16px] text-gray-900 font-mono tracking-widest">
                      {accDetails.swiftCode}
                    </span>
                    <CopyButton text={accDetails.swiftCode} id="swiftCode" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column - Side Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Policy & Terms */}
            <div className="bg-white border border-gray-200 rounded p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <ShieldCheck className="w-5 h-5 text-gray-700" />
                <h3 className="text-[15px] font-bold text-gray-900">Transfer Policy</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                  <span className="text-[13px] text-gray-600 leading-relaxed">Processing times range from 1 to 3 business days depending on the originating bank and jurisdiction.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                  <span className="text-[13px] text-gray-600 leading-relaxed">We do not charge incoming wire fees, but intermediary banks may deduct standard processing charges.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                  <span className="text-[13px] text-gray-600 leading-relaxed">Ensure your transaction reference clearly states your Account Number.</span>
                </li>
              </ul>
            </div>

            {/* Strict Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-gray-700" />
                <h3 className="text-[14px] font-bold text-gray-900">Strict Compliance Notice</h3>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
                To comply with international Anti-Money Laundering (AML) standards, <strong>third-party deposits are strictly prohibited</strong>. 
                Funds received from an account not matching your exact registered profile name will be automatically reversed.
              </p>
              
              <button className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5 hover:underline transition-all">
                Read full terms & conditions
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
