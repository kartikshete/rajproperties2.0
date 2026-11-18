import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Repeat, Clock } from 'lucide-react';

export default function WhyRajProperties() {
  const pillars = [
    {
      icon: UserCheck,
      title: "Personal Guidance",
      description: "Dedicated one-on-one consultation. We evaluate your unique lifestyle preferences and budget parameters before recommending any property.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Communication",
      description: "Documented facts, direct pricing, and verified RERA paperwork. No undisclosed fees, no misleading timelines, and no ambiguity.",
    },
    {
      icon: Repeat,
      title: "Buy, Sell & Rent",
      description: "A comprehensive ecosystem covering your complete property lifecycle—from acquiring new developments to leasing and secondary resale.",
    },
    {
      icon: Clock,
      title: "Convenient Property Assistance",
      description: "We handle the logistics—coordinating private viewings, drafting standard lease deeds, title search reports, and registration support.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#FBFBFD] border-t border-black/[0.04] overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-semibold text-[#86868B] tracking-wide uppercase">
            Why Raj Properties
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F] mt-1.5 leading-snug">
            Property decisions.<br />
            Made simpler.
          </h2>
        </div>

        {/* 4 Clean Minimal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.05] shadow-apple-card flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] mb-5">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#86868B] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-black/[0.04]">
                  <span className="text-[11px] font-mono text-[#86868B]">
                    0{index + 1} // STANDARD
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
