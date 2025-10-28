"use client";

import { Dictionary } from "@/types/dictionary";
import FeatureCard from "./FeatureCard";
import { FEATURES } from "@/services/data/features";

interface FeaturesListProps {
  dict: Dictionary;
}

export default function FeaturesList({ dict }: FeaturesListProps) {
  return (
    <div className="features__content">
      {FEATURES.map((feature, index) => (
        <FeatureCard key={feature.key} feature={feature} dict={dict} index={index} />
      ))}
    </div>
  );
}
