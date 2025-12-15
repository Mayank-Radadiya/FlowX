/**
 * WorkflowError Component
 * -----------------------
 * Displays a non-blocking error state when workflows fail to load.
 *
 * Purpose:
 * - Inform the user that something went wrong
 * - Keep the UI visually consistent with the rest of the app
 * - Avoid exposing technical error details
 *
 * This component is purely presentational:
 * - No props
 * - No state
 * - No retry logic
 */

import { AlertCircle } from "lucide-react";

function WorkflowError() {
  return (
    /**
     * Root container
     * --------------
     * - Red/destructive color palette communicates an error state
     * - Soft gradient and blur prevent the UI from feeling harsh
     * - Rounded container keeps consistency with other cards
     */
    <div className="relative overflow-hidden rounded-2xl border border-destructive/20 bg-linear-to-br from-destructive/10 via-destructive/5 to-transparent p-12">
      
      {/* Ambient background glow to add depth without distraction */}
      <div className="absolute -right-10 -top-10 size-32 rounded-full bg-destructive/10 blur-3xl" />

      {/* Main content wrapper */}
      <div className="relative flex flex-col items-center text-center">
        
        {/* Error icon container */}
        <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-destructive to-destructive/80 shadow-lg shadow-destructive/25">
          <AlertCircle className="size-8 text-white" />
        </div>

        {/* Primary error message */}
        <h3 className="mt-6 text-xl font-semibold">
          Something went wrong
        </h3>

        {/* Supporting explanation without technical details */}
        <p className="mt-2 max-w-sm text-muted-foreground">
          We couldn&apos;t load your workflows. Please refresh the page or try
          again later.
        </p>
      </div>
    </div>
  );
}

export default WorkflowError;
