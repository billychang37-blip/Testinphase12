"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, Car, GraduationCap, TrendingUp, BarChart4 } from "lucide-react";
import Link from "next/link";

const loans = [
  { name: "Home Loans", icon: Home },
  { name: "Personal Loans", icon: Car },
  { name: "Education", icon: GraduationCap }
];

export default function WealthAndFinancing() {
  return (
    <div className="w-full">
      
      {/* FINANCING SECTION */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-8 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-[2.5rem] lg:text-[3.2rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4"
            >
              Move forward with <span className="text-ocbc-red">confidence.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6 md:mb-12">
            {loans.map((loan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-ocbc-red/20 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-ocbc-red/10 transition-colors">
                  <loan.icon className="w-8 h-8 text-slate-700 group-hover:text-ocbc-red transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{loan.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/loans/calculator" className="inline-flex items-center space-x-2 text-ocbc-red font-bold hover:text-ocbc-red-dark transition-colors group">
              <span>Calculate your options</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* WEALTH SECTION */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        {/* Champagne/Pink Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] via-[#FFF0F0] to-[#FDF4EF] z-0"></div>
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-[#FFE0E0] rounded-full blur-[150px] opacity-60 pointer-events-none z-0" />

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Grow what <br/><span className="text-ocbc-red">you've built.</span>
              </h2>
              <p className="text-[14px] md:text-[17px] text-gray-600 leading-relaxed mb-8 max-w-[450px]">
                Access premium portfolio management, financial insights, and tailored wealth planning solutions designed to secure your financial legacy across generations.
              </p>
              
              <ul className="space-y-4 mb-5 md:mb-10">
                {['Investments', 'Wealth Planning', 'Portfolio Management', 'Financial Insights'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-ocbc-red" />
                    </div>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/wealth" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Explore Wealth Solutions
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Premium Glass Dashboard Mockup */}
              <div className="w-full max-w-lg mx-auto bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] rounded-[32px] p-8 relative">
                
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="text-sm text-gray-500 font-semibold mb-1">Portfolio Performance</div>
                    <div className="text-3xl font-bold text-slate-900">S$ 842,500<span className="text-gray-400 text-xl">.00</span></div>
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-sm">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                {/* Investment Chart visualization */}
                <div className="h-48 w-full relative mb-8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e81c24" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#e81c24" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0,40 C20,35 30,45 50,25 C70,5 80,15 100,0 L100,50 L0,50 Z" 
                      fill="url(#chartGradient)"
                    />
                    <path 
                      d="M0,40 C20,35 30,45 50,25 C70,5 80,15 100,0" 
                      fill="none" 
                      stroke="#e81c24" 
                      strokeWidth="2"
                    />
                    <circle cx="100" cy="0" r="2.5" fill="#e81c24" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-2xl p-4">
                    <div className="text-xs text-gray-500 mb-1">Equities</div>
                    <div className="font-bold text-slate-900">S$ 520,000</div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-4">
                    <div className="text-xs text-gray-500 mb-1">Fixed Income</div>
                    <div className="font-bold text-slate-900">S$ 322,500</div>
                  </div>
                </div>
                
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
