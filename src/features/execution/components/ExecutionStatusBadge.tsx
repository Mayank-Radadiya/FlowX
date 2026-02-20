"use client";

/**
 * ExecutionStatusBadge
 * --------------------
 * Renders a coloured pill badge for an execution status.
 * - RUNNING shows an animated live dot
 * - All statuses have distinct, accessible colours
 */

import { cn } from "@/lib/utils";
import type { ExecutionStatus } from "@prisma/client";
import { EXECUTION_STATUS_CONFIG } from "../types/execution-history.types";

interface ExecutionStatusBadgeProps {
  status: ExecutionStatus;
  /** "sm" = compact (for table rows), "md" = default */
  size?: "sm" | "md";
  className?: string;
}

export function ExecutionStatusBadge({
  status,
  size = "md",
  className,
}: ExecutionStatusBadgeProps) {
  const cfg = EXECUTION_STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide",
        cfg.color,
        cfg.textColor,
        cfg.borderColor,
        size === "sm"
          ? "px-2 py-0.5 text-[10px] uppercase"
          : "px-2.5 py-1 text-xs",
        className
      )}
    >
      {cfg.isLive ? (
        <span className="relative flex size-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              cfg.dotColor
            )}
          />
          <span
            className={cn("relative inline-flex size-1.5 rounded-full", cfg.dotColor)}
          />
        </span>
      ) : (
        <span className={cn("size-1.5 rounded-full", cfg.dotColor)} />
      )}
      {cfg.label}
    </span>
  );
}
