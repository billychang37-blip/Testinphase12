"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff } from "lucide-react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Custom Select Component to replace the ugly native browser dropdowns
const CustomSelect = ({ 
  name, 
  value, 
  options, 
  onChange, 
  error, 
  disabled, 
  placeholder 
}: {
  name: string, value: string, options: string[], onChange: any, error?: boolean, disabled?: boolean, placeholder: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className={`w-full bg-white border ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#D1D5DB] focus:border-[#0072C6] focus:ring-1 focus:ring-[#0072C6]'} ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-gray-400'} rounded-md px-3 py-2.5 text-[16px] md:text-[14px] flex justify-between items-center shadow-sm transition-colors outline-none`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto py-1">
          {options.map((opt) => (
            <div 
              key={opt} 
              className={`px-4 py-2.5 text-[14px] cursor-pointer transition-colors ${value === opt ? 'bg-[#0072C6] text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-[#0072C6]'}`}
              onClick={() => {
                onChange({ target: { name, value: opt } });
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function RegisterPage() {
  const [captchaText, setCaptchaText] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    atm_credential: "", 
    atm_pin: "",        
    noCard: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    idType: "",
    idNo: "",
    skipId: false,
    address: "",
    accountType: "",
    currency: "",
    country: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Auth flow states
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const generateRandomString = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#E5E7EB"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#000" : "#666";
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = "#999";
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    ctx.font = "bold 28px 'Courier New', monospace";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const x = 30 + i * 25;
      const y = canvas.height / 2 + (Math.random() * 10 - 5);
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.random() * 0.4) - 0.2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
  };

  const refreshCaptcha = () => {
    const newText = generateRandomString(6);
    setCaptchaText(newText);
    drawCaptcha(newText);
    setFormData(prev => ({ ...prev, captchaInput: "" }));
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.type === "checkbox" ? target.checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.noCard) {
      if (!formData.atm_credential) newErrors.atm_credential = "Card number is required";
      if (!formData.atm_pin) newErrors.atm_pin = "PIN is required";
    }

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    
    if (!formData.skipId) {
      if (!formData.idType) newErrors.idType = "Identification type is required";
      if (!formData.idNo) newErrors.idNo = "Identification number is required";
    }

    if (!formData.accountType) newErrors.accountType = "Account type is required";
    if (!formData.currency) newErrors.currency = "Currency is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";

    if (!formData.captchaInput) {
      newErrors.captchaInput = "Security code is required";
    } else if (formData.captchaInput !== captchaText) {
      newErrors.captchaInput = "Invalid Security Code. Please try again.";
      refreshCaptcha();
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setAuthError("");

    // 1. Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    setIsSubmitting(false);

    if (error) {
      setAuthError(error.message);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
      // Proceed to OTP verification step
      setRegisteredEmail(formData.email);
      setStep("otp");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setAuthError("Please enter the 6-digit code.");
      return;
    }

    setIsSubmitting(true);
    setAuthError("");

    // 2. Verify OTP with Supabase
    const { data: { session }, error: verifyError } = await supabase.auth.verifyOtp({
      email: registeredEmail,
      token: otp,
      type: 'signup'
    });

    if (verifyError || !session?.user?.id) {
      setIsSubmitting(false);
      setAuthError(verifyError?.message || "Verification failed. Please try again.");
      return;
    }

    // 3. OTP is verified! Call our backend to generate credentials, save profile, and send welcome email.
    try {
      const response = await fetch('/api/auth/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authUserId: session.user.id,
          formData: formData
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to finalize registration");
      }

      setStep("success");
      await supabase.auth.signOut();
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleString("en-SG", {
      day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric", hour12: true,
    }));
  }, []);

  // Upgraded input class for a modern, soft, professional look
  const inputClass = (name: string, isTextarea = false) => `w-full bg-white border ${errors[name] ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#D1D5DB] focus:border-[#0072C6] focus:ring-1 focus:ring-[#0072C6]'} rounded-md px-3 py-2.5 text-[16px] md:text-[14px] text-gray-900 placeholder-gray-400 outline-none shadow-sm transition-colors ${isTextarea ? 'resize-none' : ''}`;
  
  const ErrorMsg = ({ name }: { name: string }) => errors[name] ? <p className="text-red-500 text-[11px] mt-1.5 font-medium">{errors[name]}</p> : null;

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    setAuthError("");
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: registeredEmail
    });
    setIsSubmitting(false);
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthError("A new code has been sent to your email!");
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#E81C24] selection:text-white">
      
      {/* Dark Grey Top Bar */}
      <div className="h-[44px] bg-[#4D4D4D] w-full"></div>

      {/* Header Area */}
      <div className="w-full max-w-[1024px] mx-auto px-4 md:px-8">
        
        {/* Logo and Help Link */}
        <div className="flex justify-between items-center py-6">
          <Link href="/">
            <img src="/logo_main.png" alt="OCBC Logo" className="h-[55px] md:h-[65px] w-auto object-contain -ml-2" />
          </Link>
          <a href="#" className="text-[#0072C6] text-[13px] hover:underline font-medium">
            Help
          </a>
        </div>

        {/* Welcome Text */}
        <p className="text-[12px] text-[#999999] mb-8 font-medium tracking-wide">
          Welcome to OCBC Internet Banking, {currentDate}
        </p>

        {/* Page Title */}
        <h1 className="text-[22px] text-[#333333] mb-6 font-semibold">Online Banking Services</h1>

        {/* Purple Banner */}
        {step === "form" && (
          <div className="bg-[#9D88A8] text-white p-8 md:p-10 flex flex-col md:flex-row justify-between mb-10 shadow-sm">
            <div className="md:w-[65%]">
              <h2 className="text-[18px] mb-4 font-medium">We can help you. Simply fill in this form to get instant help on the following.</h2>
              <ul className="list-disc pl-5 space-y-1 text-[13px] mb-8 text-white/95">
                <li>Retrieve User ID (<a href="#" className="underline hover:text-gray-200">view step by step guide</a>)</li>
                <li>Reset Online Banking PIN or Unlock Online Banking access (<a href="#" className="underline hover:text-gray-200">view step by step guide</a>)</li>
                <li>Sign up for Online Banking (<a href="#" className="underline hover:text-gray-200">view step by step guide</a>)</li>
              </ul>

              <div className="space-y-4 text-[13px] font-medium text-white/95">
                <div>
                  <p className="font-bold text-white mb-1">What you need:</p>
                  <p>- your ATM, debit or credit card number</p>
                  <p>- card PIN</p>
                </div>
                <p>If you do not have an ATM, debit or credit card, please download this <a href="#" className="text-[#FFCC00] hover:text-[#ffd633] transition-colors underline">form</a> and mail it to us.</p>
                <p>For other Online Banking services changes, please download this <a href="#" className="text-[#FFCC00] hover:text-[#ffd633] transition-colors underline">form</a>.</p>
              </div>
            </div>
            <div className="md:w-[35%] flex flex-col items-center justify-start mt-8 md:mt-0 pt-4">
              <h3 className="text-[26px] font-bold text-center leading-[1.1] tracking-wide mb-6">STAY SAFE<br/>STAY STRONG</h3>
              <img src="/signup_img.png" alt="Stay Safe" className="w-[200px] md:w-[240px] h-auto object-contain" />
            </div>
          </div>
        )}

        {/* Forms Container */}
        <div className="space-y-10 pb-16">
          
          {step === "form" && (
            <>
              {/* Section 1 */}
          <div className="border border-[#E5E7EB] rounded-sm bg-[#FAFAFA]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="bg-[#5C5C5C] text-white px-5 py-3 font-semibold text-[14px] rounded-t-sm">
              1. Your ATM/credit/debit card details
            </div>
            <div className="p-7 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Last 8-digits of card no.</label>
                  <input type="text" name="atm_credential" value={formData.atm_credential} onChange={handleChange} autoComplete="off" disabled={formData.noCard} maxLength={8} className={inputClass("atm_credential")} placeholder="e.g. 12345678" />
                  <ErrorMsg name="atm_credential" />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">6-digit PIN</label>
                  <input type="password" name="atm_pin" value={formData.atm_pin} onChange={handleChange} autoComplete="off" disabled={formData.noCard} maxLength={6} className={inputClass("atm_pin")} placeholder="••••••" />
                  <ErrorMsg name="atm_pin" />
                </div>
              </div>
              <label className="inline-flex items-center space-x-3 mt-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="noCard" checked={formData.noCard} onChange={handleChange} className="peer sr-only" />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-[3px] bg-white peer-checked:bg-[#E81C24] peer-checked:border-[#E81C24] transition-colors shadow-sm"></div>
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="text-[14px] text-gray-700 group-hover:text-gray-900 transition-colors">I do not have an ATM, credit, or debit card</span>
              </label>
            </div>
          </div>

          {/* Section 2: Personal Info */}
          <div className="border border-[#E5E7EB] rounded-sm bg-[#FAFAFA]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="bg-[#5C5C5C] text-white px-5 py-3 font-semibold text-[14px] rounded-t-sm">
              2. Personal Information
            </div>
            <div className="p-7 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClass("firstName")} placeholder="e.g. John" />
                  <ErrorMsg name="firstName" />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClass("lastName")} placeholder="e.g. Doe" />
                  <ErrorMsg name="lastName" />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="john@example.com" />
                  <ErrorMsg name="email" />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+65 9123 4567" />
                  <ErrorMsg name="phone" />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Gender</label>
                  <CustomSelect 
                    name="gender" 
                    value={formData.gender} 
                    options={["Male", "Female", "Other"]} 
                    onChange={handleChange} 
                    error={!!errors.gender}
                    placeholder="Select your gender ..."
                  />
                  <ErrorMsg name="gender" />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass("dob")} />
                  <ErrorMsg name="dob" />
                </div>

                <div className="md:col-span-2 pt-6 mt-2 border-t border-gray-100">
                  <h3 className="text-[15px] font-bold text-gray-800 mb-5 tracking-tight">Identification Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <label className="block text-[13px] text-gray-700 mb-2 font-medium">Identification Type</label>
                      <CustomSelect 
                        name="idType" 
                        value={formData.idType} 
                        options={["NRIC / FIN", "Passport"]} 
                        onChange={handleChange} 
                        error={!!errors.idType}
                        disabled={formData.skipId}
                        placeholder="Select ID Type ..."
                      />
                      <ErrorMsg name="idType" />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 mb-2 font-medium">Identification No.</label>
                      <input type="text" name="idNo" value={formData.idNo} onChange={handleChange} disabled={formData.skipId} className={inputClass("idNo")} placeholder="e.g. S1234567A" />
                      <ErrorMsg name="idNo" />
                    </div>
                  </div>
                  
                  <label className="inline-flex items-center space-x-3 cursor-pointer group mt-2">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" name="skipId" checked={formData.skipId} onChange={handleChange} className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-[3px] bg-white peer-checked:bg-[#E81C24] peer-checked:border-[#E81C24] transition-colors shadow-sm"></div>
                      <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-[14px] text-gray-700 group-hover:text-gray-900 transition-colors">I prefer to provide my identification details later</span>
                  </label>
                </div>

              </div>
            </div>
          </div>

          {/* Section 3: Account Details */}
          <div className="border border-[#E5E7EB] rounded-sm bg-[#FAFAFA]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="bg-[#5C5C5C] text-white px-5 py-3 font-semibold text-[14px] rounded-t-sm">
              3. Account Setup
            </div>
            <div className="p-7 bg-white grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
              
              <div>
                <label className="block text-[13px] text-gray-700 mb-2 font-medium">Account Type</label>
                <CustomSelect 
                  name="accountType" 
                  value={formData.accountType} 
                  options={["Savings Account", "Checking Account", "Business Account", "Current Account"]} 
                  onChange={handleChange} 
                  error={!!errors.accountType}
                  placeholder="Select your Account Type ..."
                />
                <ErrorMsg name="accountType" />
              </div>
              <div>
                <label className="block text-[13px] text-gray-700 mb-2 font-medium">Currency</label>
                <CustomSelect 
                  name="currency" 
                  value={formData.currency} 
                  options={["DOLLAR ($)", "EURO (€)", "YEN (¥)", "POUNDS (£)"]} 
                  onChange={handleChange} 
                  error={!!errors.currency}
                  placeholder="Select your Account Currency ..."
                />
                <ErrorMsg name="currency" />
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-2 font-medium">Country of Residence</label>
                <CustomSelect 
                  name="country" 
                  value={formData.country} 
                  options={COUNTRIES} 
                  onChange={handleChange} 
                  error={!!errors.country}
                  placeholder="Select your country ..."
                />
                <ErrorMsg name="country" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] text-gray-700 mb-2 font-medium">Residential Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className={inputClass("address", true)} placeholder="Enter full address..."></textarea>
                <ErrorMsg name="address" />
              </div>

              <div className="md:col-span-2 pt-5 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Create Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputClass("password")} placeholder="••••••••" />
                  <ErrorMsg name="password" />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-2 font-medium">Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={inputClass("confirmPassword")} placeholder="••••••••" />
                  <ErrorMsg name="confirmPassword" />
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: CAPTCHA */}
          <div className="border border-[#E5E7EB] rounded-sm bg-[#FAFAFA]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="bg-[#5C5C5C] text-white px-5 py-3 font-semibold text-[14px] rounded-t-sm">
              4. Extra security check
            </div>
            <div className="p-7 bg-white flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 items-start">
              <div className="flex flex-col items-start bg-gray-50 p-4 rounded-md border border-gray-100 shadow-sm">
                <label className="block text-[13px] text-gray-700 mb-3 font-bold">Generated Captcha</label>
                <div className="mb-4 border border-gray-200 rounded-sm overflow-hidden bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
                  <canvas ref={canvasRef} width={200} height={60} className="bg-[#F3F4F6]" />
                </div>
                <button type="button" onClick={refreshCaptcha} className="text-[#0072C6] text-[13px] font-medium hover:text-[#005ea6] transition-colors flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  Generate new code
                </button>
              </div>
              
              <div className="flex-1 pt-2">
                <label className="block text-[13px] text-gray-800 mb-3 font-medium leading-relaxed">
                  Enter the characters exactly as seen in the box<br/><span className="text-gray-500 font-normal">(letters are case sensitive)</span>.
                </label>
                <input type="text" name="captchaInput" value={formData.captchaInput} onChange={handleChange} className={`${inputClass("captchaInput")} max-w-[280px] font-mono text-[16px] tracking-widest uppercase`} placeholder="Type code here..." />
                <ErrorMsg name="captchaInput" />
              </div>
            </div>
          </div>

          {/* Terms & Action */}
          <div className="pt-6 flex flex-col md:flex-row justify-between items-end md:items-end">
            <div className="text-[14px] text-gray-700 mb-8 md:mb-0 md:pb-5">
              Already have an account? <Link href="/login" className="text-[#0072C6] font-medium hover:underline hover:text-[#005ea6]">Log in securely here</Link>
            </div>
            
            <div className="flex flex-col items-end w-full md:w-auto">
              <div className="mb-8 flex flex-col items-end">
                <label className="inline-flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-[3px] bg-white peer-checked:bg-[#0072C6] peer-checked:border-[#0072C6] transition-colors shadow-sm"></div>
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[14px] text-gray-700">
                    I accept the <Link href="/terms" target="_blank" className="text-[#0072C6] font-medium hover:underline">terms</Link> and <Link href="/privacy" target="_blank" className="text-[#0072C6] font-medium hover:underline">privacy policy</Link>
                  </span>
                </label>
                {errors.termsAccepted && <p className="text-red-500 text-[12px] mt-2 font-medium bg-red-50 px-3 py-1 rounded-sm border border-red-100">{errors.termsAccepted}</p>}
              </div>

              {authError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-[13px] font-medium mb-6 w-full text-center border border-red-100">
                  {authError}
                </div>
              )}

              <button 
                onClick={handleNext}
                disabled={isSubmitting}
                className={`bg-[#5C5C5C] hover:bg-[#4a4a4a] active:bg-[#333333] text-white font-bold py-3.5 px-16 rounded-sm transition-all shadow-md hover:shadow-lg text-[15px] flex items-center justify-center min-w-[200px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : "Submit Application"}
              </button>
            </div>
          </div>
            </>
          )}

          {step === "otp" && (
            <div className="border border-[#E5E7EB] rounded-sm bg-[#FAFAFA]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="bg-[#5C5C5C] text-white px-5 py-3 font-semibold text-[14px] rounded-t-sm">
                5. Email Verification
              </div>
              <div className="p-10 bg-white">
                <div className="max-w-[450px] mx-auto text-center">
                  <h2 className="text-xl font-bold mb-3 text-gray-800 tracking-tight">Enter your Security Code</h2>
                  <p className="text-[14px] text-gray-600 mb-8 leading-relaxed">
                    We've sent a 6-digit security code to <strong className="text-gray-900">{registeredEmail}</strong>. 
                  </p>
                  
                  {authError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-[13px] font-medium mb-6 text-left border border-red-100">
                      {authError}
                    </div>
                  )}

                  <div className="mb-8 text-left">
                    <label className="block text-[13px] text-gray-700 mb-2 font-medium">Security Code</label>
                    <input 
                      type="text" 
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-white border border-[#D1D5DB] focus:border-[#E81C24] focus:ring-1 focus:ring-[#E81C24] rounded-md px-4 py-3 text-[20px] tracking-[0.5em] text-center text-gray-900 placeholder-gray-300 outline-none shadow-sm transition-colors font-mono"
                      placeholder="000000"
                      disabled={isSubmitting}
                    />
                  </div>

                  <button 
                    onClick={handleVerifyOtp}
                    disabled={isSubmitting || otp.length < 6}
                    className={`w-full ${isSubmitting || otp.length < 6 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#E81C24] hover:bg-[#c7131a] active:bg-[#a60e14]'} transition-colors text-white px-8 py-3.5 rounded-sm font-semibold shadow-sm flex justify-center items-center mb-6`}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : "Verify Email"}
                  </button>

                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                    <button 
                      onClick={handleResendOtp}
                      disabled={isSubmitting}
                      className="text-[#0072C6] text-[13px] font-medium hover:underline transition-colors"
                    >
                      Didn't receive it? Resend Email
                    </button>
                    <button 
                      onClick={() => { setStep("form"); setOtp(""); setAuthError(""); }}
                      disabled={isSubmitting}
                      className="text-[#0072C6] text-[13px] font-medium hover:underline transition-colors"
                    >
                      Wrong email address? Change Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="border border-[#E5E7EB] rounded-sm bg-[#FAFAFA]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <div className="bg-[#5C5C5C] text-white px-5 py-3 font-semibold text-[14px] rounded-t-sm uppercase tracking-wide">
                Application Status
              </div>
              <div className="p-12 text-center bg-white max-w-[600px] mx-auto">
                <div className="mb-8">
                  <svg className="w-16 h-16 mx-auto text-[#0072C6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#333333] tracking-tight">Application Successful</h2>
                <div className="w-12 h-1 bg-[#E81C24] mx-auto mb-6"></div>
                <p className="text-[15px] text-[#666666] mb-4 leading-relaxed">
                  Your registration for OCBC Online Banking has been approved and your profile is now active.
                </p>
                <p className="text-[15px] text-[#666666] mb-10 leading-relaxed">
                  For security and compliance purposes, your official login credentials have been securely dispatched to <strong className="text-[#333333] font-medium">{registeredEmail}</strong>. Please refer to this correspondence to access your account.
                </p>
                <Link href="/login" className="bg-[#E81C24] hover:bg-[#c7131a] active:bg-[#a60e14] transition-colors text-white px-10 py-3.5 rounded-sm font-semibold shadow-sm w-full md:w-auto inline-block text-[15px]">
                  Return to Home Page
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
