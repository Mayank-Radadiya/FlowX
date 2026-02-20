"use client";

import { cn } from "@/lib/utils";
import { Zap, CheckCircle2, Timer, Activity } from "lucide-react";
import { formatDuration } from "./ExecutionDurationBadge";
import type { ExecutionStats } from "../types/execution-history.types";

interface ExecutionStatsCardsProps {
  stats: ExecutionStats | null | undefined;
  isLoading?: boolean;
}

export function ExecutionStatsCards({
  stats,
  isLoading,
}: ExecutionStatsCardsProps) {
  const cards = [
    {
      label: "Total Executions",
      display: stats ? stats.total.toLocaleString() : null,
      icon: Zap,
      // light: violet accent | dark: softer indigo tint
      iconBg: "bg-indigo-500/15 dark:bg-indigo-400/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      glowColor: "bg-indigo-500/8 dark:bg-indigo-400/10",
      change:
        stats && stats.total > 0
          ? `${stats.completed} completed`
          : "No runs yet",
    },
    {
      label: "Success Rate",
      display:
        stats?.successRate !== null && stats?.successRate !== undefined
          ? `${stats.successRate}%`
          : null,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/15 dark:bg-emerald-400/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      glowColor: "bg-emerald-500/8 dark:bg-emerald-400/10",
      change:
        stats && stats.failed > 0
          ? `${stats.failed} failed`
          : stats?.total
            ? "All passing"
            : "No data",
    },
    {
      label: "Avg. Duration",
      display:
        stats?.avgDurationMs !== null && stats?.avgDurationMs !== undefined
          ? formatDuration(stats.avgDurationMs)
          : null,
      icon: Timer,
      iconBg: "bg-sky-500/15 dark:bg-sky-400/20",
      iconColor: "text-sky-600 dark:text-sky-400",
      glowColor: "bg-sky-500/8 dark:bg-sky-400/10",
      change: "per execution",
    },
    {
      label: "Running Now",
      display: stats ? stats.running.toLocaleString() : null,
      icon: Activity,
      iconBg: "bg-amber-500/15 dark:bg-amber-400/20",
      iconColor: "text-amber-600 dark:text-amber-400",
      glowColor: "bg-amber-500/8 dark:bg-amber-400/10",
      change: stats?.running ? "Active executions" : "All idle",
      isLive: (stats?.running ?? 0) > 0,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} isLoading={isLoading} />
      ))}
    </div>
  );
}

interface StatCardProps {
  label: string;
  display: string | null;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  glowColor: string;
  change: string;
  isLive?: boolean;
  isLoading?: boolean;
}

function StatCard({
  label,
  display,
  icon: Icon,
  iconBg,
  iconColor,
  glowColor,
  change,
  isLive,
  isLoading,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 dark:border-slate-700/60 bg-card dark:bg-slate-800/50 p-6 transition-all hover:border-border hover:shadow-lg dark:hover:border-slate-600/60">
      {/* Hover glow — subtle in both modes */}
      <div
        className={cn(
          "absolute -right-8 -top-8 size-24 rounded-full blur-2xl transition-opacity opacity-0 group-hover:opacity-100",
          glowColor,
        )}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          {/* Flat icon container — no gradient, adapts to mode */}
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl",
              iconBg,
            )}
          >
            <Icon className={cn("size-5", iconColor)} />
          </div>

          {isLive && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-500 dark:text-amber-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
              </span>
              Live
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{label}</p>
          {isLoading ? (
            <div className="mt-1 h-8 w-16 animate-pulse rounded-lg bg-muted" />
          ) : (
            <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums text-foreground dark:text-slate-100">
              {display ?? "—"}
            </p>
          )}
        </div>

        <div className="mt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 dark:bg-slate-700/60 px-2 py-0.5 text-xs text-muted-foreground dark:text-slate-400">
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
