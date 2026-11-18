import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Instagram, ArrowUpRight, Mail } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function ContactSection({ onScrollToInquiry }) {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-black/[0.04] overflow-x-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Sub-label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] sm:text-xs font-semibold text-[#86868B] tracking-wide uppercase block mb-3"
        >
          Contact &amp; Consultation
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-[#1D1D1F] leading-tight"
        >
          Let’s find the right<br />place for you.
        </motion.h2>

        {/* Phone Numbers Styled as Apple Large Data Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto"
        >
          <a
            href={siteConfig.phone1.tel}
            className="p-5 sm:p-6 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] active:bg-[#E8E8ED] transition-colors text-center group min-h-[80px] flex flex-col justify-center"
          >
            <span className="text-xs text-[#86868B] font-medium block mb-1">Advisor Line 1</span>
            <span className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight group-hover:text-[#0071E3] transition-colors font-mono">
              {siteConfig.phone1.display}
            </span>
          </a>

          <a
            href={siteConfig.phone2.tel}
            className="p-5 sm:p-6 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] active:bg-[#E8E8ED] transition-colors text-center group min-h-[80px] flex flex-col justify-center"
          >
            <span className="text-xs text-[#86868B] font-medium block mb-1">Advisor Line 2</span>
            <span className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight group-hover:text-[#0071E3] transition-colors font-mono">
              {siteConfig.phone2.display}
            </span>
          </a>
        </motion.div>

        {/* Instagram Profile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 flex justify-center"
        >
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] active:bg-[#E8E8ED] transition-colors text-xs font-medium text-[#1D1D1F] group min-h-[46px]"
          >
            <Instagram className="w-4 h-4 text-[#1D1D1F]" />
            <span className="group-hover:text-[#0071E3] transition-colors">{siteConfig.instagram.handle}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#86868B]" />
          </a>
        </motion.div>

        {/* Touch Friendly Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          {/* Call Line 1 */}
          <a
            href={siteConfig.phone1.tel}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#1D1D1F] active:bg-black text-white text-xs sm:text-sm font-medium transition-all shadow-sm min-h-[46px]"
          >
            <Phone className="w-4 h-4" />
            <span>Call Advisor 1</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${siteConfig.phone1.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-emerald-600 active:bg-emerald-700 text-white text-xs sm:text-sm font-medium transition-all shadow-sm min-h-[46px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          {/* Online Inquiry */}
          <button
            type="button"
            onClick={onScrollToInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-xs sm:text-sm font-medium transition-all shadow-sm min-h-[46px]"
          >
            <span>Fill Inquiry</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
