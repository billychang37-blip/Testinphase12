"use client";

import { motion } from "framer-motion";

const exchangeFeatures = [
  {
    title: "Real-Time Exchange Rates",
    description: "Our real-time exchange rates are updated continuously, ensuring that you get the most accurate and up-to-date rates when you need them."
  },
  {
    title: "Lowest Transaction Fees",
    description: "We're committed to offering you the lowest fees possible. Say goodbye to hidden charges and unexpected expenses."
  },
  {
    title: "Wide Range of Currencies",
    description: "Whether you're dealing with major currencies or exotic ones, we offer a comprehensive range of currency options, allowing you to exchange money wherever you need it."
  }
];

export default function GlobalExchange() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      
      {/* OCBC Custom Background Flow (Gradients) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-[#FFF3EB] to-transparent rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#EAF7FA]/50 rounded-full blur-[150px] opacity-80" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-8 md:mb-16 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[1.5rem] md:text-[2.2rem] lg:text-[3.2rem] font-bold text-[#1e293b] leading-[1.15] tracking-tight"
          >
            Exchange currency across the globe live with lowest fees
          </motion.h2>
        </div>

        {/* Vertical Timeline - Sleek & Premium */}
        <div className="relative mb-12 md:mb-24 max-w-3xl">
          
          {/* 1px Solid Thin Track perfectly centered through the nodes */}
          {/* The node container is w-8 md:w-12 (48px), so the exact center is 24px. We position the 1px line at left-[23.5px] or left-[23px] for a 2px line */}
          <div className="absolute left-[23px] top-[10px] bottom-[20px] w-[2px] bg-gradient-to-b from-gray-200 via-gray-100 to-transparent z-0"></div>

          <div className="space-y-12 relative z-10">
            {exchangeFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start group"
              >
                {/* Sleek Glowing Nodes replacing plain dots */}
                <div className="shrink-0 w-8 md:w-12 flex justify-center mt-1.5 relative py-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-ocbc-red relative z-10 ring-4 ring-white shadow-[0_0_15px_rgba(235,26,40,0.5)] group-hover:scale-125 transition-transform duration-500"></div>
                </div>
                
                {/* Content */}
                <div className="pt-0.5 pl-6">
                  <h3 className="text-[14px] md:text-[20px] lg:text-[22px] font-bold text-slate-900 mb-2 tracking-tight group-hover:text-ocbc-red transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dotted World Map with Premium Currency Pulses */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto mt-5 md:mt-10"
        >
          {/* Map Image */}
          <img 
            src="/map-1.webp" 
            alt="Global Exchange Network" 
            className="w-full h-auto object-contain opacity-60 mix-blend-multiply"
          />

          {/* Interactive Floating Currency Indicators instead of static flags */}
          {/* USA (USD) */}
          <div className="absolute top-[35%] left-[20%] lg:left-[22%]">
            <div className="relative group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-ocbc-red relative z-10 shadow-[0_0_10px_rgba(235,26,40,0.8)] group-hover:scale-110 transition-transform"></div>
              <span className="animate-ping absolute inset-0 w-full h-full rounded-full bg-ocbc-red opacity-40"></span>
              {/* Glassmorphism Label */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-xl border border-gray-100">
                  USD
                </div>
              </div>
            </div>
          </div>

          {/* UK/Europe (GBP/EUR) */}
          <div className="absolute top-[25%] left-[48%] lg:left-[49%]">
            <div className="relative group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-ocbc-red relative z-10 shadow-[0_0_10px_rgba(235,26,40,0.8)] group-hover:scale-110 transition-transform"></div>
              <span className="animate-ping absolute inset-0 w-full h-full rounded-full bg-ocbc-red opacity-40" style={{ animationDelay: '0.5s' }}></span>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-xl border border-gray-100">
                  GBP / EUR
                </div>
              </div>
            </div>
          </div>

          {/* Singapore/Asia (SGD) */}
          <div className="absolute top-[55%] left-[75%] lg:left-[77%]">
            <div className="relative group cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-ocbc-red relative z-10 shadow-[0_0_10px_rgba(235,26,40,0.8)] group-hover:scale-110 transition-transform"></div>
              <span className="animate-ping absolute inset-0 w-full h-full rounded-full bg-ocbc-red opacity-40" style={{ animationDelay: '1s' }}></span>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-xl border border-gray-100">
                  SGD / HKD
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
