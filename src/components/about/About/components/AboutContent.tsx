import React from "react";
import { Dictionary } from "@/types/dictionary";

interface AboutContentProps {
  dict: Dictionary;
}

export default function AboutContent({ dict }: AboutContentProps) {
  return (
    <div className="about__content">
      <p>{dict.about.content.description}</p>
    </div>
  );
}
