"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllCountries, Country } from "@/services/api/map";

interface ContinentPoint {
  id: string;
  name: string;
  coords: { x: number; y: number };
}

const continentPoints: ContinentPoint[] = [
  { id: "africa", name: "Africa", coords: { x: 220, y: 120 } },
  { id: "europe", name: "Europe", coords: { x: 230, y: 60 } },
  { id: "asia", name: "Asia", coords: { x: 310, y: 70 } },
  { id: "americas", name: "Americas", coords: { x: 100, y: 70 } },
  { id: "oceania", name: "Oceania", coords: { x: 350, y: 140 } },
];

interface InteractiveMapProps {
  dict: { interactiveWorldMap: { title: string; description: string } };
}

export default function InteractiveMap({ dict }: InteractiveMapProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllCountries()
      .then((data) => setCountries(data))
      .catch((err) => console.error(err));
  }, []);

  const handleContinentMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  // Filter
  const filteredCountries = selectedContinent
    ? countries.filter(
        (c) => c.region.toLowerCase() === selectedContinent.toLowerCase()
      )
    : [];

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  return (
    <section
      className="interactiveWorldMap"
      aria-labelledby="interactiveMap-title"
    >
      <div className="interactiveWorldMap__body container">
        <div className="interactiveWorldMap__header">
          <h2
            id="interactiveWorldMap-title"
            className="interactiveWorldMap__title"
          >
            {dict.interactiveWorldMap.title}
          </h2>
          <p className="interactiveWorldMap__description">
            {dict.interactiveWorldMap.description}
          </p>
        </div>
        <div className="interactiveWorldMap__content">
          <div className="world-map-container" style={{ position: "relative" }}>
            {continentPoints.map(({ id, name, coords }) => (
              <motion.circle
                key={id}
                cx={coords.x}
                cy={coords.y}
                r={10}
                fill="#007bff"
                stroke="#004085"
                strokeWidth={2}
                style={{ cursor: "pointer" }}
                animate={{
                  scale: hoveredContinent === id ? 1.3 : 1,
                  opacity: hoveredContinent === id ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={(e) => {
                  setHoveredContinent(id);
                  handleContinentMouseMove(e);
                }}
                onMouseMove={handleContinentMouseMove}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => setSelectedContinent(id)}
              />
            ))}

            {hoveredContinent && (
              <motion.div
                className="tooltip"
                style={{
                  position: "fixed",
                  top: tooltipPos.y + 15,
                  left: tooltipPos.x + 15,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: 4,
                  pointerEvents: "none",
                  fontSize: 12,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {continentPoints.find((c) => c.id === hoveredContinent)?.name}
              </motion.div>
            )}
          </div>
          <AnimatePresence>
            {selectedContinent && (
              <motion.aside
                className="sidebar"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: 320,
                  height: "100vh",
                  background: "#fff",
                  boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
                  padding: "1rem",
                  overflowY: "auto",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={() => setSelectedContinent(null)}
                  style={{ marginBottom: 10, cursor: "pointer" }}
                  aria-label="Close countries list"
                >
                  Kapat ✕
                </button>
                <h3>
                  {
                    continentPoints.find((c) => c.id === selectedContinent)
                      ?.name
                  }{" "}
                  Ülkeleri
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {filteredCountries.length === 0 && <li>Ülke bulunamadı.</li>}
                  {filteredCountries.map((country) => (
                    <li
                      key={country.cca3}
                      style={{
                        cursor: "pointer",
                        padding: "6px 8px",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                      onClick={() => handleCountryClick(country)}
                    >
                      <img
                        src={country.flags.png}
                        alt={`${country.name.common} flag`}
                        width={24}
                        height={16}
                      />
                      <span>{country.name.common}</span>
                    </li>
                  ))}
                </ul>
              </motion.aside>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isModalOpen && selectedCountry && (
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1100,
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <motion.div
                  className="modal-content"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "#fff",
                    borderRadius: 8,
                    padding: "1.5rem",
                    maxWidth: 400,
                    width: "90%",
                    maxHeight: "80vh",
                    overflowY: "auto",
                  }}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 15,
                      fontSize: 24,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <img
                      src={selectedCountry.flags.png}
                      alt={`${selectedCountry.name.common} flag`}
                      width={64}
                      height={42}
                      style={{ borderRadius: 4 }}
                    />
                    <h2>{selectedCountry.name.common}</h2>
                  </div>
                  <p>
                    <strong>Resmi Adı:</strong> {selectedCountry.name.official}
                  </p>
                  <p>
                    <strong>Başkent:</strong>{" "}
                    {selectedCountry.capital?.join(", ") || "Bilinmiyor"}
                  </p>
                  <p>
                    <strong>Bölge:</strong> {selectedCountry.region}
                  </p>
                  <p>
                    <strong>Alt Bölge:</strong>{" "}
                    {selectedCountry.subregion || "Bilinmiyor"}
                  </p>
                  <p>
                    <strong>Nüfus:</strong>{" "}
                    {new Intl.NumberFormat().format(selectedCountry.population)}
                  </p>
                  <p>
                    <strong>Yüzölçümü:</strong>{" "}
                    {new Intl.NumberFormat().format(selectedCountry.area)} km²
                  </p>
                  {selectedCountry.currencies && (
                    <p>
                      <strong>Para Birimi:</strong>{" "}
                      {Object.values(selectedCountry.currencies)
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(", ")}
                    </p>
                  )}
                  {selectedCountry.languages && (
                    <p>
                      <strong>Diller:</strong>{" "}
                      {Object.values(selectedCountry.languages).join(", ")}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
