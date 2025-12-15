/**
 * Workflow visual utilities
 * -------------------------
 * This file provides deterministic helpers for assigning
 * icons and gradients to workflows based on their ID.
 *
 * Goals:
 *  - Ensure visual consistency across renders and sessions
 *  - Avoid storing UI-specific data in the database
 *  - Generate stable, evenly distributed visuals
 */

import {
  GitBranch,
  ChartNoAxesGantt,
  GitPullRequestArrow,
  PackagePlus,
  Braces,
  Cog,
  Container,
  ServerCog,
  Workflow,
  Zap,
  Boxes,
  Network,
  Cable,
  Route,
  Shuffle,
  Split,
  Combine,
  CircuitBoard,
  type LucideIcon,
} from "lucide-react";

/**
 * WorkflowGradient
 * ----------------
 * Restricts gradient values to a known, design-approved set.
 * This ensures consistency across UI components and themes.
 */
export type WorkflowGradient = "purple" | "blue" | "green" | "orange";

/**
 * GRADIENTS
 * ---------
 * Ordered list of available gradients.
 * Index-based access allows deterministic selection via hashing.
 */
const GRADIENTS: WorkflowGradient[] = ["purple", "blue", "green", "orange"];

/**
 * WORKFLOW_ICONS
 * --------------
 * Curated set of Lucide icons representing:
 *  - Automation
 *  - Data flow
 *  - Infrastructure
 *  - Integration
 *
 * Icons are chosen to visually communicate workflow intent
 * without manual configuration.
 */
const WORKFLOW_ICONS: LucideIcon[] = [
  GitBranch,
  ChartNoAxesGantt,
  GitPullRequestArrow,
  PackagePlus,
  Braces,
  Cog,
  Container,
  ServerCog,
  Workflow,
  Zap,
  Boxes,
  Network,
  Cable,
  Route,
  Shuffle,
  Split,
  Combine,
  CircuitBoard,
];

/**
 * hashString
 * ----------
 * Deterministic string hashing function.
 *
 * Characteristics:
 *  - Same input always produces the same output
 *  - Lightweight and fast
 *  - Produces evenly distributed numeric values
 *
 * This ensures visual assignments remain stable across:
 *  - Page reloads
 *  - Sessions
 *  - Devices
 */
function hashString(input: string): number {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Force 32-bit integer
  }

  return Math.abs(hash);
}

/**
 * getWorkflowIcon
 * ----------------
 * Maps a workflow ID to a specific icon.
 *
 * Logic:
 *  - Hash the workflow ID
 *  - Use modulo to map the hash to an icon index
 *  - Return a consistent icon for the same workflow
 */
export function getWorkflowIcon(id: string): LucideIcon {
  return WORKFLOW_ICONS[hashString(id) % WORKFLOW_ICONS.length];
}

/**
 * getWorkflowGradient
 * -------------------
 * Maps a workflow ID to a color gradient.
 *
 * Logic:
 *  - Hash the ID with a suffix to avoid correlation with icon hashing
 *  - Use modulo to select a gradient
 *  - Guarantees stable but visually varied results
 */
export function getWorkflowGradient(id: string): WorkflowGradient {
  return GRADIENTS[hashString(`${id}-gradient`) % GRADIENTS.length];
}
