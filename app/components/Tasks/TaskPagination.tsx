import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskPaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export const TaskPagination: React.FC<TaskPaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full bg-white border border-purple-100/80 rounded-2xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 mt-6">
      {/* Left Rows per page */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 outline-none appearance-none cursor-pointer focus:border-[#5A10A5]"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Center Pagination Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-purple-50 text-xs font-bold text-gray-700 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Previous
        </button>

        <div className="flex items-center gap-1.5">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer border-0 ${
                p === currentPage
                  ? "bg-[#5A10A5] text-white shadow-md shadow-purple-500/20"
                  : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-purple-50 text-xs font-bold text-gray-700 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Total Page info */}
      <span className="text-xs font-medium text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default TaskPagination;
