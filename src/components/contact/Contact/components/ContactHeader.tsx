import React from "react";
import { Dictionary } from "@/types/dictionary";

interface ContactHeaderProps {
  dict: Dictionary;
}

export default function ContactHeader({ dict }: ContactHeaderProps) {
  return (
    <div className="contact__header">
      <h2 id="contact__title" className="contact__title">
        {dict.contact.content.title}
      </h2>
      <p className="contact__description">
        {dict.contact.content.subtitle}
      </p>
    </div>
  );
}
