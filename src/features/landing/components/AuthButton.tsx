"use client";

import { authClient } from "@/features/auth/client/lib/auth-client";
import Link from "next/link";

function AuthButton() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      {!session?.user.id ? (
        <>
          {" "}
          <div className="flex item-center justify-center gap-3">
            <Link
              href="/sign-in"
              className="px-6 py-2 text-sm font-bold text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-widest"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 uppercase tracking-widest border border-primary"
            >
              Start Building
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link
            href="/workflow"
            className="px-6 py-2 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 uppercase tracking-widest border border-primary uppercase tracking-widest"
          >
            Workflows
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthButton;
