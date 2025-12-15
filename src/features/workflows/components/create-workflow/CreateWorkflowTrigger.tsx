/**
 * CreateWorkflowTrigger Component
 * -------------------------------
 * Renders a styled trigger element used to open the "Create Workflow" dialog.
 *
 * Responsibilities:
 *  - Provide a visually prominent call-to-action
 *  - Support custom trigger content via children
 *  - Apply consistent gradient styling and interaction feedback
 *
 * This component is presentation-only and does not
 * manage dialog state itself.
 */

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface Props {
  /**
   * Optional class names for style extension or overrides.
   */
  className?: string;

  /**
   * Optional custom trigger content.
   * When omitted, a default icon + label is rendered.
   */
  children?: React.ReactNode;
}

export function CreateWorkflowTrigger({ className, children }: Props) {
  return (
    <div
      className={cn(
        // Base layout and alignment
        "inline-flex items-center justify-center gap-2 rounded-xl",

        // Gradient background for primary action emphasis
        "bg-linear-to-r from-violet-500 to-purple-600",

        // Spacing and typography
        "px-4 py-2 text-sm font-medium text-white",

        // Hover and focus interaction states
        "transition-all hover:from-violet-600 hover:to-purple-700",
        "focus-visible:ring-2 focus-visible:ring-violet-500",

        // Consumer-provided class names
        className
      )}
    >
      {/* Custom content or default trigger UI */}
      {children ?? (
        <>
          <Sparkles className="size-4" />
          Create Workflow
        </>
      )}
    </div>
  );
};
