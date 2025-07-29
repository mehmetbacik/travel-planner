"use client";

import { Dictionary } from "@/types/dictionary";

interface InteractiveWorldMapProps {
  dict: Dictionary;
}

export default function InteractiveWorldMap({ dict }: InteractiveWorldMapProps) {
  return (
    <section className="interactiveWorldMap" aria-labelledby="interactiveWorldMap">
      <div className="interactiveWorldMap__body container">
        <div className="interactiveWorldMap__header">
          <h2 id="interactiveWorldMap-title" className="interactiveWorldMap__title">
            {dict.interactiveWorldMap.title}
          </h2>
          <p className="interactiveWorldMap__description">
            {dict.interactiveWorldMap.description}
          </p>
        </div>
        <div className="interactiveWorldMap__content">
            Map
        </div>
      </div>
    </section>
  );
}
