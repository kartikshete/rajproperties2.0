import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';

const LOCATIONS = [
  'Pride World City',
  'Lohegaon',
  'Dhanori',
  'Kharadi',
  'Wadgaon Sheri',
  'Viman Nagar',
  'Charholi',
  'Vishrantwadi',
  'Other Location in Pune',
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

export default function InquiryForm({ initialData = {}, onResetInitialData }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    lookingFor: 'Buy',
    propertyType: '2 BHK',
    location: 'Pride World City',
    budget: '₹1 Cr - ₹2.5 Cr',
    message: '',
    propertyTitle: '',
  });

  const [selectedAdvisor, setSelectedAdvisor] = useState(siteConfig.phone1.whatsappNumber);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        propertyTitle: initialData.propertyTitle || prev.propertyTitle,
        lookingFor: initialData.lookingFor || prev.lookingFor,
        propertyType: initialData.propertyType || prev.propertyType,
        location: initialData.location || initialData.preferredLocation || prev.location,
        budget: initialData.budget || prev.budget,
        message: initialData.message || prev.message,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const whatsappUrl = buildWhatsAppUrl(selectedAdvisor, formData);
    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectWhatsApp = (phoneNumber) => {
    const url = buildWhatsAppUrl(phoneNumber, formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inquiry" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#FBFBFD] border-t border-black/[0.04] overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-[#86868B] tracking-wide uppercase">
            Inquiry & Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-[#1D1D1F] mt-2">
            Start a conversation.
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-[#86868B] font-normal max-w-lg mx-auto leading-relaxed">
            Fill out your details below. We will analyze suitable options across Pune and connect with you on WhatsApp.
          </p>
        </div>

        {/* Selected Location / Context Notice */}
        {(formData.location || formData.propertyTitle) && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-between text-xs">
            <span className="text-[#86868B] truncate mr-2">
              Selected Location: <strong className="text-[#1D1D1F] font-semibold">{formData.location}</strong>
              {formData.propertyTitle && ` (${formData.propertyTitle})`}
            </span>
            <button
              type="button"
              onClick={() => {
                setFormData(p => ({ ...p, propertyTitle: '' }));
                if (onResetInitialData) onResetInitialData();
              }}
              className="text-[#0071E3] hover:underline shrink-0"
            >
              Reset
            </button>
          </div>
        )}

        {/* Minimal Apple Form Card */}
        <div className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.06] shadow-apple-card">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            
            {/* Name & Mobile (Single column on mobile, 2 cols on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] placeholder-[#86868B] transition-all outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                  Phone / Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. 9822012345"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] placeholder-[#86868B] transition-all outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                autoComplete="email"
                inputMode="email"
                className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] placeholder-[#86868B] transition-all outline-none"
              />
            </div>

            {/* Looking For & Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                  Interested In *
                </label>
                <select
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] transition-all outline-none cursor-pointer"
                >
                  <option value="Buy">Buy Property</option>
                  <option value="Rent">Rent Property</option>
                  <option value="Sell">Sell Property</option>
                  <option value="Investment Consultation">Investment Consultation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] transition-all outline-none cursor-pointer"
                >
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                  Preferred Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] transition-all outline-none cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                  Budget *
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. ₹60 Lakhs, ₹1.5 Cr, or Flexible"
                  className="w-full px-4 py-3 sm:py-3.5 min-h-[46px] rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] placeholder-[#86868B] transition-all outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs font-medium text-[#1D1D1F] block mb-1.5">
                Additional Requirements / Specific Needs
              </label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention any specific preferences such as possession timeframe, gated society, amenities, purpose..."
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#0071E3] focus:bg-white text-base sm:text-sm text-[#1D1D1F] placeholder-[#86868B] transition-all outline-none resize-none"
              />
            </div>

            {/* Advisor Selection (Touch friendly tap buttons) */}
            <div className="pt-2">
              <label className="text-xs font-medium text-[#1D1D1F] block mb-2">
                Connect With Advisor:
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAdvisor(siteConfig.phone1.whatsappNumber)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-left min-h-[50px] ${
                    selectedAdvisor === siteConfig.phone1.whatsappNumber
                      ? 'border-[#0071E3] bg-[#0071E3]/8 text-[#0071E3]'
                      : 'border-black/[0.08] bg-white text-[#1D1D1F]/70 active:bg-[#F5F5F7]'
                  }`}
                >
                  <span className="block font-semibold">Advisor 1</span>
                  <span className="text-[11px] text-[#86868B]">{siteConfig.phone1.display}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAdvisor(siteConfig.phone2.whatsappNumber)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-left min-h-[50px] ${
                    selectedAdvisor === siteConfig.phone2.whatsappNumber
                      ? 'border-[#0071E3] bg-[#0071E3]/8 text-[#0071E3]'
                      : 'border-black/[0.08] bg-white text-[#1D1D1F]/70 active:bg-[#F5F5F7]'
                  }`}
                >
                  <span className="block font-semibold">Advisor 2</span>
                  <span className="text-[11px] text-[#86868B]">{siteConfig.phone2.display}</span>
                </button>
              </div>
            </div>

            {/* Error notice */}
            {error && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-sm sm:text-base font-medium tracking-normal transition-all active:scale-[0.98] shadow-sm flex items-center justify-center space-x-2 min-h-[50px]"
              >
                <span>Submit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Submission confirmation */}
            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Inquiry formatted. WhatsApp opened. You can also message our advisors directly below.</span>
              </div>
            )}

          </form>

          {/* TWO DIRECT WHATSAPP CONTACT OPTIONS (Mobile friendly stack) */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-black/[0.06]">
            <span className="text-xs font-medium text-[#86868B] block mb-3 text-center sm:text-left">
              Or connect immediately via WhatsApp:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => handleDirectWhatsApp(siteConfig.phone1.whatsappNumber)}
                className="p-3 sm:p-3.5 rounded-xl bg-[#F5F5F7] active:bg-[#E8E8ED] border border-black/[0.04] flex items-center justify-between text-left transition-colors min-h-[52px]"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1D1D1F] block">WhatsApp Advisor 1</span>
                    <span className="text-[11px] text-[#86868B]">{siteConfig.phone1.display}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#0071E3] shrink-0">Chat &rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => handleDirectWhatsApp(siteConfig.phone2.whatsappNumber)}
                className="p-3 sm:p-3.5 rounded-xl bg-[#F5F5F7] active:bg-[#E8E8ED] border border-black/[0.04] flex items-center justify-between text-left transition-colors min-h-[52px]"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1D1D1F] block">WhatsApp Advisor 2</span>
                    <span className="text-[11px] text-[#86868B]">{siteConfig.phone2.display}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-[#0071E3] shrink-0">Chat &rarr;</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
