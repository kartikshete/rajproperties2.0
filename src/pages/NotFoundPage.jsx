import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { LOCATIONS_SEO_DATA } from '../data/locationsSeoData';

export default function NotFoundPage() {
  const locations = Object.values(LOCATIONS_SEO_DATA);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans flex flex-col justify-between selection:bg-[#0071E3] selection:text-white">
      <SEO
        title="404 — Page Not Found | RAJ PROPERTIES Pune"
        description="The page you are looking for does not exist. Explore real estate consultation across Pune corridors with Raj Properties."
        canonicalUrl="https://rajproperties.in/404"
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-32 text-center">
        <span className="text-xs font-mono font-semibold text-[#86868B] uppercase tracking-widest block mb-3">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#1D1D1F] mb-4">
          The page you’re looking for can’t be found.
        </h1>
        <p className="text-base sm:text-lg text-[#86868B] max-w-xl mx-auto mb-10 leading-relaxed">
          The address might be misspelled, or the page may have been relocated. Discover our primary Pune consultation corridors below.
        </p>

        <div className="flex justify-center mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Quick Corridor Navigation */}
        <div className="text-left pt-12 border-t border-black/[0.06]">
          <h2 className="text-sm font-semibold text-[#86868B] uppercase tracking-wider mb-6 text-center">
            Or explore Pune property locations:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/${loc.slug}`}
                className="p-3.5 rounded-2xl bg-[#F5F5F7] hover:bg-[#E8E8ED] text-xs font-medium text-[#1D1D1F] transition-colors flex items-center justify-between"
              >
                <span>{loc.shortName}</span>
                <ArrowRight size={12} className="text-[#86868B]" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
