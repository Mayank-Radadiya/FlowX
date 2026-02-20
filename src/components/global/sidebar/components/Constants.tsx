/**
 * Sidebar Navigation Items
 * -----------------------
 * Central configuration for primary application navigation.
 *
 * This file defines all sidebar menu entries in a structured format,
 * allowing UI components to render navigation consistently without
 * hardcoding routes or labels.
 */

import { Activity, GitBranch, KeyRound, BookOpen } from "lucide-react";

/**
 * NAV_ITEMS
 * ---------
 * Array of navigation definitions used by the sidebar.
 *
 * Each object represents one navigational destination and includes:
 *  - label → Human-readable name shown in the UI
 *  - href  → Route path used for navigation
 *  - icon  → Visual indicator to improve recognition and UX
 */
export const NAV_ITEMS = [
  {
    label: "Workflows",
    href: "/workflow",
    icon: <GitBranch size={18} strokeWidth={1.7} />,
  },
  {
    label: "Credentials",
    href: "/credentials",
    icon: <KeyRound size={18} strokeWidth={1.7} />,
  },
  {
    label: "Executions",
    href: "/executions",
    icon: <Activity size={18} strokeWidth={1.7} />,
  },
  {
    label: "Guide",
    href: "/guide",
    icon: <BookOpen size={18} strokeWidth={1.7} />,
  },
];
