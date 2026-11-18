import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, 
  Layers, 
  Navigation, 
  ArrowUpRight, 
  MessageSquare, 
  Check, 
  MapPin, 
  Compass, 
  ExternalLink,
  X,
  Maximize2
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

// Geographically accurate coordinates for all 8 locations in Pune
export const PUNE_LOCATIONS = [
  {
    id: 'pride-world-city',
    name: 'Pride World City, Charholi',
    shortName: 'Pride World City',
    tag: 'Integrated Township',
    lat: 18.6258,
    lng: 73.8996,
    zoomLevel: 15,
    keyArtery: 'Charholi-Alandi Road & Ring Road',
    nearbyLandmarks: 'Podar International School, D.Y. Patil Knowledge City, Pune Airport',
    description: 'A 400-acre master-planned township in Charholi offering modern residential sectors, high-street retail, international schooling, and wide internal boulevards.',
    connectivity: [
      '15 mins to Pune International Airport',
      'Direct frontage on PMRDA Ring Road corridor',
      'Connected to Alandi Road & Dighi-Lohegaon spine'
    ],
    propertyTypes: ['2, 3 & 4 BHK Apartments', 'Townhouses', 'High-Street Retail'],
  },
  {
    id: 'charholi',
    name: 'Charholi',
    shortName: 'Charholi',
    tag: 'PMRDA Growth Corridor',
    lat: 18.6189,
    lng: 73.8967,
    zoomLevel: 15,
    keyArtery: 'Pune-Alandi Highway & Inner Ring Road',
    nearbyLandmarks: 'Indrayani River Basin, Alandi Temple Town, Spine Road',
    description: 'A strategic northern growth hub adjoining PCMC and Pune City, witnessing major arterial road expansions, planned infrastructure, and tranquil residential projects.',
    connectivity: [
      'PMRDA 128m Ring Road network connection',
      'Quick transit to Bhosari MIDC and Chakan Auto Cluster',
      'Direct link to Dhanori & Lohegaon'
    ],
    propertyTypes: ['1, 2 & 3 BHK Apartments', 'Plotted Gated Communities', 'Commercial Spaces'],
  },
  {
    id: 'lohegaon',
    name: 'Lohegaon',
    shortName: 'Lohegaon',
    tag: 'Airport Vicinity',
    lat: 18.5980,
    lng: 73.9260,
    zoomLevel: 15,
    keyArtery: 'Lohegaon-Wagholi Road & Airport Road',
    nearbyLandmarks: 'Pune International Airport, Air Force Station, DY Patil University',
    description: 'A bustling residential locality directly adjacent to Pune Airport, recognized for its active rental market, educational institutions, and thriving local commerce.',
    connectivity: [
      '5-8 mins from Pune Airport Terminal',
      'Direct bypass to Wagholi & Kharadi IT belt',
      'Rapid connection to Viman Nagar & Vishrantwadi'
    ],
    propertyTypes: ['1 & 2 BHK Residences', 'Studio Suites', 'Commercial Showrooms'],
  },
  {
    id: 'dhanori',
    name: 'Dhanori',
    shortName: 'Dhanori',
    tag: 'Strategic Residential Hub',
    lat: 18.5878,
    lng: 73.8970,
    zoomLevel: 15,
    keyArtery: 'Dhanori-Tingre Nagar Main Road',
    nearbyLandmarks: 'Dhanori Lake, Tingre Nagar, Orchid Hospital',
    description: 'A preferred family residential address connecting Vishrantwadi, Lohegaon, and Viman Nagar, featuring expansive gated communities and everyday retail avenues.',
    connectivity: [
      '10 mins to Viman Nagar lifestyle hub',
      'Convenient access to Pune Railway Station via Vishrantwadi',
      'Direct route to Pune Airport'
    ],
    propertyTypes: ['2 & 3 BHK Gated Apartments', 'Family Housing', 'Commercial Shops'],
  },
  {
    id: 'kharadi',
    name: 'Kharadi',
    shortName: 'Kharadi',
    tag: 'IT & Financial Hub',
    lat: 18.5514,
    lng: 73.9348,
    zoomLevel: 15,
    keyArtery: 'Ahmednagar Highway & Kharadi Bypass',
    nearbyLandmarks: 'EON Free Zone, World Trade Center Pune, Radisson Blu Hotel',
    description: 'Eastern Pune’s premier business district, hosting Fortune 500 tech majors in EON IT Park & WTC alongside luxury riverfront condominiums and fine dining.',
    connectivity: [
      'Pune Metro Line extension (Ramwadi - Wagholi)',
      'Direct arterial link to Magarpatta City & Hadapsar',
      '15 mins to Pune Airport'
    ],
    propertyTypes: ['Luxury 3 & 4 BHK Apartments', 'Corporate Offices', 'Executive Rentals'],
  },
  {
    id: 'viman-nagar',
    name: 'Viman Nagar',
    shortName: 'Viman Nagar',
    tag: 'Prime Lifestyle Corridor',
    lat: 18.5679,
    lng: 73.9143,
    zoomLevel: 15,
    keyArtery: 'Pune-Ahmednagar Road & Symbiosis Road',
    nearbyLandmarks: 'Phoenix Marketcity, Symbiosis International University, Hyatt Pune',
    description: 'An elite, high-value urban enclave known for luxury high-rises, upscale cafes, premier shopping malls, top-tier schools, and corporate headquarters.',
    connectivity: [
      'Operational Pune Metro Stations (Ramwadi & Viman Nagar)',
      'Immediate access to Pune Airport (5 mins)',
      'Seamless link to Koregaon Park & Kalyani Nagar'
    ],
    propertyTypes: ['High-End 2, 3 & 4 BHKs', 'Penthouses', 'Boutique Commercial'],
  },
  {
    id: 'wadgaon-sheri',
    name: 'Wadgaon Sheri',
    shortName: 'Wadgaon Sheri',
    tag: 'Urban Central Corridor',
    lat: 18.5529,
    lng: 73.9182,
    zoomLevel: 15,
    keyArtery: 'Nagar Road & Kalyani Nagar Link Road',
    nearbyLandmarks: 'Bishop’s School, Inorbit Mall, Cerebrum IT Park',
    description: 'A densely connected central locality positioned right between Kalyani Nagar and Kharadi, providing convenient commutes to both business parks and social hotspots.',
    connectivity: [
      'Minutes from Koregaon Park & Kalyani Nagar bridges',
      'Flanked by Nagar Road with Metro connectivity',
      'Immediate access to Kharadi IT hub'
    ],
    propertyTypes: ['1, 2 & 3 BHK Apartments', 'Commercial Frontage', 'Rental Housing'],
  },
  {
    id: 'vishrantwadi',
    name: 'Vishrantwadi',
    shortName: 'Vishrantwadi',
    tag: 'Established Core Corridor',
    lat: 18.5658,
    lng: 73.8797,
    zoomLevel: 15,
    keyArtery: 'Alandi Road & Tingre Nagar Road',
    nearbyLandmarks: 'Vishrantwadi Chowk, Kasturba Gandhi Colony, Bombay Sappers',
    description: 'A central, mature residential hub boasting tree-lined avenues, direct arterial road access to Old Pune, Pune Station, Shivajinagar, and the airport.',
    connectivity: [
      '15 mins to Pune Railway Station & Camp',
      'Direct highway corridor towards Alandi & Chakan',
      'Adjoining Tingre Nagar & Dhanori'
    ],
    propertyTypes: ['Established 2 & 3 BHK Societies', 'Independent Plots', 'Commercial Showrooms'],
  },
];

