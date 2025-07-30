"use client";

import { Dictionary } from "@/types/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { fetchAllCountries, fetchCountryByCode, Country } from "@/services/api/map";

interface InteractiveWorldMapProps {
  dict: Dictionary;
}

// World map topology data - using a more detailed map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function InteractiveWorldMap({ dict }: InteractiveWorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState<string>("");

  // Load all countries data from API once
  useEffect(() => {
    const loadAllCountriesData = async () => {
      setIsLoadingCountries(true);
      try {
        const countries = await fetchAllCountries();
        setCountriesData(countries);
        console.log(`Loaded ${countries.length} countries from API`);
      } catch (error) {
        console.error('Error loading countries data:', error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    loadAllCountriesData();
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCountryClick = async (geo: any) => {
    const countryCode = geo.properties.ISO_A3;
    if (!countryCode) return;

    // Find country from already loaded data
    const country = countriesData.find(c => c.cca3 === countryCode);
    if (country) {
      setSelectedCountry(country);
      setIsModalOpen(true);
    } else {
      // Fallback to API call if not found in loaded data
      setIsLoading(true);
      try {
        const fetchedCountry = await fetchCountryByCode(countryCode);
        setSelectedCountry(fetchedCountry);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error fetching country details:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatArea = (area: number) => {
    return `${formatNumber(area)} km²`;
  };

  const getCountryData = (geo: any): Country | undefined => {
    const countryCode = geo.properties.ISO_A3;
    return countriesData.find(country => country.cca3 === countryCode);
  };

  const handleCountryHover = (geo: any) => {
    const countryData = getCountryData(geo);
    if (countryData) {
      setHoveredCountry(geo.rsmKey);
      setTooltipContent(countryData.name.common);
    }
  };

  const handleCountryLeave = () => {
    setHoveredCountry(null);
    setTooltipContent("");
  };

  // Calculate world statistics
  const worldStats = useMemo(() => {
    const totalCountries = countriesData.length;
    const totalPopulation = countriesData.reduce((sum, country) => sum + country.population, 0);
    const totalArea = countriesData.reduce((sum, country) => sum + country.area, 0);
    const regions = [...new Set(countriesData.map(country => country.region))];
    
    return {
      totalCountries,
      totalPopulation,
      totalArea,
      regions: regions.length
    };
  }, [countriesData]);

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
            {isLoadingCountries ? (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Loading world data...</p>
                <p className="loading-subtitle">Fetching {countriesData.length} countries</p>
              </div>
            ) : (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 120,
                  center: [0, 20]
                }}
                className="world-map"
                onMouseMove={handleMouseMove}
              >
                <ZoomableGroup maxZoom={5} minZoom={1}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }: { geographies: any[] }) =>
                      geographies.map((geo: any) => {
                        const countryData = getCountryData(geo);
                        const isHovered = hoveredCountry === geo.rsmKey;
                        const hasData = !!countryData;
                        
                        return (
                          <motion.g key={geo.rsmKey}>
                            <Geography
                              geography={geo}
                              onClick={() => handleCountryClick(geo)}
                              onMouseEnter={() => handleCountryHover(geo)}
                              onMouseLeave={handleCountryLeave}
                              style={{
                                default: {
                                  fill: hasData ? "#4caf50" : "#e0e0e0",
                                  stroke: hasData ? "#2e7d32" : "#bdbdbd",
                                  strokeWidth: 0.5,
                                  outline: "none",
                                },
                                hover: {
                                  fill: hasData ? "#ff9800" : "#e0e0e0",
                                  stroke: hasData ? "#f57c00" : "#bdbdbd",
                                  strokeWidth: 1.5,
                                  outline: "none",
                                },
                                pressed: {
                                  fill: hasData ? "#ff5722" : "#e0e0e0",
                                  stroke: hasData ? "#d84315" : "#bdbdbd",
                                  strokeWidth: 2,
                                  outline: "none",
                                },
                              }}
                              className={`country-geography ${isHovered ? 'hovered' : ''} ${hasData ? 'has-data' : 'no-data'}`}
                            />
                          </motion.g>
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            )}
            
            {/* Tooltip */}
            {hoveredCountry && tooltipContent && (
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
                {tooltipContent}
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
