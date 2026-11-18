import React, { useState } from 'react';
import { useParams as useRouterParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight, 
  Building2, 
  Train, 
  Plane, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { LOCATIONS_SEO_DATA } from '../data/locationsSeoData';
import { siteConfig, buildWhatsAppUrl } from '../config/siteConfig';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InquiryForm from '../components/InquiryForm';

export default function LocationPage() {
  const { slug } = useRouterParams();
  const navigate = useNavigate();

  const locationData = LOCATIONS_SEO_DATA[slug];

  // If slug is invalid, redirect to 404
  if (!locationData) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between font-sans overflow-x-hidden">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-28 sm:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] mb-4">Location Not Found</h1>
          <p className="text-[#86868B] mb-8 text-sm sm:text-base">
            The Pune location you are looking for does not exist or has moved.
          </p>
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1D1D1F] text-white text-sm font-medium hover:bg-black transition-all"
          >
            Return to Home
          </RouterLink>
        </main>
        <Footer />
      </div>
    );
  }

  const otherLocations = Object.values(LOCATIONS_SEO_DATA).filter((loc) => loc.slug !== slug);

  // Schema.org Structured Data for this specific location page
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://rajproperties.in/locations/${locationData.slug}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://rajproperties.in/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Pune Locations',
            'item': 'https://rajproperties.in/#locations'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': locationData.name,
            'item': `https://rajproperties.in/locations/${locationData.slug}`
          }
        ]
      },
      {
        '@type': 'WebPage',
        '@id': `https://rajproperties.in/locations/${locationData.slug}#webpage`,
        'url': `https://rajproperties.in/locations/${locationData.slug}`,
        'name': locationData.seoTitle,
        'description': locationData.metaDescription,
        'isPartOf': {
          '@id': 'https://rajproperties.in/#website'
        },
        'breadcrumb': {
          '@id': `https://rajproperties.in/locations/${locationData.slug}#breadcrumb`
        },
        'inLanguage': 'en-IN'
      },
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://rajproperties.in/#agency',
        'name': 'RAJ PROPERTIES',
        'telephone': [siteConfig.phone1.raw, siteConfig.phone2.raw],
        'areaServed': locationData.name
      }
    ]
  };

  const handleScrollToInquiry = (intent = 'Buy') => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white overflow-x-hidden">
      
      {/* Dynamic SEO Tags & Structured Data */}
      <SEO
        title={locationData.seoTitle}
        description={locationData.metaDescription}
        canonicalUrl={`https://rajproperties.in/locations/${locationData.slug}`}
        schemaData={pageSchema}
      />

      {/* Global Apple Navbar */}
      <Navbar onOpenInquiry={() => handleScrollToInquiry('Buy')} />

      <main className="pt-20 sm:pt-24 lg:pt-28">
        
        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs text-[#86868B] overflow-x-auto whitespace-nowrap scrollbar-none">
            <RouterLink to="/" className="hover:text-[#0071E3] transition-colors">
              Home
            </RouterLink>
            <ChevronRight size={12} className="shrink-0" />
            <RouterLink to="/#locations" className="hover:text-[#0071E3] transition-colors">
              Locations
            </RouterLink>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-[#1D1D1F] font-medium truncate" aria-current="page">
              {locationData.shortName}
            </span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#F5F5F7] text-[11px] sm:text-xs font-semibold text-[#0071E3] mb-3 sm:mb-4">
              <MapPin size={13} />
              <span>Pune Corridor Spotlight</span>
            </div>
            
            {/* H1 Hierarchy */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] mb-4 sm:mb-6 leading-[1.1] break-words">
              {locationData.h1}
            </h1>
            
            {/* Supporting Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[#86868B] font-normal leading-relaxed mb-6 sm:mb-8">
              {locationData.h2Subtitle}
            </p>

            {/* Quick Consultation Triggers (Mobile-friendly stack) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 max-w-lg sm:max-w-none">
              <button
                type="button"
                onClick={() => handleScrollToInquiry('Buy')}
                className="px-6 py-3.5 rounded-full bg-[#1D1D1F] active:bg-black text-white text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 min-h-[46px]"
              >
                <span>Buy Consultation</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => handleScrollToInquiry('Rent')}
                className="px-6 py-3.5 rounded-full bg-white active:bg-[#F5F5F7] text-[#1D1D1F] text-xs sm:text-sm font-medium border border-neutral-300 transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <span>Rent Consultation</span>
                <ArrowRight size={14} />
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${locationData.lat},${locationData.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-[#F5F5F7] active:bg-[#E8E8ED] text-[#1D1D1F] text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 min-h-[46px]"
              >
                <Navigation size={13} className="text-[#0071E3]" />
                <span>View on Map</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 1: Locality Overview & Information */}
        <section className="bg-[#FBFBFD] py-14 sm:py-20 border-t border-black/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#86868B] block mb-2">
                Locality Profile
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-3">
                About Real Estate in {locationData.shortName}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#86868B] leading-relaxed">
                {locationData.overview}
              </p>
            </div>

            {/* Key Locality Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {locationData.localityDetails.map((detail, idx) => (
                <div 
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.05] shadow-xs flex items-start space-x-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={14} />
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Verified Connectivity & Transit Hubs */}
        <section className="py-14 sm:py-20 bg-white border-t border-black/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#86868B] block mb-2">
                Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-3">
                Verified Connectivity &amp; Road Networks
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#86868B] leading-relaxed">
                Strategic transport links connecting {locationData.shortName} with Pune’s primary commercial centers, IT corridors, and transit hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {locationData.connectivity.map((conn, idx) => (
                <div 
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFD] border border-black/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-medium text-[#86868B] uppercase tracking-wider block mb-1.5">
                      0{idx + 1} &middot; Route
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-[#1D1D1F] mb-1.5">
                      {conn.label}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#86868B] leading-relaxed mt-2 pt-2.5 border-t border-black/[0.04]">
                    {conn.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Consultation & Advisory Services */}
        <section className="py-14 sm:py-20 bg-[#F5F5F7] border-t border-black/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8 sm:mb-12">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#86868B] block mb-2">
                Consultation Services
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-3">
                How Raj Properties Guides You in {locationData.shortName}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-[#86868B] leading-relaxed">
                We believe finding the right property should feel simple. Rather than promoting random inventory, we listen to your parameters and guide your decisions transparently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {locationData.consultationServices.map((service, idx) => (
                <div 
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.06] shadow-apple-card flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-semibold text-[#0071E3] block mb-2.5">
                      Service 0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] mb-2 sm:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-3.5 border-t border-black/[0.04]">
                    <button
                      type="button"
                      onClick={() => handleScrollToInquiry('Buy')}
                      className="text-xs font-medium text-[#0071E3] hover:underline flex items-center gap-1 min-h-[36px]"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Typical Property Typologies We Advise On */}
        <section className="py-14 sm:py-20 bg-white border-t border-black/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8 sm:mb-10">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#86868B] block mb-2">
                Property Options
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-2 sm:mb-3">
                Configurations Available in {locationData.shortName}
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B]">
                We assist clients across diverse residential and commercial configurations based on actual lifestyle needs.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {locationData.propertyTypes.map((type) => (
                <div 
                  key={type}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FBFBFD] border border-black/[0.06] text-xs sm:text-sm font-medium text-[#1D1D1F] flex items-center gap-2"
                >
                  <Building2 size={14} className="text-[#0071E3]" />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Location-Specific Inquiry Form */}
        <InquiryForm 
          initialData={{
            location: locationData.name,
            preferredLocation: locationData.name,
            lookingFor: 'Buy',
            propertyTitle: `Consultation for ${locationData.shortName}`
          }}
        />

        {/* Section 6: Internal Linking - Other Pune Locations */}
        <section className="py-14 sm:py-20 bg-[#FBFBFD] border-t border-black/[0.04]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#86868B] block mb-1.5">
                Internal Corridors
              </span>
              <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                Explore Other Key Pune Locations
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B] mt-1.5">
                Compare connectivity, lifestyle amenities, and consultation advisory across other prominent corridors.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
              {otherLocations.map((loc) => (
                <RouterLink
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="group p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-black/[0.05] active:border-[#1D1D1F] transition-all flex flex-col justify-between shadow-2xs min-h-[110px]"
                >
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono font-medium text-[#86868B] block mb-1">
                      {loc.tag}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors truncate">
                      {loc.shortName}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-black/[0.03] flex items-center justify-between text-[10px] sm:text-[11px] text-[#86868B]">
                    <span>View Guide</span>
                    <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </RouterLink>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Global Apple Footer */}
      <Footer />
    </div>
  );
}
