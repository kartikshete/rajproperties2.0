import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-black/[0.04] overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Editorial Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] sm:text-xs font-semibold text-[#86868B] tracking-wide uppercase block mb-3"
        >
          About Raj Properties
        </motion.span>

        {/* Large Editorial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-[#1D1D1F] leading-tight"
        >
          We believe finding the right property should feel simple.
        </motion.h2>

        {/* 2-Column Editorial Story */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 text-sm sm:text-base text-[#86868B] leading-relaxed font-normal">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <p>
              The real estate market is often crowded with exaggerated promises, high-pressure sales calls, and confusing paperwork. At Raj Properties, we set out to build a modern, honest consultation experience designed around the individual.
            </p>
            <p>
              Based in Pune, we work closely with home seekers, investors, and corporate professionals across key growth corridors including Pride World City, Charholi, Lohegaon, Dhanori, Kharadi, Viman Nagar, Wadgaon Sheri, and Vishrantwadi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p>
              Our role is not to rush you into a transaction, but to provide the clarity, market data, and legal verification needed to make a confident decision.
            </p>
            <p>
              From verifying title clarity and RERA registrations to organizing hassle-free walkthroughs, our licensed advisors remain accessible, candid, and committed to your satisfaction.
            </p>
          </motion.div>
        </div>

        {/* Editorial Values Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center sm:text-left"
        >
          <div className="p-3 bg-[#FBFBFD] sm:bg-transparent rounded-xl">
            <span className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight block">100%</span>
            <span className="text-xs text-[#86868B] mt-1 block">Title &amp; RERA Check</span>
          </div>
          <div className="p-3 bg-[#FBFBFD] sm:bg-transparent rounded-xl">
            <span className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight block">Direct</span>
            <span className="text-xs text-[#86868B] mt-1 block">Transparent Guidance</span>
          </div>
          <div className="p-3 bg-[#FBFBFD] sm:bg-transparent rounded-xl">
            <span className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight block">7 Days</span>
            <span className="text-xs text-[#86868B] mt-1 block">Dedicated Advisory</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
