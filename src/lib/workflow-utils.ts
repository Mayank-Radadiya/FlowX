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

const gradients = ["purple", "blue", "green", "orange"] as const;
export type GradientType = (typeof gradients)[number];

// Collection of workflow/automation-related icons
const workflowIcons: LucideIcon[] = [
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

// Seeded random number generator for consistent icons per workflow
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getIconForWorkflow(workflowId: string): LucideIcon {
  const index = seededRandom(workflowId) % workflowIcons.length;
  return workflowIcons[index];
}

export function getGradientForWorkflow(workflowId: string): GradientType {
  const index = seededRandom(workflowId + "gradient") % gradients.length;
  return gradients[index];
}
