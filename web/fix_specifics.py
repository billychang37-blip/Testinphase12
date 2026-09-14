import sys
import re

# 1. Navbar
with open('src/components/layout/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove absolute
content = content.replace('className="absolute top-0 z-50 w-full"', 'className="relative z-50 w-full bg-gradient-to-r from-white via-[#EAF7FA] to-[#FFF3EB]"')

# Hide utility strip on mobile
content = content.replace('className="bg-[#111827] text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8 w-full"', 'className="hidden md:block bg-[#111827] text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8 w-full"')

with open('src/components/layout/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Hero
with open('src/components/home/Hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix padding top
content = content.replace('pt-32 lg:pt-48', 'pt-4 md:pt-10 lg:pt-16')

# Remove app store buttons
app_store_html = '''            {/* App Store Buttons - Refined and smaller */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 lg:mb-14">
              <button className="flex items-center justify-center bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl px-5 py-2.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <Play className="w-6 h-6 text-green-500 fill-green-500" />
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-gray-400 font-semibold mb-1 uppercase tracking-wider">Get it on</div>
                    <div className="text-[14px] font-bold leading-none tracking-tight text-gray-900">Google Play</div>
                  </div>
                </div>
              </button>
              <button className="flex items-center justify-center bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-xl px-5 py-2.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <Apple className="w-6 h-6 text-black fill-black" />
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-gray-400 font-semibold mb-1 uppercase tracking-wider">Download on the</div>
                    <div className="text-[14px] font-bold leading-none tracking-tight text-gray-900">App Store</div>
                  </div>
                </div>
              </button>
            </div>'''
content = content.replace(app_store_html, '')

# Make Lady image moderately sized
content = content.replace('h-[45vh] lg:h-[75%]', 'h-[30vh] md:h-[45vh] lg:h-[65%]')
content = content.replace('pb-[45vh]', 'pb-[30vh] md:pb-[45vh]')

# Get started button fix
btn_bad = '''<button className="flex items-center space-x-3 bg-ocbc-red text-white pl-5 pr-1.5 py-2 rounded-full shadow-[0_10px_20px_rgba(232,28,36,0.3)] hover:bg-ocbc-red-dark transition-all transform hover:-translate-y-1">
            <span className="font-semibold text-[14px] lg:text-[15px] pr-2">Get Started</span>
            <span className="bg-white text-ocbc-red rounded-full p-2"><ArrowRight className="w-4 h-4 stroke-[3]"/></span>
          </button>'''
btn_good = '''<Link href="/register" className="flex items-center space-x-3 bg-ocbc-red text-white pl-5 pr-1.5 py-2 rounded-full shadow-[0_10px_20px_rgba(232,28,36,0.3)] hover:bg-ocbc-red-dark transition-all transform hover:-translate-y-1">
            <span className="font-semibold text-[14px] lg:text-[15px] pr-2">Get Started</span>
            <span className="bg-white text-ocbc-red rounded-full p-2"><ArrowRight className="w-4 h-4 stroke-[3]"/></span>
          </Link>'''
content = content.replace(btn_bad, btn_good)

with open('src/components/home/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Hero and Navbar fixed')
