"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import {
  EXECUTION_STATUS_CONFIG,
  TRIGGER_TYPE_LABELS,
} from "../types/execution-history.types";
import type { ExecutionFilters } from "../types/execution-history.types";
import type { ExecutionStatus, TriggerType } from "@prisma/client";

interface ExecutionFiltersProps {
  filters: ExecutionFilters;
  onChange: (patch: Partial<ExecutionFilters>) => void;
  totalCount?: number;
}

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  ...Object.entries(EXECUTION_STATUS_CONFIG).map(([value, cfg]) => ({
    value,
    label: cfg.label,
  })),
] as const;

const TRIGGER_OPTIONS = [
  { value: "ALL", label: "All Triggers" },
  ...Object.entries(TRIGGER_TYPE_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
] as const;

export function ExecutionFilters({
  filters,
  onChange,
  totalCount,
}: ExecutionFiltersProps) {
  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "ALL" ||
    filters.triggerType !== "ALL";

  function clearAll() {
    onChange({ search: "", status: "ALL", triggerType: "ALL", page: 1 });
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main filter row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value, page: 1 })}
            placeholder="Search workflows..."
            className="pl-9 h-9 bg-background/80 border-border/50 focus:border-primary/50 text-sm"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ search: "", page: 1 })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Status dropdown */}
        <select
          value={filters.status}
          onChange={(e) =>
            onChange({
              status: e.target.value as ExecutionStatus | "ALL",
              page: 1,
            })
          }
          className={cn(
            "h-9 rounded-md border border-border/50 bg-background/80 px-3 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
            "text-foreground cursor-pointer",
            filters.status !== "ALL" &&
              "border-primary/30 bg-primary/5 text-primary",
          )}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Trigger type dropdown */}
        <select
          value={filters.triggerType}
          onChange={(e) =>
            onChange({
              triggerType: e.target.value as TriggerType | "ALL",
              page: 1,
            })
          }
          className={cn(
            "h-9 rounded-md border border-border/50 bg-background/80 px-3 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
            "text-foreground cursor-pointer",
            filters.triggerType !== "ALL" &&
              "border-primary/30 bg-primary/5 text-primary",
          )}
        >
          {TRIGGER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
            Clear
          </Button>
        )}

        {/* Result count */}
        {totalCount !== undefined && (
          <span className="ml-auto text-xs text-muted-foreground tabular-nums shrink-0">
            {totalCount.toLocaleString()} result{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="size-3 text-muted-foreground" />
          {filters.status !== "ALL" && (
            <ActiveChip
              label={`Status: ${EXECUTION_STATUS_CONFIG[filters.status as ExecutionStatus].label}`}
              onRemove={() => onChange({ status: "ALL", page: 1 })}
            />
          )}
          {filters.triggerType !== "ALL" && (
            <ActiveChip
              label={`Trigger: ${TRIGGER_TYPE_LABELS[filters.triggerType as TriggerType]}`}
              onRemove={() => onChange({ triggerType: "ALL", page: 1 })}
            />
          )}
          {filters.search && (
            <ActiveChip
              label={`"${filters.search}"`}
              onRemove={() => onChange({ search: "", page: 1 })}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full hover:bg-primary/10 p-0.5"
      >
        <X className="size-2.5" />
      </button>
    </span>
  );
}
