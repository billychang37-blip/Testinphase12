import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AppShowcase() {
  const features = [
    "Check balances and transactions",
    "Transfer money instantly",
    "Pay bills and manage payments",
    "Lock/unlock your cards",
    "Track your spending insights"
  ];

  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Content */}
            <div className="p-6 md:p-12 md:p-20 flex flex-col justify-center relative">
              <div className="absolute top-10 right-10 text-ocbc-red opacity-30">
                <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-2xl md:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Banking <br />
                that <span className="text-ocbc-red">Moves</span> <br />
                with You
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                From everyday needs to life&apos;s big goals, our mobile app puts the power in your hands. Simple, intuitive and secure.
              </p>
              
              <ul className="space-y-4 mb-5 md:mb-10">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-ocbc-red mr-3 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <Link href="/app" className="inline-flex items-center space-x-2 bg-ocbc-red text-white px-6 py-3 rounded-full font-semibold hover:bg-ocbc-red-dark transition-colors">
                  <span>Explore the App</span>
                  <ArrowRight className="w-5 h-5 bg-white text-ocbc-red rounded-full p-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Mockup Area */}
            <div className="bg-gradient-to-tr from-soft-peach to-white p-6 md:p-12 relative min-h-[500px] flex items-center justify-center">
               {/* Abstract placeholder for the phones since we don't have the specific app mockup image */}
               <div className="relative w-full max-w-sm aspect-[1/2] bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-900 overflow-hidden z-10 transform -rotate-6 translate-x-10">
                  {/* Phone Screen Mock */}
                  <div className="w-full h-full bg-gray-50 flex flex-col">
                     <div className="h-40 bg-ocbc-red rounded-b-[40px] p-6 text-white">
                        <div className="text-sm opacity-80">Total Balance</div>
                        <div className="text-2xl font-bold">$ 12,580.75</div>
                     </div>
                     <div className="flex-1 p-6 flex flex-col gap-4">
                        <div className="h-20 bg-white rounded-2xl shadow-sm"></div>
                        <div className="h-20 bg-white rounded-2xl shadow-sm"></div>
                        <div className="h-20 bg-white rounded-2xl shadow-sm"></div>
                     </div>
                  </div>
               </div>
               
               <div className="absolute w-full max-w-sm aspect-[1/2] bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-900 overflow-hidden transform rotate-6 -translate-x-10 -translate-y-10 scale-90 opacity-90">
                 {/* Second Phone Screen Mock */}
                 <div className="w-full h-full bg-ocbc-red/10 flex items-center justify-center">
                    <div className="text-ocbc-red font-bold text-3xl">OCBC</div>
                 </div>
               </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
