/**
  //? docs: https://www.better-auth.com/docs/installation
 * Utility functions for authentication-based redirection inside server components.
 * These helpers check the user's session and redirect depending on whether
 * authentication is required or forbidden for a given page.
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Ensures the user is authenticated.
 * If no session exists, redirect to the signin page.
 */
export const requiredAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return session;
};

/**
 * Ensures the user is NOT authenticated.
 * If a session exists, redirect to the home page.
 */
export const requiredUnAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
};
