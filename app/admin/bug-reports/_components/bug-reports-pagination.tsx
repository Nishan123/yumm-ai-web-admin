interface PaginationProps {
  currentPage: number;
  total: number;
  totalPages: number;
  length: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

export const BugReportsPagination = ({
  currentPage,
  total,
  totalPages,
  length,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="text-sm text-gray-600">
        Showing {length} of {total} reports
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
