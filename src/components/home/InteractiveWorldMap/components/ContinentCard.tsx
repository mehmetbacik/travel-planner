"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Continent } from "@/types/continent";
import { continents } from "@/services/data/continents";
import { Dictionary } from "@/types/dictionary";

interface ContinentCardProps {
  continent: Continent;
  hoveredContinent: string | null;
  setHoveredContinent?: (id: string | null) => void;
  onClick: () => void;
  delay: number;
  dict: Dictionary;
}

export default function ContinentCard({
  continent,
  onClick,
  dict,
}: ContinentCardProps) {
  return (
    <motion.div
      className="continent-card"
      onClick={onClick}
    >
      <div className="continent-card__content">
        <div className="continent-card__image">
          <Image src={continent.image} alt={dict.interactiveWorldMap.continents[continent.name] ??
            continent.name} />
        </div>
        <h3 className="continent-card__title">
          {dict.interactiveWorldMap.continents[continent.name] ??
            continent.name}
        </h3>
        <p className="continent-card__description">
          {dict.interactiveWorldMap.continents[continent.description] ??
            continent.description}
        </p>
        <div className="continent-card__countries-count">
          {continent.countries.length}&nbsp;
          {dict.interactiveWorldMap.continents.countriesTitle}
        </div>
      </div>
    </motion.div>
  );
}
