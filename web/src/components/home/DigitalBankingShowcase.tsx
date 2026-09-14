"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const timelineFeatures = [
  {
    title: "Complete Visibility",
    description: "See your entire financial life—from savings to global investments—in one unified dashboard."
  },
  {
    title: "Instant Payments",
    description: "Send money globally or locally with just a few taps. Fast, seamless, and secure."
  },
  {
    title: "Wealth Growth",
    description: "Track and manage your investments in real-time, right from your pocket."
  },
  {
    title: "Smart Financial Planning",
    description: "Access modern tools and resources for managing your finances, from budgeting apps to financial goal trackers. Plan for your future with confidence."
  }
];

// Super smooth, staggered animation presets for high-end feel
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function DigitalBankingShowcase() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[800px] h-[800px] bg-[#EAF7FA] rounded-full blur-[150px] opacity-70"></div>
        <div className="absolute top-[20%] right-[-5%] w-[1000px] h-[1000px] bg-[#FFEAD6] rounded-full blur-[160px] opacity-60"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-center">
          
          {/* 
            LEFT COLUMN - THE ENNEX 3D PHONE 
            Using CSS 3D transforms to simulate an isometric render from a flat image.
          */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-center lg:justify-end items-center lg:h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[320px] lg:max-w-[380px]"
              style={{ perspective: "1200px" }}
            >
              {/* CSS 3D Transform Wrapper to match Ennex Angle */}
              <div 
                className="relative z-10 origin-center"
                style={{ 
                  transform: "rotateY(15deg) rotateX(5deg) rotateZ(-2deg)", 
                  transformStyle: "preserve-3d" 
                }}
              >
                <img 
                  src="/phone mock up.png" 
                  alt="OCBC Digital App" 
                  className="w-full h-auto object-contain drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Ennex-style realistic base shadow */}
              <div className="absolute -bottom-6 left-[10%] w-[80%] h-8 bg-black/10 rounded-[100%] blur-[12px] z-0 transform rotate-[-5deg]"></div>
              <div className="absolute -bottom-2 left-[20%] w-[60%] h-4 bg-black/20 rounded-[100%] blur-[4px] z-0 transform rotate-[-5deg]"></div>
            </motion.div>
          </div>

          {/* 
            RIGHT COLUMN - ENNEX-STYLE DASHED TIMELINE 
          */}
          <div className="lg:col-span-7 relative lg:pl-10">
            
            {/* Introductory Text Block matching Ennex */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 md:mb-14"
            >
              <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-6">
                Meet Your Needs
              </h2>
              <p className="text-[14px] md:text-[17px] text-gray-500 leading-relaxed max-w-2xl">
                The services provided by OCBC Digital allows payments to be made through the internet seamlessly and securely. Your account can be funded instantly, and recipients can receive transfers in real-time. Manage your wealth, track spending, and control your entire financial life from one secure app.
              </p>
            </motion.div>

            {/* The Timeline Layout */}
            <div className="relative pl-6 lg:pl-8">
              
              {/* The prominent Ennex-style Dashed Line perfectly centered through the dots */}
              <div className="absolute left-[47px] lg:left-[55px] top-[30px] bottom-[30px] w-[2px] border-l-[2.5px] border-dashed border-ocbc-red/40 z-0"></div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-15%" }}
                className="space-y-12 relative z-10"
              >
                {timelineFeatures.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start"
                  >
                    {/* Ennex-style Solid Dots */}
                    <div className="shrink-0 w-8 md:w-12 flex justify-center mt-1.5 relative py-1">
                      <div className="w-4 h-4 rounded-full bg-ocbc-red relative z-10 ring-4 ring-[#FFF9F5] lg:ring-white"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="pt-0.5 pl-3">
                      <h3 className="text-[16px] md:text-[22px] font-bold text-slate-900 mb-2 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-[16px] text-gray-500 leading-relaxed max-w-lg">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
