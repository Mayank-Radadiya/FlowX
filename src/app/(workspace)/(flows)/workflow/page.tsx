import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CreateWorkFlowPage } from "./_components/WorkflowPage";
import WorkflowSkeleton from "./_components/WorkflowSkeleton";
import WorkflowError from "./_components/WorkflowError";
import WorkflowList from "./_components/WorkflowList";

async function page() {
  await requiredAuth();

  prefetchWorkflows();

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
      <CreateWorkFlowPage />
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowError />}>
          <Suspense fallback={<WorkflowSkeleton />}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}

export default page;
