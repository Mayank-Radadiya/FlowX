"use client";

import { ToggleButton } from "@/components/global/ToggleButton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data } = authClient.useSession();
  return (
    <>
      <div className="flex items-center gap-2 flex-col">
        Home Page
        <Link href={"/sign-in"}>SignIn Page</Link>
        <Link href={"/sign-up"}>SignUp</Link>
        {JSON.stringify(data)}
        <ToggleButton />
      </div>
    </>
  );
}
