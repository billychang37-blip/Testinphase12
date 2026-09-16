"use client";

import { Lock, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [isAdvisoryExpanded, setIsAdvisoryExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Supabase will automatically parse the hash fragment in the URL (access_token=...&type=recovery)
    // and establish a session if it's valid.
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
      } else {
        setAuthError("Invalid or expired reset link. Please request a new one.");
      }
      setIsVerifying(false);
    };

    checkSession();

    // Also listen for auth state changes just in case it takes a moment to process the hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        setIsVerifying(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    const form = e.currentTarget;
    const newPin = (form.elements.namedItem("newPin") as HTMLInputElement).value;
    const confirmPin = (form.elements.namedItem("confirmPin") as HTMLInputElement).value;

    if (newPin !== confirmPin) {
      setAuthError("PINs do not match.");
      setIsLoading(false);
      return;
    }

    if (newPin.length !== 8) {
      setAuthError("PIN must be exactly 8 digits.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Update the Supabase Auth password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPin
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      // 2. Update the PIN in our profiles table (RLS allows users to update their own row)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ generated_pin: newPin })
        .eq('id', session.user.id);

      if (profileError) {
        throw new Error("Failed to sync new PIN to profile.");
      }

      // Success! Sign them out so they have to log in with their User ID and new PIN
      await supabase.auth.signOut();
      
      setIsSuccess(true);
      
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-gray-100">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backround img.png')" }}
      />
      
      {/* Security Advisory Top Bar */}
      <div className="w-full bg-[#2A313C] text-white py-2 px-4 flex justify-between items-start z-20 shadow-md transition-all duration-300">
        {isAdvisoryExpanded ? (
          <p className="text-[11px] font-medium leading-relaxed max-w-[90%] mx-auto lg:mx-0 lg:pl-32">
            <span className="text-orange-500 font-bold mr-1">• Security advisory:</span> 
            Do not click on links in emails or SMS messages that charge fees for failed parcel deliveries. If a caller claiming to be from your telecommunications company informs you of a fraudulent phone purchase with a mobile plan, end the call immediately. Do not disclose your banking or card details. <a href="#" className="underline underline-offset-2 hover:text-gray-300">Learn more</a>
          </p>
        ) : (
          <p className="text-[11px] font-medium leading-relaxed max-w-[90%] mx-auto lg:mx-0 lg:pl-32">
            <span className="text-orange-500 font-bold mr-1">• Security advisory:</span> 
            Protect yourself from phishing and scams. <span className="text-gray-400">Click to read more.</span>
          </p>
        )}
        <button 
          onClick={() => setIsAdvisoryExpanded(!isAdvisoryExpanded)} 
          className="text-gray-400 hover:text-white mt-0.5 ml-4 flex-shrink-0"
        >
          {isAdvisoryExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-20">
        
        <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-[8%] xl:ml-[12%]">
          {/* OCBC Logo */}
          <div className="mb-6 lg:mb-8 flex justify-center lg:justify-start">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <img src="/logo_main.png" alt="OCBC Logo" className="w-[180px] md:w-[220px] object-contain" />
            </Link>
          </div>

          {/* Form White Card */}
          <div className="bg-white w-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden flex flex-col border border-gray-100">
            
            <div className="px-6 md:px-8 pt-8 md:pt-10 pb-10 md:pb-12">
            
            <div className="flex items-center justify-center lg:justify-start text-gray-400 mb-6 space-x-1.5">
              <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Secure Site</span>
            </div>

            <h1 className="text-[26px] md:text-[28px] font-semibold text-[#333333] mb-4 text-center lg:text-left tracking-tight">
              Reset Your PIN
            </h1>

            {isVerifying ? (
              <div className="flex flex-col items-center justify-center py-10">
                <svg className="animate-spin h-8 w-8 text-[#E81C24] mb-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="text-gray-500 text-[14px]">Verifying secure link...</p>
              </div>
            ) : !session ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-md text-[14px] font-medium border border-red-100 text-center mb-6">
                {authError || "This reset link is invalid or has expired."}
                <div className="mt-4">
                  <Link href="/forgot-password" className="text-[#E81C24] hover:underline font-bold">
                    Request a new link
                  </Link>
                </div>
              </div>
            ) : isSuccess ? (
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] p-5 rounded-md text-left mt-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-[14px] font-semibold">PIN Reset Successful</h3>
                    <div className="mt-1 text-[13.5px] leading-relaxed">
                      Your new 8-digit PIN has been securely saved. You can now use it alongside your User ID to log in.
                    </div>
                    <div className="mt-4">
                      <Link href="/login" className="bg-[#166534] hover:bg-[#14532d] text-white px-6 py-2 rounded-sm text-[13px] font-bold transition-colors inline-block">
                        Proceed to Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[14px] text-gray-600 mb-8 text-center lg:text-left leading-relaxed">
                  Please create a new secure 8-digit PIN for your Online Banking profile.
                </p>

                <form className="space-y-6 md:space-y-6" onSubmit={handleSubmit}>
                  
                  {authError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-[13px] font-medium border border-red-100">
                      {authError}
                    </div>
                  )}

                  <div className="w-full">
                    <label htmlFor="newPin" className="block text-[13px] text-gray-700 mb-2 font-medium">New 8-Digit PIN</label>
                    <input 
                      type="password" 
                      id="newPin"
                      name="newPin"
                      maxLength={8}
                      className="w-full bg-white border border-[#D1D5DB] focus:border-[#E81C24] focus:ring-1 focus:ring-[#E81C24] rounded-md px-3 py-3 text-[16px] md:text-[15px] text-gray-900 placeholder-gray-400 outline-none shadow-sm transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="confirmPin" className="block text-[13px] text-gray-700 mb-2 font-medium">Confirm New PIN</label>
                    <input 
                      type="password" 
                      id="confirmPin"
                      name="confirmPin"
                      maxLength={8}
                      className="w-full bg-white border border-[#D1D5DB] focus:border-[#E81C24] focus:ring-1 focus:ring-[#E81C24] rounded-md px-3 py-3 text-[16px] md:text-[15px] text-gray-900 placeholder-gray-400 outline-none shadow-sm transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-[#E81C24] hover:bg-[#c7131a] active:bg-[#a60e14] text-white font-semibold py-3.5 rounded-sm transition-colors mt-2 text-[15px] shadow-sm flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : "Update PIN"}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
        </div>
      </div>

      {/* Global Footer */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 z-10 mt-4 lg:mt-8">
        <div className="lg:ml-[8%] xl:ml-[12%] flex flex-wrap justify-center lg:justify-start items-center gap-y-2 text-[10px] md:text-[11px] text-gray-500 font-medium tracking-wide">
          <span className="mr-2 w-full text-center lg:w-auto lg:text-left">&copy; OCBC. All Rights Reserved.</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Conditions of Access</a>
          <span className="mx-2 hidden sm:inline">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Policies</a>
          <span className="mx-2 hidden sm:inline">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Security</a>
        </div>
      </div>
    </main>
  );
}
