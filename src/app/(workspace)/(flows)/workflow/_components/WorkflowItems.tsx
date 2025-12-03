"use client";

import { useSuspenseWorkflows } from "../../../../../features/workflows/hooks/use-workflows";
import { ContainerGrid } from "@/components/global/main/container/ContainerGrid";
import { ItemCard } from "@/components/global/main/container/ItemCard";
import {
  getIconForWorkflow,
  getGradientForWorkflow,
} from "@/lib/workflow-utils";
import { useMemo } from "react";

export const WorkflowItems = () => {
  const workflowsQuery = useSuspenseWorkflows();

  // Memoize workflow items to prevent unnecessary re-renders
  const workflowItems = useMemo(() => {
    return workflowsQuery.data?.map((workflow) => {
      const Icon = getIconForWorkflow(workflow.id);
      const gradient = getGradientForWorkflow(workflow.id);

      return {
        ...workflow,
        Icon,
        gradient,
      };
    });
  }, [workflowsQuery.data]);

  return (
    <ContainerGrid columns={3}>
      {workflowItems?.map((workflow) => (
        <ItemCard
          key={workflow.id}
          title={workflow.name}
          description={"---"}
          icon={<workflow.Icon className="size-5" />}
          href={`/workflow/${workflow.id}`}
          gradient={workflow.gradient}
        />
      ))}
    </ContainerGrid>
  );
};
