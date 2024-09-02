import { Button } from "@material-tailwind/react";
import React from "react";
import LeftIcon from "./icons/LeftIcon";
import RightIcon from "./icons/RightIcon";

export default function Pagination({
  handlePageChange,
  currentPage,
  totalPages,
}) {
  return (
    <>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 bg-transparent shadow-none hover:shadow-none transition-all duration-500 ease-in-out text-[var(--main-gray)] hover:text-[var(--main-color)]"
      >
        <LeftIcon />
      </Button>

      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={
            currentPage === index + 1
              ? "underline text-sm px-3 bg-transparent shadow-none hover:shadow-none transition-all duration-500 ease-in-out text-[var(--main-color)]"
              : "text-xs px-2 bg-transparent shadow-none hover:shadow-none transition-all duration-500 ease-in-out text-[var(--main-gray)] hover:text-[var(--main-color)]"
          }
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 bg-transparent shadow-none hover:shadow-none transition-all duration-500 ease-in-out text-[var(--main-gray)] hover:text-[var(--main-color)]"
      >
        <RightIcon />
      </Button>
    </>
  );
}