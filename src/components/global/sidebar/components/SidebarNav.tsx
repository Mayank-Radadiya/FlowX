/**
 * SidebarNav Component
 * -------------------
 * Groups and renders a set of sidebar navigation links,
 * optionally displaying a section title.
 *
 * Responsibilities:
 *  - Organize related sidebar links into logical sections
 *  - Conditionally render a section title
 *  - Animate title appearance and disappearance
 *  - React to sidebar open/collapsed state
 *
 * This component improves navigation clarity while keeping
 * the sidebar compact when collapsed.
 */

"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "./SidebarContext";

interface SidebarNavProps {
  title?: string; // Optional section heading
  children: ReactNode; // SidebarLink components
}

export const SidebarNav = ({ title, children }: SidebarNavProps) => {
  /**
   * Sidebar context state
   * ---------------------
   * open    → whether sidebar is expanded
   * animate → whether sidebar animations are enabled
   */
  const { open, animate } = useSidebar();

  /**
   * Title visibility logic
   * ----------------------
   * The title is shown only when:
   *  - A title is provided
   *  - Sidebar is open OR animations are disabled
   */
  const showTitle = Boolean(title && (!animate || open));

  return (
    <div className="flex flex-col gap-2">
      {/* Section title with enter/exit animation */}
      <AnimatePresence initial={false}>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, x: -8 }} // Slide in from left
            animate={{ opacity: 1, x: 0 }} // Fully visible
            exit={{ opacity: 0, x: -8 }} // Slide out on collapse
            transition={{ duration: 0.2 }}
          >
            <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              {/* Decorative divider line */}
              <span className="h-px w-4 bg-border" />
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation links container */}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};
