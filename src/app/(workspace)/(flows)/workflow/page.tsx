import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/features/auth/server/guards";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CreateWorkFlowPage } from "./_components/WorkflowPage";
import WorkflowSkeleton from "./_components/WorkflowSkeleton";
import WorkflowError from "./_components/WorkflowError";
import type { SearchParams } from "nuqs/server";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { WorkflowItems } from "./_components/WorkflowItems";

interface props {
  searchParams: Promise<SearchParams>;
}

async function page({ searchParams }: props) {
  await requiredAuth();

  const params = await workflowsParamsLoader(searchParams);

  prefetchWorkflows(params);

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-4">
      <HydrateClient>
        <CreateWorkFlowPage>
          <ErrorBoundary fallback={<WorkflowError />}>
            <Suspense fallback={<WorkflowSkeleton />}>
              <WorkflowItems />
            </Suspense>
          </ErrorBoundary>
        </CreateWorkFlowPage>
      </HydrateClient>
    </div>
  );
}

export default page;
