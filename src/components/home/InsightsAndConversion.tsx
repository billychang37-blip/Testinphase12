"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, AlertTriangle, Lightbulb, MapPin, Search, Smartphone, Phone, AlertCircle } from "lucide-react";
import Link from "next/link";

const insights = [
  { 
    title: "How to build better financial habits", 
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Understanding investing basics", 
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Protecting yourself from digital scams", 
    icon: AlertTriangle,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  }
];

const supportCards = [
  { title: "Help Centre", icon: Search, href: "#", external: false },
  { title: "Contact Us", icon: Phone, href: "#", external: false },
  { title: "Find a Branch", icon: MapPin, href: "https://www.google.com/maps/search/ocbc+bank+location+singapore", external: true },
  { title: "Report Fraud", icon: AlertCircle, href: "https://www.scamadviser.com/", external: true }
];

export default function InsightsAndConversion() {
  return (
    <div className="w-full">
      
      {/* FINANCIAL INSIGHTS */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12"
          >
            <h2 className="text-[1.4rem] md:text-[2rem] lg:text-[2.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
              Insights & Education
            </h2>
            <Link href="/insights" className="mt-4 md:mt-0 flex items-center space-x-2 text-ocbc-red font-bold hover:text-ocbc-red-dark transition-colors group">
              <span>Explore Financial Insights</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="h-48 bg-gray-100 rounded-3xl mb-6 relative overflow-hidden flex items-center justify-center border border-gray-200 group-hover:border-ocbc-red/30 transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = "/happy_family.jpg" }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-ocbc-red transition-colors leading-tight">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CONVERSION SECTION (OPEN ACCOUNT) */}
      <section className="py-8 md:py-16">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full rounded-[40px] bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] p-6 md:p-12 lg:p-20 relative overflow-hidden text-center text-white shadow-2xl"
          >
            {/* Soft background glows */}
            <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-ocbc-red/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-8">
                Open your account in minutes.
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 md:mb-12 text-gray-300 font-semibold">
                <div className="flex items-center"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-2 text-xs">1</span> Apply</div>
                <div className="hidden sm:block w-8 h-[1px] bg-white/20"></div>
                <div className="flex items-center"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-2 text-xs">2</span> Verify</div>
                <div className="hidden sm:block w-8 h-[1px] bg-white/20"></div>
                <div className="flex items-center"><span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-2 text-xs">3</span> Start banking</div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Link href="/register" className="bg-ocbc-red text-white px-5 md:px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_25px_rgba(232,28,36,0.4)] hover:shadow-[0_15px_35px_rgba(232,28,36,0.6)] hover:-translate-y-1 transition-all flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="text-gray-400">
                  Already a customer? <Link href="/login" className="text-white hover:text-ocbc-red transition-colors font-bold underline underline-offset-4">Login</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              We're here when you need us.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {supportCards.map((card, i) => (
              <motion.a 
                key={i}
                href={card.href}
                target={card.external ? "_blank" : "_self"}
                rel={card.external ? "noopener noreferrer" : undefined}
                onClick={!card.external ? (e) => { e.preventDefault(); window.location.reload(); } : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all cursor-pointer flex flex-col items-center text-center group block"
              >
                <card.icon className="w-6 h-6 text-gray-400 group-hover:text-ocbc-red mb-3 transition-colors" />
                <h4 className="text-sm font-bold text-slate-900">{card.title}</h4>
              </motion.a>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
