"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

interface FeaturesProps {
  dict: Dictionary;
}

const features = [
  {
    icon: "mdi:weather-sunny",
    key: "weather",
  },
  {
    icon: "mdi:map-marker-outline",
    key: "attractions",
  },
  {
    icon: "mdi:car",
    key: "transportation",
  },
  {
    icon: "mdi:silverware-fork-knife",
    key: "food",
  },
];

export default function Features({ dict }: FeaturesProps) {
  return (
    <section className="features" aria-labelledby="features-title">
      <div className="features__container">
        <header className="features__header">
          <h2 id="features-title" className="features__title">
            {dict.features.title}
          </h2>
          <p className="features__description">{dict.features.description}</p>
        </header>

        <div className="features__grid">
          {features.map(({ icon, key }, index) => (
            <motion.article
              key={key}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              tabIndex={0}
              aria-label={dict.features[key as keyof typeof dict.features]}
            >
              <div className="feature-card__icon" aria-hidden="true">
                <Icon icon={icon} width="48" height="48" />
              </div>
              <h3 className="feature-card__title">
                {dict.features[key as keyof typeof dict.features]}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
