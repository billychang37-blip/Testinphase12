import { ArrowRight, Clock, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

export default function OpenAccount() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-50 to-soft-peach rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center">
          
          {/* Left Image Placeholder */}
          <div className="w-full lg:w-5/12 h-[300px] lg:h-[500px] bg-gray-200 relative overflow-hidden">
            {/* Real image will be placed here - using a beautiful placeholder color/gradient for now */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400">
               <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                  Family Image Placeholder
               </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-7/12 p-5 md:p-10 lg:p-16 relative">
            <div className="absolute top-10 right-10 text-ocbc-red opacity-30">
               <Sparkles className="w-8 h-8" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Open an Account in Minutes</h2>
            <p className="text-gray-600 mb-5 md:mb-10 max-w-lg">
              Enjoy a seamless digital onboarding experience and start banking with OCBC today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5 md:mb-10">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 flex-shrink-0 text-ocbc-red">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Quick & Easy</div>
                  <div className="text-xs text-gray-500">Apply in minutes</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 flex-shrink-0 text-ocbc-red">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Secure</div>
                  <div className="text-xs text-gray-500">100% digital process</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-3 flex-shrink-0 text-ocbc-red">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Instant Access</div>
                  <div className="text-xs text-gray-500">Start banking right away</div>
                </div>
              </div>
            </div>

            <Link href="/register" className="inline-flex items-center space-x-2 bg-ocbc-red text-white px-8 py-3.5 rounded-full font-semibold hover:bg-ocbc-red-dark transition-colors shadow-lg shadow-red-200">
              <span>Open an Account</span>
              <ArrowRight className="w-5 h-5 bg-white text-ocbc-red rounded-full p-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
