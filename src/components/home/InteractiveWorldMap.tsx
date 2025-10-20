"use client";

import { Dictionary } from "@/types/dictionary";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
  Country,
  CountryMapData,
} from "@/services/api/map";

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

const continents: Continent[] = [
  {
    id: "north-america",
    name: "North America",
    path: "M 50 30 L 180 30 L 180 120 L 50 120 Z",
    color: "#4CAF50",
    hoverColor: "#66BB6A",
    countries: [
      "USA",
      "Canada",
      "Mexico",
      "Cuba",
      "Jamaica",
      "Haiti",
      "Dominican Republic",
      "Puerto Rico",
      "Guatemala",
      "Honduras",
      "El Salvador",
      "Nicaragua",
      "Costa Rica",
      "Panama",
    ],
    description:
      "From the frozen tundra of Canada to the tropical beaches of Mexico",
  },
  {
    id: "south-america",
    name: "South America",
    path: "M 100 100 L 200 100 L 200 200 L 100 200 Z",
    color: "#FF9800",
    hoverColor: "#FFB74D",
    countries: [
      "Brazil",
      "Argentina",
      "Colombia",
      "Peru",
      "Venezuela",
      "Chile",
      "Ecuador",
      "Bolivia",
      "Paraguay",
      "Uruguay",
      "Guyana",
      "Suriname",
      "French Guiana",
    ],
    description: "Home to the Amazon rainforest and the Andes mountains",
  },
  {
    id: "europe",
    name: "Europe",
    path: "M 190 40 L 280 40 L 280 100 L 190 100 Z",
    color: "#2196F3",
    hoverColor: "#42A5F5",
    countries: [
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Russia",
      "Poland",
      "Ukraine",
      "Netherlands",
      "Belgium",
      "Switzerland",
      "Austria",
      "Sweden",
      "Norway",
      "Denmark",
      "Finland",
      "Portugal",
      "Greece",
      "Turkey",
    ],
    description: "Rich in history, culture, and architectural wonders",
  },
  {
    id: "africa",
    name: "Africa",
    path: "M 190 80 L 280 80 L 280 180 L 190 180 Z",
    color: "#9C27B0",
    hoverColor: "#BA68C8",
    countries: [
      "South Africa",
      "Egypt",
      "Nigeria",
      "Kenya",
      "Ethiopia",
      "Morocco",
      "Algeria",
      "Ghana",
      "Uganda",
      "Tanzania",
      "Sudan",
      "Libya",
      "Tunisia",
      "Senegal",
      "Ivory Coast",
      "Cameroon",
    ],
    description: "The cradle of humanity with diverse landscapes and cultures",
  },
  {
    id: "asia",
    name: "Asia",
    path: "M 230 30 L 380 30 L 380 130 L 230 130 Z",
    color: "#F44336",
    hoverColor: "#EF5350",
    countries: [
      "China",
      "Japan",
      "India",
      "South Korea",
      "Thailand",
      "Vietnam",
      "Indonesia",
      "Malaysia",
      "Philippines",
      "Singapore",
      "Taiwan",
      "Hong Kong",
      "Cambodia",
      "Laos",
      "Myanmar",
      "Bangladesh",
      "Pakistan",
      "Iran",
      "Iraq",
      "Saudi Arabia",
      "UAE",
      "Israel",
      "Lebanon",
      "Jordan",
      "Syria",
    ],
    description:
      "The largest continent with ancient civilizations and modern cities",
  },
  {
    id: "oceania",
    name: "Oceania",
    path: "M 320 120 L 380 120 L 380 180 L 320 180 Z",
    color: "#00BCD4",
    hoverColor: "#26C6DA",
    countries: [
      "Australia",
      "New Zealand",
      "Fiji",
      "Papua New Guinea",
      "Solomon Islands",
      "Vanuatu",
      "New Caledonia",
      "Samoa",
      "Tonga",
      "Micronesia",
      "Palau",
      "Marshall Islands",
    ],
    description: "Islands scattered across the Pacific Ocean",
  },
];

