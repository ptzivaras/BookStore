import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const prev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const next = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      <span className="font-medium">
        Page {currentPage} / {totalPages}
      </span>

      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
