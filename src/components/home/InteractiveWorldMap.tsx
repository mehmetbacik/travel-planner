"use client";

import { Dictionary } from "@/types/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchAllCountries, fetchCountryByName, Country, CountryMapData } from "@/services/api/map";

interface InteractiveWorldMapProps {
  dict: Dictionary;
}

interface Continent {
  id: string;
  name: string;
  path: string;
  color: string;
  hoverColor: string;
  countries: string[];
  description: string;
}

// Continent data with realistic SVG paths and country lists
const continents: Continent[] = [
  {
    id: "north-america",
    name: "North America",
    path: "M 50 30 L 180 30 L 180 120 L 50 120 Z",
    color: "#4CAF50",
    hoverColor: "#66BB6A",
    countries: ["United States", "Canada", "Mexico", "Cuba", "Jamaica", "Haiti", "Dominican Republic", "Puerto Rico", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panama"],
    description: "From the frozen tundra of Canada to the tropical beaches of Mexico"
  },
  {
    id: "south-america",
    name: "South America",
    path: "M 100 100 L 200 100 L 200 200 L 100 200 Z",
    color: "#FF9800",
    hoverColor: "#FFB74D",
    countries: ["Brazil", "Argentina", "Colombia", "Peru", "Venezuela", "Chile", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Guyana", "Suriname", "French Guiana"],
    description: "Home to the Amazon rainforest and the Andes mountains"
  },
  {
    id: "europe",
    name: "Europe",
    path: "M 190 40 L 280 40 L 280 100 L 190 100 Z",
    color: "#2196F3",
    hoverColor: "#42A5F5",
    countries: ["United Kingdom", "France", "Germany", "Italy", "Spain", "Russia", "Poland", "Ukraine", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Portugal", "Greece", "Turkey"],
    description: "Rich in history, culture, and architectural wonders"
  },
  {
    id: "africa",
    name: "Africa",
    path: "M 190 80 L 280 80 L 280 180 L 190 180 Z",
    color: "#9C27B0",
    hoverColor: "#BA68C8",
    countries: ["South Africa", "Egypt", "Nigeria", "Kenya", "Ethiopia", "Morocco", "Algeria", "Ghana", "Uganda", "Tanzania", "Sudan", "Libya", "Tunisia", "Senegal", "Ivory Coast", "Cameroon"],
    description: "The cradle of humanity with diverse landscapes and cultures"
  },
  {
    id: "asia",
    name: "Asia",
    path: "M 230 30 L 380 30 L 380 130 L 230 130 Z",
    color: "#F44336",
    hoverColor: "#EF5350",
    countries: ["China", "Japan", "India", "South Korea", "Thailand", "Vietnam", "Indonesia", "Malaysia", "Philippines", "Singapore", "Taiwan", "Hong Kong", "Cambodia", "Laos", "Myanmar", "Bangladesh", "Pakistan", "Iran", "Iraq", "Saudi Arabia", "UAE", "Israel", "Lebanon", "Jordan", "Syria"],
    description: "The largest continent with ancient civilizations and modern cities"
  },
  {
    id: "oceania",
    name: "Oceania",
    path: "M 320 120 L 380 120 L 380 180 L 320 180 Z",
    color: "#00BCD4",
    hoverColor: "#26C6DA",
    countries: ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Solomon Islands", "Vanuatu", "New Caledonia", "Samoa", "Tonga", "Micronesia", "Palau", "Marshall Islands"],
    description: "Islands scattered across the Pacific Ocean"
  }
];

export default function InteractiveWorldMap({ dict }: InteractiveWorldMapProps) {
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countriesData, setCountriesData] = useState<Country[]>([]);

  // Load country data from API
  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const countries = await fetchAllCountries();
        setCountriesData(countries);
      } catch (error) {
        console.error('Error loading country data:', error);
      }
    };

    loadCountryData();
  }, []);

  const handleContinentClick = (continent: Continent) => {
    setSelectedContinent(continent);
    setIsSidebarOpen(true);
  };

  const handleCountryClick = async (countryName: string) => {
    setIsLoading(true);
    try {
      // First try to find in already loaded countries data
      let country = countriesData.find(c => c.name.common === countryName);
      
      // If not found, try to find by partial match
      if (!country) {
        country = countriesData.find(c => 
          c.name.common.toLowerCase().includes(countryName.toLowerCase()) ||
          c.name.official.toLowerCase().includes(countryName.toLowerCase())
        );
      }
      
      // If still not found, fetch from API
      if (!country) {
        const apiCountries = await fetchCountryByName(countryName);
        if (apiCountries && apiCountries.length > 0) {
          country = apiCountries[0];
        }
      }
      
      if (country) {
        setSelectedCountry(country);
        setIsModalOpen(true);
      } else {
        console.error('Country not found:', countryName);
        // You could add a toast notification here
      }
    } catch (error) {
      console.error('Error fetching country details:', error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatArea = (area: number) => {
    return `${formatNumber(area)} km²`;
  };

  return (
    <section className="interactiveWorldMap" aria-labelledby="interactiveWorldMap">
      <div className="interactiveWorldMap__body container">
        <div className="interactiveWorldMap__header">
          <h2 id="interactiveWorldMap-title" className="interactiveWorldMap__title">
            {dict.interactiveWorldMap.title}
          </h2>
          <p className="interactiveWorldMap__description">
            {dict.interactiveWorldMap.description}
          </p>
        </div>
        
        <div className="interactiveWorldMap__content">
          <motion.div 
            className="world-map-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <svg
              viewBox="0 0 400 220"
              className="world-map"
            >
              {/* Background ocean */}
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#E3F2FD", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#BBDEFB", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              
              <rect
                x="0"
                y="0"
                width="400"
                height="220"
                fill="url(#oceanGradient)"
                className="ocean-bg"
              />
              
              {/* Continents */}
              {continents.map((continent, index) => (
                <motion.path
                  key={continent.id}
                  d={continent.path}
                  className={`continent-path ${hoveredContinent === continent.id ? 'hovered' : ''}`}
                  fill={continent.color}
                  stroke="#fff"
                  strokeWidth="2"
                  onMouseEnter={() => setHoveredContinent(continent.id)}
                  onMouseLeave={() => setHoveredContinent(null)}
                  onClick={() => handleContinentClick(continent)}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1
                  }}
                />
              ))}
              
                             {/* Continent labels */}
               {continents.map((continent) => (
                 <text
                   key={`label-${continent.id}`}
                   x={continent.id === "north-america" ? 115 : 
                      continent.id === "south-america" ? 150 : 
                      continent.id === "europe" ? 235 : 
                      continent.id === "africa" ? 235 : 
                      continent.id === "asia" ? 305 : 350}
                   y={continent.id === "north-america" ? 75 : 
                      continent.id === "south-america" ? 150 : 
                      continent.id === "europe" ? 70 : 
                      continent.id === "africa" ? 130 : 
                      continent.id === "asia" ? 80 : 150}
                   className="continent-label"
                   textAnchor="middle"
                   dominantBaseline="middle"
                   fill="#fff"
                   fontSize="12"
                   fontWeight="bold"
                 >
                   {continent.name}
                 </text>
               ))}
            </svg>
            
                         {/* Continent tooltip */}
             {hoveredContinent && (
               <motion.div
                 className="continent-tooltip"
                 style={{
                   left: '50%',
                   top: '50%',
                   transform: 'translate(-50%, -50%)'
                 }}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.2 }}
               >
                 <h4>{continents.find(c => c.id === hoveredContinent)?.name}</h4>
                 <p>{continents.find(c => c.id === hoveredContinent)?.description}</p>
               </motion.div>
             )}
          </motion.div>
        </div>
      </div>

      {/* Sliding Sidebar for Countries */}
      <AnimatePresence>
        {isSidebarOpen && selectedContinent && (
          <motion.div
            className="countries-sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div
              className="countries-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sidebar-header">
                <h3>{selectedContinent.name}</h3>
                <button 
                  className="sidebar-close"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="sidebar-content">
                <p className="continent-description">{selectedContinent.description}</p>
                <div className="countries-grid">
                  {selectedContinent.countries.map((countryName) => (
                    <motion.button
                      key={countryName}
                      className="country-card"
                      onClick={() => handleCountryClick(countryName)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="country-name">{countryName}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Country Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCountry && (
          <motion.div
            className="country-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="country-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {isLoading ? (
                <div className="modal-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading country details...</p>
                </div>
              ) : (
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="country-flag">
                      <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />
                    </div>
                    <div className="country-info">
                      <h3>{selectedCountry.name.common}</h3>
                      <p className="official-name">{selectedCountry.name.official}</p>
                    </div>
                    <button 
                      className="modal-close"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="country-details">
                      <div className="detail-row">
                        <span className="label">Capital:</span>
                        <span className="value">{selectedCountry.capital.join(', ')}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Region:</span>
                        <span className="value">{selectedCountry.region}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Subregion:</span>
                        <span className="value">{selectedCountry.subregion}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Population:</span>
                        <span className="value">{formatNumber(selectedCountry.population)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Area:</span>
                        <span className="value">{formatArea(selectedCountry.area)}</span>
                      </div>
                      {selectedCountry.currencies && (
                        <div className="detail-row">
                          <span className="label">Currency:</span>
                          <span className="value">
                            {Object.values(selectedCountry.currencies).map(currency => 
                              `${currency.name} (${currency.symbol})`
                            ).join(', ')}
                          </span>
                        </div>
                      )}
                      {selectedCountry.languages && (
                        <div className="detail-row">
                          <span className="label">Languages:</span>
                          <span className="value">
                            {Object.values(selectedCountry.languages).join(', ')}
                          </span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span className="label">Timezones:</span>
                        <span className="value">{selectedCountry.timezones.join(', ')}</span>
                      </div>
                      {selectedCountry.borders.length > 0 && (
                        <div className="detail-row">
                          <span className="label">Borders:</span>
                          <span className="value">{selectedCountry.borders.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}