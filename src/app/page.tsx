import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import DigitalBankingShowcase from "@/components/home/DigitalBankingShowcase";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import SecurityHub from "@/components/home/SecurityHub";
import GlobalExchange from "@/components/home/GlobalExchange";
import CurrencyCarousel from "@/components/home/CurrencyCarousel";
import AccountsAndCards from "@/components/home/AccountsAndCards";
import AwardsSection from "@/components/home/AwardsSection";
import GlobalNetwork from "@/components/home/GlobalNetwork";
import AppDownloadAndSecurity from "@/components/home/AppDownloadAndSecurity";
import InsightsAndConversion from "@/components/home/InsightsAndConversion";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-ocbc-red/20 overflow-x-hidden w-full">
      <Navbar />
      <Hero />
      <TrustStrip />
      <div id="digital"><DigitalBankingShowcase /></div>
      <PartnersCarousel />
      <SecurityHub />
      <div id="business"><GlobalExchange /></div>
      <div id="wealth"><CurrencyCarousel /></div>
      <div id="personal"><AccountsAndCards /></div>
      <AwardsSection />
      <div id="about"><GlobalNetwork /></div>
      <AppDownloadAndSecurity />
      <div id="support"><InsightsAndConversion /></div>
      <Footer />
    </main>
  );
}

