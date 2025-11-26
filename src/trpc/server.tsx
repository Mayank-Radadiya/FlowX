/**
 * ---------------------------------------------------------------------------
 * File: trpc/server.ts
 * Purpose:
 * This file sets up the TRPC server configuration used specifically on the
 * server side of a Next.js application. It ensures:
 *
 *  - The file cannot be imported by client components (`server-only`)
 *  - A stable QueryClient is created for React Query during each request
 *  - TRPC options are wired together using the app router, context, and query client
 *  - A server-side TRPC caller is created for server actions or RSC
 *
 * In short, this file creates the "server entry point" for TRPC.
 * All server-side TRPC calls flow through here.
 * ---------------------------------------------------------------------------
 */

import "server-only"; // Ensures this file is ONLY executed on the server and never bundled for the client

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";

import { createTRPCContext } from "./init"; // Shared TRPC context (auth, db, etc.)
import { makeQueryClient } from "./query-client"; // Factory for creating a React Query client
import { appRouter } from "./routers/_app"; // Root TRPC router containing all sub-routers

/**
 * getQueryClient
 * ----------------
 * Creates a stable React Query client for the duration of a single server request.
 *
 * Why `cache()`?
 *  - Prevents creating multiple QueryClient instances within the same request
 *  - Ensures consistent caching and avoids memory leaks
 *
 * This is required for running TRPC inside Server Components.
 */
export const getQueryClient = cache(makeQueryClient);

/**
 * trpc
 * -----
 * Creates a TRPC options proxy which binds together:
 *   - The TRPC router
 *   - The server context
 *   - The React Query client
 *
 * This object is used by TRPC's React Query integration in server-side environments.
 */
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext, // Injects the TRPC context (e.g., user session)
  router: appRouter, // All TRPC procedures from the root router
  queryClient: getQueryClient, // Stable query client for request-level caching
});

/**
 * caller
 * -------
 * Creates a server-side TRPC caller.
 *
 * This enables you to call TRPC procedures *directly* from server actions,
 * background jobs, or inside React Server Components -- without needing HTTP.
 *
 * Example:
 *   const user = await caller.user.getById({ id: "123" });
 */
export const caller = appRouter.createCaller(createTRPCContext);
