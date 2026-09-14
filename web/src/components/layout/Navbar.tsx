"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X, ShieldCheck } from "lucide-react";
import AlertBanner from "./AlertBanner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const navLinks = [
    { name: "Personal", href: "#personal" },
    { name: "Business", href: "#business" },
    { name: "Wealth", href: "#wealth" },
    { name: "Digital Banking", href: "#digital" },
    { name: "About Us", href: "#about" },
  ];

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-white via-[#EAF7FA] to-[#FFF3EB]">
      {/* Utility Strip */}
      <div className="hidden md:block bg-[#111827] text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-[1300px] mx-auto flex justify-between items-center text-[11px] lg:text-[12px] font-semibold tracking-wide">
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-white">Personal Banking</Link>
            <Link href="#" className="hover:text-white transition-colors">Business Banking</Link>
            <Link href="#" className="hover:text-white transition-colors">Wealth</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="#" className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security Hub</span>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">Help & Support</Link>
          </div>
        </div>
      </div>

      {/* Scam Disclaimer Banner */}
      {showBanner && <div className="relative"><AlertBanner onClose={() => setShowBanner(false)} /></div>}
      
      <nav className="w-full bg-transparent">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-24">
          
          {/* Logo & Text */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo_main.png"
                alt="OCBC Logo"
                className="h-7 md:h-10 xl:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="ml-3 pl-3 border-l-[1.5px] border-gray-300 flex flex-col justify-center h-8 md:h-10">
                <span className="text-[10px] md:text-[12px] xl:text-[13px] font-bold text-[#111827] leading-[1.2] tracking-tight">Oversea Chinese</span>
                <span className="text-[10px] md:text-[12px] xl:text-[13px] font-bold text-[#111827] leading-[1.2] tracking-tight">Banking Corporation</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-bold text-[#111827] hover:text-ocbc-red transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-[#111827] hover:text-ocbc-red transition-colors">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
            {/* Clean Text Login Button */}
            <Link
              href="/login"
              className="text-[15px] font-bold text-[#111827] hover:text-ocbc-red transition-all"
            >
              Login
            </Link>
            {/* Outline Get Started Button */}
            <Link
              href="/register"
              className="px-7 py-2.5 text-[15px] font-bold text-ocbc-red bg-white border-2 border-ocbc-red/20 rounded-full hover:bg-red-50 hover:border-ocbc-red transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-900"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-xl absolute top-full left-0 w-full border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-lg font-bold text-gray-900 hover:text-ocbc-red"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-4 border-t border-gray-100 space-y-3">
            <Link href="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 text-lg font-bold text-gray-900 border-2 border-gray-100 rounded-full hover:bg-gray-50">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 text-lg font-bold text-white bg-[#E81C24] rounded-full hover:bg-[#c7131a]">
              Get Started
            </Link>
          </div>
        </div>
      )}
      </nav>
    </div>
  );
}
