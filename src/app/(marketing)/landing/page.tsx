"use client";

import { ToggleButton } from "@/components/global/ToggleButton";
import Link from "next/link";

function page() {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center mt-5">
        <p>Landing Page</p>
        <ToggleButton />
        <Link href="/dashboard">Go to Dashboard</Link>
        <Link href="/">Home</Link>
        <Link href="/sign-in">Sign-in</Link>
        <Link href="/workflow">workflow</Link>
      </div>
    </>
  );
}

export default page;
