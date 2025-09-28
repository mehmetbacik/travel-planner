import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { Locale } from "@/app/i18n/settings";

interface BlogCardProps {
  post: BlogPost;
  lang: Locale;
}

function truncateText(text: string, limit: number) {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  return (
    <article className="blog__item">
      <div className="blog__item-thumbnail">
        <Image src={post.thumbnail} alt={post.title} />
      </div>
      <div className="blog__item-content">
        <h3 className="blog__item-title">{truncateText(post.title, 25)}</h3>
        <p className="blog__item-description">
          {truncateText(post.description, 70)}
        </p>
        <div className="blog__item-meta">
          <span className="blog__item-author">{post.author}</span>
          <span className="blog__item-date">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
        <Link href={`/${lang}/blog/${post.slug}`} className="blog__item-button">
          Devamını Oku
        </Link>
      </div>
    </article>
  );
}
