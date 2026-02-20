"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  RefreshCw,
  StopCircle,
  Info,
  Calendar,
  Timer,
  Zap,
  Copy,
  Check,
  Workflow,
  Hash,
  CheckCircle2,
  XCircle,
  Activity,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ExecutionStatusBadge } from "./ExecutionStatusBadge";
import { formatDuration } from "./ExecutionDurationBadge";
import { NodeTimeline } from "./NodeTimeline";
import type { ExecutionDetail } from "../types/execution-history.types";
import { TRIGGER_TYPE_LABELS } from "../types/execution-history.types";
import { useState } from "react";

interface ExecutionDetailPanelProps {
  detail: ExecutionDetail | null;
  isLoading: boolean;
  onClose: () => void;
  onRerun: (executionId: string) => void;
  onCancel: (executionId: string) => void;
  isRerunning?: boolean;
  isCancelling?: boolean;
}

export function ExecutionDetailPanel({
  detail,
  isLoading,
  onClose,
  onRerun,
  onCancel,
  isRerunning,
  isCancelling,
}: ExecutionDetailPanelProps) {
  const [copied, setCopied] = useState(false);

  function copyId() {
    if (!detail) return;
    navigator.clipboard.writeText(detail.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const canCancel =
    detail?.status === "RUNNING" || detail?.status === "PENDING";

  return (
    <div className="flex h-full flex-col bg-card dark:bg-slate-900">
      {/* ── Panel header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-border/50 bg-muted/10 dark:bg-slate-800/60 px-5 py-3.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Workflow className="size-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              Execution Detail
            </p>
            {detail && (
              <button
                onClick={copyId}
                className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                #{detail.id.slice(-12).toUpperCase()}
                {copied ? (
                  <Check className="size-2.5 text-emerald-500" />
                ) : (
                  <Copy className="size-2.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Status pill in header */}
        {detail && (
          <div className="shrink-0">
            <ExecutionStatusBadge status={detail.status} />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-7 shrink-0"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* ── Loading skeleton ──────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="flex-1 p-5 space-y-4 animate-pulse">
          <div className="h-24 rounded-2xl bg-muted/60" />
          <div className="flex gap-3">
            <div className="h-9 flex-1 rounded-lg bg-muted/40" />
            <div className="h-9 flex-1 rounded-lg bg-muted/40" />
          </div>
          <div className="h-4 w-24 rounded bg-muted/40" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="size-8 rounded-full bg-muted shrink-0" />
              <div className="flex-1 h-14 rounded-xl bg-muted/30" />
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────────────────────── */}
      {!isLoading && !detail && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center p-8">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/30">
            <Info className="size-7 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              No execution selected
            </p>
            <p className="text-xs text-muted-foreground">
              Click any row in the table to inspect it.
            </p>
          </div>
        </div>
      )}

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      {!isLoading && detail && (
        <ScrollArea className="flex-1">
          <div className="p-5 space-y-5">
            {/* ── Metadata summary card ───────────────────────────────────────── */}
            <div className="rounded-2xl border border-border/50 dark:border-slate-700/60 bg-muted/10 dark:bg-slate-800/40 overflow-hidden">
              {/* Compact key-value rows */}
              <MetaRow
                icon={<Workflow className="size-3.5" />}
                label="Workflow"
                value={detail.workflowName}
              />
              <MetaRow
                icon={<Timer className="size-3.5" />}
                label="Duration"
                value={
                  detail.durationMs !== null
                    ? formatDuration(detail.durationMs)
                    : detail.status === "RUNNING"
                      ? "Running..."
                      : "—"
                }
                mono
              />
              <MetaRow
                icon={<Zap className="size-3.5" />}
                label="Trigger"
                value={TRIGGER_TYPE_LABELS[detail.triggerType]}
              />
              <MetaRow
                icon={<Calendar className="size-3.5" />}
                label="Started"
                value={`${format(new Date(detail.startedAt), "MMM d, yyyy · HH:mm:ss")} (${formatDistanceToNow(new Date(detail.startedAt), { addSuffix: true })})`}
                mono
              />
              {detail.completedAt && (
                <MetaRow
                  icon={<Calendar className="size-3.5" />}
                  label="Completed"
                  value={format(
                    new Date(detail.completedAt),
                    "MMM d, yyyy · HH:mm:ss",
                  )}
                  mono
                />
              )}

              {/* Node stats strip */}
              <div className="flex items-stretch border-t border-border/30">
                <NodeStatCell
                  label="Total"
                  value={detail.logs.length}
                  color="text-foreground"
                  icon={<Hash className="size-3.5" />}
                />
                <div className="w-px bg-border/30" />
                <NodeStatCell
                  label="Completed"
                  value={
                    detail.logs.filter((l) => l.status === "COMPLETED").length
                  }
                  color="text-emerald-500"
                  icon={<CheckCircle2 className="size-3.5 text-emerald-500" />}
                />
                <div className="w-px bg-border/30" />
                <NodeStatCell
                  label="Failed"
                  value={
                    detail.logs.filter((l) => l.status === "FAILED").length
                  }
                  color="text-rose-500"
                  icon={<XCircle className="size-3.5 text-rose-500" />}
                />
                <div className="w-px bg-border/30" />
                <NodeStatCell
                  label="Running"
                  value={
                    detail.logs.filter((l) => l.status === "RUNNING").length
                  }
                  color="text-blue-500"
                  icon={<Activity className="size-3.5 text-blue-500" />}
                />
              </div>
            </div>

            {/* ── Actions ──────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRerun(detail.id)}
                disabled={isRerunning}
                className="flex-1 gap-2 h-9"
              >
                <RefreshCw
                  className={cn("size-3.5", isRerunning && "animate-spin")}
                />
                Re-run
              </Button>
              {canCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancel(detail.id)}
                  disabled={isCancelling}
                  className="flex-1 gap-2 h-9 text-rose-500 border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-500/50"
                >
                  <StopCircle
                    className={cn("size-3.5", isCancelling && "animate-spin")}
                  />
                  Cancel
                </Button>
              )}
            </div>

            {/* ── Node timeline ─────────────────────────────────────────────────── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Node Execution Trace
                </h3>
                <div className="h-px flex-1 bg-border/40" />
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {detail.logs.length} step{detail.logs.length !== 1 ? "s" : ""}
                </span>
              </div>
              <NodeTimeline logs={detail.logs} />
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

// ─── MetaRow ─────────────────────────────────────────────────────────────────

function MetaRow({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-2.5 border-b border-border/20 dark:border-slate-700/40 last:border-0">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 pt-0.5">
        {icon}
        {label}
      </div>
      <span
        className={cn(
          "text-right text-xs text-foreground/90 dark:text-slate-200 min-w-0 break-all",
          mono && "font-mono",
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ─── NodeStatCell ─────────────────────────────────────────────────────────────

function NodeStatCell({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-3 gap-1">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className={cn("text-base font-bold tabular-nums", color)}>
          {value}
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
