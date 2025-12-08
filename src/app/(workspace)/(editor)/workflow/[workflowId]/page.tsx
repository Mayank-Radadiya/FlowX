import { prefetchWorkflowById } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EditorError } from "@/features/editor/components/EditorError";
import Editor from "@/features/editor/components/Editor";

interface Props {
  params: Promise<{ workflowId: string }>;
}

async function page({ params }: Props) {
  await requiredAuth();
  const { workflowId } = await params;

  prefetchWorkflowById(workflowId);

  return (
    <>
      <HydrateClient>
        <ErrorBoundary fallback={<EditorError />}>
          <Suspense fallback={<div>Loading workflow...</div>}>
            {/* Workflow details component goes here */}
            <Editor workflowId={workflowId} />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </>
  );
}

export default page;
