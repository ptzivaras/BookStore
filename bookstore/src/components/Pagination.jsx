export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-4 py-2 rounded border
          bg-white dark:bg-slate-800
          border-slate-300 dark:border-slate-700
          text-slate-800 dark:text-slate-100
          hover:bg-slate-100 dark:hover:bg-slate-700
          disabled:opacity-50
          transition
        "
      >
        Previous
      </button>

      <span className="font-medium text-slate-800 dark:text-slate-100">
        Page {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-4 py-2 rounded border
          bg-white dark:bg-slate-800
          border-slate-300 dark:border-slate-700
          text-slate-800 dark:text-slate-100
          hover:bg-slate-100 dark:hover:bg-slate-700
          disabled:opacity-50
          transition
        "
      >
        Next
      </button>
    </div>
  );
}
