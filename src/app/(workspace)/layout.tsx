/**
 * WorkspaceLayout
 * ---------------
 * Defines the root layout for the workspace area of the application.
 *
 * Responsibilities:
 *  - Provide a consistent background and theme-aware styling
 *  - Wrap workspace pages with the WorkspaceShell layout
 *  - Serve as the structural boundary for workflow-related routes
 *
 * This layout ensures all workspace pages share the same
 * visual and structural foundation.
 */

import type { ReactNode } from "react";
import WorkspaceShell from "./(flows)/_components/WorkspaceShell";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
      {/* WorkspaceShell handles navigation, sidebar, and main content framing */}
      <WorkspaceShell>{children}</WorkspaceShell>
    </div>
  );
}
