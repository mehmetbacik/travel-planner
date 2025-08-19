"use client";

import React, { useState } from "react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    slug: "exploring-hidden-gems-istanbul",
    title: "Exploring the Hidden Gems of Istanbul",
    description:
      "Discover the less-known but breathtaking spots of Istanbul beyond the usual tourist paths.",
    date: "2025-08-10",
    author: "John Doe",
    thumbnail: "/images/blog/istanbul.jpg",
  },
  {
    id: 2,
    slug: "top-5-hiking-trails-balkans",
    title: "Top 5 Hiking Trails in the Balkans",
    description:
      "A curated list of the most scenic and adventurous hiking trails in the Balkan Peninsula.",
    date: "2025-07-25",
    author: "John Doe",
    thumbnail: "/images/blog/balkans.jpg",
  },
  {
    id: 3,
    slug: "photography-tips-for-beginners",
    title: "Photography Tips for Beginners",
    description:
      "Learn essential techniques to improve your photography skills and capture better shots.",
    date: "2025-06-30",
    author: "Jane Smith",
    thumbnail: "/images/blog/photography.jpg",
  },
  {
    id: 4,
    slug: "hidden-cafes-istanbul",
    title: "Hidden Cafes of Istanbul",
    description: "A guide to Istanbul’s coziest and most secret cafes.",
    date: "2025-06-20",
    author: "Mehmet Bacik",
    thumbnail: "/images/blog/cafe.jpg",
  },
  {
    id: 5,
    slug: "mountain-biking-balkans",
    title: "Mountain Biking in the Balkans",
    description: "Exciting trails for biking enthusiasts across the Balkans.",
    date: "2025-05-15",
    author: "John Doe",
    thumbnail: "/images/blog/biking.jpg",
  },
];

const POSTS_PER_PAGE = 3;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pages.push("ellipsis");
      }
    }
    return pages.filter(
      (page, index, arr) => page !== "ellipsis" || arr[index - 1] !== "ellipsis"
    );
  };

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
          {currentPosts.map((post) => (
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
                <Link href={`/blog/${post.slug}`} className="blog__item-button">
                  Devamını Oku
                </Link>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="blog__pagination">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="blog__pagination-btn"
            >
              Önceki
            </button>

            <div className="blog__pagination-pages">
              {getPageNumbers().map((page, index) =>
                page === "ellipsis" ? (
                  <span key={`ellipsis-${index}`} className="blog__pagination-ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page as number)}
                    className={`blog__pagination-page ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="blog__pagination-btn"
            >
              Sonraki
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
