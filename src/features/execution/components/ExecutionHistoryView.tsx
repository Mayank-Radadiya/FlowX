"use client";

/**
 * ExecutionHistoryView
 * --------------------
 * Top-level client component for the /executions page.
 *
 * Layout:
 *   ┌────────────────────────────────────┐
 *   │  Stats Cards (4 across)            │
 *   ├────────────────────────────────────┤
 *   │  Sticky filters bar                │
 *   ├────────────────────────────────────┤
 *   │  Execution Table  │ Detail Panel   │
 *   │  (left, 60%)      │ (right, 40%)   │
 *   ├───────────────────┴────────────────┤
 *   │  Pagination                        │
 *   └────────────────────────────────────┘
 *
 * Data flow:
 *   - Polls execution list every 5 s (auto-refetches when RUNNING items present)
 *   - Polls detail every 3 s when a running execution is selected
 *   - Filters stored in URL via nuqs for shareable links
 */

import { useState, useCallback, useEffect } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import toast from "react-hot-toast";

import { ExecutionStatsCards } from "./ExecutionStatsCards";
import { ExecutionFilters } from "./ExecutionFilters";
import { ExecutionTable } from "./ExecutionTable";
import { ExecutionDetailPanel } from "./ExecutionDetailPanel";
import { ExecutionPagination } from "./ExecutionPagination";

import type { ExecutionFilters as Filters } from "../types/execution-history.types";
import type { ExecutionStatus, TriggerType } from "@prisma/client";

const DEFAULT_PAGE_SIZE = 15;

export function ExecutionHistoryView() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // ── URL-backed filter state (nuqs) ──────────────────────────────────────────
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("ALL"),
  );
  const [triggerType, setTriggerType] = useQueryState(
    "trigger",
    parseAsString.withDefault("ALL"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [selectedId, setSelectedId] = useQueryState("exec", parseAsString);

  // ── Rerun / cancel loading state ────────────────────────────────────────────
  const [rerunningId, setRerunningId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // ── Build filter object ──────────────────────────────────────────────────────
  const filters: Filters = {
    search: search ?? "",
    status: (status as ExecutionStatus | "ALL") ?? "ALL",
    triggerType: (triggerType as TriggerType | "ALL") ?? "ALL",
    workflowId: null,
    page: page ?? 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  function handleFilterChange(patch: Partial<Filters>) {
    if (patch.search !== undefined) setSearch(patch.search || null);
    if (patch.status !== undefined)
      setStatus(patch.status === "ALL" ? null : patch.status);
    if (patch.triggerType !== undefined)
      setTriggerType(patch.triggerType === "ALL" ? null : patch.triggerType);
    if (patch.page !== undefined) setPage(patch.page === 1 ? null : patch.page);
  }

  // ── Execution list query ─────────────────────────────────────────────────────
  const listOptions = trpc.executionLogs.getMany.queryOptions({
    page: filters.page,
    pageSize: filters.pageSize,
    search: filters.search || undefined,
    status:
      filters.status !== "ALL"
        ? (filters.status as ExecutionStatus)
        : undefined,
    triggerType:
      filters.triggerType !== "ALL"
        ? (filters.triggerType as TriggerType)
        : undefined,
    workflowId: filters.workflowId ?? undefined,
  });

  const {
    data: listData,
    isLoading: isListLoading,
    isFetching,
  } = useQuery({
    ...listOptions,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 5000;
      const hasRunning = (data as any)?.items?.some(
        (e: any) => e.status === "RUNNING" || e.status === "PENDING",
      );
      return hasRunning ? 3000 : 5000;
    },
  });

  // ── Stats query ──────────────────────────────────────────────────────────────
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    ...trpc.executionLogs.getStats.queryOptions({}),
    refetchInterval: 10000,
  });

  // ── Detail query ─────────────────────────────────────────────────────────────
  const { data: detail, isLoading: isDetailLoading } = useQuery({
    ...trpc.executionLogs.getOne.queryOptions({ executionId: selectedId! }),
    enabled: !!selectedId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const isActive =
        (data as any)?.status === "RUNNING" ||
        (data as any)?.status === "PENDING";
      return isActive ? 2000 : false;
    },
  });

  // ── Rerun mutation ───────────────────────────────────────────────────────────
  const rerunMutation = useMutation(
    trpc.executionLogs.rerun.mutationOptions({
      onMutate: ({ executionId }) => setRerunningId(executionId),
      onSuccess: () => {
        toast.success("Workflow re-triggered successfully");
        queryClient.invalidateQueries({ queryKey: listOptions.queryKey });
        queryClient.invalidateQueries({
          queryKey: trpc.executionLogs.getStats.queryOptions({}).queryKey,
        });
      },
      onError: (err) => toast.error(`Failed to rerun: ${err.message}`),
      onSettled: () => setRerunningId(null),
    }),
  );

  // ── Cancel mutation ──────────────────────────────────────────────────────────
  const cancelMutation = useMutation(
    trpc.executionLogs.cancel.mutationOptions({
      onMutate: ({ executionId }) => setCancellingId(executionId),
      onSuccess: () => {
        toast.success("Execution cancelled");
        queryClient.invalidateQueries({ queryKey: listOptions.queryKey });
        if (selectedId) {
          queryClient.invalidateQueries({
            queryKey: trpc.executionLogs.getOne.queryOptions({
              executionId: selectedId,
            }).queryKey,
          });
        }
      },
      onError: (err) => toast.error(`Failed to cancel: ${err.message}`),
      onSettled: () => setCancellingId(null),
    }),
  );

  const handleRerun = useCallback(
    (executionId: string) => rerunMutation.mutate({ executionId }),
    [rerunMutation],
  );
  const handleCancel = useCallback(
    (executionId: string) => cancelMutation.mutate({ executionId }),
    [cancelMutation],
  );

  const hasDetail = !!selectedId;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats cards */}
      <ExecutionStatsCards stats={stats} isLoading={isStatsLoading} />

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-10 -mx-1 rounded-xl border border-border/50 bg-background/95 px-4 py-3 backdrop-blur-sm shadow-sm">
        <ExecutionFilters
          filters={filters}
          onChange={handleFilterChange}
          totalCount={listData?.totalCount}
        />
      </div>

      {/* Execution table with inline accordion expansion */}
      <ExecutionTable
        items={(listData?.items as any) ?? []}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
        onRerun={handleRerun}
        onCancel={handleCancel}
        isRerunning={rerunningId}
        isCancelling={cancellingId}
        isLoading={isListLoading}
        expansionSlot={
          hasDetail ? (
            <ExecutionDetailPanel
              detail={(detail as any) ?? null}
              isLoading={isDetailLoading}
              onClose={() => setSelectedId(null)}
              onRerun={handleRerun}
              onCancel={handleCancel}
              isRerunning={rerunningId === selectedId}
              isCancelling={cancellingId === selectedId}
            />
          ) : undefined
        }
      />

      {/* Pagination */}
      {listData && listData.totalPages > 1 && (
        <ExecutionPagination
          page={listData.page}
          totalPages={listData.totalPages}
          totalCount={listData.totalCount}
          pageSize={listData.pageSize}
          onChange={(p) => handleFilterChange({ page: p })}
        />
      )}
    </div>
  );
}
