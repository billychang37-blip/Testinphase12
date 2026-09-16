"use client";

import { motion } from "framer-motion";
import { Apple, Play, ShieldAlert, Key, CheckCircle, Lock, Flag, Globe, TrendingUp } from "lucide-react";

const scamCards = [
  { title: "Recognise phishing", icon: ShieldAlert, desc: "Learn how to spot fake emails and SMS messages." },
  { title: "Protect your credentials", icon: Key, desc: "Never share your PINs, passwords, or OTPs." },
  { title: "Check approvals", icon: CheckCircle, desc: "Verify transaction details before approving." },
  { title: "Keep devices secure", icon: Lock, desc: "Ensure your phone's OS and apps are updated." },
  { title: "Report activity", icon: Flag, desc: "Instantly report suspicious transactions." }
];

export default function AppDownloadAndSecurity() {
  return (
    <div className="w-full">
      
      {/* APP DOWNLOAD SECTION - Ennex Inspired Clean Layout */}
      <section className="py-12 md:py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden border-t border-gray-100">
        
        {/* Signature OCBC UI Gradients - Sweet Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Top Left - Warm Rose/Red */}
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-red-100/90 via-rose-50/60 to-transparent rounded-full blur-[120px]" />
          
          {/* Bottom Right - Cool Cyan/Sky */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-tl from-cyan-100/80 via-sky-50/50 to-transparent rounded-full blur-[140px]" />
          
          {/* Center Glow - Soft Peach bridging the two */}
          <div className="absolute top-[30%] left-[35%] w-[600px] h-[600px] bg-gradient-to-r from-orange-50/50 to-transparent rounded-full blur-[100px]" />

          {/* Premium Fintech Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-12 items-center">
            
            {/* Left Content - Phone Mockup with subtle premium glow */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative flex justify-center lg:justify-start items-center z-10"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full flex justify-center lg:justify-start relative z-10"
              >
                <img 
                  src="/new mock up.png" 
                  alt="OCBC Mobile App Mockup" 
                  className="w-full max-w-[280px] lg:max-w-[330px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(227,24,55,0.15)] hover:-translate-y-2 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </motion.div>

            {/* Right Content - Refined Ennex Style Typography & Nodes */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-12 flex flex-col justify-center max-w-4xl mx-auto"
            >
              
              {/* Small dot and label */}
              <div className="flex items-center space-x-3 text-ocbc-red font-bold text-[12px] tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-ocbc-red shadow-[0_0_10px_rgba(227,24,55,0.5)]"></span>
                <span>OCBC Digital App</span>
              </div>

              {/* Tightened headline for intentional line breaks */}
              <h2 className="text-[1.5rem] md:text-[2.2rem] lg:text-[2.8rem] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-6 max-w-[480px]">
                Tailored Financial Solutions to Meet Your Needs
              </h2>
              
              <p className="text-[16px] text-gray-500 leading-relaxed mb-6 md:mb-12 max-w-xl">
                Experience seamless, bank-level security right from your pocket. Download the OCBC Digital App to unlock a suite of powerful financial tools. Manage your accounts, execute instant global transfers, and track investments all in one place.
              </p>
              
              {/* Refined Geometric Feature List */}
              <div className="relative border-l-[1.5px] border-gray-200/80 ml-6 space-y-10 pb-6">
                
                {/* Node 1 */}
                <div className="relative pl-6 md:pl-12 group">
                  <div className="absolute -left-[24px] top-0 w-8 md:w-12 h-8 md:h-12 bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.04)] rounded-[14px] flex items-center justify-center group-hover:border-ocbc-red/30 group-hover:shadow-[0_8px_25px_rgba(227,24,55,0.1)] transition-all duration-300">
                    <Globe className="w-5 h-5 text-ocbc-red group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                  </div>
                  <h3 className="text-[14px] md:text-[19px] font-bold text-slate-800 mb-1.5 tracking-tight">Seamless Global Transfers</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed max-w-[420px]">
                    Send money across borders instantly. Our robust network ensures your funds arrive safely, with complete transparency on exchange rates.
                  </p>
                </div>

                {/* Node 2 */}
                <div className="relative pl-6 md:pl-12 group">
                  <div className="absolute -left-[24px] top-0 w-8 md:w-12 h-8 md:h-12 bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.04)] rounded-[14px] flex items-center justify-center group-hover:border-ocbc-red/30 group-hover:shadow-[0_8px_25px_rgba(227,24,55,0.1)] transition-all duration-300">
                    <TrendingUp className="w-5 h-5 text-ocbc-red group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                  </div>
                  <h3 className="text-[14px] md:text-[19px] font-bold text-slate-800 mb-1.5 tracking-tight">Comprehensive Wealth Management</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed max-w-[420px]">
                    Track your portfolios, explore new investment opportunities, and manage your assets securely from anywhere in the world.
                  </p>
                </div>

              </div>

              {/* Prominent Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 ml-6">
                <button className="flex items-center justify-center bg-ocbc-red text-white rounded-xl px-6 py-4 shadow-[0_15px_30px_rgba(227,24,55,0.25)] hover:shadow-[0_20px_40px_rgba(227,24,55,0.35)] hover:bg-[#B31219] hover:-translate-y-1 transition-all w-[190px] group">
                  <div className="flex items-center space-x-3">
                    <Apple className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] leading-none text-white/80 font-bold mb-1 uppercase tracking-widest">Download on</div>
                      <div className="text-[15px] font-bold leading-none tracking-tight">App Store</div>
                    </div>
                  </div>
                </button>
                
                <button className="flex items-center justify-center bg-[#0F172A] text-white rounded-xl px-6 py-4 shadow-[0_15px_30px_rgba(15,23,42,0.15)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.25)] hover:-translate-y-1 transition-all w-[190px] group">
                  <div className="flex items-center space-x-3">
                    <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-[10px] leading-none text-white/80 font-bold mb-1 uppercase tracking-widest">Get it on</div>
                      <div className="text-[15px] font-bold leading-none tracking-tight">Google Play</div>
                    </div>
                  </div>
                </button>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ANTI-SCAM EDUCATION SECTION */}
      <section className="py-8 md:py-16 bg-[#FAFAFA] border-t border-gray-100 relative z-20">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 md:mb-10 text-center lg:text-left"
          >
            <h2 className="text-[1.8rem] lg:text-[2.2rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
              Stay one step <span className="text-ocbc-red">ahead of scams.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {scamCards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-ocbc-red/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-8 md:w-12 h-8 md:h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-5 h-5 text-ocbc-red" strokeWidth={2} />
                </div>
                <h4 className="text-[15px] font-bold text-slate-900 mb-2">{card.title}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
