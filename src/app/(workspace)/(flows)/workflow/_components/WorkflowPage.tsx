"use client";

import { PageHeader } from "@/components/global/main/PageHeader/PageHeader";
import { useCreateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { GitPullRequestArrow } from "lucide-react";

export const CreateWorkFlowPage = () => {
  const createWorkflow = useCreateWorkflow();

  const handleCreateWorkflow = () => {
    createWorkflow.mutate();
  };

  return (
    <>
      <PageHeader
        title="Workflows"
        subtitle="Automation"
        description="Build powerful automation that connect your apps and services seamlessly."
        buttonLabel="Create Workflow"
        icon={<GitPullRequestArrow className="size-6" />}
        gradient="purple"
        onNew={handleCreateWorkflow}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};
