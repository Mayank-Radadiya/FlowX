"use client";

import { memo, useMemo, type ReactNode } from "react";
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

// Extract static transition configs outside component to prevent recreation
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;
const springTransitionFast = {
  type: "spring",
  stiffness: 500,
  damping: 30,
} as const;
const springTransitionBouncy = {
  type: "spring",
  stiffness: 400,
  damping: 17,
} as const;
const labelTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as const;
const glowTransition = { duration: 2, repeat: Infinity } as const;

// Static animation values
const hoverAnimation = { x: 4 };
const tapAnimation = { scale: 0.98 };
const iconTapAnimation = { scale: 0.95 };
const hoverBgInitial = { opacity: 0, scale: 0.95 };
const hoverBgAnimate = { opacity: 1, scale: 1 };
const activeIndicatorInitial = { opacity: 0, scaleY: 0 };
const activeIndicatorAnimate = { opacity: 1, scaleY: 1 };
const activeGlowInitial = { opacity: 0 };
const activeGlowAnimate = { opacity: 1 };
const glowPulse = { opacity: [0.5, 0.8, 0.5] };

export const SidebarLink = memo(function SidebarLink({
  href,
  label,
  icon,
  className,
}: SidebarLinkProps) {
  const { open, animate } = useSidebar();
  const pathname = usePathname();

  // Memoize active state calculation
  const isActive = useMemo(() => {
    if (!pathname) return false;
    if (pathname === href) return true;
    // Only match sub-paths if href is not root
    if (href !== "/" && pathname.startsWith(href + "/")) return true;
    return false;
  }, [pathname, href]);

  const showLabel = !animate || open;

  // Memoize icon hover animation to prevent object recreation
  const iconHoverAnimation = useMemo(
    () => ({ scale: 1.1, rotate: isActive ? 0 : 5 }),
    [isActive]
  );

  // Memoize label animation object
  const labelAnimation = useMemo(
    () => ({
      width: showLabel ? "auto" : 0,
      opacity: showLabel ? 1 : 0,
      x: showLabel ? 0 : -10,
    }),
    [showLabel]
  );

  // Memoize icon scale animation
  const iconScaleAnimation = useMemo(
    () => ({ scale: isActive ? [1, 1.1, 1] : 1 }),
    [isActive]
  );

  return (
    <Link href={href} prefetch={true}>
      <motion.div
        initial={false}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={springTransition}
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
          initial={hoverBgInitial}
          whileHover={hoverBgAnimate}
          transition={{ duration: 0.2 }}
        />

        {/* Active indicator with glow */}
        {isActive && (
          <>
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-primary"
              initial={activeIndicatorInitial}
              animate={activeIndicatorAnimate}
              transition={springTransitionFast}
            />
            <motion.div
              layoutId="activeGlow"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary/20 blur-xl -z-10"
              initial={activeGlowInitial}
              animate={activeGlowAnimate}
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
          whileHover={iconHoverAnimation}
          whileTap={iconTapAnimation}
          transition={springTransitionBouncy}
        >
          {/* Icon glow effect for active state */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"
              animate={glowPulse}
              transition={glowTransition}
            />
          )}
          <motion.span
            animate={iconScaleAnimation}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
        </motion.span>

        <motion.span
          className="flex items-center gap-2 overflow-hidden text-sm"
          initial={false}
          animate={labelAnimation}
          transition={labelTransition}
        >
          <span className="truncate">{label}</span>
        </motion.span>
      </motion.div>
    </Link>
  );
});
