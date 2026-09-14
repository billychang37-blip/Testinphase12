"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "JohnGang100",
    text: "Although it is my first time to use OCBC as my main payment method, its friendliness and ease of use are very good. The quick payment return allows us to develop our business faster.",
  },
  {
    name: "Thomas Conyngham",
    text: "A brilliantly brilliant company, run efficiently and well. They support me and I feel very privileged and proud to be part of their team… thank you OCBC.",
  },
  {
    name: "Reta",
    text: "So far my journey has been great with OCBC, and also that quick response and customer relation is top-notch.",
  },
  {
    name: "Prolificdannygmail.com",
    text: "The OCBC support team is the best I know because of their correspondence, even though my issue has not been resolved yet they gave me a guide on how to resolve it.",
  }
];

export default function Leadership() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Gradients (Matching Hero) */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#EAF7FA] rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-white text-ocbc-red px-3 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-sm border border-gray-100">
              <span>Testimonials</span>
            </div>
            <h2 className="text-[2.5rem] lg:text-[3.2rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-4">
              What Our <span className="text-ocbc-red">Clients Said</span>
            </h2>
            <p className="text-[14px] md:text-[17px] text-gray-500 leading-relaxed">
              More Than 10M+ Happy Customers Trust Our Services. We believe that everyone can achieve financial wellness through education and smart financial choices.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-0 flex items-center space-x-2 text-ocbc-red font-bold hover:text-ocbc-red-dark transition-colors group"
          >
            <span>Read All Success Stories</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-ocbc-red/20 mb-6" />
              <p className="text-[15px] text-gray-600 leading-relaxed mb-8 flex-grow">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="font-bold text-slate-600 text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-slate-900">
                  {testimonial.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
