/**
 * SidebarUserContainer Component
 * ------------------------------
 * Container component responsible for connecting authentication data
 * to the SidebarUser presentation component.
 *
 * Responsibilities:
 *  - Read the current authenticated session from Better Auth
 *  - Map session data into SidebarUser props
 *  - Handle user logout flow and redirection
 *
 * This component separates authentication logic from UI rendering,
 * keeping SidebarUser purely presentational.
 */

"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { SidebarUser } from "./SidebarUser";
import { authClient } from "@/features/auth/client/lib/auth-client";

export const SidebarUserContainer = () => {
  /**
   * Session data
   * ------------
   * Retrieved from Better Auth client.
   *
   * data.user contains:
   *  - name
   *  - email
   *  - image
   *
   * data may be undefined during initial loading or
   * if the user is not authenticated.
   */
  const { data } = authClient.useSession();

  const router = useRouter();

  /**
   * handleLogout
   * ------------
   * Triggers the sign-out process and handles post-logout behavior.
   *
   * Flow:
   *  1. Call Better Auth signOut
   *  2. Show success toast
   *  3. Redirect user to sign-in page
   */
  const handleLogout = useCallback(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully logged out");
          router.push("/sign-in");
        },
      },
    });
  }, [router]);

  return (
    <SidebarUser
      name={data?.user?.name ?? null}
      email={data?.user?.email ?? null}
      image={data?.user?.image ?? null}
      onLogout={handleLogout}
    />
  );
};
