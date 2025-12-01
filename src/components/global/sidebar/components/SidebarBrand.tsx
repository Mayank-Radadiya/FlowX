"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";

export const SidebarBrand = ({}: {}) => {
  const { open, animate } = useSidebar();
  const showText = !animate || open;

  return (
    <Link href="/" className="group flex items-center gap-3">
      <motion.div
        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-background via-background to-background backdrop-blur-sm overflow-hidden shadow-lg ring-1 ring-border/50"
        whileHover={{
          scale: 1.08,
          boxShadow: "0 8px 30px -10px rgba(var(--primary-rgb), 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />

        <motion.div
          animate={{ rotate: open ? 0 : 0, scale: open ? 1 : 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="relative z-10"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="overflow-hidden absolute left-20 flex flex-col"
        initial={false}
        animate={{
          width: showText ? "auto" : 0,
          opacity: showText ? 1 : 0,
          x: showText ? 0 : -10,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.span
          className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-xl font-bold tracking-tight text-transparent inline-block"
          initial={false}
          animate={{ y: showText ? 0 : 5 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          Flow
          <motion.span
            className="text-primary/90 font-bold text-2xl ml-0.5 font-mono inline-block"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            X
          </motion.span>
        </motion.span>

        <motion.p
          className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5"
          initial={false}
          animate={{ y: showText ? 0 : 5, opacity: showText ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {"Workflow Platform"}
        </motion.p>
      </motion.div>
    </Link>
  );
};
