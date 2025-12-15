/**
 * WorkflowItems Component
 * -----------------------
 * Renders the list of workflows for the current user.
 *
 * Responsibilities:
 * - Fetch workflows using Suspense-based data fetching
 * - Handle the empty state when no workflows exist
 * - Render workflow cards with consistent visuals
 *
 * This component acts as a bridge between:
 * - Data (workflows)
 * - Presentation (grid, cards, empty state)
 */

"use client";

import { useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows";
import { ContainerGrid } from "@/components/global/main/container/ContainerGrid";
import { ItemCard } from "@/components/global/main/container/ItemCard";
import EmptyWorkflowState from "./EmptyWorkflowState";
import { getWorkflowGradient, getWorkflowIcon } from "./lib/workflow-utils";

export function WorkflowItems() {
  /**
   * Fetch workflows using Suspense.
   * At this point, data is guaranteed to be available
   * or the Suspense boundary above will handle loading.
   */
  const { data } = useSuspenseWorkflows();

  /**
   * Empty state handling
   * --------------------
   * If the user has no workflows, render a dedicated
   * onboarding-focused empty state instead of a grid.
   */
  if (!data.items.length) {
    return <EmptyWorkflowState />;
  }

  /**
   * Render workflow grid
   * --------------------
   * Each workflow is displayed as a card with:
   * - Deterministic icon
   * - Deterministic gradient
   * - Navigation to the workflow editor
   */
  return (
    <ContainerGrid columns={3}>
      {data.items.map((workflow) => {
        /**
         * Select a stable icon based on workflow id.
         * This ensures consistent visuals across renders.
         */
        const Icon = getWorkflowIcon(workflow.id);

        return (
          /**
           * Item card for each workflow
           * -----------------------
           * ItemCard handles layout, styling, and navigation.
           * We pass in the workflow-specific details like name, description, icon, and gradient.
           */
          <ItemCard
            key={workflow.id}
            title={workflow.name}
            description={workflow.description}
            icon={<Icon className="size-5" />}
            href={`/workflow/${workflow.id}`}
            gradient={getWorkflowGradient(workflow.id)}
            createdAt={workflow.createdAt}
          />
        );
      })}
    </ContainerGrid>
  );
}
