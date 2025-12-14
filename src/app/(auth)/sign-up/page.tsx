/**
 * Sign-Up Page (Server Component)
 * -------------------------------
 * Server-side page entry for the sign-up route.
 *
 * This page ensures:
 *  - Authenticated users cannot access the sign-up page
 *  - Unauthenticated users can proceed with account creation
 *
 * The authentication guard runs on the server from AuthLayout
 * before any client-side UI is rendered.
 */

import SignUpForm from "@/features/auth/client/components/SignUpForm";

const Page = () => {
  return (
    <>
      {/* Client-side sign-up form UI */}
      <SignUpForm />
    </>
  );
};

export default Page;
