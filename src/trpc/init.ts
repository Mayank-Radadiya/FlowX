// ? Code documentation->  https://trpc.io/docs/client/tanstack-react-query/server-components

/**
 * ---------------------------------------------------------------------------
 * File: trpc/init.ts
 * Purpose:
 * This file sets up the foundational TRPC utilities for the application.
 * It creates:
 *   - The shared TRPC context (used for authentication, DB connections, etc.)
 *   - Base router and procedure helpers used across all TRPC routers
 *   - A caller factory for server-side calls (e.g., from server components)
 *
 * In short, this file acts as the *central TRPC initialization layer*.
 * Every TRPC router in the project imports these helpers to keep the code
 * organized, consistent, and secure.
 * ---------------------------------------------------------------------------
 */

import { initTRPC } from '@trpc/server';
import { cache } from 'react';

/**
 * createTRPCContext
 * ------------------
 * This function defines the context available to all TRPC procedures.
 * Context is typically where you inject:
 *   - authenticated user data
 *   - database clients (Prisma, Mongo, etc.)
 *   - environment/config values
 *
 * `cache()` ensures React Server Components do not recreate the context
 * unnecessarily, improving performance.
 */
export const createTRPCContext = cache(async () => {
  /**
   * Example: injecting a mock user ID.
   * In a real application, you would extract user info from cookies,
   * session tokens, headers, or authentication middleware.
   *
   * Docs: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});

/**
 * Initialize the TRPC instance.
 * We avoid exporting the entire "t" object because:
 *   - The name `t` is generic and often used in other libraries (e.g., i18n)
 *   - Exporting only needed helpers improves clarity and avoids misuse
 */
const t = initTRPC.create({
  /**
   * Optional: you can configure a data transformer (e.g., SuperJSON)
   * if your app needs to handle more complex data types.
   *
   * Docs: https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

/**
 * Expose helper utilities for building routers and procedures.
 * These helpers allow a consistent structure across all TRPC router files.
 */

// Used to create routers (e.g., export const userRouter = createTRPCRouter({...}))
export const createTRPCRouter = t.router;

// Used to generate a server-side caller (e.g., for RSC or actions)
export const createCallerFactory = t.createCallerFactory;

// Base TRPC procedure (e.g., used to define queries, mutations)
export const baseProcedure = t.procedure;


