"use client";

/**
 * ExecutionDurationBadge
 * ----------------------
 * Formats and displays an execution duration.
 * Shows a spinner for running executions.
 */

import { cn } from "@/lib/utils";
import { Timer } from "lucide-react";

interface Props {
  durationMs: number | null;
  isRunning?: boolean;
  className?: string;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)}s`;
  const m = Math.floor(s / 60);
  const rem = Math.round(s % 60);
  return `${m}m ${rem}s`;
}

export function ExecutionDurationBadge({ durationMs, isRunning, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-xs tabular-nums text-muted-foreground",
        className
      )}
    >
      <Timer className="size-3 shrink-0" />
      {isRunning
        ? "Running..."
        : durationMs !== null
          ? formatDuration(durationMs)
          : "—"}
    </span>
  );
}
