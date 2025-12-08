/**
 * Helper to prefetch workflow list data on the server.
 * Uses TRPC’s typed input inference and the shared `prefetch` utility
 * to warm up React Query’s cache before hydration.
 */

import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

// Infer the expected input type of the workflows.getMany procedure
type Input = inferInput<typeof trpc.workflows.getMany>;

// Prefetch workflows list based on the given params
export const prefetchWorkflows = (params: Input) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};

// prefetch one workflow by id
export const prefetchWorkflowById = (id: string) => {
  return prefetch(trpc.workflows.getOne.queryOptions({ id }));
};
