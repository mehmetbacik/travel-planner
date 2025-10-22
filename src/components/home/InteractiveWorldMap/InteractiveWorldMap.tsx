"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Dictionary } from "@/types/dictionary";

import { continents } from "@/services/api/map/continents";
import { useCountriesData } from "@/hooks/useCountriesData";
import { Country } from "@/services/api/map";

import ContinentsGrid from "./components/ContinentsGrid";
import CountriesSidebar from "./components/CountriesSidebar";
import CountryModal from "./components/CountryModal";

interface InteractiveWorldMapProps {
  dict: Dictionary;
}

export default function InteractiveWorldMap({
  dict,
}: InteractiveWorldMapProps) {
  const { countriesData, fetchCountry } = useCountriesData();

  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinentClick = (continent: any) => {
    setSelectedContinent(continent);
    setIsSidebarOpen(true);
  };

  const handleCountryClick = async (countryName: string) => {
    setIsLoading(true);
    const country = await fetchCountry(countryName);

    if (country) {
      setSelectedCountry(country);
      setIsModalOpen(true);
    } else {
      alert(`Country "${countryName}" not found.`);
    }

    setIsLoading(false);
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

        {/* --- Continents Grid --- */}
        <ContinentsGrid
          continents={continents}
          hoveredContinent={hoveredContinent}
          setHoveredContinent={setHoveredContinent}
          onContinentClick={handleContinentClick}
        />

        {/* --- Sidebar --- */}
        <AnimatePresence>
          {isSidebarOpen && selectedContinent && (
            <CountriesSidebar
              continent={selectedContinent}
              onClose={() => setIsSidebarOpen(false)}
              onCountryClick={handleCountryClick}
            />
          )}
        </AnimatePresence>

        {/* --- Modal --- */}
        <AnimatePresence>
          {isModalOpen && selectedCountry && (
            <CountryModal
              country={selectedCountry}
              isLoading={isLoading}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
