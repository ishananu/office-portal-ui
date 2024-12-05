import React from 'react';

interface PaginationProps {
  totalPages: number; // Total number of pages
  currentPage: number; // Currently selected page
  onPageChange: (page: number) => void; // Callback when the page is changed
  itemsPerPageText?: string; // Optional text to show items per page
  totalItems?: number; // Optional: Total number of items
}

const TablePagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  itemsPerPageText = 'Showing 1-10',
  totalItems
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`flex items-center justify-center px-3 py-2 text-sm leading-tight border 
              ${
                currentPage === i
                  ? 'text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 '
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
              }`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md ">
      <nav
        className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 ">
          Showing{' '}
          <span className="font-semibold text-gray-900 ">
            {itemsPerPageText}{' '}
          </span>
          {totalItems && (
            <>
              of{' '}
              <span className="font-semibold text-gray-900 ">{totalItems}</span>
            </>
          )}
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isFirstPage}
              className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 rounded-l-lg border 
                ${
                  isFirstPage
                    ? 'text-gray-300 bg-white border-gray-300 '
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
                }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLastPage}
              className={`flex items-center justify-center h-full py-1.5 px-3 rounded-r-lg border 
                ${
                  isLastPage
                    ? 'text-gray-300 bg-white border-gray-300 '
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
                }`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePagination;
