/**
 * docs: https://www.better-auth.com/docs/installation
 *
 * Initializes the Better Auth client for use on the client side.
 * This client is responsible for interacting with authentication APIs,
 * managing session state, and exposing auth-related helpers to React components.
 *
 * This is a lightweight setup file used wherever authentication state
 * (login, logout, session checks) is required on the frontend.
 */

import { createAuthClient } from "better-auth/react";

// Create a client-side authentication instance with default configuration
export const authClient = createAuthClient({});
