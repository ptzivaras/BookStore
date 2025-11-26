const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
