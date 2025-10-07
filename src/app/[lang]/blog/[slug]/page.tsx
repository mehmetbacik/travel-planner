import React from "react";
import Image from "next/image";
import Hero from "@/components/blog/Hero";
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

  const post: BlogPost | undefined = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="blog__detail">
        <h1 className="blog__detail-title">Blog post not found</h1>
        <p className="blog__detail-content">
          The blog post you are looking for does not exist.
        </p>
      </section>
    );
  }

  return (
    <section className="blog__detail">
      <Hero dict={dict} />
      <div className="blog__detail-main">
        <div className="blog__detail-header">
          <h1 className="blog__detail-title">{post.title}</h1>
          <div className="blog__detail-meta">
            <span className="blog__detail-author">{post.author}</span>
            <span className="blog__detail-date">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="blog__detail-content">
          <div className="blog__detail-thumbnail">
            <Image src={post.thumbnail} alt={post.title} width={350} height={550} />
          </div>
          <article className="blog__detail-description">
            <p>{post.description}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
