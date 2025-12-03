"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export const SidebarLink = ({
  href,
  label,
  icon,

  className,
}: SidebarLinkProps) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === href;
  const showLabel = !animate || open;

  return (
    <>
      <Link href={href}>
        <motion.div
          initial={false}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "group/link relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium overflow-hidden",
            isActive
              ? "bg-primary/20 text-primary shadow-sm shadow-primary/10 dark:bg-primary/15"
              : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
            className
          )}
        >
          {/* Hover background effect */}
          <motion.div
            className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl -z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Active indicator with glow */}
          {isActive && (
            <>
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-primary"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
              <motion.div
                layoutId="activeGlow"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary/20 blur-xl -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </>
          )}

          <motion.span
            className={cn(
              "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg overflow-hidden",
              isActive
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-neutral-100/80 dark:bg-neutral-800/80 group-hover/link:bg-neutral-200/80 dark:group-hover/link:bg-neutral-700/80"
            )}
            whileHover={{ scale: 1.1, rotate: isActive ? 0 : 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Icon glow effect for active state */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <motion.span
              animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          </motion.span>

          <motion.span
            className="flex items-center gap-2 overflow-hidden text-sm"
            initial={false}
            animate={{
              width: showLabel ? "auto" : 0,
              opacity: showLabel ? 1 : 0,
              x: showLabel ? 0 : -10,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="truncate">{label}</span>
          </motion.span>
        </motion.div>
      </Link>
    </>
  );
};
