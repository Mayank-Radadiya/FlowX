import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const executeWorkflowRoute = createTRPCRouter({
  execute: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const workflow = await prisma.workflow.findFirstOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });

      await inngest.send({
        name: "workflow/execute.workflow",
        data: {
          workflowId: workflow.id,
        },
      });
      return workflow;
    }),
});
