"use client";

import type { ReactNode } from "react";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-50 dark:bg-neutral-950">
      {children}
    </div>
  );
}
