"use client";
import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";

interface SummaryProps {
  dict: Dictionary;
  formData: {
    budget: number;
    currency: string;
    interests: string[];
  };
}

export default function TripResultsSummary({ dict, formData }: SummaryProps) {
  const { budget, currency, interests } = formData;
  const symbol =
    currency === "TRY"
      ? "₺"
      : currency === "EUR"
      ? "€"
      : currency === "GBP"
      ? "£"
      : "$";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="trip-results__summary"
    >
      <div className="trip-results__summary-item">
        <span className="trip-results__summary-label">
          {dict.common.budget}:
        </span>
        <span className="trip-results__summary-value">
          {symbol} {budget.toLocaleString()}
        </span>
      </div>

      {interests.length > 0 && (
        <div className="trip-results__summary-item">
          <span className="trip-results__summary-label">
            {dict.common.interests}:
          </span>
          <div className="trip-results__summary-tags">
            {interests.map((interest, idx) => (
              <span key={idx} className="trip-results__tag">
                {dict.common.interestOptions[
                  interest as keyof typeof dict.common.interestOptions
                ] || interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
