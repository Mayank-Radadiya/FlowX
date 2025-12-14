/**
 //? docs: https://www.better-auth.com/docs/installation
 * This file initializes the application's authentication system using Better Auth.
 * It configures:
 *   - The Prisma adapter for syncing user accounts with the database
 *   - PostgreSQL as the authentication provider backend
 *   - Email/password authentication with automatic sign-in after registration
 *
 * This is a key setup file because it establishes how users are stored,
 * authenticated, and managed across the entire application. All auth-related
 * utilities pull from the exported `auth` instance.
 */

import { prisma } from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";


export const auth = betterAuth({
  // Connect Better Auth to the Prisma database using the adapter
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Enable basic email/password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Automatically sign the user in after successful registration
  },
});
