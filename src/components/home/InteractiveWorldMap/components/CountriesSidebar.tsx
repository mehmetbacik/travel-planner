"use client";

import { motion } from "framer-motion";
import CountryButton from "./CountryButton";
import { Continent } from "../continents";

interface CountriesSidebarProps {
  continent: Continent;
  onClose: () => void;
  onCountryClick: (countryName: string) => void;
}

export default function CountriesSidebar({
  continent,
  onClose,
  onCountryClick,
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
          <h3>{continent.name}</h3>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sidebar-content">
          <p className="continent-description">{continent.description}</p>
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
