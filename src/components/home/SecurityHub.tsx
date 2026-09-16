"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, PieChart, ThumbsUp, Headset, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

const securityFeatures = [
  {
    title: "Secure Payments",
    description: "Your financial security is non-negotiable. We employ state-of-the-art security measures to keep your information safe.",
    icon: Lock,
    highlight: false
  },
  {
    title: "Trust and Integrity",
    description: "We operate on a foundation of trust, integrity, and transparency. Your financial well-being is our top priority.",
    icon: PieChart,
    highlight: false
  },
  {
    title: "Transparent Fee Schedules",
    description: "We provide you with transparent fee schedules that clearly outline any charges related to your accounts and services. You'll always know what to expect.",
    icon: ThumbsUp,
    highlight: false
  },
  {
    title: "Explore More Services",
    description: "Access your personal account information with ease, transfer funds securely whenever you want, wherever you want.",
    icon: null, // No icon for the highlighted solid card, matching reference
    highlight: true 
  },
  {
    title: "World Class Support",
    description: "We've assembled a team of experts who are passionate about helping you. Our dedicated support teams are here to provide guidance and assistance every step of the way.",
    icon: Headset,
    highlight: false
  },
  {
    title: "Seamless Integration",
    description: "Our digital banking is versatile and compatible with a wide range of applications and services. From online payments to global transfers, it offers seamless integration, providing one reliable solution for all your needs.",
    icon: ShoppingBag,
    highlight: false
  }
];

export default function SecurityHub() {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* OCBC Custom Background Flow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-bl from-[#FFF3EB] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EAF7FA]/60 rounded-full blur-[120px] opacity-70" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center space-x-2 text-[#475569] font-bold text-[13px] uppercase tracking-widest mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-ocbc-red" />
            <span>Our Security</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[1.4rem] md:text-[2rem] lg:text-[2.6rem] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-5"
          >
            We Prioritize Transaction Security
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[16px] text-gray-500 leading-relaxed max-w-xl mx-auto"
          >
            Your security is our priority. OCBC Digital ensures bank-level security for your peace of mind.
          </motion.p>
        </div>

        {/* Custom Grid Layout - 3 columns exactly matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12">
          {securityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-3xl p-8 transition-all duration-500 group ${
                feature.highlight 
                  ? 'bg-gradient-to-br from-ocbc-red to-[#B31219] shadow-[0_15px_30px_rgba(235,26,40,0.2)] text-white hover:shadow-[0_25px_50px_rgba(235,26,40,0.3)] hover:-translate-y-1 flex flex-col justify-center min-h-[250px]' 
                  : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 mt-6'
              }`}
            >
              {/* 
                Mature, Circular Icons 
                Matching the Ennex exact layout: perfectly round, positioned half-out of the top border.
              */}
              {!feature.highlight && feature.icon && (
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full flex items-center justify-center bg-ocbc-red text-white shadow-[0_10px_25px_rgba(235,26,40,0.3)] transition-transform duration-500 group-hover:scale-105">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
              )}

              <div className={`${!feature.highlight ? 'pt-6' : ''}`}>
                <h3 className={`text-[22px] font-bold mb-4 tracking-tight ${feature.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-[16px] leading-relaxed ${feature.highlight ? 'text-white/90' : 'text-gray-500'}`}>
                  {feature.description}
                </p>
                
                {feature.highlight && (
                  <div className="mt-8">
                    <Link href="/services" className="inline-flex items-center space-x-2 text-white font-bold group/link hover:opacity-80 transition-opacity">
                      <span>View all services</span>
                      <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
