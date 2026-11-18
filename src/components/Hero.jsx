import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowDown } from 'lucide-react';

export default function Hero({ onOpenInquiry }) {
  const scrollToMap = () => {
    const el = document.getElementById('map-explorer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden bg-white">
      
      {/* Subtle Apple-style CSS Grid / Architectural Canvas Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft, minimal radial blur in center */}
        <div className="w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-[#F5F5F7]/80 blur-3xl -z-10" />
        
        {/* Minimalist CSS Architectural Blueprint Grid lines */}
        <svg 
          className="absolute inset-0 w-full h-full stroke-black/[0.03] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="apple-grid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#apple-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        
        {/* Small Apple-style Super-heading Tag */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-semibold text-[#86868B] tracking-wide uppercase mb-3"
        >
          Raj Properties
        </motion.p>

        {/* Large Apple Bold Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.08] break-words"
        >
          Find a place<br />
          <span className="text-[#1D1D1F]">to call your own.</span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-[#86868B] font-normal tracking-tight max-w-xl leading-relaxed px-2"
        >
          Making property decisions simpler, smarter and more convenient across Pune.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={scrollToMap}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-sm font-medium tracking-normal transition-all active:scale-[0.98] shadow-sm flex items-center justify-center space-x-1.5 min-h-[46px]"
          >
            <span>Explore Pune Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry();
              } else {
                scrollToContact();
              }
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F5F5F7] active:bg-[#E8E8ED] text-[#1D1D1F] text-sm font-medium tracking-normal transition-all active:scale-[0.98] flex items-center justify-center space-x-1.5 min-h-[46px]"
          >
            <span>Get in Touch</span>
          </button>
        </motion.div>

        {/* Minimal Architecture / Philosophy Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 w-full max-w-2xl p-5 sm:p-8 rounded-2xl bg-[#FBFBFD] border border-black/[0.05] flex flex-col items-center"
        >
          <div className="w-full flex items-center justify-between text-[11px] sm:text-xs text-[#86868B] pb-3 border-b border-black/[0.06]">
            <span>Advisory Philosophy</span>
            <span>Pune, Maharashtra</span>
          </div>

          <div className="py-6 sm:py-7 w-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center w-full">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">Buy</span>
                <p className="text-[11px] sm:text-xs text-[#86868B]">Verified Homes</p>
              </div>
              <div className="space-y-0.5 sm:space-y-1 border-x border-black/[0.08]">
                <span className="text-xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">Rent</span>
                <p className="text-[11px] sm:text-xs text-[#86868B]">Curated Spaces</p>
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">Sell</span>
                <p className="text-[11px] sm:text-xs text-[#86868B]">Real Valuation</p>
              </div>
            </div>
          </div>

          <div className="w-full pt-3.5 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] sm:text-xs text-[#86868B] text-center sm:text-left">
            <span>Direct consultation with licensed advisors</span>
            <span className="text-[#0071E3] font-medium font-mono">+91 9322692678 / +91 9146082678</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
