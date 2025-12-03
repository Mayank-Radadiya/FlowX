"use client";

import Sidebar from "@/components/global/sidebar/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/global/sidebar/components";
import type { ReactNode } from "react";
import { useState } from "react";

function MainContent({ children }: { children: ReactNode }) {
  const { open } = useSidebar();

  return (
    <main
      className="min-h-screen transition-all duration-300"
      style={{ paddingLeft: open ? 280 : 84 }}
    >
      <div className="px-6 py-8 max-w-7xl mx-auto">{children}</div>
    </main>
  );
}

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
