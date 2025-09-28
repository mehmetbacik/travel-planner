import React from "react";
import { Dictionary } from "@/types/dictionary";

interface BlogHeaderProps {
  dict: Dictionary;
}

export default function BlogHeader({ dict }: BlogHeaderProps) {
  return (
    <div className="blog__header">
      <h2 id="blog-title" className="blog__title">
        {dict.blog.content.title}
      </h2>
      <p className="blog__description">{dict.blog.content.subtitle}</p>
    </div>
  );
}
