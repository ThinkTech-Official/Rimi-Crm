import React from "react";

const DOTS = "...";

function usePagination({
  currentPage,
  totalCount,
  siblingCount = 1,
}: {
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
}) {
  const paginationRange = React.useMemo(() => {
    // Pages count is determined as (siblingCount + firstPage + lastPage + currentPage + 2*DOTS)
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If the number of pages is less than the page numbers we want to show in our
    // paginationComponent, we return the range [1..totalCount]
    if (totalCount <= totalPageNumbers) {
      return getAllPages(1, totalCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

    // We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits.
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalCount;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = getAllPages(1, leftItemCount);
      return [...leftRange, DOTS, totalCount];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getAllPages(totalCount - rightItemCount + 1, totalCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getAllPages(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalCount, currentPage, siblingCount]);

  return paginationRange;
}

function getAllPages(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

export const RenderPageNumbers = ({
  onPageChange,
  totalPages,
  page,
  siblingCount = 1,
}: {
  onPageChange: (p: number) => void;
  totalPages: number;
  page: number;
  siblingCount?: number;
}) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: totalPages,
    siblingCount,
  });

  if (totalPages === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Pagination Navigation" className="flex items-center space-x-1">
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <span key={`dots-${idx}`} className="px-2 text-gray-500 select-none">
              &#8230;
            </span>
          );
        }

        // We ensure pageNumber is treated as a number here
        const p = pageNumber as number;
        
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={page === p ? "page" : undefined}
            aria-label={`Go to page ${p}`}
            className={`
              min-w-[32px] py-3 px-3 text-sm font-medium transition-colors cursor-pointer
              ${
                page === p
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {p}
          </button>
        );
      })}
    </nav>
  );
};
