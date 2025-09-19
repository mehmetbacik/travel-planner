import React from "react";
import { blogPosts } from "@/services/data/blogPosts";
import { BlogPost } from "@/types/blog";

interface BlogDetailPageProps {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post: BlogPost | undefined = blogPosts.find(
    (p) => p.slug === params.slug
  );

  if (!post) {
    return (
      <section className="blog-detail container">
        <h1 className="blog-detail__title">Blog post not found</h1>
        <p className="blog-detail__content">
          The blog post you are looking for does not exist.
        </p>
      </section>
    );
  }

  return (
    <section className="blog-detail container">
      <div className="blog-detail__header">
        <h1 className="blog-detail__title">{post.title}</h1>
        <div className="blog-detail__meta">
          <span className="blog-detail__author">{post.author}</span>
          <span className="blog-detail__date">
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="blog-detail__thumbnail">
        <img src={post.thumbnail} alt={post.title} />
      </div>
      <article className="blog-detail__content">
        <p>{post.description}</p>
      </article>
    </section>
  );
}
