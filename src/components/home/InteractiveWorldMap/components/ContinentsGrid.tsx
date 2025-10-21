"use client";

import { motion } from "framer-motion";
import ContinentCard from "./ContinentCard";
import { Continent } from "../continents";

interface ContinentsGridProps {
  continents: Continent[];
  hoveredContinent: string | null;
  setHoveredContinent: (id: string | null) => void;
  onContinentClick: (continent: Continent) => void;
}

export default function ContinentsGrid({
  continents,
  hoveredContinent,
  setHoveredContinent,
  onContinentClick,
}: ContinentsGridProps) {
  return (
    <motion.div
      className="continents-grid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {continents.map((continent, index) => (
        <ContinentCard
          key={continent.id}
          continent={continent}
          hoveredContinent={hoveredContinent}
          setHoveredContinent={setHoveredContinent}
          onClick={() => onContinentClick(continent)}
          delay={index * 0.1}
        />
      ))}
    </motion.div>
  );
}
