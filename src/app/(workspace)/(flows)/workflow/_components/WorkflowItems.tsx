/**
 * WorkflowItems Component
 * -----------------------
 * Displays a grid of workflow cards fetched via Suspense-enabled TRPC query.
 * Each workflow is enhanced with:
 *   - A dynamically assigned icon (based on workflow ID)
 *   - A gradient background style
 *
 * The component avoids unnecessary re-renders by memoizing the transformed
 * list of workflow items.
 */

"use client";

import { useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows";
import { ContainerGrid } from "@/components/global/main/container/ContainerGrid";
import { ItemCard } from "@/components/global/main/container/ItemCard";
import {
  getIconForWorkflow,
  getGradientForWorkflow,
} from "@/lib/workflow-utils";
import { useMemo } from "react";

export const WorkflowItems = () => {
  /**
   * useSuspenseWorkflows()
   * -----------------------
   * Suspense-enabled TRPC query that returns:
   *   - items[] → workflows
   *   - pagination metadata
   *
   * This hook will suspend the component until data is available.
   */
  const { data } = useSuspenseWorkflows();

  /**
   * workflowItems (memoized)
   * ------------------------
   * Logic:
   *  - Maps over workflow items from TRPC
   *  - Adds:
   *      Icon → dynamic React icon component
   *      gradient → CSS gradient class for card styling
   *  - Memoized to avoid recalculating unless data.items changes
   */
  const workflowItems = useMemo(() => {
    return data?.items?.map((workflow) => {
      const Icon = getIconForWorkflow(workflow.id); // Assign icon dynamically
      const gradient = getGradientForWorkflow(workflow.id); // Assign gradient based on ID

      return {
        ...workflow,
        Icon,
        gradient,
      };
    });
  }, [data?.items]);

  return (
    <ContainerGrid columns={3}>
      {/* Render workflow cards */}
      {workflowItems?.map((workflow) => (
        <ItemCard
          key={workflow.id}
          title={workflow.name}
          description={"---"} // Placeholder for future description
          icon={<workflow.Icon className="size-5" />}
          href={`/workflow/${workflow.id}`}
          gradient={workflow.gradient}
        />
      ))}
    </ContainerGrid>
  );
};
