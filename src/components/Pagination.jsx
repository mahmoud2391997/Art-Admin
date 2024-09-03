/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-2 mx-1 ${
            currentPage === index + 1
              ? "bg-[#c9ab81] text-white"
              : "bg-gray-200 text-gray-700"
          } rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
