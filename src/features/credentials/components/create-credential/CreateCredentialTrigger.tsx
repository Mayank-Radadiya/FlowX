/**
 * CreateCredentialTrigger Component
 * ---------------------------------
 * Renders a styled trigger element used to open the "Create Credential" dialog.
 *
 * Responsibilities:
 * - Provide a visually prominent call-to-action
 * - Support custom trigger content via children
 * - Apply blue gradient styling for credentials theme
 */

import { cn } from "@/lib/utils";
import { KeySquare } from "lucide-react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function CreateCredentialTrigger({ className, children }: Props) {
  return (
    <div
      className={cn(
        // Base layout and alignment
        "inline-flex items-center justify-center gap-2 rounded-xl group",

        // Blue gradient for credentials theme
        "bg-linear-to-r from-blue-500 to-cyan-600",

        // Spacing and typography
        "px-4 py-2 text-sm font-medium text-white",

        // Hover and focus interaction states
        "transition-all hover:from-blue-600 hover:to-cyan-700",
        "focus-visible:ring-2 focus-visible:ring-blue-500",

        className
      )}
    >
      {children ?? (
        <>
          <KeySquare className="size-4 group-hover:animate-pulse group-hover:fill-blue-500 group-hover:scale-105" />
          Add Credential
        </>
      )}
    </div>
  );
}
