"use client";

import React, { useState } from "react";
import { Dictionary } from "@/types/dictionary";
import { Icon } from "@iconify/react";

interface AboutContentProps {
  dict: Dictionary;
}

export default function AboutContent({ dict }: AboutContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => setIsExpanded((prev) => !prev);

  return (
    <div className="about__content" onClick={toggleContent}>
      <div className={`about__text ${isExpanded ? "expanded" : ""}`}>
        <p>{dict.about.content.description}</p>
      </div>
      <button className="about__toggle">
        <Icon
          icon={
            isExpanded ? "akar-icons:chevron-up" : "akar-icons:chevron-down"
          }
          width={15}
          height={15}
        />
      </button>
    </div>
  );
}
