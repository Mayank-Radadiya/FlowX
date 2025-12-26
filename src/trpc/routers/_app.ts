/**
   File: trpc/routers/_app.ts
 * This file defines the root TRPC router and exposes public procedures
 * for the client and server to call.
 */

import { executeWorkflowRoute } from "@/features/execution/server/route";
import { createTRPCRouter } from "../init";
import { workflowRouter } from "@/features/workflows/server/route";
import { credentialRouter } from "@/features/credentials/server/route";

// Root TRPC router that groups all procedure endpoints
export const appRouter = createTRPCRouter({
  workflows: workflowRouter,
  executeWorkflow: executeWorkflowRoute,
  credentials: credentialRouter,
});

// Export API type for full type-safety across client and server
export type AppRouter = typeof appRouter;
