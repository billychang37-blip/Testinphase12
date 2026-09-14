"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";
import Link from "next/link";

const locations = [
  { name: "Singapore", top: "60%", left: "75%", flag: "sg" },
  { name: "Malaysia", top: "55%", left: "73%", flag: "my" },
  { name: "Indonesia", top: "65%", left: "77%", flag: "id" },
  { name: "Greater China", top: "45%", left: "78%", flag: "cn" },
  { name: "London", top: "35%", left: "48%", flag: "gb" },
  { name: "New York", top: "40%", left: "22%", flag: "us" },
  { name: "Sydney", top: "75%", left: "85%", flag: "au" },
  { name: "Toronto", top: "32%", left: "24%", flag: "ca" } // Added Canada from reference
];

export default function GlobalNetwork() {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-[#0F172A] relative overflow-hidden text-white border-t border-white/5">
      
      {/* Background Gradients - Premium Dark Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-ocbc-red/20 via-[#E81C24]/10 to-transparent rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#1E293B]/80 rounded-full blur-[120px]" />
        
        {/* Subtle grid noise for premium texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>
      
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative z-20"
          >
            <div className="inline-flex items-center space-x-2 text-white/70 font-bold text-[13px] tracking-[0.2em] uppercase mb-4">
              <Globe2 className="w-4 h-4 text-ocbc-red" />
              <span>Global Reach</span>
            </div>

            <h2 className="text-[1.4rem] md:text-[2rem] lg:text-[2.8rem] font-bold leading-[1.1] tracking-tight mb-5">
              Asia connected.<br/>
              <span className="text-ocbc-red">The world within reach.</span>
            </h2>
            <p className="text-[16px] text-gray-400 leading-relaxed mb-8 max-w-md">
              With a presence in 19 countries and regions, including deep roots in Singapore, Malaysia, Indonesia, and Greater China, we connect you to opportunities across the globe.
            </p>
            
            <Link href="/network" className="inline-flex items-center justify-center bg-ocbc-red text-white px-7 py-3 rounded-xl font-bold shadow-[0_8px_20px_rgba(235,26,40,0.3)] hover:shadow-[0_15px_30px_rgba(235,26,40,0.4)] hover:-translate-y-1 transition-all group">
              <span>Explore our network</span>
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Dotted Map with Real Country Flags */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative h-[350px] lg:h-[450px]"
          >
            {/* Our beautiful dotted map image instead of the boring wikipedia SVG */}
            <img 
              src="/map-1.webp" 
              alt="Global Network Map" 
              className="absolute inset-0 w-full h-full object-contain opacity-40 mix-blend-screen"
            />
            
            {/* Location Pins with Real Flag Logos */}
            {locations.map((loc, i) => (
              <motion.div 
                key={loc.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="absolute flex flex-col items-center group cursor-pointer"
                style={{ top: loc.top, left: loc.left }}
              >
                <div className="relative">
                  {/* Outer pulse effect */}
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping opacity-50 scale-150"></div>
                  
                  {/* Sleek Circular Flag Container */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-[2px] border-white/20 bg-[#1E293B] relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:scale-110 group-hover:border-ocbc-red transition-all duration-300">
                    <img 
                      src={`https://flagcdn.com/w80/${loc.flag}.png`} 
                      alt={`${loc.name} flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Glassmorphism Label Tooltip */}
                <div className="absolute top-12 lg:top-14 px-3 py-1.5 bg-[#1E293B]/90 backdrop-blur-md rounded-lg border border-white/10 text-[12px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl z-20">
                  {loc.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
