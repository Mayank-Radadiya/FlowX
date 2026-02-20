/**
 * Execution History tRPC Router
 * ─────────────────────────────
 * Full-featured API for the Execution History system.
 *
 * Procedures:
 *   - getMany        Paginated list of executions across all/one workflow,
 *                    with status/triggerType/date/search filters
 *   - getOne         Full detail for a single execution (+ node logs)
 *   - getStats       Aggregated stats for the summary cards
 *   - cancel         Cancel a RUNNING execution (marks as CANCELLED)
 *   - rerun          Re-trigger an execution (fires a new Inngest event)
 *
 * Existing legacy procedures (kept for backward compat):
 *   - getExecutions      (used by WorkflowLogsSheet in the editor)
 *   - getExecutionLogs   (used by WorkflowLogsSheet in the editor)
 */

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { prisma } from "@/lib/db";
import { sendWorkflowExecution } from "@/inngest/helper";
import { z } from "zod";
import { ExecutionStatus, TriggerType } from "@prisma/client";
import { PAGINATION } from "@/constants";
import type {
  ExecutionListItem,
  ExecutionDetail,
  ExecutionLogItem,
  ExecutionStats,
} from "../types/execution-history.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeDuration(
  startedAt: Date,
  completedAt: Date | null,
): number | null {
  if (!completedAt) return null;
  return completedAt.getTime() - startedAt.getTime();
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const executionHistoryRouter = createTRPCRouter({
  /**
   * getMany
   * -------
   * Paginated, filterable list of executions.
   * Supports filtering by: workflowId, status, triggerType, date range, search.
   */
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .int()
          .min(1)
          .max(PAGINATION.MAX_PAGE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        workflowId: z.string().optional(),
        status: z.nativeEnum(ExecutionStatus).optional(),
        triggerType: z.nativeEnum(TriggerType).optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, workflowId, status, triggerType, search } = input;

      // Build the shared where clause
      const where = {
        workflow: {
          userId: ctx.auth.user.id,
          ...(search && {
            name: { contains: search, mode: "insensitive" as const },
          }),
        },
        ...(workflowId && { workflowId }),
        ...(status && { status }),
        ...(triggerType && { triggerType }),
      };

      const [rawItems, totalCount] = await Promise.all([
        prisma.workflowExecution.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { startedAt: "desc" },
          include: {
            workflow: { select: { name: true } },
            _count: { select: { logs: true } },
          },
        }),
        prisma.workflowExecution.count({ where }),
      ]);

      // For failed node counts we need a separate aggregation
      const executionIds = rawItems.map((e) => e.id);
      const failedLogCounts =
        executionIds.length > 0
          ? await prisma.executionLog.groupBy({
              by: ["executionId"],
              where: {
                executionId: { in: executionIds },
                status: "FAILED",
              },
              _count: { id: true },
            })
          : [];

      const failedCountMap = new Map(
        failedLogCounts.map((r) => [r.executionId, r._count.id]),
      );

      const items: ExecutionListItem[] = rawItems.map((exec) => ({
        id: exec.id,
        workflowId: exec.workflowId,
        workflowName:
          exec.workflowName ?? exec.workflow.name ?? "Untitled Workflow",
        status: exec.status,
        triggerType: exec.triggerType,
        startedAt: exec.startedAt,
        completedAt: exec.completedAt,
        durationMs: computeDuration(exec.startedAt, exec.completedAt),
        nodeCount: exec._count.logs,
        failedNodeCount: failedCountMap.get(exec.id) ?? 0,
        createdAt: exec.createdAt,
      }));

      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    }),

  /**
   * getOne
   * ------
   * Full execution detail including all node-level logs.
   */
  getOne: protectedProcedure
    .input(z.object({ executionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const exec = await prisma.workflowExecution.findFirstOrThrow({
        where: {
          id: input.executionId,
          workflow: { userId: ctx.auth.user.id },
        },
        include: {
          workflow: { select: { name: true } },
          logs: {
            include: {
              node: { select: { name: true, type: true } },
            },
            orderBy: { startedAt: "asc" },
          },
        },
      });

      const logs: ExecutionLogItem[] = exec.logs.map((log) => ({
        id: log.id,
        executionId: log.executionId,
        nodeId: log.nodeId,
        nodeName: log.nodeName ?? log.node.name ?? null,
        nodeType: log.nodeType ?? log.node.type ?? null,
        status: log.status,
        inputContext: log.inputContext as Record<string, unknown> | null,
        outputContext: log.outputContext as Record<string, unknown> | null,
        error: log.error,
        startedAt: log.startedAt,
        completedAt: log.completedAt,
        durationMs: computeDuration(log.startedAt, log.completedAt),
      }));

      const detail: ExecutionDetail = {
        id: exec.id,
        workflowId: exec.workflowId,
        workflowName:
          exec.workflowName ?? exec.workflow.name ?? "Untitled Workflow",
        status: exec.status,
        triggerType: exec.triggerType,
        startedAt: exec.startedAt,
        completedAt: exec.completedAt,
        durationMs: computeDuration(exec.startedAt, exec.completedAt),
        logs,
      };

      return detail;
    }),

  /**
   * getStats
   * --------
   * Aggregated summary stats for the header cards.
   * Optionally scoped to a specific workflowId.
   */
  getStats: protectedProcedure
    .input(z.object({ workflowId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const where = {
        workflow: { userId: ctx.auth.user.id },
        ...(input.workflowId && { workflowId: input.workflowId }),
      };

      const [statusGroups, avgResult] = await Promise.all([
        prisma.workflowExecution.groupBy({
          by: ["status"],
          where,
          _count: { id: true },
        }),
        prisma.workflowExecution.findMany({
          where: {
            ...where,
            status: "COMPLETED",
            completedAt: { not: null },
          },
          select: { startedAt: true, completedAt: true },
        }),
      ]);

      const countByStatus = new Map(
        statusGroups.map((g) => [g.status, g._count.id]),
      );

      const total = [...countByStatus.values()].reduce((a, b) => a + b, 0);
      const completed = countByStatus.get("COMPLETED") ?? 0;
      const failed = countByStatus.get("FAILED") ?? 0;
      const running = countByStatus.get("RUNNING") ?? 0;
      const cancelled = countByStatus.get("CANCELLED") ?? 0;
      const finished = completed + failed;

      // Avg duration over completed executions
      const durations = avgResult
        .filter((e) => e.completedAt !== null)
        .map((e) => e.completedAt!.getTime() - e.startedAt.getTime());

      const avgDurationMs =
        durations.length > 0
          ? durations.reduce((a, b) => a + b, 0) / durations.length
          : null;

      const stats: ExecutionStats = {
        total,
        running,
        completed,
        failed,
        cancelled,
        successRate:
          finished > 0 ? Math.round((completed / finished) * 100) : null,
        avgDurationMs,
      };

      return stats;
    }),

  /**
   * cancel
   * ------
   * Marks a RUNNING execution as CANCELLED.
   * Note: this is a soft cancel — Inngest doesn't have a native cancel API
   * from the client side, so we mark the DB record and the function will
   * detect this on its next step boundary (future enhancement).
   */
  cancel: protectedProcedure
    .input(z.object({ executionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Verify ownership
      const exec = await prisma.workflowExecution.findFirstOrThrow({
        where: {
          id: input.executionId,
          workflow: { userId: ctx.auth.user.id },
        },
      });

      if (exec.status !== "RUNNING" && exec.status !== "PENDING") {
        throw new Error(`Cannot cancel execution with status "${exec.status}"`);
      }

      return prisma.workflowExecution.update({
        where: { id: input.executionId },
        data: {
          status: "CANCELLED",
          completedAt: new Date(),
        },
      });
    }),

  /**
   * rerun
   * -----
   * Fires a new Inngest execution for the same workflow.
   */
  rerun: protectedProcedure
    .input(z.object({ executionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const exec = await prisma.workflowExecution.findFirstOrThrow({
        where: {
          id: input.executionId,
          workflow: { userId: ctx.auth.user.id },
        },
        include: { workflow: { select: { id: true, name: true } } },
      });

      await sendWorkflowExecution({ workflowId: exec.workflowId });

      return { workflowId: exec.workflowId };
    }),

  // ─── Legacy procedures (used by WorkflowLogsSheet in the editor) ──────────

  getExecutions: protectedProcedure
    .input(z.object({ workflowId: z.string() }))
    .query(async ({ input, ctx }) => {
      const workflow = await prisma.workflow.findFirst({
        where: { id: input.workflowId, userId: ctx.auth.user.id },
      });
      if (!workflow) throw new Error("Workflow not found or unauthorized");

      return await prisma.workflowExecution.findMany({
        where: { workflowId: input.workflowId },
        orderBy: { createdAt: "desc" },
      });
    }),

  getExecutionLogs: protectedProcedure
    .input(z.object({ executionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const execution = await prisma.workflowExecution.findFirst({
        where: {
          id: input.executionId,
          workflow: { userId: ctx.auth.user.id },
        },
      });
      if (!execution) throw new Error("Execution not found or unauthorized");

      return await prisma.executionLog.findMany({
        where: { executionId: input.executionId },
        orderBy: { createdAt: "asc" },
      });
    }),
});
