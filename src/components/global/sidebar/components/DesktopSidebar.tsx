"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

interface DesktopSidebarProps
  extends React.ComponentProps<typeof motion.aside> {}

export const DesktopSidebar = ({
  className,
  children,
  ...rest
}: DesktopSidebarProps) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.aside
      className={cn(
        "group/sidebar fixed left-0 top-0 z-40 hidden h-screen w-[280px] shrink-0 border-r border-neutral-200/50 bg-white/80 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.1)] transition-colors dark:border-neutral-800/50 dark:bg-neutral-950/80 md:flex overflow-hidden",
        className
      )}
      initial={false}
      animate={{
        width: animate ? (open ? 280 : 84) : 280,
        boxShadow: open
          ? "0 0 60px -15px rgba(0,0,0,0.15)"
          : "0 0 40px -15px rgba(0,0,0,0.1)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        width: { duration: 0.35 },
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...rest}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 0.4 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Subtle animated border glow */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/20 to-transparent pointer-events-none"
        initial={{ opacity: 0, scaleY: 0.5 }}
        animate={{ opacity: open ? 1 : 0, scaleY: open ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative flex h-full w-full flex-col gap-6 px-4 py-6">
        {children as ReactNode}
      </div>
    </motion.aside>
  );
};
