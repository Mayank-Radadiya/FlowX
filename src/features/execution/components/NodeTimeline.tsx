"use client";

/**
 * NodeTimeline
 * ------------
 * Vertical timeline of node execution steps within an execution.
 * Each node card shows:
 *   - Node name + type
 *   - Status badge
 *   - Duration
 *   - Expandable input/output/error payloads
 */

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  CircleDashed,
  ChevronDown,
  Code2,
  ArrowRight,
  Cpu,
  Globe,
  Zap,
  MessageSquare,
  Clock3,
  Terminal,
  BrainCircuit,
  Layers,
} from "lucide-react";
import { ExecutionStatusBadge } from "./ExecutionStatusBadge";
import { formatDuration } from "./ExecutionDurationBadge";
import type { ExecutionLogItem } from "../types/execution-history.types";
import type { ExecutionStatus } from "@prisma/client";

// ─── Node type icon map ───────────────────────────────────────────────────────

const NODE_TYPE_ICONS: Record<string, React.ReactNode> = {
  MANUAL_TRIGGER: <Terminal className="size-3.5" />,
  HTTP_REQUEST: <Globe className="size-3.5" />,
  GOOGLE_FORM_TRIGGER: <Layers className="size-3.5" />,
  STRIPE_TRIGGER: <Zap className="size-3.5" />,
  ANTHROPIC: <BrainCircuit className="size-3.5" />,
  OPENAI: <BrainCircuit className="size-3.5" />,
  GEMINI: <BrainCircuit className="size-3.5" />,
  INITIAL: <Cpu className="size-3.5" />,
};

// ─── Timeline dot styles by status ───────────────────────────────────────────

const DOT_STYLES: Record<ExecutionStatus, string> = {
  QUEUED: "border-slate-400 bg-background",
  PENDING: "border-amber-400 bg-background",
  RUNNING: "border-blue-500 bg-background",
  COMPLETED: "border-emerald-500 bg-emerald-500",
  FAILED: "border-rose-500 bg-rose-500",
  CANCELLED: "border-zinc-400 bg-background",
};

const STATUS_ICONS: Record<ExecutionStatus, React.ReactNode> = {
  QUEUED: <CircleDashed className="size-3.5 text-slate-400" />,
  PENDING: <CircleDashed className="size-3.5 text-amber-400" />,
  RUNNING: <Loader2 className="size-3.5 text-blue-500 animate-spin" />,
  COMPLETED: <CheckCircle2 className="size-3.5 text-white" />,
  FAILED: <XCircle className="size-3.5 text-white" />,
  CANCELLED: <CircleDashed className="size-3.5 text-zinc-400" />,
};

// ─── Code block component ─────────────────────────────────────────────────────

interface CodeBlockProps {
  title: string;
  data: unknown;
  variant: "input" | "output" | "error";
}

function CodeBlock({ title, data, variant }: CodeBlockProps) {
  if (data === null || data === undefined) return null;
  if (typeof data === "object" && Object.keys(data as object).length === 0)
    return null;

  const variantStyles = {
    input: {
      icon: "text-slate-400",
      title: "text-slate-300",
      content: "text-slate-300",
    },
    output: {
      icon: "text-emerald-400",
      title: "text-emerald-300",
      content: "text-emerald-200",
    },
    error: {
      icon: "text-rose-400",
      title: "text-rose-300",
      content: "text-rose-300",
    },
  };

  const s = variantStyles[variant];

  return (
    <div className="overflow-hidden rounded-lg border border-white/5 bg-slate-950">
      <div className="flex items-center gap-2 border-b border-white/5 bg-slate-900/60 px-3 py-1.5">
        <Code2 className={cn("size-3", s.icon)} />
        <span className={cn("text-[10px] font-medium uppercase tracking-wider", s.title)}>
          {title}
        </span>
      </div>
      <div className="max-h-60 overflow-auto p-3">
        <pre className={cn("text-[11px] leading-relaxed font-mono whitespace-pre-wrap break-words", s.content)}>
          {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ─── Single timeline node ─────────────────────────────────────────────────────

interface TimelineNodeProps {
  log: ExecutionLogItem;
  isLast: boolean;
  index: number;
}

function TimelineNode({ log, isLast, index }: TimelineNodeProps) {
  const [expanded, setExpanded] = useState(log.status === "FAILED");
  const hasPayload = log.inputContext || log.outputContext || log.error;

  return (
    <div className="relative flex gap-4">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border/50" />
      )}

      {/* Timeline dot */}
      <div className="relative z-10 mt-1 shrink-0">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full border-2 bg-background shadow-sm",
            DOT_STYLES[log.status]
          )}
        >
          {STATUS_ICONS[log.status]}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 min-w-0">
        <div
          className={cn(
            "overflow-hidden rounded-xl border border-border/50 bg-card transition-shadow",
            expanded && "shadow-sm",
            log.status === "FAILED" && "border-rose-500/20"
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-3",
              "bg-muted/20 border-b border-border/30",
              hasPayload && "cursor-pointer hover:bg-muted/40 transition-colors"
            )}
            onClick={() => hasPayload && setExpanded((p) => !p)}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Step number */}
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                {index + 1}
              </span>

              {/* Node type icon */}
              <span className="shrink-0 text-muted-foreground">
                {NODE_TYPE_ICONS[log.nodeType ?? "INITIAL"] ?? <Cpu className="size-3.5" />}
              </span>

              {/* Name */}
              <span className="truncate text-sm font-medium text-foreground">
                {log.nodeName ?? log.nodeId}
              </span>

              {/* Node type pill */}
              {log.nodeType && (
                <span className="hidden sm:inline shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                  {log.nodeType.replace(/_/g, " ")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ExecutionStatusBadge status={log.status} size="sm" />
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {log.durationMs !== null
                  ? formatDuration(log.durationMs)
                  : log.status === "RUNNING"
                    ? "..."
                    : "—"}
              </span>
              {hasPayload && (
                <ChevronDown
                  className={cn(
                    "size-3.5 text-muted-foreground transition-transform",
                    expanded && "rotate-180"
                  )}
                />
              )}
            </div>
          </div>

          {/* Expandable payload */}
          {expanded && hasPayload && (
            <div className="space-y-2 p-4">
              <CodeBlock
                title="Input"
                data={log.inputContext}
                variant="input"
              />
              <CodeBlock
                title="Output"
                data={log.outputContext}
                variant="output"
              />
              <CodeBlock
                title="Error"
                data={log.error}
                variant="error"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface NodeTimelineProps {
  logs: ExecutionLogItem[];
  isLoading?: boolean;
}

export function NodeTimeline({ logs, isLoading }: NodeTimelineProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="mt-1 size-8 rounded-full bg-muted shrink-0" />
            <div className="flex-1 rounded-xl border border-border/30 bg-muted/20 h-12" />
          </div>
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Layers className="size-8 text-muted-foreground/30 mb-3" />
        <p className="text-sm text-muted-foreground">No node logs recorded.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {logs.map((log, i) => (
        <TimelineNode
          key={log.id}
          log={log}
          isLast={i === logs.length - 1}
          index={i}
        />
      ))}

      {/* End marker */}
      {logs.length > 0 && (
        <div className="flex items-center gap-3 pl-10 pt-2">
          <ArrowRight className="size-3.5 text-muted-foreground/40" />
          <span className="text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
            {logs[logs.length - 1]?.status === "COMPLETED" ||
            logs.every((l) => l.status === "COMPLETED")
              ? "Workflow Complete"
              : "End of recorded steps"}
          </span>
        </div>
      )}
    </div>
  );
}
