"use client";

import React, { useEffect, useState } from "react";
import { counters } from "@/services/data/counters";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

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
      <div className="about__stats-header">
        <h2 className="about__stats-title">{dict.about.content.statsTitle}</h2>
        <p className="about__stats-description">
          {dict.about.content.statsSubTitle}
        </p>
      </div>
      <div className="about__stats-content">
        {counters.map((counter, index) => (
          <div className="about__stat" key={counter.key}>
            <div className="about__stat-headline">
              <span className="about__stat-label">
                {dict.about.counters[counter.key] ?? counter.key}
              </span>
              <Icon
                className="about__stat-icon"
                icon={counter.icon}
                width={32}
                height={32}
              />
            </div>
            <span className="about__stat-number">{counts[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
