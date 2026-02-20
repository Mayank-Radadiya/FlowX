"use client";

/**
 * ExecutionTable
 * --------------
 * Main list view for execution history.
 * - Sortable columns: workflow name, status, duration, started at, trigger
 * - Row click opens detail panel
 * - Rerun / Cancel actions per row
 * - Skeleton loading state
 * - Empty state
 */

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  StopCircle,
  ChevronRight,
  Zap,
  Globe,
  Clock3,
  Terminal,
  Workflow,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { ExecutionStatusBadge } from "./ExecutionStatusBadge";
import {
  ExecutionDurationBadge,
  formatDuration,
} from "./ExecutionDurationBadge";
import type { ExecutionListItem } from "../types/execution-history.types";
import type { TriggerType } from "@prisma/client";

// ─── Trigger icon map ─────────────────────────────────────────────────────────

const TRIGGER_ICONS: Record<TriggerType, React.ReactNode> = {
  MANUAL: <Terminal className="size-3.5" />,
  WEBHOOK: <Globe className="size-3.5" />,
  SCHEDULE: <Clock3 className="size-3.5" />,
  API: <Zap className="size-3.5" />,
};

const TRIGGER_LABELS: Record<TriggerType, string> = {
  MANUAL: "Manual",
  WEBHOOK: "Webhook",
  SCHEDULE: "Schedule",
  API: "API",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface ExecutionTableProps {
  items: ExecutionListItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRerun: (id: string) => void;
  onCancel: (id: string) => void;
  isRerunning?: string | null;
  isCancelling?: string | null;
  isLoading?: boolean;
  /** Rendered inline immediately below the selected row */
  expansionSlot?: React.ReactNode;
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-6 py-4 border-b border-border/40 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-lg bg-muted" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-32 rounded bg-muted" />
          <div className="h-2.5 w-20 rounded bg-muted/60" />
        </div>
      </div>
      <div className="h-5 w-20 rounded-full bg-muted" />
      <div className="h-3 w-16 rounded bg-muted/60" />
      <div className="h-3 w-24 rounded bg-muted/60" />
      <div className="h-5 w-16 rounded bg-muted/60" />
      <div className="h-7 w-16 rounded bg-muted/40" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ExecutionTable({
  items,
  selectedId,
  onSelect,
  onRerun,
  onCancel,
  isRerunning,
  isCancelling,
  isLoading,
  expansionSlot,
}: ExecutionTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
        <TableHeader />
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
        <TableHeader />
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
      <TableHeader />
      <div className="divide-y divide-border/40">
        {items.map((item) => (
          <div key={item.id}>
            <ExecutionRow
              item={item}
              isSelected={selectedId === item.id}
              onSelect={() => onSelect(item.id)}
              onRerun={() => onRerun(item.id)}
              onCancel={() => onCancel(item.id)}
              isRerunning={isRerunning === item.id}
              isCancelling={isCancelling === item.id}
            />
            {/* Inline accordion expansion below the selected row */}
            {selectedId === item.id && expansionSlot && (
              <div className="border-t border-indigo-500/20 bg-background/60 dark:bg-slate-900/80 animate-in slide-in-from-top-2 duration-200">
                {expansionSlot}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TableHeader() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-border/50 bg-muted/30 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      <div>Workflow / Run</div>
      <div>Status</div>
      <div>Duration</div>
      <div>Started</div>
      <div>Trigger</div>
      <div className="text-right">Actions</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/50 mb-5">
        <Workflow className="size-8 text-muted-foreground/50" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">
        No executions found
      </p>
      <p className="text-xs text-muted-foreground max-w-xs">
        Try adjusting your filters or run a workflow to see executions here.
      </p>
    </div>
  );
}

interface ExecutionRowProps {
  item: ExecutionListItem;
  isSelected: boolean;
  onSelect: () => void;
  onRerun: () => void;
  onCancel: () => void;
  isRerunning: boolean;
  isCancelling: boolean;
}

function ExecutionRow({
  item,
  isSelected,
  onSelect,
  onRerun,
  onCancel,
  isRerunning,
  isCancelling,
}: ExecutionRowProps) {
  const isRunning = item.status === "RUNNING";
  const canCancel = item.status === "RUNNING" || item.status === "PENDING";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className={cn(
        "group grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-6 py-4",
        "cursor-pointer transition-colors duration-150",
        "hover:bg-muted/40",
        isSelected &&
          "bg-indigo-500/5 dark:bg-indigo-500/10 border-l-2 border-indigo-500/60",
      )}
    >
      {/* Workflow + Run ID */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            isRunning
              ? "bg-blue-500/10 text-blue-500"
              : item.status === "COMPLETED"
                ? "bg-emerald-500/10 text-emerald-500"
                : item.status === "FAILED"
                  ? "bg-rose-500/10 text-rose-500"
                  : "bg-muted text-muted-foreground",
          )}
        >
          <Workflow className="size-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-foreground">
            {item.workflowName}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-mono text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
              #{item.id.slice(-8).toUpperCase()}
            </span>
            {item.failedNodeCount > 0 && (
              <span className="text-[10px] text-rose-500 font-medium">
                {item.failedNodeCount} node{item.failedNodeCount > 1 ? "s" : ""}{" "}
                failed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div>
        <ExecutionStatusBadge status={item.status} size="sm" />
      </div>

      {/* Duration */}
      <div>
        <ExecutionDurationBadge
          durationMs={item.durationMs}
          isRunning={isRunning}
        />
      </div>

      {/* Started at */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-foreground/80">
          {formatDistanceToNow(new Date(item.startedAt), { addSuffix: true })}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          {format(new Date(item.startedAt), "MMM d, HH:mm:ss")}
        </span>
      </div>

      {/* Trigger type */}
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-muted/30 px-2 py-1 text-[11px] font-medium text-muted-foreground">
          {TRIGGER_ICONS[item.triggerType]}
          {TRIGGER_LABELS[item.triggerType]}
        </span>
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-end gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        {canCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            disabled={isCancelling}
            title="Cancel execution"
            className="size-7 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
          >
            <StopCircle
              className={cn("size-3.5", isCancelling && "animate-spin")}
            />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRerun}
          disabled={isRerunning}
          title="Re-run workflow"
          className="size-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <RefreshCw
            className={cn("size-3.5", isRerunning && "animate-spin")}
          />
        </Button>
        <ChevronRight
          className={cn(
            "size-4 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground",
            isSelected && "text-primary",
          )}
        />
      </div>
    </div>
  );
}
