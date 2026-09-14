"use client";

import { motion } from "framer-motion";
import { ChevronRight, Award } from "lucide-react";

export default function AwardsSection() {
  return (
    <section className="py-8 md:py-16 lg:py-20 relative overflow-hidden bg-[#FAFAFA]">
      
      {/* 
        Premium Textured & Gradient Background 
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Fintech Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Primary Color Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-[#FFE5E5] via-[#FFF0F0] to-transparent rounded-full blur-[100px] opacity-100" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] bg-gradient-to-tr from-[#EAF7FA] via-[#F8FAFC] to-transparent rounded-full blur-[120px] opacity-100" />
        
        {/* Glowing Red Accent Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-ocbc-red/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[30%] right-[20%] w-[400px] h-[400px] bg-[#E81C24]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tighter Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-10 lg:gap-12 items-center">
          
          {/* Left Side - Typography & Deposit Insurance */}
          <div className="lg:col-span-5 relative">
            
            {/* The Awards Header */}
            <div className="mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 text-ocbc-red font-bold text-[13px] tracking-[0.2em] uppercase mb-3"
              >
                <Award className="w-4 h-4" />
                <span>Industry Recognition</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[1.4rem] md:text-[2rem] lg:text-[2.6rem] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-4"
              >
                Award-Winning <br/> Excellence
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[16px] text-gray-500 leading-relaxed mb-6 max-w-md"
              >
                Consistently recognized globally for our commitment to digital innovation, customer experience, and retail banking.
              </motion.p>
            </div>

            {/* Deposit Insurance Scheme Section - Tighter styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/60 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 max-w-sm"
            >
              <h3 className="text-[13px] font-bold mb-3 uppercase tracking-widest text-slate-800">
                Deposit Insurance Scheme
              </h3>
              
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-4 max-w-[160px]">
                <img src="/sdic_logo.jpg" alt="SDIC Member" className="w-full h-auto object-contain" />
              </div>

              <a href="#" className="inline-flex items-center text-ocbc-red hover:text-ocbc-red-dark font-semibold text-[14px] group">
                <span className="leading-snug">Consumer guides download</span>
                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1.5 transition-transform" />
              </a>
            </motion.div>

          </div>

          {/* Right Side - The Awards Cards - Compact Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
              
              {/* Award 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 border border-white group relative overflow-hidden h-[180px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>
                <img src="/awards-1.png" alt="Award 1" className="w-auto h-[75px] object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 ease-out" />
              </motion.div>

              {/* Award 2 - Compact stagger */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 border border-white group relative overflow-hidden h-[180px] md:mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>
                <img src="/awards-2.png" alt="Award 2" className="w-auto h-[75px] object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 ease-out" />
              </motion.div>

              {/* Award 3 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 border border-white group relative overflow-hidden h-[180px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>
                <img src="/awards-3.png" alt="Award 3" className="w-auto h-[75px] object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 ease-out" />
              </motion.div>
              
              {/* Decorative CTA Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-ocbc-red to-[#B31219] rounded-2xl p-6 flex flex-col items-center justify-center shadow-[0_8px_25px_rgba(235,26,40,0.25)] hover:shadow-[0_15px_35px_rgba(235,26,40,0.35)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-[180px] md:mt-8 cursor-pointer group"
              >
                <div className="relative z-10 text-center">
                  <Award className="w-8 h-8 text-white/90 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  <h3 className="text-white font-bold text-[16px] tracking-tight mb-1">View All Awards</h3>
                  <p className="text-white/80 text-[12px]">Discover global recognition</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
