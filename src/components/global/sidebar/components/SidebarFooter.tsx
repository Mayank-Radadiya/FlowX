"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ToggleButton } from "../../ToggleButton";
import { useSidebar } from "./SidebarContext";

interface SidebarFooterProps {
  children: ReactNode;
  className?: string;
}

export const SidebarFooter = ({ children, className }: SidebarFooterProps) => {
  const { open, animate } = useSidebar();
  const showToggle = !animate || open;

  return (
    <>
      <motion.div
        className={cn("mt-auto flex flex-col gap-4", className)}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative flex items-center justify-center gap-3 pt-3 "
          initial={false}
        >
          {/* Animated border line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ToggleButton />
          </motion.div>

          <motion.span
            className="text-sm font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap"
            initial={false}
            animate={{
              width: showToggle ? "auto" : 0,
              opacity: showToggle ? 1 : 0,
              x: showToggle ? 0 : -10,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            Change Theme
          </motion.span>
        </motion.div>
        {children}
      </motion.div>
    </>
  );
};
