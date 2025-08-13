"use client";

import React from "react";
import { Dictionary } from "@/types/dictionary";

interface AboutProps {
  dict: Dictionary;
}

export default function About({ dict }: AboutProps) {
  return (
    <section className="about" aria-labelledby="about">
      <div className="about__body container">
        <div className="about__header">
          <h2 id="about-title" className="about__title">
            {dict.about.content.title}
          </h2>
          <p className="about__description">
            {dict.about.content.subtitle}
          </p>
        </div>
        <div className="about__content">
          <p>
            {dict.about.content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
