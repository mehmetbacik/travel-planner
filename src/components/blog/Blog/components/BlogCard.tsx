import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog__item">
      <div className="blog__item-thumbnail">
        <img src={post.thumbnail} alt={post.title} />
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
        <Link href={`/blog/${post.slug}`} className="blog__item-button">
          Devamını Oku
        </Link>
      </div>
    </article>
  );
}
