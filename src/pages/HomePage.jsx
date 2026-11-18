import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import LocationExplorerMap from '../components/LocationExplorerMap';
import ExploreLocations from '../components/ExploreLocations';
import PrideWorldCity from '../components/PrideWorldCity';
import PropertyPlanning from '../components/PropertyPlanning';
import WhyRajProperties from '../components/WhyRajProperties';
import AboutSection from '../components/AboutSection';
import InquiryForm from '../components/InquiryForm';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LocationModal from '../components/LocationModal';
import SEO from '../components/SEO';

export default function HomePage() {
  const [inquiryData, setInquiryData] = useState({});
  const [selectedModalLocation, setSelectedModalLocation] = useState(null);

  const handleOpenInquiry = (data = {}) => {
    setInquiryData(data);
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreOptions = () => {
    const el = document.getElementById('planning');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocationSelect = (locationName, extra = {}) => {
    handleOpenInquiry({
      location: locationName,
      preferredLocation: locationName,
      ...extra,
    });
  };

  const handlePlanningSubmit = (planningData) => {
    handleOpenInquiry({
      lookingFor: planningData.lookingFor,
      location: planningData.preferredLocation,
      preferredLocation: planningData.preferredLocation,
      propertyType: planningData.propertyType,
      budget: planningData.budget,
      message: `Purpose: ${planningData.purpose}`,
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans selection:bg-[#0071E3] selection:text-white">
      {/* Homepage SEO Metadata */}
      <SEO
        title="RAJ PROPERTIES — Property Consultant in Pune | Real Estate Guidance"
        description="Trusted real estate consultation in Pune. Expert guidance for buying, renting, and investing in Pride World City, Charholi, Kharadi, Viman Nagar, Dhanori, and Lohegaon."
        canonicalUrl="https://rajproperties.in/"
      />

      <Navbar onOpenInquiry={handleOpenInquiry} />

      <main>
        <Hero onOpenInquiry={handleOpenInquiry} />
        <Introduction />
        
        {/* Real Geographical Pune Explorer */}
        <LocationExplorerMap
          onSelectLocation={handleLocationSelect}
          onOpenModal={(location) => setSelectedModalLocation(location)}
        />

        {/* Minimal Address Showcase & Overview */}
        <ExploreLocations onSelectLocation={handleLocationSelect} />
        
        {/* Pride World City Special Feature */}
        <PrideWorldCity
          onEnquire={() => handleLocationSelect('Pride World City')}
          onExploreOptions={handleExploreOptions}
        />
        
        {/* Interactive Property Planning Questionnaire */}
        <PropertyPlanning onSubmit={handlePlanningSubmit} />
        
        <WhyRajProperties />
        <AboutSection />
        
        <InquiryForm
          initialData={inquiryData}
          onResetInitialData={() => setInquiryData({})}
        />
        
        <ContactSection onScrollToInquiry={() => handleOpenInquiry()} />
      </main>

      <Footer />

      {/* Global Location Modal */}
      {selectedModalLocation && (
        <LocationModal
          location={selectedModalLocation}
          onClose={() => setSelectedModalLocation(null)}
          onEnquire={handleLocationSelect}
        />
      )}
    </div>
  );
}
