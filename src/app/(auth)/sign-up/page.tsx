/**
 * Sign-Up Page (Server Component)
 * -------------------------------
 * Server-side page entry for the sign-up route.
 *
 * This page ensures:
 *  - Authenticated users cannot access the sign-up page
 *  - Unauthenticated users can proceed with account creation
 *
 * The authentication guard runs on the server
 * before any client-side UI is rendered.
 */

import { requiredUnAuth } from "@/features/auth/server/guards";
import SignUpForm from "../../../features/auth/client/components/SignUpForm";

const Page = async () => {
  /**
   * requiredUnAuth
   * --------------
   * Server-side access guard that:
   *  - Checks for an existing authenticated session
   *  - Redirects logged-in users away from auth pages
   *
   * This prevents users who are already authenticated
   * from accidentally creating duplicate accounts.
   */
  await requiredUnAuth();

  return (
    <>
      {/* Client-side sign-up form UI */}
      <SignUpForm />
    </>
  );
};

export default Page;
