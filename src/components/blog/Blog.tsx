"use client";

import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Exploring the Hidden Gems of Istanbul",
    description:
      "Discover the less-known but breathtaking spots of Istanbul beyond the usual tourist paths.",
    date: "2025-08-10",
    author: "John Doe",
    thumbnail: "/images/blog/istanbul.jpg",
  },
  {
    id: 2,
    title: "Top 5 Hiking Trails in the Balkans",
    description:
      "A curated list of the most scenic and adventurous hiking trails in the Balkan Peninsula.",
    date: "2025-07-25",
    author: "John Doe",
    thumbnail: "/images/blog/balkans.jpg",
  },
  {
    id: 3,
    title: "Photography Tips for Beginners",
    description:
      "Learn essential techniques to improve your photography skills and capture better shots.",
    date: "2025-06-30",
    author: "Jane Smith",
    thumbnail: "/images/blog/photography.jpg",
  },
];

export default function Blog() {
  return (
    <section className="blog" aria-labelledby="blog-title">
      <div className="blog__body container">
        <div className="blog__header">
          <h2 id="blog-title" className="blog__title">
            Blog
          </h2>
          <p className="blog__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="blog__list">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog__item">
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
                <a href="#" className="blog__item-button">
                  Devamını Oku
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
