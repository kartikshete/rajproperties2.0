import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function Navbar({ onNavigate, onOpenInquiry }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  const navItems = [
    { label: 'Home', href: '/#home', isHash: true },
    { label: 'Map Explorer', href: '/#map-explorer', isHash: true },
    { label: 'Pune Locations', href: '/#locations', isHash: true },
    { label: 'Pride World City', href: '/locations/pride-world-city', isHash: false },
    { label: 'Property Planning', href: '/#planning', isHash: true },
    { label: 'About Us', href: '/#about', isHash: true },
  ];

  const handleLinkClick = (item) => {
    if (isHome && item.isHash) {
      const hash = item.href.replace('/', '');
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleInquiryClick = () => {
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      const el = document.getElementById('inquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#inquiry';
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-md border-b border-black/[0.08] shadow-[0_1px_0_rgba(0,0,0,0.04)] py-3 sm:py-3.5'
            : 'bg-white/95 backdrop-blur-sm py-3.5 sm:py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="font-semibold text-base sm:text-lg tracking-tight text-[#1D1D1F] hover:opacity-75 transition-opacity"
            aria-label="Raj Properties Home"
          >
            {siteConfig.brandName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-normal text-[#1D1D1F]/80">
            {navItems.map((item) => (
              <React.Fragment key={item.label}>
                {item.isHash ? (
                  <a
                    href={item.href}
                    onClick={() => handleLinkClick(item)}
                    className="text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-5">
            <a
              href="/#contact"
              className="text-xs font-normal text-[#1D1D1F]/80 hover:text-[#0071E3] transition-colors"
            >
              Contact
            </a>

            <button
              onClick={handleInquiryClick}
              className="px-4 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium transition-all active:scale-[0.98] shadow-xs"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Right Controls: Compact CTA + Hamburger */}
          <div className="flex items-center space-x-2.5 md:hidden">
            <button
              onClick={handleInquiryClick}
              className="px-3.5 py-1.5 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-xs font-medium"
            >
              Enquire
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1D1D1F] active:bg-neutral-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Apple-Style Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[57px] z-40 bg-white/98 backdrop-blur-2xl flex flex-col justify-between px-6 py-6 md:hidden overflow-y-auto"
          >
            <div className="space-y-1 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#86868B] block mb-3 px-3">
                Navigation
              </span>

              {navItems.map((item) => (
                <div key={item.label}>
                  {item.isHash ? (
                    <a
                      href={item.href}
                      onClick={() => handleLinkClick(item)}
                      className="flex items-center justify-between px-3 py-3 rounded-2xl text-base font-medium text-[#1D1D1F] active:bg-[#F5F5F7] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={15} className="text-[#86868B]" />
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-2xl text-base font-medium text-[#1D1D1F] active:bg-[#F5F5F7] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={15} className="text-[#86868B]" />
                    </Link>
                  )}
                </div>
              ))}

              <div>
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-2xl text-base font-medium text-[#1D1D1F] active:bg-[#F5F5F7] transition-colors"
                >
                  <span>Contact</span>
                  <ArrowRight size={15} className="text-[#86868B]" />
                </a>
              </div>
            </div>

            {/* Bottom Quick Advisors */}
            <div className="pt-6 border-t border-black/[0.06] space-y-3">
              <button
                onClick={handleInquiryClick}
                className="w-full py-3.5 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Start Property Consultation</span>
                <ArrowRight size={15} />
              </button>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <a
                  href={siteConfig.phone1.tel}
                  className="p-2.5 rounded-xl bg-[#F5F5F7] active:bg-[#E8E8ED] text-[#1D1D1F] font-mono flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} className="text-[#0071E3]" />
                  <span>{siteConfig.phone1.display}</span>
                </a>
                <a
                  href={siteConfig.phone2.tel}
                  className="p-2.5 rounded-xl bg-[#F5F5F7] active:bg-[#E8E8ED] text-[#1D1D1F] font-mono flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} className="text-[#0071E3]" />
                  <span>{siteConfig.phone2.display}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
