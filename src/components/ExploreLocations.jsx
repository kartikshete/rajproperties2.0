import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, BookOpen } from 'lucide-react';
import LocationModal from './LocationModal';

const LOCATIONS = [
  {
    id: 'pride-world-city',
    name: 'Pride World City',
    description: 'A benchmark 400-acre integrated township in Charholi / Lohegaon offering modern living, schools, retail, and serene open expanses.',
    tag: 'Integrated Township',
  },
  {
    id: 'lohegaon',
    name: 'Lohegaon',
    description: 'A rapidly evolving residential suburb with close proximity to the Pune Airport, reputable educational institutes, and convenient transit hubs.',
    tag: 'Airport Vicinity',
  },
  {
    id: 'dhanori',
    name: 'Dhanori',
    description: 'One of Northeast Pune’s fastest growing residential corridors, favored for its lifestyle communities and easy reach to Vishrantwadi and Viman Nagar.',
    tag: 'Emerging Hub',
  },
  {
    id: 'kharadi',
    name: 'Kharadi',
    description: 'Pune’s premier IT and business corridor home to EON Free Zone, World Trade Center, and high-end residential towers.',
    tag: 'Tech & Business Hub',
  },
  {
    id: 'wadgaon-sheri',
    name: 'Wadgaon Sheri',
    description: 'A strategically situated urban neighborhood connecting Kalyani Nagar, Koregaon Park, and Kharadi with extensive residential choices.',
    tag: 'Central Connectivity',
  },
  {
    id: 'viman-nagar',
    name: 'Viman Nagar',
    description: 'An elite, vibrant lifestyle hub featuring premium residential apartments, luxury malls, cafes, top universities, and corporate offices.',
    tag: 'Prime Lifestyle',
  },
  {
    id: 'charholi',
    name: 'Charholi',
    description: 'A planned growth node offering green horizons, upcoming ring road infrastructure, and expansive residential plotted & apartment layouts.',
    tag: 'Growth Corridor',
  },
  {
    id: 'vishrantwadi',
    name: 'Vishrantwadi',
    description: 'An established, highly accessible residential locality offering strong road networks to Pune Station, Airport, and the Old City core.',
    tag: 'Established Corridor',
  },
];

export default function ExploreLocations({ onSelectLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleOpenModal = (location) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  const handleEnquire = (locName, extra) => {
    onSelectLocation(locName, extra);
  };

  return (
    <section className="py-24 sm:py-32 bg-white" id="locations">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F7] text-xs font-medium text-[#86868B] mb-4">
            <Compass size={14} />
            <span>Locations We Advise On</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] mb-4">
            Find Your Next Address.
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] font-normal leading-relaxed">
            Explore the locations where your next opportunity could begin. Click to enquire or explore dedicated guides.
          </p>
        </div>

        {/* Minimal Apple-Style Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LOCATIONS.map((location, idx) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#FBFBFD] hover:bg-[#F5F5F7] border border-black/[0.05] hover:border-black/[0.12] transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div 
                onClick={() => handleOpenModal(location)}
                className="cursor-pointer"
              >
                <span className="text-[11px] font-mono font-medium text-[#86868B] tracking-wider uppercase block mb-3">
                  0{idx + 1} &middot; {location.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight group-hover:text-[#0071E3] transition-colors mb-2">
                  {location.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#86868B] line-clamp-2 leading-relaxed">
                  {location.description}
                </p>
              </div>

              {/* Actions row: Enquire Modal & SEO Page Link */}
              <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleOpenModal(location)}
                  className="text-xs font-medium text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors flex items-center gap-1"
                >
                  <span>Quick Enquire</span>
                  <ArrowUpRight size={13} />
                </button>

                <Link
                  to={`/locations/${location.id}`}
                  className="text-[11px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors underline underline-offset-2"
                >
                  Full Guide
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Location Modal */}
      {selectedLocation && (
        <LocationModal
          location={selectedLocation}
          onClose={handleCloseModal}
          onEnquire={handleEnquire}
        />
      )}
    </section>
  );
}
