import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';

export default function PropertyModal({ property, onClose, onOpenInquiry }) {
  if (!property) return null;

  const handleWhatsAppEnquiry = (phoneNumber) => {
    const url = buildWhatsAppUrl(phoneNumber, {
      name: "Interested Client",
      mobile: "Direct Inquiry",
      propertyTitle: property.title,
      propertyType: property.propertyType,
      location: property.location,
      budget: property.price,
      message: `Hello, I would like to know more about "${property.title}" in ${property.location}.`,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white shadow-apple-modal overflow-hidden z-10 max-h-[88vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-black/[0.06] flex items-center justify-between bg-white sticky top-0 z-20">
            <div>
              <span className="text-xs font-mono text-[#86868B] block">{property.propertyType}</span>
              <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">
                {property.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#86868B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            
            {/* Minimal Blueprint Visual */}
            <div className="h-44 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] p-5 flex flex-col justify-between">
              <div className="flex justify-between text-[10px] text-[#86868B] font-mono">
                <span>SPECIFICATION // {property.bhk}</span>
                <span>{property.area}</span>
              </div>
              <div className="flex items-center justify-center my-auto">
                <svg className="w-40 h-20 stroke-[#1D1D1F]/50 fill-none" viewBox="0 0 140 70">
                  <rect x="5" y="5" width="130" height="60" rx="4" strokeWidth="1.2" />
                  <line x1="50" y1="5" x2="50" y2="65" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="95" y1="5" x2="95" y2="65" strokeWidth="0.8" strokeDasharray="2 2" />
                  <rect x="12" y="12" width="30" height="22" rx="2" strokeWidth="0.7" />
                  <rect x="58" y="12" width="30" height="22" rx="2" strokeWidth="0.7" />
                  <rect x="102" y="12" width="26" height="45" rx="2" strokeWidth="0.7" />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-[#86868B]">
                <span>{property.facing} Facing</span>
                <span>{property.floor}</span>
              </div>
            </div>

            {/* Core Specs */}
            <div className="grid grid-cols-2 gap-5 py-4">
              <div>
                <span className="text-[10px] text-[#86868B] uppercase block">Location</span>
                <span className="text-sm font-semibold text-[#1D1D1F] flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#86868B] shrink-0" />
                  <span>{property.location}</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868B] uppercase block">Configuration</span>
                <span className="text-sm font-semibold text-[#1D1D1F] mt-0.5 block">{property.bhk}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868B] uppercase block">Total Area</span>
                <span className="text-sm font-semibold text-[#1D1D1F] mt-0.5 block">{property.area}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868B] uppercase block">Possession</span>
                <span className="text-sm font-semibold text-[#1D1D1F] mt-0.5 block">{property.possession}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868B] uppercase block">Parking</span>
                <span className="text-sm font-semibold text-[#1D1D1F] mt-0.5 block">{property.parking}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#86868B] uppercase block">Price</span>
                <span className="text-sm font-semibold text-[#1D1D1F] mt-0.5 block">{property.price}</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-black/[0.06]">
              <span className="text-xs font-semibold text-[#1D1D1F] block mb-2">About This Property</span>
              <p className="text-sm text-[#86868B] leading-relaxed">{property.description}</p>
              {property.architectureHighlight && (
                <p className="mt-3 text-sm text-[#86868B] leading-relaxed italic">
                  {property.architectureHighlight}
                </p>
              )}
            </div>

            {/* Contact Actions */}
            <div className="pt-6 border-t border-black/[0.06] space-y-3">
              <span className="text-xs font-semibold text-[#1D1D1F] block">
                Interested in {property.title}?
              </span>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleWhatsAppEnquiry(siteConfig.phone1.whatsappNumber)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp {siteConfig.phone1.raw}</span>
                </button>

                <button
                  onClick={() => handleWhatsAppEnquiry(siteConfig.phone2.whatsappNumber)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp {siteConfig.phone2.raw}</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenInquiry) {
                      onOpenInquiry({
                        propertyTitle: property.title,
                        propertyType: property.propertyType,
                        budget: property.price,
                        lookingFor: property.type.includes('Rent') ? 'Rent' : 'Buy',
                      });
                    }
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium transition-all"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
