"use client";

import React, { useState } from "react";
import { blogPosts } from "@/services/data/blogPosts";
import BlogHeader from "./components/BlogHeader";
import BlogList from "./components/BlogList";
import Pagination from "./components/Pagination";

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="blog" aria-labelledby="blog-title">
      <div className="blog__body container">
        <BlogHeader />

        <BlogList posts={currentPosts} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
