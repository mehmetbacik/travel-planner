"use client";

import { Dictionary } from "@/types/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { fetchAllCountries, fetchCountryByCode, Country } from "@/services/api/map";

interface InteractiveWorldMapProps {
  dict: Dictionary;
}

// World map topology data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function InteractiveWorldMap({ dict }: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCountryClick = async (geo: any) => {
    const countryCode = geo.properties.ISO_A3;
    if (!countryCode) return;

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

  const getCountryData = (geo: any) => {
    const countryCode = geo.properties.ISO_A3;
    return countriesData.find(country => country.cca3 === countryCode);
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
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{
                scale: 147,
                center: [0, 0]
              }}
              className="world-map"
              onMouseMove={handleMouseMove}
            >
              <ZoomableGroup maxZoom={4} minZoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryData = getCountryData(geo);
                      const isHovered = hoveredCountry === geo.rsmKey;
                      
                      return (
                        <motion.g key={geo.rsmKey}>
                          <Geography
                            geography={geo}
                            onClick={() => handleCountryClick(geo)}
                            onMouseEnter={() => setHoveredCountry(geo.rsmKey)}
                            onMouseLeave={() => setHoveredCountry(null)}
                            style={{
                              default: {
                                fill: countryData ? "#4caf50" : "#e0e0e0",
                                stroke: "#2e7d32",
                                strokeWidth: 0.5,
                                outline: "none",
                              },
                              hover: {
                                fill: "#ff9800",
                                stroke: "#f57c00",
                                strokeWidth: 1,
                                outline: "none",
                              },
                              pressed: {
                                fill: "#ff5722",
                                stroke: "#d84315",
                                strokeWidth: 1,
                                outline: "none",
                              },
                            }}
                            className={`country-geography ${isHovered ? 'hovered' : ''}`}
                          />
                        </motion.g>
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            
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
                {hoveredCountry}
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
