"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, FileText, HeadphonesIcon, Smartphone } from "lucide-react";

const businesses = [
  {
    title: "Secure Payments",
    description: "Your financial security is non-negotiable. We employ state-of-the-art security measures to keep your information safe.",
    icon: ShieldCheck,
    color: "from-blue-500/10 to-transparent text-blue-600",
    link: "#",
    colSpan: "lg:col-span-8",
  },
  {
    title: "Trust and Integrity",
    description: "We operate on a foundation of trust, integrity, and transparency. Your financial well-being is our top priority.",
    icon: Heart,
    color: "from-ocbc-red/10 to-transparent text-ocbc-red",
    link: "#",
    colSpan: "lg:col-span-4",
  },
  {
    title: "Transparent Fees",
    description: "We provide transparent fee schedules that clearly outline any charges related to your accounts and services.",
    icon: FileText,
    color: "from-purple-500/10 to-transparent text-purple-600",
    link: "#",
    colSpan: "lg:col-span-4",
  },
  {
    title: "World Class Support",
    description: "We've assembled a team of experts who are passionate about helping you. Our dedicated support teams are here.",
    icon: HeadphonesIcon,
    color: "from-emerald-500/10 to-transparent text-emerald-600",
    link: "#",
    colSpan: "lg:col-span-4",
  },
  {
    title: "Merchant Account",
    description: "Our Soft Token is versatile and compatible with a wide range of applications and services. From online banking to email accounts.",
    icon: Smartphone,
    color: "from-amber-500/10 to-transparent text-amber-600",
    link: "#",
    colSpan: "lg:col-span-4",
  },
];

export default function CoreBusinesses() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Soft Background Gradients (Matching Hero) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#D8F4F9] rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FFEAD6] rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white text-ocbc-red px-3 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-sm border border-gray-100">
            <span>Our Services</span>
          </div>
          <h2 className="text-[2.5rem] lg:text-[3.2rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
            How Can I <span className="text-ocbc-red">Help You?</span>
          </h2>
          <p className="text-[14px] md:text-[17px] text-gray-500 leading-relaxed">
            At OCBC we're here to help you achieve your financial aspirations. Discover our services and reach out to our dedicated team to get started on your financial journey.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {businesses.map((biz, index) => (
            <motion.div
              key={biz.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${biz.colSpan} md:col-span-1 group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer`}
            >
              {/* Card Hover Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${biz.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <biz.icon className={`w-7 h-7 ${biz.color.split(' ')[1]}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                  {biz.title}
                </h3>
                
                <p className="text-[15px] text-gray-500 leading-relaxed flex-grow">
                  {biz.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
