/**
 * WorkflowSkeleton Component
 * --------------------------
 * Displays a visual placeholder while workflows are loading.
 *
 * Purpose:
 * - Maintain layout stability during data fetching
 * - Provide immediate visual feedback to the user
 * - Match the final card layout to avoid layout shift
 *
 * This component is purely presentational:
 * - No props
 * - No state
 * - No data dependencies
 */

function WorkflowSkeleton() {
  return (
    /**
     * Grid layout
     * -----------
     * Mirrors the final workflow grid structure
     * so that content swaps in seamlessly once loaded.
     */
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        /**
         * Skeleton card
         * -------------
         * Each card represents a loading placeholder
         * for a single workflow item.
         */
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-black/10 bg-black/3 p-4 dark:border-white/6 dark:bg-white/2"
        >
          {/* 
            Shimmer overlay
            ---------------
            Animated gradient that moves across the card
            to indicate loading activity.
          */}
          <div
            className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(128,128,128,0.08), transparent)",
            }}
          />

          {/* Skeleton content structure */}
          <div className="space-y-3">
            {/* Header placeholder: icon + status */}
            <div className="flex items-start justify-between">
              <div className="size-10 rounded-lg bg-black/10 dark:bg-white/6" />
              <div className="h-6 w-14 rounded-full bg-black/6 dark:bg-white/4" />
            </div>

            {/* Title and description placeholders */}
            <div className="space-y-2 pt-1">
              <div className="h-4 w-2/3 rounded bg-black/10 dark:bg-white/6" />
              <div className="h-3.5 w-full rounded bg-black/6 dark:bg-white/4" />
            </div>

            {/* Footer placeholder */}
            <div className="flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/6">
              <div className="h-3 w-20 rounded bg-black/6 dark:bg-white/4" />
              <div className="flex gap-1">
                <div className="size-7 rounded-md bg-black/6 dark:bg-white/4" />
                <div className="size-7 rounded-md bg-black/6 dark:bg-white/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkflowSkeleton;
