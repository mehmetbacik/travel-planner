"use client";

import { motion } from "framer-motion";
import CountryButton from "./CountryButton";
import { Continent } from "@/types/continent";
import { Dictionary } from "@/types/dictionary";

interface CountriesSidebarProps {
  continent: Continent;
  onClose: () => void;
  onCountryClick: (countryName: string) => void;
  dict: Dictionary;
}

export default function CountriesSidebar({
  continent,
  onClose,
  onCountryClick,
  dict,
}: CountriesSidebarProps) {
  return (
    <motion.div
      className="countries-sidebar-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
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
          <h3>{dict.interactiveWorldMap.continents[continent.name] ?? continent.name}</h3>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sidebar-content">
          <p className="continent-description">{dict.interactiveWorldMap.continents[continent.description] ?? continent.description}</p>
          <div className="countries-grid">
            {continent.countries.map((name) => (
              <CountryButton
                key={name}
                name={name}
                onClick={() => onCountryClick(name)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
