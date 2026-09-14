"use client";

import { motion } from "framer-motion";
import { User, Briefcase, TrendingUp, Gem, Landmark, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    title: "Personal Banking",
    description: "Everyday accounts, payments and cards.",
    icon: User,
    link: "/personal"
  },
  {
    title: "Business Banking",
    description: "Accounts, payments and business financial services.",
    icon: Briefcase,
    link: "/business"
  },
  {
    title: "Wealth Management",
    description: "Investing, portfolio management and advisory.",
    icon: TrendingUp,
    link: "/wealth"
  },
  {
    title: "Private Banking",
    description: "Tailored wealth solutions for high-net-worth individuals.",
    icon: Gem,
    link: "/private"
  },
  {
    title: "Investment Banking",
    description: "Capital markets and corporate finance.",
    icon: Landmark,
    link: "/investment"
  },
  {
    title: "Insurance",
    description: "Protection for people, assets and businesses.",
    icon: ShieldCheck,
    link: "/insurance"
  }
];

export default function ProductCategories() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-[2.5rem] lg:text-[3.2rem] font-bold text-slate-900 leading-[1.1] tracking-tight"
          >
            Banking that fits <span className="text-ocbc-red">your world.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={product.link} className="block group bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-ocbc-red/10 transition-colors duration-300">
                  <product.icon className="w-7 h-7 text-slate-900 group-hover:text-ocbc-red transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-ocbc-red transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-[15px] text-gray-500 leading-relaxed flex-grow">
                  {product.description}
                </p>

                <div className="mt-8 flex items-center space-x-2 text-sm font-bold text-slate-900 group-hover:text-ocbc-red transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
