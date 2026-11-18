import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

const LOOKING_FOR_OPTIONS = [
  'Buying a property',
  'Renting a property',
  'Selling a property',
  'Investment consultation',
];

const LOCATIONS = [
  'Pride World City',
  'Lohegaon',
  'Dhanori',
  'Kharadi',
  'Wadgaon Sheri',
  'Viman Nagar',
  'Charholi',
  'Vishrantwadi',
];

const PROPERTY_TYPES = [
  '1 BHK',
  '2 BHK',
  '3 BHK',
  '4 BHK',
  'Commercial',
  'Plot / Land',
  'Other',
];

const PURPOSES = [
  'Personal use',
  'Family',
  'Investment',
  'Business',
];

const BUDGET_SUGGESTIONS = [
  'Under ₹50 L',
  '₹50 L - ₹1 Cr',
  '₹1 Cr - ₹2 Cr',
  '₹2 Cr - ₹4 Cr',
  '₹4 Cr+',
  'Custom',
];

export default function PropertyPlanning({ onSubmit }) {
  const [lookingFor, setLookingFor] = useState('Buying a property');
  const [preferredLocation, setPreferredLocation] = useState('Pride World City');
  const [propertyType, setPropertyType] = useState('2 BHK');
  const [budget, setBudget] = useState('₹1 Cr - ₹2 Cr');
  const [customBudget, setCustomBudget] = useState('');
  const [purpose, setPurpose] = useState('Family');

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalBudget = budget === 'Custom' ? (customBudget || 'Custom Budget') : budget;
    
    let conciseIntent = 'Buy';
    if (lookingFor.includes('Rent')) conciseIntent = 'Rent';
    else if (lookingFor.includes('Sell')) conciseIntent = 'Sell';
    else if (lookingFor.includes('Investment')) conciseIntent = 'Investment Consultation';

    onSubmit({
      lookingFor: conciseIntent,
      preferredLocation,
      propertyType,
      budget: finalBudget,
      purpose,
    });
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FBFBFD] border-t border-black/[0.04] overflow-x-hidden" id="planning">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-xs font-medium text-[#86868B] mb-3 shadow-2xs">
            <Sparkles size={13} className="text-[#0071E3]" />
            <span>Interactive Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D1D1F] mb-3">
            Not sure what you’re looking for?
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#86868B] font-normal leading-relaxed px-2">
            Answer a few quick questions to outline your requirements, and our advisors will present curated options aligned with your vision.
          </p>
        </div>

        {/* Planning Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-black/[0.06] shadow-apple-card">
          <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-10">
            
            {/* 1. What are you looking for? */}
            <div>
              <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block mb-2.5 sm:mb-3">
                1. What are you looking for?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
                {LOOKING_FOR_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setLookingFor(opt)}
                    className={`py-3 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between border min-h-[46px] ${
                      lookingFor === opt
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                        : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent active:bg-[#E8E8ED]'
                    }`}
                  >
                    <span>{opt}</span>
                    {lookingFor === opt && <Check size={14} className="shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Preferred Location */}
            <div>
              <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block mb-2.5 sm:mb-3">
                2. Preferred Location in Pune
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setPreferredLocation(loc)}
                    className={`py-2.5 sm:py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between border min-h-[46px] ${
                      preferredLocation === loc
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                        : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent active:bg-[#E8E8ED]'
                    }`}
                  >
                    <span className="truncate">{loc}</span>
                    {preferredLocation === loc && <Check size={13} className="shrink-0 ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Property Type */}
            <div>
              <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block mb-2.5 sm:mb-3">
                3. Property Type
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all border min-h-[42px] ${
                      propertyType === type
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                        : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent active:bg-[#E8E8ED]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Budget */}
            <div>
              <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block mb-2.5 sm:mb-3">
                4. Approximate Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-3">
                {BUDGET_SUGGESTIONS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`py-2.5 px-2.5 rounded-xl text-xs font-medium transition-all text-center border min-h-[42px] ${
                      budget === b
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                        : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent active:bg-[#E8E8ED]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              {budget === 'Custom' && (
                <input
                  type="text"
                  placeholder="Enter your specific budget (e.g. ₹75 Lakhs or ₹3.5 Cr)"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  className="w-full px-4 py-3 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] outline-none transition-all"
                />
              )}
            </div>

            {/* 5. Purpose */}
            <div>
              <label className="text-xs font-semibold text-[#86868B] uppercase tracking-wider block mb-2.5 sm:mb-3">
                5. Intended Purpose
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-center border min-h-[42px] ${
                      purpose === p
                        ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                        : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent active:bg-[#E8E8ED]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Callout & Action */}
            <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F]">
                  Let’s Find What Works For You.
                </h3>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Click to prefill your inquiry and discuss immediately with our advisors.
                </p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-sm font-medium transition-all active:scale-[0.98] shadow-sm shrink-0 min-h-[48px]"
              >
                <span>Submit Your Requirement</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
