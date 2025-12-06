"use client";

import { IndigoGradientBlackv2 } from "@/components/global/backgrund/BackGround";
import { ToggleButton } from "@/components/global/ToggleButton";
import Link from "next/link";

function page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Animation */}
      <IndigoGradientBlackv2 />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-neutral-800 dark:text-white">
          Landing Page
        </p>
        <ToggleButton />
        <div className="flex gap-4 mt-6">
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm text-neutral-800 dark:text-white border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
          >
            Sign-in
          </Link>
          <Link
            href="/workflow"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          >
            Workflow
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
