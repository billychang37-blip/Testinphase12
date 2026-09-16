"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, 
  Lock, Headphones, Image as ImageIcon, ArrowRight, ChevronDown, Loader2
} from "lucide-react";

export default function KYCPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [docType, setDocType] = useState("");
  const [issuingCountry, setIssuingCountry] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchKYC = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const status = user.user_metadata?.kyc_status;
      if (status) {
        setKycStatus(status);
      }
      setInitLoading(false);
    };
    fetchKYC();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!docType || !file || !issuingCountry || !idNumber) {
      setErrorMsg("Please fill out all fields and upload a document.");
      return;
    }
    
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const base64String = canvas.toDataURL('image/jpeg', 0.8);
        
        try {
          // Update user metadata
          await supabase.auth.updateUser({
            data: { kyc_status: 'pending' }
          });
          
          // Insert into transactions
          const { error } = await supabase.from('transactions').insert({
            user_id: session.user.id,
            type: 'kyc_request',
            amount: 0,
            status: 'pending',
            description: JSON.stringify({ documentType: docType, documentData: base64String, issuingCountry: issuingCountry, idNumber: idNumber }),
            reference: `KYC-${Math.floor(Math.random() * 100000)}`
          });
          
          if (error) throw error;
          
          setKycStatus('pending');
        } catch (err) {
          setErrorMsg("Failed to submit KYC. Please try again.");
        }
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (initLoading) return null;

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500">
      <div className="max-w-[1300px]">
        
        <div 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 font-semibold text-[15px] cursor-pointer mb-6 hover:opacity-80 transition-opacity w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </div>

        <div className="bg-white rounded-[2rem] p-5 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center border border-red-100/50">
                    <ShieldCheck className="w-6 h-6 text-[#E81C24]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-[20px] sm:text-[22px] font-bold text-gray-900 mb-1 tracking-tight">Complete Your KYC Verification</h1>
                    <p className="text-gray-500 font-medium text-[14px]">Your identity. Our priority.</p>
                  </div>
                </div>
                <p className="text-gray-600 text-[14px] leading-relaxed max-w-2xl">
                  In line with global regulations and to ensure the security of your account, all users are required to complete <span className="font-bold text-[#E81C24]">Know Your Customer (KYC)</span> verification before accessing full banking services.
                </p>
              </div>

              {kycStatus === 'verified' || kycStatus === 'approved' ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Complete</h3>
                  <p className="text-gray-600">Your KYC documents have been approved. You now have full access to all banking services.</p>
                </div>
              ) : kycStatus === 'pending' ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-2">Submission Successful</h3>
                  <p className="text-gray-600 text-[14px]">Your KYC documents have been successfully submitted and are securely stored. Please await review from our compliance team. This typically takes 1-2 business days.</p>
                </div>
              ) : (
                <>
                  <div className="bg-[#FFF4F4] border border-[#FFE5E8] rounded-2xl p-4 md:p-6 flex gap-4">
                    <AlertTriangle className="w-6 h-6 text-[#E81C24] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">Why KYC is Important</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        KYC helps us verify your identity, prevent fraud, and protect your account and funds. It is a legal requirement and a critical step in ensuring a secure banking experience for you.
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-100 rounded-2xl p-5 sm:p-6">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 mb-6">Submit Your Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">Issuing Country</label>
                        <input 
                          type="text" 
                          value={issuingCountry}
                          onChange={(e) => setIssuingCountry(e.target.value)}
                          placeholder="e.g. United States"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">ID Number</label>
                        <input 
                          type="text" 
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          placeholder="Enter your ID number"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">Document Type</label>
                        <div className="relative">
                          <select 
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white cursor-pointer text-gray-600"
                          >
                            <option value="">Select document type</option>
                            <option value="passport">Passport</option>
                            <option value="id">National ID Card</option>
                            <option value="license">Driver's License</option>
                            <option value="tin">Tax Identification Number (TIN)</option>
                          </select>
                          <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">Upload Document</label>
                        <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors items-center bg-white p-1.5 pl-1.5 pr-4 relative">
                          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[13px] font-semibold text-gray-700 pointer-events-none mr-3 shrink-0">
                            Choose File
                          </div>
                          <span className="text-[14px] text-gray-500 truncate">{file ? file.name : "No file chosen"}</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 flex flex-col items-center justify-center min-h-[200px] border-dashed">
                        {previewUrl ? (
                          <div className="flex flex-col items-center">
                            <img src={previewUrl} alt="Preview" className="max-h-[200px] rounded-lg shadow-sm mb-3 object-contain" />
                            <span className="text-[14px] font-semibold text-gray-700 mb-1">Document Uploaded</span>
                            <span className="text-[12px] text-gray-500 truncate max-w-[200px]">{file?.name}</span>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                            <span className="text-[14px] font-semibold text-gray-700 mb-1">No document uploaded yet</span>
                            <span className="text-[12px] text-gray-500">Preview will appear here</span>
                          </>
                        )}
                      </div>

                      {errorMsg && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-[13px] font-medium border border-red-100">
                          {errorMsg}
                        </div>
                      )}

                      <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#E81C24] hover:bg-[#d41920] disabled:opacity-70 text-white font-bold py-3 px-6 rounded-xl transition-colors text-[14px] flex items-center justify-center gap-2"
                      >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Submit for Review
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-5">
              <div className="bg-[#FFF4F4] border border-[#FFE5E8] rounded-2xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-[#E81C24]" />
                  <h3 className="text-[15px] font-bold text-[#E81C24]">Important Notice</h3>
                </div>
                <p className="text-[14px] font-bold text-gray-900 leading-snug mb-5 pr-4">
                  Accounts without verified KYC may face the following:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" /><span className="text-[13px] text-gray-600 font-medium">Account suspension or permanent ban</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" /><span className="text-[13px] text-gray-600 font-medium">Restrictions on deposits and withdrawals</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#E81C24] shrink-0" /><span className="text-[13px] text-gray-600 font-medium">Limits on transactions and transfers</span></li>
                </ul>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-gray-800" />
                  <h3 className="text-[15px] font-bold text-gray-900">Your Information is Safe</h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
                  We use bank-grade encryption to protect your personal data. Your information will never be shared with third parties.
                </p>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Secure • Encrypted • Confidential
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
