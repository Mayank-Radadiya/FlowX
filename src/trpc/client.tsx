/**
 * ---------------------------------------------------------------------------
 * File: trpc/client.tsx
 * Purpose:
 * This file sets up the TRPC + React Query provider for client-side usage
 * in a Next.js application. It ensures:
 *
 *  - A stable QueryClient is created and reused on the browser
 *  - TRPC client is initialized with HTTP batching
 *  - Both TRPC and React Query providers wrap the React tree properly
 *
 * This provider should be mounted at the root of the client-side part
 * of your application (e.g., inside layout.tsx or a client boundary).
 *
 * It bridges **TRPC**, **React Query**, and **Next.js** in a consistent,
 * type-safe way.
 * ---------------------------------------------------------------------------
 */

'use client'; 
// Ensures this file can run in the browser and can contain React hooks

import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';

import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';

/**
 * Create TRPC React helper utilities:
 * - TRPCProvider → wraps the component tree
 * - useTRPC → access the TRPC client inside components
 */
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

// Cached QueryClient instance for browser usage (avoids re-creation)
let browserQueryClient: QueryClient;

/**
 * getQueryClient
 * ----------------
 * Creates or retrieves the correct QueryClient instance depending on
 * whether the code runs on the server or in the browser.
 *
 * Server → always create a new instance (stateless)
 * Browser → reuse a single instance to avoid losing cache during re-renders
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // On the server, always return a fresh QueryClient
    return makeQueryClient();
  }

  // On the browser, reuse a single instance to prevent cache resets
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

/**
 * getUrl
 * -------
 * Computes the correct base URL for TRPC API calls.
 * Works in:
 *   - Browser
 *   - Vercel production environment
 *   - Local development
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''; // Browser: relative URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000'; // Default local dev URL
  })();

  return `${base}/api/trpc`;
}

/**
 * TRPCReactProvider
 * ------------------
 * The main provider component that:
 *   - Initializes the QueryClient
 *   - Creates the TRPC client
 *   - Wraps the React tree in:
 *        <QueryClientProvider> and <TRPCProvider>
 *
 * This is required for using TRPC hooks (e.g., trpc.user.getAll.useQuery).
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  /**
   * IMPORTANT:
   * We avoid `useState` for QueryClient initialization unless a suspense
   * boundary exists below this component. Using `useState` too early can
   * cause the client to be discarded if a component suspends.
   */
  const queryClient = getQueryClient();

  /**
   * TRPC client is created once using useState initializer.
   * httpBatchLink groups multiple RPC requests into a single HTTP call.
   */
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // If using SuperJSON, enable the transformer here
          // transformer: superjson,
          url: getUrl(),
        }),
      ],
    }),
  );

  // Provide React Query & TRPC to the component tree
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
