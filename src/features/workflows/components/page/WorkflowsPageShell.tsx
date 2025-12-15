import { PageHeader } from "@/components/global/PageHeader/PageHeader";
import { GitPullRequestArrow } from "lucide-react";
import WorkflowContainer from "../../ui/WorkflowContainer";
import { CreateWorkflowDialog } from "../create-workflow/CreateWorkflowDialog";

export function WorkflowsPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title="Workflows"
        subtitle="Automation"
        description="Build powerful automation that connect your apps and services seamlessly."
        icon={<GitPullRequestArrow className="size-6" />}
        gradient="purple"
        action={<CreateWorkflowDialog />}
      />

      <WorkflowContainer>{children}</WorkflowContainer>
    </>
  );
}
