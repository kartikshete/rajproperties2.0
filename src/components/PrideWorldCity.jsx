import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, BookOpen } from 'lucide-react';

export default function PrideWorldCity({ onEnquire, onExploreOptions }) {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F7] border-y border-neutral-200 overflow-x-hidden" id="pride-world-city">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#86868B] font-semibold mb-3 block">
          Featured Township
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] mb-4 sm:mb-6">
          Considering Pride World City?
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-[#86868B] font-normal max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
          Looking for a home or exploring property opportunities around Pride World City? Tell us what you need, and our team will help you explore suitable options.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={onExploreOptions}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1D1D1F] active:bg-black text-white text-sm font-medium transition-all active:scale-[0.98] shadow-sm min-h-[48px]"
          >
            <span>Explore Your Options</span>
            <ArrowRight size={15} />
          </button>
          
          <button
            onClick={onEnquire}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white active:bg-neutral-50 text-[#1D1D1F] border border-neutral-300 text-sm font-medium transition-all active:scale-[0.98] min-h-[48px]"
          >
            <MessageSquare size={15} />
            <span>Enquire Now</span>
          </button>
        </div>

        {/* Dedicated SEO Guide Link */}
        <div className="mt-8 pt-4">
          <Link
            to="/locations/pride-world-city"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071E3] hover:underline"
          >
            <BookOpen size={13} />
            <span>Read full Pride World City connectivity &amp; lifestyle guide &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
