"use client";

import { motion } from "framer-motion";
import { Continent } from "@/services/api/map/continents";

interface ContinentCardProps {
  continent: Continent;
  hoveredContinent: string | null;
  setHoveredContinent: (id: string | null) => void;
  onClick: () => void;
  delay: number;
}

export default function ContinentCard({
  continent,
  hoveredContinent,
  setHoveredContinent,
  onClick,
  delay,
}: ContinentCardProps) {
  return (
    <motion.div
      className={`continent-card ${
        hoveredContinent === continent.id ? "hovered" : ""
      }`}
      style={
        {
          backgroundColor: continent.color,
          "--hover-color": continent.hoverColor,
        } as React.CSSProperties
      }
      onMouseEnter={() => setHoveredContinent(continent.id)}
      onMouseLeave={() => setHoveredContinent(null)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="continent-card__content">
        <h3 className="continent-card__title">{continent.name}</h3>
        <p className="continent-card__description">{continent.description}</p>
        <div className="continent-card__countries-count">
          {continent.countries.length} countries
        </div>
      </div>
      <div className="continent-card__overlay"></div>
    </motion.div>
  );
}
