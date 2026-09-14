import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B101E] text-white pt-20 pb-12 border-t-[4px] border-ocbc-red relative overflow-hidden">
      
      {/* Subtle Background Glow for Sleekness */}
      <div className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-ocbc-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section - Brand & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo_main.png"
                alt="OCBC Logo"
                className="h-14 w-auto brightness-0 invert opacity-100"
              />
            </Link>
            <p className="text-[15px] text-gray-400 mb-8 leading-relaxed max-w-sm">
              Banking for now, and beyond. Providing comprehensive financial solutions across Asia and the world with uncompromising security and excellence.
            </p>
          </div>

          {/* Streamlined Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-6 text-[13px] tracking-[0.15em] uppercase">Explore</h4>
              <ul className="space-y-4">
                {['Bank Accounts', 'Credit Cards', 'Wealth Advisory', 'Digital Banking'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-ocbc-red transition-colors text-[14px] font-medium">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-[13px] tracking-[0.15em] uppercase">Corporate</h4>
              <ul className="space-y-4">
                {['About Us', 'Leadership', 'Investor Relations', 'Sustainability'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-ocbc-red transition-colors text-[14px] font-medium">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-[13px] tracking-[0.15em] uppercase">Support</h4>
              <ul className="space-y-4">
                {['Help Centre', 'Contact Us', 'Find a Branch', 'Security Alerts'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-ocbc-red transition-colors text-[14px] font-medium">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-[13px] tracking-[0.15em] uppercase">Protect</h4>
              <ul className="space-y-4">
                {['Report Fraud', 'Scam Advisories', 'Lost/Stolen Cards', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-ocbc-red transition-colors text-[14px] font-medium">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Thick Divider */}
        <div className="h-[1px] w-full bg-white/10 mb-8"></div>

        {/* Disclaimers & Legal Block */}
        <div className="flex flex-col space-y-6">
          
          <div className="text-[11px] leading-[1.8] text-gray-500 text-justify">
            <strong className="text-gray-400 block mb-2 uppercase tracking-wider">Deposit Insurance Scheme (SDIC)</strong>
            Singapore Dollar deposits of non-bank depositors and monies and deposits denominated in Singapore Dollars under the Supplementary Retirement Scheme are insured by the Singapore Deposit Insurance Corporation, for up to S$100,000 in aggregate per depositor per Scheme member by law. Monies and deposits denominated in Singapore Dollars under the CPF Investment Scheme and CPF Retirement Sum Scheme are aggregated and separately insured up to S$100,000 for each depositor per Scheme member. Foreign currency deposits, dual currency investments, structured deposits and other investment products are not insured.
          </div>

          <div className="text-[11px] leading-[1.8] text-gray-500 text-justify">
            <strong className="text-gray-400 block mb-2 uppercase tracking-wider">Regulatory Disclaimer & Non-Solicitation</strong>
            This website is not intended for distribution to, or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary to local law or regulation. The information herein does not constitute investment advice, an offer, or a solicitation to buy or sell any financial instruments. Ennex/OCBC strictly advises against engaging with unsolicited third-party brokers or agents claiming to represent the bank. Report any suspicious activities to our official fraud reporting channels immediately.
          </div>

          {/* Copyright & Quick Links */}
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-[12px]">
              &copy; {new Date().getFullYear()} Oversea-Chinese Banking Corporation Limited. All rights reserved. Co. Reg. No.: 193200032W
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {['Legal Information', 'Privacy Policy', 'Terms & Conditions', 'Accessibility'].map((item) => (
                <Link key={item} href="#" className="text-gray-500 hover:text-white transition-colors text-[12px] font-medium">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
}
