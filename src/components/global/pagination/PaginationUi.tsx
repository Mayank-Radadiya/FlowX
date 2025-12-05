/**
 * PaginationUi Component
 * ----------------------
 * A fully featured pagination UI component built on top of:
 *   - usePagination() → custom hook to calculate visible page numbers
 *   - shadCn/ui Pagination components
 *   - Tailwind styling + subtle animations
 *
 * Features:
 *  - Previous / Next buttons
 *  - Page number buttons
 *  - Left and right ellipsis when page list is long
 *  - Disabled states on first/last page
 *  - Automatically hides pagination if totalPages ≤ 1
 *
 * Usage Example:
 * <PaginationUi currentPage={page} totalPages={total} />
 */

"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/Pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number; // How many pages to show before ellipsis
};

export default function PaginationUi({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 3,
}: PaginationProps) {
  /**
   * usePagination()
   * ----------------
   * Handles the logic for determining:
   *  - Which page numbers to display
   *  - Whether to show left ellipsis (...)
   *  - Whether to show right ellipsis (...)
   *
   * Input:
   *  - currentPage
   *  - totalPages
   *  - paginationItemsToDisplay (max visible pages)
   *
   * Output:
   *  - pages[] = list of numbers to render
   *  - showLeftEllipsis
   *  - showRightEllipsis
   */
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    paginationItemsToDisplay,
    totalPages,
  });

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // If only one page exists → no need to show pagination UI
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent className="inline-flex items-center gap-1">
        {/* --------------------------------------
           Previous Page Button
         --------------------------------------- */}
        <PaginationItem>
          <PaginationLink
            aria-disabled={isFirstPage ? true : undefined}
            aria-label="Go to previous page"
            className={cn(
              "group relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200",
              isFirstPage
                ? "cursor-not-allowed border-border/30 bg-muted/30 text-muted-foreground/40"
                : "border-border/50 bg-background hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-95"
            )}
            href={isFirstPage ? undefined : `?page=${currentPage - 1}`}
          >
            <ChevronLeftIcon
              className={cn(
                "size-4 transition-transform duration-200",
                !isFirstPage && "group-hover:-translate-x-0.5"
              )}
            />
          </PaginationLink>
        </PaginationItem>

        {/* Left Ellipsis (...) when pages exceed visible range */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis className="flex h-9 w-9 items-center justify-center text-muted-foreground/60" />
          </PaginationItem>
        )}

        {/* --------------------------------------
           Numeric Page Buttons
           ---------------------------------------
           Each button:
           - Shows the page number
           - Highlights if it matches currentPage
           - Links to ?page=x
         --------------------------------------- */}
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  "relative flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "border-primary bg-primary dark:bg-primary text-white shadow-md shadow-primary/25 hover:text-primary"
                    : "border-border/50 bg-background hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-95"
                )}
                href={`?page=${page}`}
                isActive={isActive}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Right Ellipsis (... ) */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis className="flex h-9 w-9 items-center justify-center text-muted-foreground/60" />
          </PaginationItem>
        )}

        {/* --------------------------------------
           Next Page Button
         --------------------------------------- */}
        <PaginationItem>
          <PaginationLink
            aria-disabled={isLastPage ? true : undefined}
            aria-label="Go to next page"
            className={cn(
              "group relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200",
              isLastPage
                ? "cursor-not-allowed border-border/30 bg-muted/30 text-muted-foreground/40"
                : "border-border/50 bg-background hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-95"
            )}
            href={isLastPage ? undefined : `?page=${currentPage + 1}`}
          >
            <ChevronRightIcon
              className={cn(
                "size-4 transition-transform duration-200",
                !isLastPage && "group-hover:translate-x-0.5"
              )}
            />
          </PaginationLink>
        </PaginationItem>

        {/* --------------------------------------
           Page Indicator (e.g., "3 / 12")
         --------------------------------------- */}
        <div className="ml-2 hidden text-xs text-muted-foreground sm:block">
          <span className="font-medium text-foreground">{currentPage}</span>
          <span className="mx-1">/</span>
          <span>{totalPages}</span>
        </div>
      </PaginationContent>
    </Pagination>
  );
}
