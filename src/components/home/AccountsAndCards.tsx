"use client";

import { motion } from "framer-motion";
import { PiggyBank, CreditCard, Building2, Wallet, ArrowRight } from "lucide-react";

const accountTypes = [
  {
    title: "Savings Account",
    description: "Build your wealth steadily with highly competitive interest rates and intelligent saving goals.",
    icon: PiggyBank
  },
  {
    title: "Checking Account",
    description: "Experience seamless daily transactions with zero hidden fees and instant global transfers.",
    icon: CreditCard
  },
  {
    title: "Business Account",
    description: "Scale your enterprise effortlessly with powerful financial tools and dedicated corporate support.",
    icon: Building2
  },
  {
    title: "Current Account",
    description: "Maintain absolute flexibility over your cash flow with premium overdraft facilities.",
    icon: Wallet
  }
];

export default function AccountsAndCards() {
  return (
    <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      
      {/* OCBC Primary Brand Gradients (Soft, Sweeping, Premium) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FFF3EB] to-transparent rounded-full blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#EAF7FA]/60 rounded-full blur-[120px] opacity-80" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - "Why Choose Us" */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.5rem] lg:text-[3.2rem] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-6"
          >
            Why Choose OCBC Digital?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[14px] md:text-[17px] text-gray-500 leading-relaxed"
          >
            Whether you are managing personal wealth or scaling a global enterprise, we offer tailored accounts designed specifically for your financial journey.
          </motion.p>
        </div>

        {/* 4-Column Grid for the Account Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {accountTypes.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 border border-gray-50 cursor-pointer overflow-hidden flex flex-col h-full"
            >
              {/* Premium Hover Gradient Sweep */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFF3EB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              {/* Icon Container - OCBC Red */}
              <div className="w-16 h-16 rounded-full bg-[#FFF5F5] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-ocbc-red transition-all duration-500 relative z-10">
                <account.icon className="w-7 h-7 text-ocbc-red group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-[16px] md:text-[22px] font-bold text-slate-900 mb-4 tracking-tight group-hover:text-ocbc-red transition-colors duration-300">
                  {account.title}
                </h3>
                <p className="text-[15px] text-gray-500 leading-relaxed mb-8 flex-1">
                  {account.description}
                </p>

                {/* Subtle Learn More arrow that appears on hover */}
                <div className="flex items-center space-x-2 text-ocbc-red font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
