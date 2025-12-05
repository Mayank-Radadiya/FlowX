/**
 * Utility hook to generate a pagination range for UI components.
 * Handles left/right ellipsis logic and computes which page numbers
 * should be shown based on the current page and total pages.
 */

type UsePaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay: number;
};

type UsePaginationReturn = {
  pages: number[];
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
};

export function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay,
}: UsePaginationProps): UsePaginationReturn {
  // Determine when ellipses should appear
  const showLeftEllipsis = currentPage - 1 > paginationItemsToDisplay / 2;
  const showRightEllipsis =
    totalPages - currentPage + 1 > paginationItemsToDisplay / 2;

  // Compute the range of page numbers to show
  function calculatePaginationRange(): number[] {
    // If total pages are fewer than display count, show all pages
    if (totalPages <= paginationItemsToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);

    // Start with centered range around the current page
    const initialRange = {
      end: currentPage + halfDisplay,
      start: currentPage - halfDisplay,
    };

    // Adjust range so it stays within valid bounds
    const adjustedRange = {
      end: Math.min(totalPages, initialRange.end),
      start: Math.max(1, initialRange.start),
    };

    // Snap-to-start when near beginning
    if (adjustedRange.start === 1) {
      adjustedRange.end = paginationItemsToDisplay;
    }

    // Snap-to-end when near ending
    if (adjustedRange.end === totalPages) {
      adjustedRange.start = totalPages - paginationItemsToDisplay + 1;
    }

    // Apply ellipsis logic adjustments
    if (showLeftEllipsis) adjustedRange.start++;
    if (showRightEllipsis) adjustedRange.end--;

    // Generate the final numeric page list
    return Array.from(
      { length: adjustedRange.end - adjustedRange.start + 1 },
      (_, i) => adjustedRange.start + i
    );
  }

  const pages = calculatePaginationRange();

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  };
}
