/**
 * PageHeaderIcon Component
 * -----------------------
 * Renders an optional icon for the PageHeader with accent and glow effects.
 *
 * Responsibilities:
 *  - Conditionally render the page icon
 *  - Apply gradient accent styling
 *  - Add a soft glow effect behind the icon
 *
 * This component is purely presentational and
 * enhances visual identity for each page.
 */

import { cn } from "@/lib/utils";

interface PageHeaderIconProps {
  icon: React.ReactNode;
  accent: string;
  glow: string;
}

export function PageHeaderIcon({ icon, accent, glow }: PageHeaderIconProps) {
  /**
   * Guard clause
   * ------------
   * If no icon is provided, nothing is rendered.
   * Prevents unnecessary DOM nodes and layout shifts.
   */
  if (!icon) return null;

  return (
    <div className="relative">
      {/* Glow layer behind the icon */}
      <div
        className={cn(
          "absolute inset-0 blur-xl opacity-50", // Soft, diffused glow
          glow // Theme-defined glow color
        )}
      />

      {/* Icon container */}
      <div
        className={cn(
          "relative flex size-14 items-center justify-center rounded-2xl",
          "bg-linear-to-br shadow-lg ring-1 ring-white/20",
          accent // Gradient accent styling
        )}
      >
        {/* Actual icon */}
        <div className="text-white">{icon}</div>
      </div>
    </div>
  );
};