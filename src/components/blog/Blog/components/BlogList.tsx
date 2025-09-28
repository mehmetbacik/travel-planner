import React from "react";
import { Dictionary } from "@/types/dictionary";
import { BlogPost } from "@/types/blog";
import { Locale } from "@/app/i18n/settings";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: BlogPost[];
  lang: Locale;
  dict: Dictionary;
}

export default function BlogList({ posts, lang, dict }: BlogListProps) {
  return (
    <div className="blog__list">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} lang={lang} dict={dict} />
      ))}
    </div>
  );
}
