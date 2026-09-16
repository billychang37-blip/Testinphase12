"use client";

import { motion } from "framer-motion";

const trustMetrics = [
  { label: "Total Assets", value: "S$625.1B+" },
  { label: "Branches globally", value: "390+" },
  { label: "Countries & regions", value: "19" },
  { label: "Credit Ratings", value: "Aa1 / AA-" },
  { label: "ASEAN trade covered", value: "90%" },
  { label: "Established", value: "1932" },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-gradient-to-r from-white via-[#EAF7FA]/50 to-[#FFF3EB]/50 py-6 md:py-12 relative z-20 border-b border-gray-100/50">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/60 backdrop-blur-xl border border-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-5 md:py-10 px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 text-center divide-x divide-gray-200/60">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col justify-center px-4">
                <div className="text-[16px] md:text-[22px] lg:text-[26px] font-black text-slate-900 tracking-tight mb-1.5">
                  {metric.value}
                </div>
                <div className="text-[11px] lg:text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
