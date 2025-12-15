import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/features/auth/server/guards";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { WorkflowListBoundary } from "@/features/workflows/components/WorkflowListBoundary";
import { WorkflowsPageShell } from "@/features/workflows/components/page/WorkflowsPageShell";

interface props {
  searchParams: Promise<SearchParams>;
}

const WorkflowPage = async ({ searchParams }: props) => {
  await requiredAuth();

  const params = await workflowsParamsLoader(searchParams);

  prefetchWorkflows(params);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-4">
      <HydrateClient>
        <WorkflowsPageShell>
          <WorkflowListBoundary />
        </WorkflowsPageShell>
      </HydrateClient>
    </div>
  );
};

export default WorkflowPage;
