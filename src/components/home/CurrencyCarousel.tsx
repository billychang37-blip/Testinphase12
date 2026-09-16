"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const currencies = [
  { country: "United States", code: "USD", symbol: "$" },
  { country: "United Kingdom", code: "Pound Sterling", symbol: "£" },
  { country: "European Union", code: "Euro", symbol: "€" },
  { country: "Japan", code: "Yen", symbol: "¥" },
  { country: "China", code: "Renminbi", symbol: "¥" },
  { country: "Singapore", code: "SGD", symbol: "$" },
  { country: "Hong Kong", code: "HKD", symbol: "$" },
  { country: "Canada", code: "CAD", symbol: "$" },
  { country: "Australia", code: "AUD", symbol: "$" },
  { country: "New Zealand", code: "NZD", symbol: "$" },
];

// Double array for seamless infinite scrolling
const duplicatedCurrencies = [...currencies, ...currencies];

export default function CurrencyCarousel() {
  return (
    <section className="py-6 md:py-12 relative overflow-hidden bg-[#FAFAFA]">
      
      {/* 
        Subtle Chinese Flag Watermark Background 
        As requested: A massive, extremely faint watermark of the 5 stars from the Chinese flag.
        This provides a highly bespoke, culturally relevant background without being overly obvious.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.08]">
        <div className="relative w-full max-w-[800px] aspect-video">
          {/* Large Star */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="absolute top-[20%] left-[10%] w-[400px] h-[400px] text-ocbc-red transform -rotate-12">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          
          {/* 4 Small Stars in an arc */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="absolute top-[10%] left-[60%] w-[120px] h-[120px] text-ocbc-red transform rotate-12">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="absolute top-[35%] left-[70%] w-[120px] h-[120px] text-ocbc-red transform rotate-45">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="absolute top-[65%] left-[65%] w-[120px] h-[120px] text-ocbc-red transform -rotate-12">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="absolute top-[85%] left-[45%] w-[120px] h-[120px] text-ocbc-red transform rotate-12">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
        
        {/* Typography Structure mimicking VaultExPay exactly */}
        <div className="text-center flex flex-col items-center">
          
          <div className="flex items-center space-x-2 text-[#0A2540] font-bold text-sm tracking-widest uppercase mb-3">
            <Star className="w-4 h-4 fill-current" />
            <span>Currencies</span>
            <Star className="w-4 h-4 fill-current" />
          </div>

          <h2 className="text-[1.4rem] md:text-[2rem] lg:text-[2.6rem] font-extrabold text-[#0A2540] tracking-tight mb-5">
            Ability To Transfer Money
          </h2>

          {/* Centered thin divider detail */}
          <div className="flex items-center space-x-2">
            <div className="w-8 md:w-12 h-1 bg-[#0A2540]"></div>
            <div className="w-1.5 h-1 bg-gray-300"></div>
            <div className="w-8 h-1 bg-gray-300"></div>
          </div>

        </div>
      </div>

      {/* The Currency Carousel */}
      <div className="relative w-full z-10">
        
        {/* Edge Gradient Masks for a premium fade-in/fade-out */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none"></div>

        <div className="flex overflow-hidden py-4">
          <motion.div 
            className="flex space-x-8 items-center whitespace-nowrap min-w-full px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 35 // Smooth, continuous pan
            }}
          >
            {duplicatedCurrencies.map((currency, idx) => (
              <div 
                key={idx} 
                className="flex-none bg-white rounded-xl px-6 md:px-12 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col items-center justify-center min-w-[220px]"
              >
                <span className="text-[14px] md:text-[17px] font-bold text-[#0A2540] mb-1">{currency.country}</span>
                <span className="text-[15px] text-[#4F6C91]">{currency.code} ({currency.symbol})</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>

    </section>
  );
}
