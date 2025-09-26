import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { Locale } from "@/app/i18n/settings";

interface BlogCardProps {
  post: BlogPost;
  lang: Locale;
}

export default function BlogCard({ post, lang }: BlogCardProps) {
  return (
    <article className="blog__item">
      <div className="blog__item-thumbnail">
        <Image src={post.thumbnail} alt={post.title} />
      </div>
      <div className="blog__item-content">
        <h3 className="blog__item-title">{post.title}</h3>
        <p className="blog__item-description">{post.description}</p>
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
