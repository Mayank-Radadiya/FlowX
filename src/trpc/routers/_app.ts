/**
   File: trpc/routers/_app.ts
 * This file defines the root TRPC router and exposes public procedures
 * for the client and server to call.
 */

import { baseProcedure, createTRPCRouter } from "../init";
import { prisma } from "@/lib/db";

// Root TRPC router that groups all procedure endpoints
export const appRouter = createTRPCRouter({
  /**
   * getUser
   * --------
   * Simple query that fetches all users from the database
   * using Prisma ORM.
   */
  getUser: baseProcedure.query(() => {
    return prisma.user.findMany();
  }),
});

// Export API type for full type-safety across client and server
export type AppRouter = typeof appRouter;
