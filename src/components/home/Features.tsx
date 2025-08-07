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
    descriptionKey: "weatherdesc",
  },
  {
    icon: "mdi:map-marker-outline",
    key: "attractions",
    descriptionKey: "attractionsdesc",
  },
  {
    icon: "mdi:car",
    key: "transportation",
    descriptionKey: "transportationdesc",
  },
  {
    icon: "mdi:silverware-fork-knife",
    key: "food",
    descriptionKey: "fooddesc",
  },
];

export default function Features({ dict }: FeaturesProps) {
  return (
    <section className="features" aria-labelledby="features">
      <div className="features__body container">
        <div className="features__header">
          <h2 id="features-title" className="features__title">
            {dict.features.title}
          </h2>
          <p className="features__description">{dict.features.description}</p>
        </div>
        <div className="features__content">
          {features.map(({ icon, key, descriptionKey }, index) => (
            <motion.article
              key={key}
              className="features__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              tabIndex={0}
              aria-label={`${
                dict.features[key as keyof typeof dict.features]
              } - ${
                dict.features[descriptionKey as keyof typeof dict.features]
              }`}
            >
              <div className="features__card-icon" aria-hidden="true">
                <Icon icon={icon} width="48" height="48" />
              </div>
              <h3 className="features__card-title">
                {dict.features[key as keyof typeof dict.features]}
              </h3>
              <p className="features__card-description">
                {dict.features[descriptionKey as keyof typeof dict.features]}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
