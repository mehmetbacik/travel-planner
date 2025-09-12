"use client";

import React, { useEffect, useState } from "react";
import { Dictionary } from "@/types/dictionary";
import { counters } from "@/services/data/counters";
import { CounterItem } from "@/types/counter";
import { instagramPosts, InstagramPost } from "@/services/data/instagramPosts";

interface AboutProps {
  dict: Dictionary;
}

export default function About({ dict }: AboutProps) {
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

        {/* Instagram Style Posts */}
        <div className="about__instagram">
          <h3 className="about__instagram-title">Traveler Stories</h3>
          <div className="about__instagram-grid">
            {instagramPosts.map((post) => (
              <div className="about__instagram-post" key={post.id}>
                <div className="about__instagram-header">
                  <span className="about__instagram-username">
                    @{post.username}
                  </span>
                  <span className="about__instagram-location">
                    {post.location}
                  </span>
                </div>
                <div className="about__instagram-image">
                  <img src={post.image} alt={post.caption} />
                </div>
                <div className="about__instagram-caption">{post.caption}</div>
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </section>
  );
}
