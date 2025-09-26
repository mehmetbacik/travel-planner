import React from "react";
import { BlogPost } from "@/types/blog";
import { Locale } from "@/app/i18n/settings";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: BlogPost[];
  lang: Locale;
}

export default function BlogList({ posts, lang }: BlogListProps) {
  return (
    <div className="blog__list">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} lang={lang} />
      ))}
    </div>
  );
}
