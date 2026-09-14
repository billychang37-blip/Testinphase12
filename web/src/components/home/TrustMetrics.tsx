"use client";

import { motion } from "framer-motion";
import { Globe, Users, ShieldCheck, Heart, Lightbulb, UserCheck } from "lucide-react";

const metrics = [
  {
    label: "Countries",
    value: "103+",
    icon: Globe,
    delay: 0.1,
  },
  {
    label: "Total Active User",
    value: "15M+",
    icon: Users,
    delay: 0.2,
  },
  {
    label: "Guarantee",
    value: "100%",
    icon: ShieldCheck,
    delay: 0.3,
  },
];

const features = [
  {
    title: "Customer-Centric Approach",
    description: "We believe that our success is measured by your satisfaction. Everything we do is centered around you.",
    icon: UserCheck
  },
  {
    title: "Innovation",
    description: "We stay at the forefront of banking technology to bring you the latest and most efficient financial tools.",
    icon: Lightbulb
  },
  {
    title: "Community Engagement",
    description: "OCBC is proud to actively support the communities we serve, contributing to their growth and development.",
    icon: Heart
  }
];

export default function TrustMetrics() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Light Background Gradients (Matching Hero) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EAF7FA] rounded-full blur-[150px] opacity-70 pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute -left-40 -bottom-40 w-[600px] h-[600px] bg-[#FFEAD6] rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Massive Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center space-x-2 bg-white text-ocbc-red px-3 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-sm border border-gray-100">
              <ShieldCheck className="w-3.5 h-3.5 text-ocbc-red" />
              <span>About Company</span>
            </div>
            <h2 className="text-[2.5rem] lg:text-[3.2rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
              A Little <span className="text-ocbc-red">About Us</span>
            </h2>
            <p className="text-[14px] md:text-[17px] text-gray-500 leading-relaxed mb-5 md:mb-10">
              At OCBC, we understand that financial success begins with trust. As your dedicated banking partner, we are committed to providing you with tailored financial solutions that empower your future. Our unwavering commitment to excellence, innovation, and security sets us apart in the world of banking.
            </p>

            <button className="flex items-center space-x-3 bg-slate-900 text-white pl-6 pr-2 py-2.5 rounded-full hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg">
              <span className="font-bold text-[15px] pr-2">Join Now & Get Benefits</span>
              <span className="bg-white/20 text-white rounded-full p-2">
                <Globe className="w-4 h-4" />
              </span>
            </button>
          </motion.div>

          {/* Right Side: Metrics and Features List */}
          <div className="lg:col-span-7">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {metrics.map((metric) => (
                <motion.div 
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: metric.delay }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                >
                  <metric.icon className="w-8 h-8 text-ocbc-red mb-4" />
                  <div className="text-3xl font-black text-slate-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-500 font-semibold">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
            >
              <div className="space-y-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-ocbc-red" />
                    </div>
                    <div>
                      <h3 className="text-[14px] md:text-[17px] font-bold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
