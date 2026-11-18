import React from 'react';
import { motion } from 'framer-motion';

export default function Introduction() {
  return (
    <section className="py-24 sm:py-36 px-5 sm:px-8 bg-white border-t border-black/[0.04]">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Large Centered Apple Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-1 sm:space-y-2"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-[#1D1D1F] leading-[1.08]">
            Your Property.
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-[#1D1D1F] leading-[1.08]">
            Your Decision.
          </h2>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-[#86868B] leading-[1.08]">
            Our Guidance.
          </h2>
        </motion.div>

        {/* Short Editorial Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 sm:mt-14 text-lg sm:text-2xl text-[#86868B] font-normal tracking-tight leading-relaxed max-w-3xl mx-auto"
        >
          Raj Properties was founded on a simple principle: property decisions should be straightforward, honest, and grounded in your personal goals. We strip away the noise to provide clear market analysis, verified paperwork, and thoughtful advice for every step of your journey.
        </motion.p>

      </div>
    </section>
  );
}
