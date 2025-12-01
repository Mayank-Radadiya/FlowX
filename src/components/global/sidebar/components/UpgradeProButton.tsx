"use client";

import { motion } from "motion/react";
import { Crown, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";

export const UpgradeProButton = () => {
  const { open, animate } = useSidebar();
  const isExpanded = !animate || open;

  return (
    <Link href="/upgrade" className="block">
      <motion.div
        className="relative overflow-hidden rounded-xl p-px cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Animated gradient border - Orange in light, Purple/Violet in dark */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-linear-to-r from-amber-500 via-orange-500 to-yellow-500 dark:from-violet-500 dark:via-purple-500 dark:to-fuchsia-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* Inner content */}
        <motion.div
          className="relative flex items-center gap-3 rounded-xl bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-violet-950/90 dark:via-purple-950/90 dark:to-fuchsia-950/90 px-1 py-3"
          initial={false}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 dark:via-purple-300/10 to-transparent -skew-x-12 rounded-xl"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles effect */}
          <motion.div
            className="absolute top-1 right-2 text-amber-400 dark:text-violet-400"
            animate={{
              y: [-2, 2, -2],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={10} />
          </motion.div>

          <motion.div
            className="absolute bottom-2 right-8 text-orange-400 dark:text-purple-400"
            animate={{
              y: [2, -2, 2],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles size={8} />
          </motion.div>

          {/* Additional star for dark mode */}
          <motion.div
            className="absolute top-3 right-14 text-fuchsia-400 hidden dark:block"
            animate={{
              y: [-1, 1, -1],
              opacity: [0.4, 0.9, 0.4],
              scale: [0.7, 1, 0.7],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <Sparkles size={6} />
          </motion.div>

          {/* Crown icon with glow - Different colors for light/dark */}
          <motion.div
            className="relative flex h-10 w-10  shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-amber-400 via-orange-500 to-yellow-500 dark:from-violet-500 dark:via-purple-500 dark:to-fuchsia-500 shadow-lg shadow-orange-500/30 dark:shadow-purple-500/40"
            animate={{
              boxShadow: [
                "0 4px 20px -4px var(--glow-color, rgba(251, 146, 60, 0.4))",
                "0 4px 30px -4px var(--glow-color, rgba(251, 146, 60, 0.6))",
                "0 4px 20px -4px var(--glow-color, rgba(251, 146, 60, 0.4))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={
              {
                "--glow-color": "rgba(251, 146, 60, 0.5)",
              } as React.CSSProperties
            }
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Crown size={20} className="text-white drop-shadow-sm" />
            </motion.div>

            {/* Lightning bolt accent - Yellow in light, Cyan in dark */}
            <motion.div
              className="absolute -top-1 -right-1 bg-yellow-400 dark:bg-cyan-400 rounded-full p-0.5"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap
                size={10}
                className="text-orange-600 dark:text-purple-600"
                fill="currentColor"
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="flex flex-col overflow-hidden"
            initial={false}
            animate={{
              width: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.span
              className="text-sm font-bold bg-linear-to-r from-amber-600 via-orange-600 to-yellow-600 dark:from-violet-300 dark:via-purple-300 dark:to-fuchsia-300 bg-clip-text text-transparent whitespace-nowrap"
              initial={false}
              animate={{ y: isExpanded ? 0 : 5 }}
              transition={{ duration: 0.25 }}
            >
              Upgrade to Pro
            </motion.span>
            <motion.span
              className="text-[10px] text-orange-600/70 dark:text-purple-300/70 whitespace-nowrap"
              initial={false}
              animate={{
                y: isExpanded ? 0 : 5,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              Unlock all features
            </motion.span>
          </motion.div>

          {/* Arrow indicator on hover */}
          <motion.div
            className="ml-auto text-orange-500 dark:text-purple-400"
            initial={{ x: -5, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                →
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
};
