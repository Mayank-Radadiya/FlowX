/**
 * File: src/app/api/trpc/[trpc]/route.ts
 * This file defines the TRPC request handler for the Next.js App Router.
 * It exposes the TRPC API under `/api/trpc` and connects incoming HTTP
 * requests to the application's TRPC router and context.
 *
 * This handler is responsible for:
 *  - Processing TRPC queries and mutations using the Fetch API adapter
 *  - Passing the correct app router for procedure resolution
 *  - Creating a fresh TRPC context for each request (auth, DB, environment)
 *
 * This is a core integration file that allows TRPC to function as an API
 * route inside Next.js.
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";import { appRouter } from "@/trpc/routers/_app";

/**
 * The main request handler that connects:
 *   - The incoming Request object
 *   - The TRPC router (which defines all procedures)
 *   - The TRPC context (auth, db, etc.)
 *   - The API endpoint path
 */

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc", // URL for TRPC API
    req, // Incoming request object
    router: appRouter, // Root TRPC router with all procedures
    createContext: createTRPCContext, // Generates context for each request
  });

// Export handler for both GET and POST methods (required by TRPC)
export { handler as GET, handler as POST };
