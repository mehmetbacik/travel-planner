import React from "react";
import Image from "next/image";
import { blogPosts } from "@/services/data/blogPosts";
import { BlogPost } from "@/types/blog";
import { getDictionary } from "../../../i18n/getDictionary";
import { Locale } from "../../../i18n/settings";

interface BlogDetailPageProps {
  params: { slug: string; lang: Locale };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug, lang } = params;
  const dict = await getDictionary(lang);
  
  const post: BlogPost | undefined = blogPosts.find(
    (p) => p.slug === slug
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
        <Image src={post.thumbnail} alt={post.title} />
      </div>
      <article className="blog-detail__content">
        <p>{post.description}</p>
      </article>
    </section>
  );
}
