import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PropertyServices({ onSelectService }) {
  const services = [
    {
      id: 'buy',
      category: 'BUY',
      title: 'Find the right property for your future.',
      description: 'Navigating property acquisition with complete legal clarity. We curate verified residential and commercial opportunities aligned with your budget, preferences, and long-term financial goals.',
      features: ['100% Verified Titles & RERA Clearances', 'Transparent Price Comparisons', 'End-to-End Registration Assistance'],
      illustrationType: 'blueprint',
    },
    {
      id: 'rent',
      category: 'RENT',
      title: 'Discover spaces that fit your lifestyle.',
      description: 'Handpicked executive rentals and modern residences in Pune’s most accessible neighborhoods. Designed for corporate professionals, families, and individuals seeking convenience.',
      features: ['Direct Landlord Coordination', 'Standardized Legal Agreements', 'Seamless Move-in Support'],
      illustrationType: 'layout',
    },
    {
      id: 'sell',
      category: 'SELL',
      title: 'Get the right guidance for your property.',
      description: 'Realize the fair market value of your property without unnecessary delays. We connect verified property owners with qualified buyers through discreet, transparent negotiations.',
      features: ['Objective Valuation Assessment', 'Qualified Buyer Screening', 'Hassle-Free Documentation'],
      illustrationType: 'valuation',
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 px-5 sm:px-8 bg-[#FBFBFD] border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="text-xs font-semibold text-[#86868B] tracking-wide uppercase">
            Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tighter text-[#1D1D1F] mt-2">
            Tailored consultation.<br />
            For every requirement.
          </h2>
        </div>

        {/* 3 Minimal Apple-style Feature Blocks */}
        <div className="space-y-8 sm:space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="p-8 sm:p-14 rounded-3xl bg-white border border-black/[0.06] shadow-apple-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Content Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#0071E3] uppercase block mb-3">
                    {service.category}
                  </span>
                  
                  <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-[#86868B] font-normal leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-black/[0.06] space-y-2.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 text-xs text-[#1D1D1F]/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => onSelectService && onSelectService(service.id)}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#0071E3] hover:text-[#0077ED] transition-colors group"
                  >
                    <span>Inquire about {service.category.toLowerCase()}ing with Raj Properties</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Minimal CSS Illustration Column (5 cols) - No stock photos */}
              <div className="lg:col-span-5 h-56 sm:h-72 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] p-6 flex flex-col justify-between relative overflow-hidden">
                
                {/* Header of Illustration */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86868B]">
                  <span>SPECIFICATION // {service.category}</span>
                  <span>PUNE</span>
                </div>

                {/* Vector CSS Architectural Blueprint (Pure CSS / SVG) */}
                <div className="my-auto flex items-center justify-center">
                  {service.illustrationType === 'blueprint' && (
                    <svg className="w-48 h-36 stroke-[#1D1D1F]/70 fill-none" viewBox="0 0 160 120">
                      <rect x="10" y="10" width="140" height="100" rx="4" strokeWidth="1.5" />
                      <line x1="60" y1="10" x2="60" y2="110" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="60" y1="60" x2="150" y2="60" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="35" cy="35" r="12" strokeWidth="1" />
                      <rect x="75" y="25" width="20" height="20" rx="2" strokeWidth="1" />
                      <path d="M 120 75 Q 135 75 135 90" strokeWidth="1.5" />
                      <text x="35" y="85" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">LIVING</text>
                      <text x="105" y="38" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">SUITE</text>
                      <text x="105" y="90" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">BALCONY</text>
                    </svg>
                  )}

                  {service.illustrationType === 'layout' && (
                    <svg className="w-48 h-36 stroke-[#1D1D1F]/70 fill-none" viewBox="0 0 160 120">
                      <rect x="15" y="15" width="130" height="90" rx="6" strokeWidth="1.5" />
                      <rect x="25" y="25" width="40" height="40" rx="3" strokeWidth="1" strokeDasharray="2 2" />
                      <rect x="80" y="25" width="55" height="40" rx="3" strokeWidth="1" />
                      <rect x="25" y="75" width="110" height="20" rx="3" strokeWidth="1" />
                      <text x="45" y="48" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">WORK</text>
                      <text x="108" y="48" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">REST</text>
                      <text x="80" y="88" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">TERRACE</text>
                    </svg>
                  )}

                  {service.illustrationType === 'valuation' && (
                    <svg className="w-48 h-36 stroke-[#1D1D1F]/70 fill-none" viewBox="0 0 160 120">
                      <line x1="20" y1="100" x2="140" y2="100" strokeWidth="1.5" />
                      <line x1="20" y1="20" x2="20" y2="100" strokeWidth="1.5" />
                      <path d="M 30 85 C 60 75, 80 50, 135 25" strokeWidth="2" stroke="#0071E3" />
                      <circle cx="135" cy="25" r="4" fill="#0071E3" stroke="none" />
                      <line x1="30" y1="85" x2="30" y2="100" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="80" y1="58" x2="80" y2="100" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="135" y1="25" x2="135" y2="100" strokeWidth="1" strokeDasharray="2 2" />
                      <text x="80" y="112" fontSize="8" fill="#86868B" textAnchor="middle" stroke="none">VALUATION</text>
                    </svg>
                  )}
                </div>

                {/* Footer of Illustration */}
                <div className="flex items-center justify-between text-[10px] text-[#86868B] pt-2 border-t border-black/[0.04]">
                  <span>ARCHITECTURAL ANALYSIS</span>
                  <span className="font-semibold text-[#1D1D1F]">100% VERIFIED</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
