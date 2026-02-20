"use client";

import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/features/auth/client/lib/auth-client";

export default function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/workflow",
    });
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-border/60 bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-border hover:bg-muted/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      ) : (
        <Image
          src="/image/google.svg"
          alt="Google"
          width={18}
          height={18}
          className="shrink-0"
        />
      )}
      <span>{isLoading ? "Redirecting…" : "Continue with Google"}</span>
    </button>
  );
}
