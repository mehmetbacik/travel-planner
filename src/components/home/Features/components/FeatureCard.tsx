"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Dictionary } from "@/types/dictionary";
import type { Feature } from "@/types/feature";

interface FeatureCardProps {
  feature: Feature;
  dict: Dictionary;
  index: number;
}

export default function FeatureCard({
  feature,
  dict,
  index,
}: FeatureCardProps) {
  const { icon, key, descriptionKey } = feature;

  return (
    <motion.article
      key={key}
      className="features__card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      tabIndex={0}
      aria-label={`${dict.features[key as keyof typeof dict.features]} - ${
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
  );
}
