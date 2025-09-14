import React from "react";
import { Dictionary } from "@/types/dictionary";

interface AboutHeaderProps {
  dict: Dictionary;
}

export default function AboutHeader({ dict }: AboutHeaderProps) {
  return (
    <div className="about__header">
      <h2 id="about-title" className="about__title">
        {dict.about.content.title}
      </h2>
      <p className="about__description">{dict.about.content.subtitle}</p>
    </div>
  );
}
