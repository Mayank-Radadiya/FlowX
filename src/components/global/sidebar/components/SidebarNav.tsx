"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "./SidebarContext";

interface SidebarNavProps {
  title?: string;
  children: ReactNode;
}

export const SidebarNav = ({ title, children }: SidebarNavProps) => {
  const { open, animate } = useSidebar();
  const showTitle = title && (!animate || open);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={false}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence mode="wait">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-2">
              <motion.span
                className="h-px flex-1 max-w-4 bg-neutral-300 dark:bg-neutral-700"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="flex flex-col gap-1" initial={false}>
        {children}
      </motion.div>
    </motion.div>
  );
};
