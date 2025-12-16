/**
 * Workflow Editor Page
 * --------------------
 * Server component responsible for rendering the workflow editor route.
 *
 * Responsibilities:
 * - Enforce authentication before accessing the editor
 * - Prefetch workflow data on the server for faster client hydration
 * - Provide hydration, loading, and error boundaries
 * - Delegate actual editing UI to the Editor component
 *
 * This file is a route-level orchestration layer, not a UI component.
 */

import { prefetchWorkflowById } from "@/features/workflows/server/prefetch";
import { requiredAuth } from "@/features/auth/server/guards";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EditorError } from "@/features/editor/components/editor/EditorError";
import { EditorLoader } from "@/features/editor/components/ui/EditorLoader";
import Editor from "@/features/editor/components/editor/Editor";

interface Props {
  params: Promise<{ workflowId: string }>;
}

async function Page({ params }: Props) {
  /**
   * Authentication guard
   * --------------------
   * Ensures only authenticated users can access
   * workflow editor pages.
   *
   * If the user is not authenticated, this will
   * redirect before any data is fetched.
   */
  await requiredAuth();

  /**
   * Route parameter resolution
   * --------------------------
   * Extracts workflowId from the dynamic route segment.
   */
  const { workflowId } = await params;

  /**
   * Server-side data prefetching
   * ----------------------------
   * Prefetches workflow data into the TRPC query cache
   * so the client can hydrate instantly without an
   * additional loading roundtrip.
   *
   * This improves perceived performance of the editor.
   */
  prefetchWorkflowById(workflowId);

  return (
    <>
      {/* 
        Hydration boundary
        ------------------
        Makes the server-prefetched TRPC cache available
        to client components below.
      */}
      <HydrateClient>
        {/* 
          Error boundary
          --------------
          Catches runtime or data errors occurring inside
          the editor and shows a user-friendly error UI.
        */}
        <ErrorBoundary fallback={<EditorError />}>
          {/* 
            Suspense boundary
            -----------------
            Handles async loading states inside the editor,
            showing a lightweight editor loader while data resolves.
          */}
          <Suspense fallback={<EditorLoader />}>
            {/* Main workflow editor */}
            <Editor workflowId={workflowId} />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </>
  );
}

export default Page;
