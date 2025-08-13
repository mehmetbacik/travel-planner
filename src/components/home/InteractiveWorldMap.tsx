"use client";

import { Dictionary } from "@/types/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchAllCountries, fetchCountryByCode, Country, CountryMapData } from "@/services/api/map";

interface InteractiveWorldMapProps {
  dict: Dictionary;
}

// Realistic world map paths for major countries
const worldMapData: CountryMapData[] = [
  // North America
  { id: "us", name: "United States", path: "M 50 60 L 150 60 L 150 90 L 50 90 Z", countryCode: "USA", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  { id: "ca", name: "Canada", path: "M 50 30 L 150 30 L 150 60 L 50 60 Z", countryCode: "CAN", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  { id: "mx", name: "Mexico", path: "M 50 90 L 150 90 L 150 110 L 50 110 Z", countryCode: "MEX", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  
  // South America
  { id: "br", name: "Brazil", path: "M 120 110 L 180 110 L 180 160 L 120 160 Z", countryCode: "BRA", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  { id: "ar", name: "Argentina", path: "M 120 160 L 180 160 L 180 180 L 120 180 Z", countryCode: "ARG", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  { id: "co", name: "Colombia", path: "M 100 100 L 120 100 L 120 120 L 100 120 Z", countryCode: "COL", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  { id: "pe", name: "Peru", path: "M 100 120 L 120 120 L 120 140 L 100 140 Z", countryCode: "PER", region: "Americas", population: 0, area: 0, capital: [], flag: "" },
  
  // Europe
  { id: "uk", name: "United Kingdom", path: "M 200 50 L 210 50 L 210 60 L 200 60 Z", countryCode: "GBR", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "fr", name: "France", path: "M 200 60 L 220 60 L 220 70 L 200 70 Z", countryCode: "FRA", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "de", name: "Germany", path: "M 210 60 L 230 60 L 230 70 L 210 70 Z", countryCode: "DEU", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "it", name: "Italy", path: "M 210 70 L 220 70 L 220 80 L 210 80 Z", countryCode: "ITA", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "es", name: "Spain", path: "M 190 70 L 200 70 L 200 80 L 190 80 Z", countryCode: "ESP", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "ru", name: "Russia", path: "M 230 30 L 320 30 L 320 70 L 230 70 Z", countryCode: "RUS", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "pl", name: "Poland", path: "M 220 60 L 230 60 L 230 70 L 220 70 Z", countryCode: "POL", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  { id: "ua", name: "Ukraine", path: "M 230 60 L 250 60 L 250 70 L 230 70 Z", countryCode: "UKR", region: "Europe", population: 0, area: 0, capital: [], flag: "" },
  
  // Asia
  { id: "cn", name: "China", path: "M 280 60 L 340 60 L 340 90 L 280 90 Z", countryCode: "CHN", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "jp", name: "Japan", path: "M 350 70 L 360 70 L 360 80 L 350 80 Z", countryCode: "JPN", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "in", name: "India", path: "M 260 80 L 290 80 L 290 100 L 260 100 Z", countryCode: "IND", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "kr", name: "South Korea", path: "M 340 70 L 350 70 L 350 80 L 340 80 Z", countryCode: "KOR", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "th", name: "Thailand", path: "M 280 100 L 290 100 L 290 110 L 280 110 Z", countryCode: "THA", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "vn", name: "Vietnam", path: "M 290 100 L 300 100 L 300 110 L 290 110 Z", countryCode: "VNM", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "id", name: "Indonesia", path: "M 280 110 L 300 110 L 300 120 L 280 120 Z", countryCode: "IDN", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "my", name: "Malaysia", path: "M 290 110 L 300 110 L 300 120 L 290 120 Z", countryCode: "MYS", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "ph", name: "Philippines", path: "M 310 100 L 320 100 L 320 110 L 310 110 Z", countryCode: "PHL", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  
  // Africa
  { id: "za", name: "South Africa", path: "M 220 120 L 260 120 L 260 140 L 220 140 Z", countryCode: "ZAF", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  { id: "eg", name: "Egypt", path: "M 220 80 L 240 80 L 240 100 L 220 100 Z", countryCode: "EGY", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  { id: "ng", name: "Nigeria", path: "M 200 100 L 220 100 L 220 120 L 200 120 Z", countryCode: "NGA", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  { id: "ke", name: "Kenya", path: "M 230 110 L 240 110 L 240 120 L 230 120 Z", countryCode: "KEN", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  { id: "et", name: "Ethiopia", path: "M 230 100 L 240 100 L 240 110 L 230 110 Z", countryCode: "ETH", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  { id: "ma", name: "Morocco", path: "M 190 80 L 200 80 L 200 90 L 190 90 Z", countryCode: "MAR", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  { id: "dz", name: "Algeria", path: "M 200 80 L 220 80 L 220 100 L 200 100 Z", countryCode: "DZA", region: "Africa", population: 0, area: 0, capital: [], flag: "" },
  
  // Oceania
  { id: "au", name: "Australia", path: "M 320 120 L 360 120 L 360 150 L 320 150 Z", countryCode: "AUS", region: "Oceania", population: 0, area: 0, capital: [], flag: "" },
  { id: "nz", name: "New Zealand", path: "M 340 150 L 350 150 L 350 160 L 340 160 Z", countryCode: "NZL", region: "Oceania", population: 0, area: 0, capital: [], flag: "" },
  
  // Middle East
  { id: "tr", name: "Turkey", path: "M 230 70 L 250 70 L 250 80 L 230 80 Z", countryCode: "TUR", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "sa", name: "Saudi Arabia", path: "M 240 80 L 260 80 L 260 100 L 240 100 Z", countryCode: "SAU", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "ir", name: "Iran", path: "M 250 70 L 270 70 L 270 80 L 250 80 Z", countryCode: "IRN", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "iq", name: "Iraq", path: "M 250 80 L 260 80 L 260 90 L 250 90 Z", countryCode: "IRQ", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
  { id: "ae", name: "UAE", path: "M 260 90 L 270 90 L 270 100 L 260 100 Z", countryCode: "ARE", region: "Asia", population: 0, area: 0, capital: [], flag: "" },
];

export default function InteractiveWorldMap({ dict }: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countriesData, setCountriesData] = useState<CountryMapData[]>(worldMapData);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Load country data from API
  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const countries = await fetchAllCountries();
        const updatedMapData = worldMapData.map(mapCountry => {
          const apiCountry = countries.find(c => c.cca3 === mapCountry.countryCode);
          if (apiCountry) {
            return {
              ...mapCountry,
              population: apiCountry.population,
              area: apiCountry.area,
              capital: apiCountry.capital,
              flag: apiCountry.flags.png
            };
          }
          return mapCountry;
        });
        setCountriesData(updatedMapData);
      } catch (error) {
        console.error('Error loading country data:', error);
      }
    };

    loadCountryData();
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCountryClick = async (countryCode: string) => {
    setIsLoading(true);
    try {
      const country = await fetchCountryByCode(countryCode);
      setSelectedCountry(country);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching country details:', error);
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
              viewBox="0 0 400 200"
              className="world-map"
              onMouseMove={handleMouseMove}
            >
              {/* Background ocean */}
              <rect
                x="0"
                y="0"
                width="400"
                height="200"
                fill="#e3f2fd"
                className="ocean-bg"
              />
              
              {/* Continents outline for better visualization */}
              <g className="continents-outline">
                {/* North America */}
                <path d="M 50 30 L 150 30 L 150 110 L 50 110 Z" fill="none" stroke="#b3e5fc" strokeWidth="0.5" opacity="0.5" />
                {/* South America */}
                <path d="M 100 100 L 180 100 L 180 180 L 100 180 Z" fill="none" stroke="#b3e5fc" strokeWidth="0.5" opacity="0.5" />
                {/* Europe */}
                <path d="M 190 50 L 250 50 L 250 80 L 190 80 Z" fill="none" stroke="#b3e5fc" strokeWidth="0.5" opacity="0.5" />
                {/* Asia */}
                <path d="M 230 30 L 360 30 L 360 120 L 230 120 Z" fill="none" stroke="#b3e5fc" strokeWidth="0.5" opacity="0.5" />
                {/* Africa */}
                <path d="M 190 80 L 260 80 L 260 140 L 190 140 Z" fill="none" stroke="#b3e5fc" strokeWidth="0.5" opacity="0.5" />
                {/* Australia */}
                <path d="M 320 120 L 360 120 L 360 160 L 320 160 Z" fill="none" stroke="#b3e5fc" strokeWidth="0.5" opacity="0.5" />
              </g>
              
              {/* Countries */}
              {countriesData.map((country) => (
                <motion.path
                  key={country.id}
                  d={country.path}
                  className={`country-path ${hoveredCountry === country.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick(country.countryCode)}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: countriesData.indexOf(country) * 0.05
                  }}
                />
              ))}
              
              {/* Grid lines for better visualization */}
              <g className="grid-lines">
                <line x1="0" y1="50" x2="400" y2="50" stroke="#b3e5fc" strokeWidth="0.3" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#b3e5fc" strokeWidth="0.3" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#b3e5fc" strokeWidth="0.3" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="#b3e5fc" strokeWidth="0.3" />
                <line x1="200" y1="0" x2="200" y2="200" stroke="#b3e5fc" strokeWidth="0.3" />
                <line x1="300" y1="0" x2="300" y2="200" stroke="#b3e5fc" strokeWidth="0.3" />
              </g>
            </svg>
            
            {/* Tooltip */}
            {hoveredCountry && (
              <motion.div
                className="country-tooltip"
                style={{
                  left: tooltipPosition.x + 10,
                  top: tooltipPosition.y - 10,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {countriesData.find(c => c.id === hoveredCountry)?.name}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

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