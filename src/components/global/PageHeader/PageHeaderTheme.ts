/**
 * PageHeader Theme Configuration
 * ------------------------------
 * Centralized theme definitions for the PageHeader component.
 *
 * Responsibilities:
 *  - Define visual styles for each supported header gradient
 *  - Provide consistent background, glow, accent, and badge styling
 *  - Act as a single source of truth for PageHeader theming
 *
 * Each key represents a selectable gradient variant used by PageHeader.
 */

import type { PageHeaderGradient } from "./PageHeader.types";

export const pageHeaderTheme = {
  purple: {
    bg: "from-violet-500/8 via-purple-500/4 to-fuchsia-500/8 dark:from-violet-500/12 dark:via-purple-500/6 dark:to-fuchsia-500/12",
    glow1: "bg-violet-500/15 dark:bg-violet-500/10",
    glow2: "bg-purple-500/10 dark:bg-purple-500/8",
    accent: "from-violet-500 to-purple-600",
    badge:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },

  blue: {
    bg: "from-blue-500/8 via-cyan-500/4 to-sky-500/8 dark:from-blue-500/12 dark:via-cyan-500/6 dark:to-sky-500/12",
    glow1: "bg-blue-500/15 dark:bg-blue-500/10",
    glow2: "bg-cyan-500/10 dark:bg-cyan-500/8",
    accent: "from-blue-500 to-cyan-600",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },

  orange: {
    bg: "from-orange-500/8 via-amber-500/4 to-yellow-500/8 dark:from-orange-500/10 dark:via-amber-500/5 dark:to-yellow-500/8",
    glow1: "bg-orange-500/12 dark:bg-orange-500/8",
    glow2: "bg-amber-500/8 dark:bg-amber-500/6",
    accent: "from-orange-500 to-amber-600",
    badge:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },

  green: {
    bg: "from-emerald-500/8 via-green-500/4 to-teal-500/8 dark:from-emerald-500/12 dark:via-green-500/6 dark:to-teal-500/12",
    glow1: "bg-emerald-500/15 dark:bg-emerald-500/10",
    glow2: "bg-green-500/10 dark:bg-green-500/8",
    accent: "from-emerald-500 to-teal-600",
    badge:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
} satisfies Record<PageHeaderGradient, any>;
