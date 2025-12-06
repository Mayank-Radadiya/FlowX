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
      <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
        {/* Background gradient mesh for glassmorphism effect */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[90px]" />
        </div>

        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
