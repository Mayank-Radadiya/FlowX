/**
 * SidebarLink Component
 * --------------------
 * Renders a single navigational link inside the sidebar.
 *
 * Responsibilities:
 *  - Display icon and label for a navigation route
 *  - Highlight the active route based on the current pathname
 *  - Adapt label visibility based on sidebar open/collapsed state
 *  - Provide smooth hover and tap animations
 *
 * This component is memoized to minimize unnecessary re-renders.
 */

"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export const SidebarLink = memo(function SidebarLink({
  href,
  label,
  icon,
  className,
}: SidebarLinkProps) {
  /**
   * Current route path
   * ------------------
   * Used to determine whether this link is active.
   */
  const pathname = usePathname();

  /**
   * Sidebar context state
   * ---------------------
   * open    → sidebar expanded
   * animate → whether animations are enabled
   */
  const { open, animate } = useSidebar();

  /**
   * Active route detection
   * ----------------------
   * - Exact match: pathname === href
   * - Nested match: /route/sub-route
   *
   * Prevents "/" from matching every route.
   */
  const isActive =
    pathname === href || (href !== "/" && pathname?.startsWith(href + "/"));

  /**
   * Label visibility logic
   * ----------------------
   * - Always visible when animations are disabled
   * - Visible only when sidebar is expanded otherwise
   */
  const showLabel = !animate || open;

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 4 }}       // Subtle slide on hover
        whileTap={{ scale: 0.98 }}  // Press feedback
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground bg-muted/50 dark:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-800/60",
          className
        )}
      >
        {/* Active state indicator */}
        {isActive && (
          <span className="absolute left-0 top-1/2 h-8 w-0.75 -translate-y-1/2 rounded-full bg-primary" />
        )}

        {/* Icon container */}
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            isActive ? "bg-primary text-white" : "bg-muted dark:bg-muted/30"
          )}
        >
          {icon}
        </span>

        {/* Label text */}
        {showLabel && <span className="truncate">{label}</span>}
      </motion.div>
    </Link>
  );
});
