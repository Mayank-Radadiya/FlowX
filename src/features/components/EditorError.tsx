/**
 * EditorError Component
 * ---------------------
 * UI shown when a workflow fails to load (invalid ID, missing permission,
 * deleted workflow, etc.). Provides:
 *   - A clear error message
 *   - A warning icon
 *   - A styled card with blur + gradient glow
 *   - A button to navigate back to the workflow list
 *
 * This component is designed to be displayed inside the workflow editor page
 * when the backend returns null or an error.
 */

"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function EditorError() {
  return (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center p-6">
      <div className="relative flex max-w-md flex-col items-center rounded-2xl border border-white/20 bg-white/60 p-8 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/60">
        {/* Subtle gradient glow behind card */}
        <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-br from-destructive/20 via-transparent to-transparent blur-2xl" />

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 backdrop-blur-sm">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
          Failed to load workflow
        </h2>

        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          This workflow may have been deleted or you don&apos;t have permission
          to access it.
        </p>

        <Button asChild variant="outline" className="backdrop-blur-sm">
          <Link href="/workflow">
            <ArrowLeft className="h-4 w-4" />
            Back to Workflows
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default EditorError;
