"use client";

import React, { useState } from "react";
import { Dictionary } from "@/types/dictionary";
import { blogPosts } from "@/services/data/blogPosts";
import { Locale } from "@/app/i18n/settings";
import BlogHeader from "./components/BlogHeader";
import BlogList from "./components/BlogList";
import Pagination from "./components/Pagination";

const POSTS_PER_PAGE = 9;

interface BlogProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Blog({ lang, dict }: BlogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <section className="blog" aria-labelledby="blog-title">
      <div className="blog__body container">
        <BlogHeader dict={dict} />

        <BlogList posts={currentPosts} lang={lang} dict={dict}/>

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
