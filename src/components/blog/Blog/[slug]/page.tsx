import React from "react";

interface BlogDetailPageProps {
  params: { slug: string };
}

const mockBlogPosts = [
  {
    slug: "exploring-hidden-gems-istanbul",
    title: "Exploring the Hidden Gems of Istanbul",
    content:
      "Here you can write the full blog post about Istanbul’s hidden gems...",
  },
  {
    slug: "top-5-hiking-trails-balkans",
    title: "Top 5 Hiking Trails in the Balkans",
    content: "Detailed article about Balkan hiking trails...",
  },
  {
    slug: "photography-tips-for-beginners",
    title: "Photography Tips for Beginners",
    content: "Beginner-friendly photography guide...",
  },
];

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = mockBlogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <section className="blog-detail container">
      <h1 className="blog-detail__title">{post.title}</h1>
      <p className="blog-detail__content">{post.content}</p>
    </section>
  );
}
