import { prefetchWorkflowById } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/features/auth/server/guards";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EditorError } from "@/features/editor/components/EditorError";
import Editor from "@/features/editor/components/Editor";
import { EditorLoader } from "@/features/editor/components/basicUi/EditorLoader";

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
          <Suspense fallback={<EditorLoader />}>
            {/* Workflow details component goes here */}
            <Editor workflowId={workflowId} />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </>
  );
}

export default page;
