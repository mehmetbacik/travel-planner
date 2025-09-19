import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
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
            <span
              key={`ellipsis-${index}`}
              className="blog__pagination-ellipsis"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
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
  );
}
