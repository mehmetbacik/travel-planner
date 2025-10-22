"use client";

import { motion } from "framer-motion";
import { Country } from "@/services/api/map";
import { formatArea, formatNumber } from "@/utils/formatters";
import CountryDetailRow from "./CountryDetailRow";

interface CountryModalProps {
  country: Country;
  isLoading: boolean;
  onClose: () => void;
}

export default function CountryModal({
  country,
  isLoading,
  onClose,
}: CountryModalProps) {
  return (
    <motion.div
      className="country-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="country-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>Loading country details...</p>
          </div>
        ) : (
          <div className="modal-content">
            <div className="modal-header">
              <div className="country-flag">
                <img src={country.flags.png} alt={country.flags.alt} />
              </div>
              <div className="country-info">
                <h3>{country.name.common}</h3>
                <p className="official-name">{country.name.official}</p>
              </div>
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <CountryDetailRow
                label="Capital"
                value={country.capital?.join(", ") || "N/A"}
              />
              <CountryDetailRow
                label="Region"
                value={country.region || "N/A"}
              />
              <CountryDetailRow
                label="Subregion"
                value={country.subregion || "N/A"}
              />
              <CountryDetailRow
                label="Population"
                value={
                  country.population ? formatNumber(country.population) : "N/A"
                }
              />
              <CountryDetailRow
                label="Area"
                value={country.area ? formatArea(country.area) : "N/A"}
              />

              {country.currencies && (
                <CountryDetailRow
                  label="Currency"
                  value={Object.values(country.currencies)
                    .map((c) => `${c.name} (${c.symbol})`)
                    .join(", ")}
                />
              )}

              {country.languages && (
                <CountryDetailRow
                  label="Languages"
                  value={Object.values(country.languages).join(", ")}
                />
              )}

              <CountryDetailRow
                label="Timezones"
                value={country.timezones?.join(", ") || "N/A"}
              />

              {country.borders?.length && (
                <CountryDetailRow
                  label="Borders"
                  value={country.borders.join(", ")}
                />
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
