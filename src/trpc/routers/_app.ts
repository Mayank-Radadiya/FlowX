/**
   File: trpc/routers/_app.ts
 * This file defines the root TRPC router and exposes public procedures
 * for the client and server to call.
 */

import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import { prisma } from "@/lib/db";

// Root TRPC router that groups all procedure endpoints
export const appRouter = createTRPCRouter({
  /**
   * getUser
   * --------
   * Simple query that fetches all users from the database
   * using Prisma ORM.
   */
  getUser: protectedProcedure.query(() => {
    return prisma.user.findMany();
  }),

  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "execute/ai",
    });
  }),
});

// Export API type for full type-safety across client and server
export type AppRouter = typeof appRouter;
