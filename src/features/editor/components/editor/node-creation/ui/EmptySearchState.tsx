/**
 * EmptySearchState Component
 * --------------------------
 * Displays an informative empty state when a node search
 * returns no matching results.
 *
 * Responsibilities:
 * - Communicate that the search yielded no matches
 * - Echo the user's search query for clarity
 * - Maintain visual consistency with other empty states
 *
 * This component is purely presentational:
 * - No state
 * - No side effects
 * - Fully controlled by parent props
 */

import { Search } from "lucide-react";

interface EmptyStateProps {
  /** The current search input entered by the user */
  searchQuery: string;
}

const EmptySearchState = ({ searchQuery }: EmptyStateProps) => (
  /**
   * Root container
   * --------------
   * Centers the empty state content and provides
   * sufficient spacing so it feels intentional.
   */
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {/* Icon wrapper to visually represent search context */}
    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
      <Search className="size-5 text-muted-foreground" />
    </div>

    {/* Primary message */}
    <h3 className="mt-4 text-sm font-medium text-foreground">No nodes found</h3>

    {/* Supporting message including the user’s search term */}
    <p className="mt-1 text-xs text-muted-foreground">
      No results for &ldquo;{searchQuery}&rdquo;. Try a different search term.
    </p>
  </div>
);

export default EmptySearchState;
