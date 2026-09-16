"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, 
  Info, Image as ImageIcon, ChevronDown, ArrowRight
} from "lucide-react";

export default function GiftCardDepositPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  return (
    <div className="px-4 md:px-10 pb-12 pt-6 w-full animate-in fade-in duration-500">
      <div className="max-w-[1300px]">
        
        {/* Back Button */}
        <div 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 font-semibold text-[15px] cursor-pointer mb-6 hover:opacity-80 transition-opacity w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </div>

        {/* Main Massive Card */}
        <div className="bg-white rounded-[2rem] p-5 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            
            {/* Left Column - Form & Info */}
            <div className="space-y-10">
              
              {/* Header */}
              <div>
                <h1 className="text-[26px] font-bold text-gray-900 mb-2 tracking-tight">Deposit via Gift Card</h1>
                <p className="text-gray-600 font-medium text-[14.5px] leading-relaxed max-w-2xl">
                  Add funds to your account securely using your gift card. Please follow the instructions and provide accurate details for a successful deposit.
                </p>
              </div>

              {/* Important Information Banner */}
              <div className="bg-[#F8FBFF] border border-[#E5F0FF] rounded-2xl p-4 md:p-6 flex gap-4">
                <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">Important Information</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">
                    Ensure your gift card is valid, unused and denominated in a supported currency. Any incorrect information may result in delays or failed transactions.
                  </p>
                </div>
              </div>

              {/* How It Works Section */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-6 h-6">
                    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#E81C24]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                      <path d="M12 8v13"></path>
                      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
                    </svg>
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900">How It Works</h3>
                </div>
                
                <div className="flex items-start justify-between relative">
                  {/* Step 1 */}
                  <div className="flex flex-col gap-3 flex-1 relative">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-600 bg-white relative z-10">1</div>
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Enter Card Details</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed max-w-[180px]">Provide the required gift card information.</p>
                    </div>
                  </div>
                  
                  {/* Arrow 1 */}
                  <div className="absolute left-[20%] top-[16px] -translate-y-1/2 text-gray-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col gap-3 flex-1 relative pl-6">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-600 bg-white relative z-10">2</div>
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Verify & Confirm</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed max-w-[180px]">We validate the card and amount automatically.</p>
                    </div>
                  </div>
                  
                  {/* Arrow 2 */}
                  <div className="absolute left-[60%] top-[16px] -translate-y-1/2 text-gray-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col gap-3 flex-1 pl-6">
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[13px] font-bold text-gray-600 bg-white relative z-10">3</div>
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 mb-1">Funds Deposited</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed max-w-[180px]">The amount will be credited to your account instantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div>
                <h3 className="text-[15px] font-bold text-gray-900 mb-6">Gift Card Information</h3>
                
                <div className="space-y-6">
                  
                  {/* Grid Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold text-[13px] mb-2">Select Gift Card</label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white cursor-pointer text-gray-600">
                          <option value="">Choose gift card type</option>
                          <option value="amazon">Amazon</option>
                          <option value="apple">Apple / iTunes</option>
                          <option value="google">Google Play</option>
                          <option value="steam">Steam</option>
                          <option value="ebay">eBay</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-[13px] mb-2">Select Country / Region</label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white cursor-pointer text-gray-600">
                          <option value="">Select country</option>
                          <option value="us">United States</option>
                          <option value="uk">United Kingdom</option>
                          <option value="ca">Canada</option>
                          <option value="au">Australia</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Grid Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold text-[13px] mb-2">Gift Card Type</label>
                      <div className="relative">
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white cursor-pointer text-gray-600">
                          <option value="">Select card type</option>
                          <option value="physical">Physical Card</option>
                          <option value="egift">e-Gift Card (Digital)</option>
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-[13px] mb-2">Enter Amount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-[14px]">$</span>
                        <input 
                          type="number" 
                          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3.5 outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white placeholder:text-gray-400"
                          placeholder="Enter amount"
                        />
                      </div>
                      <p className="text-gray-500 text-[11px] font-medium mt-2">Minimum: $10.00 / Maximum: $5,000.00</p>
                    </div>
                  </div>

                  {/* Full Width Row */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-[13px] mb-2">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white placeholder:text-gray-400 font-mono"
                      placeholder="Enter card number"
                    />
                    <p className="text-gray-500 text-[11.5px] font-medium mt-2">Enter the full card number as shown on the gift card.</p>
                  </div>

                  {/* Grid Row 3 (Upload and Preview) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div>
                      <label className="block text-gray-700 font-semibold text-[13px] mb-2">Upload Card Image</label>
                      <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#E81C24] transition-colors items-center bg-white p-1.5 pl-1.5 pr-4">
                        <label className="bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-gray-700 text-[13px] font-medium px-4 py-2 rounded-lg border border-gray-200/60 shrink-0">
                          Choose File
                          <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                        </label>
                        <span className="text-gray-400 text-[13px] ml-3 truncate flex-1">
                          {file ? file.name : "No file chosen"}
                        </span>
                      </div>
                      <p className="text-gray-500 text-[11.5px] font-medium mt-2">Accepted formats: JPG, PNG, PDF (Max size: 5MB)</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold text-[13px] mb-2">Preview</label>
                      <div className="border border-dashed border-gray-300 rounded-xl h-[120px] flex flex-col items-center justify-center bg-gray-50/50 relative overflow-hidden">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Document Preview" className="w-full h-full object-contain p-2" />
                        ) : (
                          <>
                            <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
                            <span className="text-[13px] font-semibold text-gray-700 mb-0.5">No image uploaded yet</span>
                            <span className="text-[11px] text-gray-500 font-medium">Preview will appear here</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button className="w-full bg-[#E81C24] hover:bg-[#d41920] text-white font-bold py-4 rounded-xl transition-colors text-[15px] shadow-[0_4px_12px_rgba(232,28,36,0.2)]">
                      Verify & Deposit
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Right Column - Side Cards */}
            <div className="space-y-6">
              
              {/* Why Deposit with Us? */}
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-5 border border-red-100">
                  <ShieldCheck className="w-6 h-6 text-[#E81C24]" strokeWidth={2} />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">Why Deposit with Us?</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6 font-medium">
                  We ensure your transaction is safe, fast and hassle-free.
                </p>
                <ul className="space-y-3.5">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#E81C24] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E81C24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[13px] text-gray-600 font-medium">100% Secure Transactions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#E81C24] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E81C24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[13px] text-gray-600 font-medium">Instant Account Funding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#E81C24] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E81C24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[13px] text-gray-600 font-medium">No Hidden Charges</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-[#E81C24] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E81C24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className="text-[13px] text-gray-600 font-medium">24/7 Customer Support</span>
                  </li>
                </ul>
              </div>

              {/* Accepted Gift Cards */}
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-7 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                <h3 className="text-[16px] font-bold text-gray-900 mb-5">Accepted Gift Cards</h3>
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Google Play */}
                  <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-gray-200 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="w-6 h-6 object-contain" alt="Google Play" />
                    <span className="text-[10px] font-medium text-gray-500">Google Play</span>
                  </div>
                  
                  {/* Apple / iTunes */}
                  <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-gray-200 transition-colors">
                    <svg viewBox="0 0 384 512" className="w-6 h-6 fill-black"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                    <span className="text-[10px] font-medium text-gray-500">Apple / iTunes</span>
                  </div>

                  {/* Amazon */}
                  <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-gray-200 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="w-10 h-6 object-contain" alt="Amazon" />
                    <span className="text-[10px] font-medium text-gray-500">Amazon</span>
                  </div>

                  {/* Steam */}
                  <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-gray-200 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" className="w-6 h-6 object-contain" alt="Steam" />
                    <span className="text-[10px] font-medium text-gray-500">Steam</span>
                  </div>

                  {/* eBay */}
                  <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-gray-200 transition-colors">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" className="w-10 h-6 object-contain" alt="eBay" />
                    <span className="text-[10px] font-medium text-gray-500">eBay</span>
                  </div>

                  {/* Others */}
                  <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-gray-200 transition-colors">
                    <div className="w-6 h-6 flex items-center justify-center gap-0.5">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-medium text-gray-500">Others</span>
                  </div>

                </div>
              </div>

              {/* Please Note */}
              <div className="bg-[#FFF4F4] border border-[#FFE5E8] rounded-[1.5rem] p-7">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[#E81C24]" />
                  <h3 className="text-[15px] font-bold text-[#E81C24]">Please Note</h3>
                </div>
                <p className="text-[13px] text-gray-600 font-medium leading-relaxed mb-6">
                  We do not accept redeemed, expired, or partially used gift cards.
                  <br /><br />
                  Submitting invalid information may result in failed transactions.
                </p>
                
                <button className="text-[13px] font-bold text-[#E81C24] flex items-center gap-1.5 hover:gap-2 transition-all">
                  View Terms & Conditions 
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
