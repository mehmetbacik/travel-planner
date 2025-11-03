"use client";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

interface HeaderProps {
  dict: Dictionary;
  onDownload: () => void;
}

export default function TripResultsHeader({ dict, onDownload }: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="trip-results__header"
    >
      <div className="trip-results__header-content">
        <div>
          <h1 className="trip-results__title">
            {dict.planner.customizedItinerary}
          </h1>
          <p className="trip-results__subtitle">
            {dict.planner.subtitle || "Your personalized travel plan is ready!"}
          </p>
        </div>
        <button onClick={onDownload} className="trip-results__pdf-button">
          <Icon icon="mdi:download" width="20" height="20" />
          <span>{dict.common.downloadPDF}</span>
        </button>
      </div>
    </motion.div>
  );
}
