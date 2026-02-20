/**
 * Prefetch helpers for the Execution History page.
 * Called in Server Components to warm the React Query cache before hydration.
 */

import { prefetch, trpc } from "@/trpc/server";

export function prefetchExecutionHistory(params?: {
  page?: number;
  pageSize?: number;
}) {
  return Promise.all([
    prefetch(
      trpc.executionLogs.getMany.queryOptions({
        page: params?.page ?? 1,
        pageSize: params?.pageSize ?? 15,
      })
    ),
    prefetch(trpc.executionLogs.getStats.queryOptions({})),
  ]);
}