export default function InteractiveWorldMap({
  dict,
}: InteractiveWorldMapProps) {
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(
    null
  );
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
        console.error("Error loading country data:", error);
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
      let country = countriesData.find((c) => c.name.common === countryName);

      if (!country) {
        country = countriesData.find(
          (c) =>
            c.name.common.toLowerCase().includes(countryName.toLowerCase()) ||
            c.name.official.toLowerCase().includes(countryName.toLowerCase())
        );
      }

      if (!country) {
        const apiCountries = await fetchCountryByName(countryName);
        if (apiCountries && apiCountries.length > 0) {
          country = apiCountries[0];
        }
      }

      if (country) {
        console.log("Found country:", country);
        setSelectedCountry(country);
        setIsModalOpen(true);
      } else {
        console.error("Country not found:", countryName);
        alert(`Country "${countryName}" not found. Please try again.`);
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
      alert("Error fetching country details. Please try again.");
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
    <section
      className="interactiveWorldMap"
      aria-labelledby="interactiveWorldMap"
    >
      <div className="interactiveWorldMap__body container">
        <div className="interactiveWorldMap__header">
          <h2
            id="interactiveWorldMap-title"
            className="interactiveWorldMap__title"
          >
            {dict.interactiveWorldMap.title}
          </h2>
          <p className="interactiveWorldMap__description">
            {dict.interactiveWorldMap.description}
          </p>
        </div>

        <div className="interactiveWorldMap__content">
          <motion.div
            className="continents-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {continents.map((continent, index) => (
              <motion.div
                key={continent.id}
                className={`continent-card ${
                  hoveredContinent === continent.id ? "hovered" : ""
                }`}
                style={{
                  backgroundColor: continent.color,
                  "--hover-color": continent.hoverColor,
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredContinent(continent.id)}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => handleContinentClick(continent)}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <div className="continent-card__content">
                  <h3 className="continent-card__title">{continent.name}</h3>
                  <p className="continent-card__description">
                    {continent.description}
                  </p>
                  <div className="continent-card__countries-count">
                    {continent.countries.length} countries
                  </div>
                </div>
                <div className="continent-card__overlay"></div>
              </motion.div>
            ))}
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
                <p className="continent-description">
                  {selectedContinent.description}
                </p>
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
            style={{ zIndex: 3000 }}
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
                      <img
                        src={selectedCountry.flags.png}
                        alt={selectedCountry.flags.alt}
                      />
                    </div>
                    <div className="country-info">
                      <h3>{selectedCountry.name.common}</h3>
                      <p className="official-name">
                        {selectedCountry.name.official}
                      </p>
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
                        <span className="value">
                          {selectedCountry.capital?.join(", ") || "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Region:</span>
                        <span className="value">
                          {selectedCountry.region || "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Subregion:</span>
                        <span className="value">
                          {selectedCountry.subregion || "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Population:</span>
                        <span className="value">
                          {selectedCountry.population
                            ? formatNumber(selectedCountry.population)
                            : "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Area:</span>
                        <span className="value">
                          {selectedCountry.area
                            ? formatArea(selectedCountry.area)
                            : "N/A"}
                        </span>
                      </div>
                      {selectedCountry.currencies && (
                        <div className="detail-row">
                          <span className="label">Currency:</span>
                          <span className="value">
                            {Object.values(selectedCountry.currencies)
                              .map(
                                (currency) =>
                                  `${currency.name} (${currency.symbol})`
                              )
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      {selectedCountry.languages && (
                        <div className="detail-row">
                          <span className="label">Languages:</span>
                          <span className="value">
                            {Object.values(selectedCountry.languages).join(
                              ", "
                            )}
                          </span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span className="label">Timezones:</span>
                        <span className="value">
                          {selectedCountry.timezones?.join(", ") || "N/A"}
                        </span>
                      </div>
                      {selectedCountry.borders &&
                        selectedCountry.borders.length > 0 && (
                          <div className="detail-row">
                            <span className="label">Borders:</span>
                            <span className="value">
                              {selectedCountry.borders.join(", ")}
                            </span>
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
