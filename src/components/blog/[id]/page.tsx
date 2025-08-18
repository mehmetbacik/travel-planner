import React from "react";

interface BlogDetailPageProps {
  params: { id: string };
}

const mockBlogPosts = [
  {
    id: "1",
    title: "Exploring the Hidden Gems of Istanbul",
    content:
      "Here you can write the full blog post about Istanbul’s hidden gems...",
  },
  {
    id: "2",
    title: "Top 5 Hiking Trails in the Balkans",
    content: "Detailed article about Balkan hiking trails...",
  },
  {
    id: "3",
    title: "Photography Tips for Beginners",
    content: "Beginner-friendly photography guide...",
  },
];

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = mockBlogPosts.find((p) => p.id === params.id);

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
