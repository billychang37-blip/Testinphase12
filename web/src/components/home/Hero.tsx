import Link from "next/link";
import { Play, Apple, ArrowRight } from "lucide-react";

export default function Hero() {
  const FourPointStar = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0 C12 9 15 12 24 12 C15 12 12 15 12 24 C12 15 9 12 0 12 C9 12 12 9 12 0 Z" />
    </svg>
  );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-white via-[#EAF7FA] to-[#FFF3EB] pt-24 lg:pt-0 lg:min-h-[850px] xl:min-h-[950px] flex flex-col lg:flex-row lg:items-center border-b border-gray-100">
      
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[35%] left-[25%] w-[900px] h-[900px] bg-[#D8F4F9] rounded-full blur-[140px] opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-[-10%] w-[1200px] h-[1200px] bg-[#FFEAD6] rounded-full blur-[160px] opacity-90 -translate-y-1/2"></div>
        <div className="hidden lg:block absolute right-[5%] top-[35%] w-[350px] h-[350px] opacity-60">
           <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="grid" width="33.33" height="33.33" patternUnits="userSpaceOnUse">
                    <path d="M 33.33 0 L 0 0 0 33.33" fill="none" stroke="#FDBA74" strokeWidth="0.8" />
                 </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
           </svg>
        </div>

        <FourPointStar className="absolute top-[22%] right-[10%] xl:right-[15%] w-10 h-10 text-ocbc-red z-10 opacity-90" />
        <FourPointStar className="absolute top-[48%] xl:top-[46%] left-[45%] xl:left-[42%] w-7 h-7 text-ocbc-red z-10 opacity-90" />
        <FourPointStar className="absolute top-[18%] left-[8%] w-5 h-5 text-ocbc-red z-10 opacity-70" />
        <FourPointStar className="absolute bottom-[10%] left-[55%] w-6 h-6 text-ocbc-red z-10 opacity-60" />
        <FourPointStar className="absolute top-[65%] right-[4%] w-8 h-8 text-ocbc-red z-10 opacity-80" />
      </div>

      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:justify-center lg:mt-[-5%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full relative">
          
          <div className="lg:col-span-6 z-20 pt-4 self-center lg:self-center">
            <div className="inline-flex items-center space-x-2 bg-white text-ocbc-red px-3 py-1.5 rounded-full text-[12px] font-semibold mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-50">
              <FourPointStar className="w-3.5 h-3.5" />
              <span>Your World. Our Expertise.</span>
            </div>
            
            <h1 className="text-[2.4rem] sm:text-[2.8rem] lg:text-[3.5rem] xl:text-[4.2rem] font-bold text-[#1e293b] leading-[1.1] mb-4 lg:mb-6 tracking-tight">
              Modern Banking <br className="hidden sm:block" />
              <span className="text-ocbc-red">Designed for</span> <br />
              the Digital You
            </h1>
            
            <p className="text-[14px] md:text-[17px] lg:text-[18px] text-gray-500 mb-5 md:mb-10 max-w-[500px] leading-relaxed">
              OCBC provides tailor made services to cater for the needs of the diverse segments of the economy. Our unwavering commitment to excellence, innovation, and security sets us apart in the world of banking.
            </p>

            <div className="flex items-center space-x-5">
              <div className="flex -space-x-3">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full border-[2px] border-white bg-gray-200 overflow-hidden relative z-30 shadow-sm">
                   <img src="https://i.pravatar.cc/100?img=11" alt="Customer" className="w-full h-full object-cover"/>
                </div>
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full border-[2px] border-white bg-gray-200 overflow-hidden relative z-20 shadow-sm">
                   <img src="https://i.pravatar.cc/100?img=12" alt="Customer" className="w-full h-full object-cover"/>
                </div>
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full border-[2px] border-white bg-gray-200 overflow-hidden relative z-10 shadow-sm">
                   <img src="https://i.pravatar.cc/100?img=5" alt="Customer" className="w-full h-full object-cover"/>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[16px] md:text-[22px] font-bold text-[#1e293b] leading-none tracking-tight mb-1">2.4M+</div>
                <div className="text-[13px] text-gray-500 font-medium flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-ocbc-red mr-2"></span>
                  Happy customers worldwide
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-6"></div>
        </div>
      </div>

      <div className="relative lg:absolute right-0 bottom-0 w-full lg:w-[50%] h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px] pointer-events-none z-20 flex justify-center lg:justify-end items-end pr-0 lg:pr-12 mt-12 lg:mt-0">
        
        <img 
          src="/woman-on-white-shirt.png"
          alt="Woman holding OCBC cards"
          className="max-h-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)] pointer-events-auto"
        />
        
        <div className="absolute bottom-[8%] right-[5%] md:right-[10%] xl:right-[15%] z-30 pointer-events-auto">
          <Link href="/register" className="flex items-center space-x-3 bg-ocbc-red text-white pl-5 pr-1.5 py-2 rounded-full shadow-[0_10px_20px_rgba(232,28,36,0.3)] hover:bg-ocbc-red-dark transition-all transform hover:-translate-y-1">
            <span className="font-semibold text-[14px] lg:text-[15px] pr-2">Get Started</span>
            <span className="bg-white text-ocbc-red rounded-full p-2"><ArrowRight className="w-4 h-4 stroke-[3]"/></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
