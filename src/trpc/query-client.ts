/**
 * ---------------------------------------------------------------------------
 * File: trpc/query-client.ts
 * Purpose:
 * This file creates and configures a React Query `QueryClient` instance
 * specifically for use with TRPC on the server side.
 *
 * It defines:
 *   - Default query behavior (stale times, hydration rules)
 *   - Custom dehydration logic for TRPC + React Query integration
 *
 * The `QueryClient` created here is used during SSR/Server Components to
 * prefetch data, dehydrate it, and allow seamless hydration on the client.
 * ---------------------------------------------------------------------------
 */

import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
// Optional: can be enabled if your project uses SuperJSON
// import superjson from 'superjson';

/**
 * makeQueryClient
 * -----------------
 * Factory function that returns a fully configured QueryClient.
 *
 * This client is later wrapped with React's `cache()` to ensure that
 * the same instance is reused within a single server request.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // How long data stays "fresh" before being considered stale.
        staleTime: 30 * 1000, // 30 seconds
      },

      /**
       * Dehydration configuration:
       * Determines which queries should be "dehydrated" (i.e., serialized)
       * when rendering on the server before sending to the client.
       */
      dehydrate: {
        // If using SuperJSON, you could serialize complex data types here
        // serializeData: superjson.serialize,

        // Only dehydrate queries that normally qualify OR if the query is pending
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },

      /**
       * Hydration configuration:
       * Defines how dehydrated data should be restored on the client.
       */
      hydrate: {
        // If using SuperJSON, you would deserialize complex types here
        // deserializeData: superjson.deserialize,
      },
    },
  });
}
