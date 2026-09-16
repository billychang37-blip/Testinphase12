import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BottomCTA() {
  return (
    <section className="pb-12 md:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-ocbc-red to-[#FF4D4D] rounded-3xl p-5 md:p-10 lg:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
          
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Experience Better Banking?</h2>
            <p className="text-red-100 text-lg max-w-xl">
              Join millions of customers who trust OCBC for their banking needs.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link href="/register" className="inline-flex items-center space-x-2 bg-white text-ocbc-red px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
