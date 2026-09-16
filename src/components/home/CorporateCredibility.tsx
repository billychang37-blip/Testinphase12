"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, ShieldCheck, LineChart, Globe } from "lucide-react";
import Link from "next/link";

const ecosystem = [
  { 
    name: "Private Wealth Advisory", 
    icon: LineChart,
    desc: "Bespoke wealth management and investment strategies tailored for high-net-worth individuals."
  },
  { 
    name: "Bespoke Insurance", 
    icon: ShieldCheck,
    desc: "Comprehensive protection plans to secure your family's legacy and intergenerational wealth."
  },
  { 
    name: "Global Enterprise", 
    icon: Globe,
    desc: "Scalable corporate banking solutions designed for multinational operations and trade."
  },
  { 
    name: "Institutional Assets", 
    icon: Briefcase,
    desc: "Rigorous asset management and portfolio diversification for institutional investors."
  },
];

export default function CorporateCredibility() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden border-t border-gray-100">
      
      {/* 
        OCBC UI GRADIENTS 
        The signature sleek Peach and Cyan washes with the premium fintech grid.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-gradient-to-br from-[#FFE5E5] via-[#FFF0F0]/80 to-transparent rounded-full blur-[100px] opacity-100" />
        <div className="absolute bottom-[-10%] right-[20%] w-[900px] h-[900px] bg-gradient-to-tl from-[#EAF7FA] via-[#E2F2F5]/80 to-transparent rounded-full blur-[100px] opacity-100" />
        
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Typography - Pure, mature, and image-free */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-3 text-ocbc-red font-bold text-[13px] tracking-[0.25em] uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-ocbc-red shadow-[0_0_10px_rgba(227,24,55,0.5)]"></span>
            <span>Our Ecosystem</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-8"
          >
            More than banking.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 font-medium">A partner for generations.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[14px] md:text-[17px] text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            We do more than safeguard your capital. From structuring private wealth to scaling your enterprise globally, our institutional ecosystem is built to secure your legacy with uncompromising excellence.
          </motion.p>
        </div>

        {/* 
          Premium 4-Column Glassmorphism Grid 
          Relying entirely on sleek UI and typography rather than photography.
        */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-8 md:mb-16"
        >
          {ecosystem.map((item, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-2xl border border-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] rounded-[32px] p-8 flex flex-col items-start group hover:-translate-y-2 transition-all duration-500">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 mb-8 group-hover:bg-ocbc-red group-hover:border-ocbc-red transition-colors duration-500 shadow-sm">
                <item.icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-[14px] md:text-[18px] font-bold text-slate-800 leading-snug mb-3 tracking-tight">{item.name}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href="/about" className="inline-flex items-center justify-center space-x-2 text-ocbc-red font-bold hover:text-[#B31219] transition-colors group text-[16px]">
            <span>Discover OCBC Group</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