export default function LocationExplorerMap({ onSelectLocation, onOpenModal }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const tileLayersRef = useRef({});

  const [activeLocationId, setActiveLocationId] = useState(PUNE_LOCATIONS[0].id);
  const [mapLayerType, setMapLayerType] = useState('street'); // 'street' | 'satellite'
  const [searchQuery, setSearchQuery] = useState('');

  const activeLocation = PUNE_LOCATIONS.find((loc) => loc.id === activeLocationId) || PUNE_LOCATIONS[0];

  // Filter locations based on search query
  const filteredLocations = PUNE_LOCATIONS.filter((loc) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.tag.toLowerCase().includes(q) ||
      loc.nearbyLandmarks.toLowerCase().includes(q) ||
      loc.keyArtery.toLowerCase().includes(q)
    );
  });

  // Initialize Real Geographical Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Centered on Northeast Pune corridor encompassing all 8 locations
    const map = L.map(mapContainerRef.current, {
      center: [18.588, 73.910],
      zoom: 12.5,
      minZoom: 10,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false, // Prevents unintended scroll traps on page navigation
      touchZoom: true,
      dragging: true,
      tapTolerance: 25,
    });

    // 1. REAL STREET MAP: OpenStreetMap Standard Tiles
    const streetTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    });

    // 2. REAL HIGH-RESOLUTION SATELLITE: Esri World Imagery with Streets/Places labels
    const satelliteTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri',
    });

    // Satellite label overlay so streets & locality names remain crisp over satellite imagery
    const satelliteLabelsLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
    });

    // Store references
    tileLayersRef.current = {
      street: streetTileLayer,
      satellite: L.layerGroup([satelliteTileLayer, satelliteLabelsLayer]),
    };

    // Default to real street map
    streetTileLayer.addTo(map);

    // Zoom controls at top right with touch-friendly spacing
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Create realistic Google/Apple Maps-style pin markers
    const markers = {};
    PUNE_LOCATIONS.forEach((location) => {
      const isSelected = location.id === activeLocationId;
      
      const pinIcon = L.divIcon({
        className: 'real-map-pin-container',
        html: `
          <div class="pin-anchor ${isSelected ? 'pin-selected' : ''}" id="marker-${location.id}">
            <div class="pin-badge">
              <span class="pin-dot"></span>
              <span class="pin-label">${location.shortName}</span>
            </div>
            <div class="pin-teardrop">
              <div class="pin-teardrop-core"></div>
            </div>
            <div class="pin-shadow"></div>
          </div>
        `,
        iconSize: [140, 52],
        iconAnchor: [70, 50],
      });

      const marker = L.marker([location.lat, location.lng], { icon: pinIcon }).addTo(map);

      marker.on('click', () => {
        setActiveLocationId(location.id);
        map.flyTo([location.lat, location.lng], location.zoomLevel, {
          duration: 1.1,
          easeLinearity: 0.25,
        });
      });

      markers[location.id] = marker;
    });

    markersRef.current = markers;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch between Street Map and Satellite View
  const handleToggleMapLayer = (layerType) => {
    setMapLayerType(layerType);
    const map = mapInstanceRef.current;
    if (!map || !tileLayersRef.current) return;

    if (layerType === 'satellite') {
      map.removeLayer(tileLayersRef.current.street);
      tileLayersRef.current.satellite.addTo(map);
    } else {
      map.removeLayer(tileLayersRef.current.satellite);
      tileLayersRef.current.street.addTo(map);
    }
  };

  // Sync active marker visual style whenever activeLocationId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersRef.current) return;

    PUNE_LOCATIONS.forEach((location) => {
      const marker = markersRef.current[location.id];
      if (marker) {
        const isSelected = location.id === activeLocationId;
        const pinIcon = L.divIcon({
          className: 'real-map-pin-container',
          html: `
            <div class="pin-anchor ${isSelected ? 'pin-selected' : ''}" id="marker-${location.id}">
              <div class="pin-badge">
                <span class="pin-dot"></span>
                <span class="pin-label">${location.shortName}</span>
              </div>
              <div class="pin-teardrop">
                <div class="pin-teardrop-core"></div>
              </div>
              <div class="pin-shadow"></div>
            </div>
          `,
          iconSize: [140, 52],
          iconAnchor: [70, 50],
        });
        marker.setIcon(pinIcon);
        if (isSelected) {
          marker.setZIndexOffset(1000);
        } else {
          marker.setZIndexOffset(0);
        }
      }
    });
  }, [activeLocationId]);

  // Handle location selection from sidebar or mobile pills
  const handleSelectLocation = (location) => {
    setActiveLocationId(location.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([location.lat, location.lng], location.zoomLevel, {
        duration: 1.1,
        easeLinearity: 0.25,
      });
    }
  };

  // Handle inquiry submission with location pre-filled
  const handleInquiryIntent = (intent) => {
    if (onSelectLocation) {
      onSelectLocation(activeLocation.name, {
        lookingFor: intent,
        location: activeLocation.name,
        preferredLocation: activeLocation.name,
      });
    }
  };

  // Open real Google Maps turn-by-turn directions to coordinates
  const handleGetDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${activeLocation.lat},${activeLocation.lng}`;
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
  };

  // Reset to full Pune Northeast Corridor overview
  const handleOverviewClick = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([18.588, 73.910], 12.3, { duration: 1.1 });
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white border-t border-black/[0.04] overflow-x-hidden" id="map-explorer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.04] text-xs font-medium text-[#1D1D1F] mb-3">
            <Compass size={14} className="text-[#0071E3]" />
            <span>Real Geographic Pune Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-[#1D1D1F] mb-3">
            Explore Pune. Find Your Place.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#86868B] font-normal leading-relaxed">
            Discover locations and explore property opportunities across Pune.
          </p>
        </div>

        {/* MOBILE-ONLY: Quick Horizontal Touch-Swipeable Corridor Filter */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none momentum-scroll -mx-4 px-4">
            {PUNE_LOCATIONS.map((loc) => {
              const isActive = loc.id === activeLocationId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handleSelectLocation(loc)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border min-h-[38px] ${
                    isActive
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent active:bg-[#E8E8ED]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#0071E3]' : 'bg-[#86868B]'}`}></span>
                  <span>{loc.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Explorer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* DESKTOP-ONLY: Left Column Interactive Corridor Selector & Search (4 Cols) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between space-y-4">
            <div className="bg-[#FBFBFD] border border-black/[0.06] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col h-full">
              
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search corridor or landmark..."
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#1D1D1F] placeholder-[#86868B] focus:border-[#0071E3] focus:outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Header Info */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/[0.05]">
                <span className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                  {filteredLocations.length} Pune Corridors
                </span>
                <span className="text-[11px] text-[#0071E3] bg-[#0071E3]/8 px-2 py-0.5 rounded-full font-medium">
                  Select to Zoom
                </span>
              </div>

              {/* Location Cards List */}
              <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
                {filteredLocations.map((loc) => {
                  const isActive = loc.id === activeLocationId;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleSelectLocation(loc)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-start justify-between border ${
                        isActive
                          ? 'bg-white border-[#1D1D1F] shadow-sm ring-1 ring-[#1D1D1F]'
                          : 'bg-transparent hover:bg-white/80 border-transparent hover:border-black/[0.06]'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#86868B]'
                          }`}>
                            {loc.tag}
                          </span>
                        </div>
                        <h4 className={`text-sm font-semibold truncate ${
                          isActive ? 'text-[#1D1D1F]' : 'text-[#1D1D1F]/90'
                        }`}>
                          {loc.shortName}
                        </h4>
                        <p className="text-[11px] text-[#86868B] truncate mt-0.5">
                          {loc.keyArtery}
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        {isActive ? (
                          <div className="w-5 h-5 rounded-full bg-[#0071E3] text-white flex items-center justify-center">
                            <Check size={12} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full text-[#86868B] flex items-center justify-center opacity-60">
                            <ArrowUpRight size={13} />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}

                {filteredLocations.length === 0 && (
                  <div className="py-8 text-center text-xs text-[#86868B]">
                    No locations matching "{searchQuery}".
                  </div>
                )}
              </div>

              {/* Advisor Contact Strip */}
              <div className="mt-4 pt-3.5 border-t border-black/[0.05] text-[12px] text-[#86868B] flex items-center justify-between">
                <span>Direct consultation:</span>
                <span className="font-semibold text-[#1D1D1F]">{siteConfig.phone1.display}</span>
              </div>
            </div>
          </div>

          {/* Right Column (Full width on mobile, 8 cols on desktop) */}
          <div className="w-full lg:col-span-8 flex flex-col space-y-4">
            
            {/* Map Canvas with Responsive Height */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.08] shadow-apple-card bg-[#F5F5F7] h-[320px] sm:h-[420px] lg:h-[480px]">
              
              {/* Leaflet DOM container */}
              <div ref={mapContainerRef} className="w-full h-full z-0 touch-pan-x touch-pan-y" />

              {/* Layer Toggle: Real Streets vs Real Satellite Imagery */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl sm:rounded-2xl border border-black/[0.08] shadow-md flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleMapLayer('street')}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
                      mapLayerType === 'street'
                        ? 'bg-[#1D1D1F] text-white shadow-xs'
                        : 'text-[#1D1D1F] active:bg-[#F5F5F7]'
                    }`}
                  >
                    🗺️ Map
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleMapLayer('satellite')}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
                      mapLayerType === 'satellite'
                        ? 'bg-[#1D1D1F] text-white shadow-xs'
                        : 'text-[#1D1D1F] active:bg-[#F5F5F7]'
                    }`}
                  >
                    🛰️ Satellite
                  </button>
                </div>
              </div>

              {/* Reset to Pune Overview Button */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                <button
                  type="button"
                  onClick={handleOverviewClick}
                  className="bg-white/95 active:bg-white backdrop-blur-md text-[#1D1D1F] text-[11px] sm:text-xs font-medium px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-black/[0.08] shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Maximize2 size={12} className="text-[#0071E3]" />
                  <span>Show All Pune</span>
                </button>
              </div>

            </div>

            {/* Selected Location Bottom Sheet / Info Card */}
            <div className="bg-white border border-black/[0.08] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-apple-card transition-all">
              
              {/* Top Row: Title, Tag & Navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#0071E3] bg-[#0071E3]/8 px-2 sm:px-2.5 py-0.5 rounded-full">
                      {activeLocation.tag}
                    </span>
                    <span className="text-[11px] text-[#86868B] font-mono">
                      {activeLocation.lat.toFixed(4)}° N, {activeLocation.lng.toFixed(4)}° E
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
                    {activeLocation.name}
                  </h3>
                </div>

                {/* Get Directions Button (Opens Real Google Maps Directions) */}
                <button
                  type="button"
                  onClick={handleGetDirections}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#F5F5F7] active:bg-[#E8E8ED] text-xs font-medium text-[#1D1D1F] transition-all self-start sm:self-auto border border-black/[0.04] min-h-[38px]"
                >
                  <Navigation size={13} className="text-[#0071E3]" />
                  <span>Get Directions</span>
                  <ExternalLink size={12} className="text-[#86868B]" />
                </button>
              </div>

              {/* Connecting Artery & Nearby Landmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-4 p-3 sm:p-3.5 bg-[#FBFBFD] rounded-xl sm:rounded-2xl border border-black/[0.04] text-xs">
                <div>
                  <span className="text-[#86868B] block mb-0.5">Connecting Artery:</span>
                  <strong className="text-[#1D1D1F] font-medium">{activeLocation.keyArtery}</strong>
                </div>
                <div>
                  <span className="text-[#86868B] block mb-0.5">Key Landmarks:</span>
                  <strong className="text-[#1D1D1F] font-medium">{activeLocation.nearbyLandmarks}</strong>
                </div>
              </div>

              {/* Locality Description */}
              <p className="text-xs sm:text-sm text-[#86868B] font-normal leading-relaxed mb-4 sm:mb-5">
                {activeLocation.description}
              </p>

              {/* Connectivity Highlights */}
              <div className="mb-5">
                <span className="text-[11px] font-semibold text-[#1D1D1F] uppercase tracking-wider block mb-2">
                  Key Transit Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeLocation.connectivity.map((item) => (
                    <div key={item} className="text-[11px] sm:text-xs bg-[#F5F5F7] text-[#1D1D1F]/90 p-2 sm:p-2.5 rounded-xl border border-black/[0.03]">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Touch-Friendly Action Buttons Row */}
              <div className="pt-4 sm:pt-5 border-t border-black/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                <div className="grid grid-cols-2 sm:flex items-center gap-2">
                  {/* Buy Property Inquiry */}
                  <button
                    type="button"
                    onClick={() => handleInquiryIntent('Buy')}
                    className="px-4 sm:px-5 py-3 rounded-full bg-[#1D1D1F] active:bg-black text-white text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <span>Buy in {activeLocation.shortName}</span>
                    <ArrowUpRight size={13} />
                  </button>

                  {/* Rent Property Inquiry */}
                  <button
                    type="button"
                    onClick={() => handleInquiryIntent('Rent')}
                    className="px-4 sm:px-5 py-3 rounded-full bg-white active:bg-[#F5F5F7] text-[#1D1D1F] text-xs font-medium border border-neutral-300 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <span>Rent in {activeLocation.shortName}</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                {/* Explore Full Location Consultation */}
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenModal) {
                      onOpenModal(activeLocation);
                    } else if (onSelectLocation) {
                      onSelectLocation(activeLocation.name);
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#0071E3] active:bg-[#0077ED] text-white text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <MessageSquare size={13} />
                  <span>Enquire About {activeLocation.shortName}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Realistic Real-Map Marker Pin CSS with Touch Optimization */}
      <style>{`
        .real-map-pin-container {
          background: transparent !important;
          border: none !important;
        }
        .pin-anchor {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transform: translateY(0);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          touch-action: manipulation;
        }
        .pin-anchor:hover, .pin-anchor:active {
          transform: translateY(-4px) scale(1.05);
        }
        .pin-anchor.pin-selected {
          transform: translateY(-6px) scale(1.1);
          z-index: 9999 !important;
        }

        /* Label badge over pin */
        .pin-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #FFFFFF;
          color: #1D1D1F;
          padding: 4px 9px;
          border-radius: 9999px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.22);
          border: 1px solid rgba(0,0,0,0.12);
          white-space: nowrap;
          margin-bottom: 2px;
          transition: all 0.25s ease;
        }
        .pin-anchor.pin-selected .pin-badge {
          background: #1D1D1F;
          color: #FFFFFF;
          border-color: #1D1D1F;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
        }
        .pin-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #FF3B30;
        }
        .pin-anchor.pin-selected .pin-dot {
          background: #0071E3;
        }
        .pin-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        /* Realistic Map Pin teardrop */
        .pin-teardrop {
          width: 22px;
          height: 22px;
          border-radius: 50% 50% 50% 0;
          background: #FF3B30;
          transform: rotate(-45deg);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.25s ease;
        }
        .pin-anchor.pin-selected .pin-teardrop {
          background: #0071E3;
          box-shadow: 0 4px 12px rgba(0, 113, 227, 0.45);
        }
        .pin-teardrop-core {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #FFFFFF;
        }

        /* Pin Shadow */
        .pin-shadow {
          width: 14px;
          height: 4px;
          border-radius: 50%;
          background: rgba(0,0,0,0.25);
          margin-top: -2px;
          filter: blur(1px);
        }

        /* Leaflet Controls Styling */
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15) !important;
        }
        .leaflet-control-zoom a {
          background-color: #FFFFFF !important;
          color: #1D1D1F !important;
          border: none !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
          transition: background-color 0.2s !important;
        }
        .leaflet-control-zoom a:active {
          background-color: #F5F5F7 !important;
        }
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.85) !important;
          font-size: 9px !important;
          color: #86868B !important;
          border-radius: 6px !important;
          margin: 3px !important;
        }
      `}</style>
    </section>
  );
}
