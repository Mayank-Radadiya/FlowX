/**
 * Execution History — TypeScript Types
 * -------------------------------------
 * Centralised type definitions for the Execution History system.
 * These types align with the Prisma schema and are used across
 * tRPC routes, React components, and utility functions.
 */

import type { ExecutionStatus, TriggerType } from "@prisma/client";

// Re-export Prisma enums for convenience
export type { ExecutionStatus, TriggerType };

// ─── Duration Utilities ───────────────────────────────────────────────────────

export interface ExecutionDuration {
  ms: number;
  seconds: number;
  display: string; // e.g. "1.23s" | "2m 14s"
}

// ─── Execution List Item (summary row) ───────────────────────────────────────

export interface ExecutionListItem {
  id: string;
  workflowId: string;
  workflowName: string;
  status: ExecutionStatus;
  triggerType: TriggerType;
  startedAt: Date;
  completedAt: Date | null;
  /** Computed at query time */
  durationMs: number | null;
  /** Number of node steps */
  nodeCount: number;
  /** Number of failed nodes */
  failedNodeCount: number;
  createdAt: Date;
}

// ─── Execution Log (node-level step) ─────────────────────────────────────────

export interface ExecutionLogItem {
  id: string;
  executionId: string;
  nodeId: string;
  nodeName: string | null;
  nodeType: string | null;
  status: ExecutionStatus;
  inputContext: Record<string, unknown> | null;
  outputContext: Record<string, unknown> | null;
  error: string | null;
  startedAt: Date;
  completedAt: Date | null;
  durationMs: number | null;
}

// ─── Execution Detail (full detail for the side panel) ───────────────────────

export interface ExecutionDetail {
  id: string;
  workflowId: string;
  workflowName: string;
  status: ExecutionStatus;
  triggerType: TriggerType;
  startedAt: Date;
  completedAt: Date | null;
  durationMs: number | null;
  logs: ExecutionLogItem[];
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface ExecutionFilters {
  search: string;
  status: ExecutionStatus | "ALL";
  triggerType: TriggerType | "ALL";
  workflowId: string | null;
  page: number;
  pageSize: number;
}

// ─── Paginated Response ───────────────────────────────────────────────────────

export interface PaginatedExecutions {
  items: ExecutionListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ─── Stats (for the summary cards) ───────────────────────────────────────────

export interface ExecutionStats {
  total: number;
  running: number;
  completed: number;
  failed: number;
  cancelled: number;
  successRate: number | null; // 0–100
  avgDurationMs: number | null;
}

// ─── Status Config (for badge rendering) ─────────────────────────────────────

export interface StatusConfig {
  label: string;
  color: string; // Tailwind bg class
  textColor: string; // Tailwind text class
  borderColor: string; // Tailwind border class
  dotColor: string; // Tailwind bg class for the live dot
  isLive: boolean;
}

export const EXECUTION_STATUS_CONFIG: Record<ExecutionStatus, StatusConfig> = {
  QUEUED: {
    label: "Queued",
    color: "bg-slate-500/10",
    textColor: "text-slate-500 dark:text-slate-400",
    borderColor: "border-slate-500/20",
    dotColor: "bg-slate-400",
    isLive: false,
  },
  PENDING: {
    label: "Pending",
    color: "bg-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-500/20",
    dotColor: "bg-amber-400",
    isLive: false,
  },
  RUNNING: {
    label: "Running",
    color: "bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/20",
    dotColor: "bg-blue-400",
    isLive: true,
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/20",
    dotColor: "bg-emerald-400",
    isLive: false,
  },
  FAILED: {
    label: "Failed",
    color: "bg-rose-500/10",
    textColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/20",
    dotColor: "bg-rose-400",
    isLive: false,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-zinc-500/10",
    textColor: "text-zinc-500 dark:text-zinc-400",
    borderColor: "border-zinc-500/20",
    dotColor: "bg-zinc-400",
    isLive: false,
  },
};

export const TRIGGER_TYPE_LABELS: Record<TriggerType, string> = {
  MANUAL: "Manual",
  WEBHOOK: "Webhook",
  SCHEDULE: "Schedule",
  API: "API",
};
