import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Check, BookOpen } from 'lucide-react';

export default function LocationModal({ location, onClose, onEnquire }) {
  const [intent, setIntent] = useState('Buy'); // 'Buy' | 'Rent'
  const [propertyCategory, setPropertyCategory] = useState('Residential'); // 'Residential' | 'Commercial'

  if (!location) return null;

  const slug = location.slug || location.id;

  const handleConfirm = () => {
    onEnquire(location.name, {
      lookingFor: intent,
      propertyType: propertyCategory === 'Commercial' ? 'Commercial' : '2 BHK',
      message: `Interested in ${propertyCategory} property (${intent}) in ${location.name}.`,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-black/[0.08] z-10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] flex items-center justify-center text-[#1D1D1F] transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          <span className="text-xs uppercase tracking-[0.2em] text-[#86868B] font-semibold block mb-2">
            Location Overview
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mb-3">
            {location.name}
          </h3>
          <p className="text-sm sm:text-base text-[#86868B] leading-relaxed mb-6">
            {location.description}
          </p>

          {/* Preferences Available: Buy / Rent */}
          <div className="mb-5">
            <label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider block mb-2">
              Property Preference
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Buy', 'Rent'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setIntent(option)}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                    intent === option
                      ? 'bg-[#1D1D1F] text-white shadow-sm'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED]'
                  }`}
                >
                  {intent === option && <Check size={14} />}
                  {option} in {location.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Type: Residential / Commercial */}
          <div className="mb-7">
            <label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider block mb-2">
              Interest Category
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Residential', 'Commercial'].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setPropertyCategory(category)}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                    propertyCategory === category
                      ? 'bg-[#1D1D1F] text-white shadow-sm'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED]'
                  }`}
                >
                  {propertyCategory === category && <Check size={14} />}
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Enquire Button */}
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 px-6 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm"
          >
            <span>Enquire About {location.name}</span>
            <ArrowRight size={16} />
          </button>

          {/* SEO Internal Link to Dedicated Location Page */}
          {slug && (
            <Link
              to={`/locations/${slug}`}
              onClick={onClose}
              className="mt-3.5 pt-3 border-t border-black/[0.05] text-center text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen size={13} className="text-[#86868B]" />
              <span>Read in-depth {location.name} guide &amp; connectivity</span>
              <ArrowRight size={12} />
            </Link>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
