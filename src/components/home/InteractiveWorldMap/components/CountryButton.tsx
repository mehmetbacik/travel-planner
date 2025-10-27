"use client";

import { motion } from "framer-motion";

interface CountryButtonProps {
  name: string;
  onClick: () => void;
}

export default function CountryButton({ name, onClick }: CountryButtonProps) {
  return (
    <motion.button
      className="country-card"
      onClick={onClick}
    >
      <span className="country-name">{name}</span>
    </motion.button>
  );
}
