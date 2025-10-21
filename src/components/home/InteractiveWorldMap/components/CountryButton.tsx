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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="country-name">{name}</span>
    </motion.button>
  );
}
