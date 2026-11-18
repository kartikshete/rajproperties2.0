import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowUp, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const PUNE_PAGES = [
  { name: 'Pride World City', path: '/locations/pride-world-city' },
  { name: 'Charholi', path: '/locations/charholi' },
  { name: 'Lohegaon', path: '/locations/lohegaon' },
  { name: 'Dhanori', path: '/locations/dhanori' },
  { name: 'Kharadi', path: '/locations/kharadi' },
  { name: 'Viman Nagar', path: '/locations/viman-nagar' },
  { name: 'Wadgaon Sheri', path: '/locations/wadgaon-sheri' },
  { name: 'Vishrantwadi', path: '/locations/vishrantwadi' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F5F7] border-t border-black/[0.04] py-14 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-black/[0.08] text-xs text-[#86868B]">
          
          {/* 1. Brand & Mission */}
          <div className="space-y-3 lg:col-span-2">
            <Link to="/" className="text-sm font-semibold text-[#1D1D1F] block tracking-tight">
              {siteConfig.brandName}
            </Link>
            <p className="leading-relaxed max-w-sm">
              Transparent, professional property consultation for home seekers, investors, and corporate professionals across Pune, Maharashtra.
            </p>
            <div className="pt-2 text-[11px] text-[#86868B] space-y-1">
              <p>• Service Area: Pune, Maharashtra, India</p>
              <p>• Consultation: Buying, Renting, Resale &amp; Advisory</p>
            </div>
          </div>

          {/* 2. Target Locations (SEO Internal Linking) */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wide block">
              Pune Locations
            </span>
            <ul className="space-y-1.5">
              {PUNE_PAGES.map((loc) => (
                <li key={loc.path}>
                  <Link
                    to={loc.path}
                    className="hover:text-[#1D1D1F] hover:underline transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Navigation */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wide block">
              Quick Links
            </span>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:text-[#1D1D1F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#map-explorer" className="hover:text-[#1D1D1F] transition-colors">
                  Map Explorer
                </a>
              </li>
              <li>
                <a href="/#locations" className="hover:text-[#1D1D1F] transition-colors">
                  All Locations
                </a>
              </li>
              <li>
                <a href="/#pride-world-city" className="hover:text-[#1D1D1F] transition-colors">
                  Pride World City
                </a>
              </li>
              <li>
                <a href="/#planning" className="hover:text-[#1D1D1F] transition-colors">
                  Property Planning
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-[#1D1D1F] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#inquiry" className="hover:text-[#1D1D1F] transition-colors">
                  Consultation Form
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Contact & Social */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wide block">
              Direct Contact
            </span>
            <ul className="space-y-2">
              <li>
                <a href={siteConfig.phone1.tel} className="hover:text-[#1D1D1F] transition-colors font-mono block">
                  {siteConfig.phone1.display}
                </a>
                <span className="text-[10px] text-[#86868B]">Advisor 1</span>
              </li>
              <li>
                <a href={siteConfig.phone2.tel} className="hover:text-[#1D1D1F] transition-colors font-mono block">
                  {siteConfig.phone2.display}
                </a>
                <span className="text-[10px] text-[#86868B]">Advisor 2</span>
              </li>
              <li className="pt-2">
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{siteConfig.instagram.handle}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#86868B]">
          <span>
            © {new Date().getFullYear()} RAJ PROPERTIES. All rights reserved. Real Estate Consultation in Pune, India.
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-[#1D1D1F] transition-colors text-xs cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
