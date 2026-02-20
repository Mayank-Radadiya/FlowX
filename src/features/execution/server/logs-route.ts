import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { prisma } from "@/lib/db";
import { z } from "zod";

export const executionLogsRoute = createTRPCRouter({
  getExecutions: protectedProcedure
    .input(z.object({ workflowId: z.string() }))
    .query(async ({ input, ctx }) => {
      // Get all executions for a specific workflow
      // Verify workflow belongs to user
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
      // Get detailed step-by-step logs for a specific execution
      const execution = await prisma.workflowExecution.findFirst({
        where: {
          id: input.executionId,
          workflow: { userId: ctx.auth.user.id },
        },
      });
      if (!execution) throw new Error("Execution not found or unauthorized");

      return await prisma.executionLog.findMany({
        where: { executionId: input.executionId },
        orderBy: { createdAt: "asc" }, // Show logs in chronological order
      });
    }),
});
