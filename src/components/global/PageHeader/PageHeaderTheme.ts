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
    // Base background gradient for the header container
    bg: "from-violet-500/10 via-purple-500/5 to-fuchsia-500/10",

    // Primary glow layer color (stronger, closer glow)
    glow1: "bg-violet-500/20",

    // Secondary glow layer color (softer, wider glow)
    glow2: "bg-purple-500/15",

    // Icon accent gradient
    accent: "from-violet-500 to-purple-600",

    // Badge styling (background, text color, border)
    badge:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },

  blue: {
    bg: "from-blue-500/10 via-cyan-500/5 to-sky-500/10",
    glow1: "bg-blue-500/20",
    glow2: "bg-cyan-500/15",
    accent: "from-blue-500 to-cyan-600",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },

  orange: {
    bg: "from-orange-500/10 via-amber-500/5 to-yellow-500/10",
    glow1: "bg-orange-500/20",
    glow2: "bg-amber-500/15",
    accent: "from-orange-500 to-amber-600",
    badge:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },

  green: {
    bg: "from-emerald-500/10 via-green-500/5 to-teal-500/10",
    glow1: "bg-emerald-500/20",
    glow2: "bg-green-500/15",
    accent: "from-emerald-500 to-teal-600",
    badge:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
} satisfies Record<PageHeaderGradient, any>;
