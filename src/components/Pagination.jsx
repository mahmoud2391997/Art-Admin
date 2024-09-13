/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Pagination ({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 2) {
      endPage = Math.min(4, totalPages);
    }
    if (currentPage >= totalPages - 1) {
      startPage = Math.max(totalPages - 3, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        className="px-4 py-2   text-gray-600 hover:text-[#c9ab81] "
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 border border-gray-300 rounded-md ${
            page === currentPage
              ? "bg-[#c9ab81] text-gray-800"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 text-gray-600 hover:text-[#c9ab81] "
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};


