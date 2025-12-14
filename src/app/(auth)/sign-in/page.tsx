/**
 * Sign-In Page (Server Component)
 * -------------------------------
 * Server-side page entry for the sign-in route.
 *
 * This page ensures:
 *  - Authenticated users are redirected away from the sign-in page
 *  - Unauthenticated users are allowed to access the sign-in form
 *
 * Authentication checks are executed on the server
 * before any client-side UI is rendered.
 */

import { requiredUnAuth } from "@/features/auth/server/guards";
import SignInForm from "../../../features/auth/client/components/SignInForm";

const Page = async () => {
  /**
   * requiredUnAuth
   * --------------
   * Server-side guard that:
   *  - Checks if a valid session exists
   *  - Redirects authenticated users to the home page
   *
   * This prevents logged-in users from accessing auth pages.
   */
  await requiredUnAuth();

  return (
    <>
      {/* Client-side sign-in form UI */}
      <SignInForm />
    </>
  );
};

export default Page;
