/**
 * Better Auth API Route Handler
 * -----------------------------
 * Exposes Better Auth endpoints to Next.js App Router.
 *
 * This file connects the configured `auth` instance to Next.js
 * by converting it into standard HTTP route handlers.
 *
 * It enables:
 *  - Sign in / Sign up
 *  - Session management
 *  - OAuth callbacks
 *  - Auth-related API requests
 *
 * This is a core integration file for authentication.
 */

import { auth } from "@/features/auth/server/auth"; // Central Better Auth configuration
import { toNextJsHandler } from "better-auth/next-js";

// Convert Better Auth instance into Next.js GET and POST handlers
export const { POST, GET } = toNextJsHandler(auth);
