/**
 * PageHeaderBackground Component
 * ------------------------------
 * Renders the decorative background layers for the PageHeader.
 *
 * Responsibilities:
 *  - Apply a gradient base background
 *  - Render multiple blurred glow layers for depth
 *  - Overlay subtle noise to reduce banding and add texture
 *
 * This component is purely visual and contains no state
 * or interaction logic.
 */

import { cn } from "@/lib/utils";

interface PageHeaderBackgroundProps {
  bg: string;
  glow1: string;
  glow2: string;
}

export function PageHeaderBackground({
  bg,
  glow1,
  glow2,
}: PageHeaderBackgroundProps) {
  return (
    <>
      {/* Base gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br", // Covers entire header area
          bg // Theme-specific gradient classes
        )}
      />

      {/* Glow layers for visual depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary glow */}
        <div
          className={cn(
            "absolute -top-1/2 -right-1/2 size-full rounded-full blur-3xl opacity-60",
            glow1 // Theme-defined glow color
          )}
        />

        {/* Secondary glow */}
        <div
          className={cn(
            "absolute -bottom-1/2 -left-1/2 size-full rounded-full blur-3xl opacity-40",
            glow2 // Secondary theme glow color
          )}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          // Inline SVG noise pattern to reduce color banding
          backgroundImage: `url("data:image/svg+xml,...")`,
        }}
      />
    </>
  );
}
