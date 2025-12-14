/**
 * Sign-In Page (Server Component)
 * -------------------------------
 * Server-side page entry for the sign-in route.
 *
 * This page ensures:
 *  - Authenticated users are redirected away from the sign-in page
 *  - Unauthenticated users are allowed to access the sign-in form
 *
 * Authentication checks are executed on the server from AuthLayout
 * before any client-side UI is rendered.
 */

import SignInForm from "@/features/auth/client/components/SignInForm";

const Page = () => {
  return (
    <>
      {/* Client-side sign-in form UI */}
      <SignInForm />
    </>
  );
};

export default Page;
