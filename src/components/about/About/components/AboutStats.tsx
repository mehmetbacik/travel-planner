"use client";

import React, { useEffect, useState } from "react";
import { counters } from "@/services/data/counters";
import { Dictionary } from "@/types/dictionary";

interface AboutStatsProps {
  dict: Dictionary;
}

export default function AboutStats({ dict }: AboutStatsProps) {
  const [counts, setCounts] = useState(counters.map(() => 0));

  useEffect(() => {
    counters.forEach((counter, index) => {
      let start = 0;
      const end = counter.value;
      const duration = 2000;
      const incrementTime = 20;
      const step = Math.ceil(end / (duration / incrementTime));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
      }, incrementTime);
    });
  }, []);

  return (
    <div className="about__stats">
      {counters.map((counter, index) => (
        <div className="about__stat" key={counter.key}>
          <span className="about__stat-number">{counts[index]}</span>
          <span className="about__stat-label">
            {dict.about.counters?.[counter.key] ?? counter.key}
          </span>
        </div>
      ))}
    </div>
  );
}
