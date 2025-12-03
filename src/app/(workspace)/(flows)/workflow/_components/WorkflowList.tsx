import { Container } from "@/components/global/main/container/Container";
import { ContainerHeader } from "@/components/global/main/container/ContainerHeader";
import { WorkflowItems } from "./WorkflowItems";

function WorkflowList() {
  return (
    <Container
      variant="glass"
      header={
        <ContainerHeader
          title="My Workflows"
          description="Manage your workflows"
        />
      }
    >
      <WorkflowItems />
    </Container>
  );
}

export default WorkflowList;
