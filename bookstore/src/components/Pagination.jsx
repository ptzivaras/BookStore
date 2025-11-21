import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={handlePrev}
        className="px-4 py-2 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        className="px-4 py-2 border rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
