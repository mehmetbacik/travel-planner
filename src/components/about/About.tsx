"use client";

import React, { useEffect, useState } from "react";
import { Dictionary } from "@/types/dictionary";

interface AboutProps {
  dict: Dictionary;
}

interface CounterItem {
  label: string;
  value: number;
}

export default function About({ dict }: AboutProps) {
  const counters: CounterItem[] = [
    { label: "Planned Trips", value: 120 },
    { label: "Visited Cities", value: 45 },
    { label: "Happy Travelers", value: 300 },
  ];

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
    <section className="about" aria-labelledby="about">
      <div className="about__body container">
        <div className="about__header">
          <h2 id="about-title" className="about__title">
            {dict.about.content.title}
          </h2>
          <p className="about__description">{dict.about.content.subtitle}</p>
        </div>

        <div className="about__content">
          <p>{dict.about.content.description}</p>
        </div>

        <div className="about__stats">
          {counters.map((counter, index) => (
            <div className="about__stat" key={index}>
              <span className="about__stat-number">{counts[index]}</span>
              <span className="about__stat-label">{counter.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
