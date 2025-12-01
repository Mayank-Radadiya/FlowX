"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogOut } from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface SidebarUserProps {
  name: string;
  email: string;
  avatar?: ReactNode;
  onLogout?: () => void;
}

export const SidebarUser = ({
  name,
  email,
  avatar,
  onLogout,
}: SidebarUserProps) => {
  const { open, animate } = useSidebar();
  const showInfo = !animate || open;

  return (
    <motion.div
      className="relative flex items-center gap-3 rounded-xl border border-neutral-200/50 bg-linear-to-br from-neutral-50 to-neutral-100/50 px-1 py-3 dark:border-neutral-800/50 dark:from-neutral-900 dark:to-neutral-900/50 overflow-hidden"
      initial={false}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 40px -15px rgba(0,0,0,0.15)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 -z-10"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* User Avatar with pulse effect */}
      <motion.div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-md ring-2 ring-background overflow-hidden"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Avatar shimmer */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />

        {avatar ?? (
          <motion.span
            className="text-sm font-semibold text-white uppercase relative z-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {name.charAt(0)}
          </motion.span>
        )}

        {/* Online indicator with pulse */}
        <motion.div
          className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.4)",
              "0 0 0 4px rgba(34, 197, 94, 0)",
              "0 0 0 0 rgba(34, 197, 94, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* User Info */}
      <motion.div
        className="flex-1 overflow-hidden"
        initial={false}
        animate={{
          width: showInfo ? "auto" : 0,
          opacity: showInfo ? 1 : 0,
          x: showInfo ? 0 : -10,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.p
          className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate"
          initial={false}
          animate={{ y: showInfo ? 0 : 5 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          {name}
        </motion.p>
        <motion.p
          className="text-xs text-neutral-500 dark:text-neutral-400 truncate"
          initial={false}
          animate={{ y: showInfo ? 0 : 5, opacity: showInfo ? 1 : 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          {email}
        </motion.p>
      </motion.div>

      {/* Logout Button */}
      <AnimatePresence>
        {showInfo && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onLogout}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors "
            title="Logout"
          >
            <LogOut size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
