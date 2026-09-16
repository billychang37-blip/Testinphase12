"use client";

import { motion } from "framer-motion";

// Custom bespoke SVGs mirroring the premium abstract B2B aesthetic
const TheDevelopIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#4FD1C5]">
    <circle cx="12" cy="4" r="2.5" />
    <circle cx="7" cy="8" r="2.5" />
    <circle cx="17" cy="8" r="2.5" />
    <circle cx="2" cy="12" r="2.5" />
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="22" cy="12" r="2.5" />
    <circle cx="7" cy="16" r="2.5" />
    <circle cx="17" cy="16" r="2.5" />
    <circle cx="12" cy="20" r="2.5" />
  </svg>
);

const PyramidaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="w-8 h-8 text-[#6366F1]">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" />
    <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ElegantierIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-[#A78BFA]">
    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 22C16 22 18 17.5 18 12C18 6.5 16 2 12 2" />
    <path d="M12 22C8 22 6 17.5 6 12C6 6.5 8 2 12 2" />
    <path d="M2 12C2 16 6.5 18 12 18C17.5 18 22 16 22 12" />
    <path d="M2 12C2 8 6.5 6 12 6C17.5 6 22 8 22 12" />
  </svg>
);

const VertexIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-[#38BDF8]">
    <polygon points="12 2 2 22 22 22" fill="currentColor" fillOpacity="0.4" />
    <polygon points="12 10 7 22 17 22" fill="currentColor" />
  </svg>
);

const OmniCoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-[#FB7185]">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const customPartners = [
  { name: "TheDevelop", icon: TheDevelopIcon },
  { name: "Pyramida", icon: PyramidaIcon },
  { name: "Elegantier", icon: ElegantierIcon },
  { name: "Vertex", icon: VertexIcon },
  { name: "OmniCore", icon: OmniCoreIcon }
];

// Multiply the array to ensure the screen is fully populated for the infinite loop
const duplicatedPartners = [...customPartners, ...customPartners, ...customPartners, ...customPartners];

export default function PartnersCarousel() {
  return (
    <section className="py-8 bg-white overflow-hidden relative border-y border-gray-100">
      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* Extremely sleek, centered micro-header */}
        <div className="mb-6 text-center">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em]">
            Integrated with Global Industry Leaders
          </p>
        </div>

        {/* Full-width Carousel */}
        <div className="relative">
          {/* Gradient masks for smooth fade in/out on the extreme edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Framer Motion implementation for perfectly sleek, buttery smooth panning */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex space-x-16 md:space-x-24 items-center whitespace-nowrap min-w-full"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 35 // Extremely sleek, slow, and luxurious speed
              }}
            >
              {duplicatedPartners.map((partner, idx) => (
                <div key={idx} className="flex-none flex items-center space-x-3 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <partner.icon />
                  <span className="text-[14px] md:text-[20px] font-bold text-slate-700 tracking-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
