"use client";

import { motion } from "framer-motion";
import { ArrowRight, PieChart, TrendingUp, PiggyBank, CreditCard } from "lucide-react";
import Link from "next/link";

export default function FinancialManagement() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white text-ocbc-red px-3 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-sm border border-gray-100">
              <PieChart className="w-3.5 h-3.5" />
              <span>Personal Financial Management</span>
            </div>
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
              See your complete <br/><span className="text-ocbc-red">financial picture.</span>
            </h2>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 lg:p-12"
        >
          {/* Dashboard Header */}
          <div className="flex justify-between items-end mb-6 md:mb-12 border-b border-gray-100 pb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Total Net Worth</h3>
              <div className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                S$ 428,620<span className="text-gray-400 text-2xl lg:text-3xl">.00</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold">
              <TrendingUp className="w-5 h-5" />
              <span>+12.4% this year</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5 md:mb-10">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-700">Investments</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">S$ 128,400</div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-700">Savings</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">S$ 82,500</div>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="font-bold text-slate-700">Spending (Month)</div>
              </div>
              <div className="text-2xl font-bold text-slate-900">S$ 4,280</div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/financial-management" className="inline-flex items-center space-x-2 text-ocbc-red font-bold hover:text-ocbc-red-dark transition-colors group">
              <span>Explore Financial Planning Tools</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
