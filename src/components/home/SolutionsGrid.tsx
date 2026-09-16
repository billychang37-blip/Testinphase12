import { CreditCard, Banknote, TrendingUp, Shield, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SolutionsGrid() {
  const solutions = [
    {
      icon: <CreditCard className="w-8 h-8 text-ocbc-red" />,
      title: "Everyday Banking",
      desc: "Accounts, cards and services that make everyday banking easier than ever.",
    },
    {
      icon: <Banknote className="w-8 h-8 text-ocbc-red" />,
      title: "Borrow",
      desc: "Personal loans, home loans and more to help you achieve your goals.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-ocbc-red" />,
      title: "Wealth Management",
      desc: "Grow and protect your wealth with our expert advisory solutions.",
    },
    {
      icon: <Shield className="w-8 h-8 text-ocbc-red" />,
      title: "Insurance",
      desc: "Protect what matters most with a wide range of insurance solutions.",
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solutions for Every Need</h2>
          <p className="text-gray-600">Discover tailored banking solutions that help you save, spend, borrow and grow.</p>
        </div>

        <div className="relative">
          {/* Optional Carousel Arrows */}
          <button className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 w-8 md:w-12 h-8 md:h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100 z-10 hover:text-ocbc-red">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-8 flex-1">{item.desc}</p>
                <div className="flex items-center text-ocbc-red font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            ))}
          </div>

          <button className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-8 md:w-12 h-8 md:h-12 bg-white rounded-full items-center justify-center shadow-md border border-gray-100 z-10 hover:text-ocbc-red">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
