/**
 * WorkflowListBoundary Component
 * ------------------------------
 * Acts as a resilient rendering boundary for the workflows list.
 *
 * Responsibilities:
 * - Handle loading states using React Suspense
 * - Catch rendering or data errors using an Error Boundary
 * - Delegate actual rendering to WorkflowItems
 *
 * This component centralizes all non-happy-path UI states
 * (loading and error) for the workflows list.
 */

"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import WorkflowSkeleton from "./WorkflowSkeleton";
import WorkflowError from "./WorkflowError";
import { WorkflowItems } from "./WorkflowItems";

function WorkflowListBoundary() {
  return (
    /**
     * ErrorBoundary
     * -------------
     * Catches runtime errors thrown during rendering,
     * including errors from Suspense-based data fetching.
     *
     * Displays a user-friendly error UI instead of
     * crashing the entire page.
     */
    <ErrorBoundary fallback={<WorkflowError />}>
      {/* 
        Suspense Boundary
        -----------------
        Handles the loading state while workflows data
        is being fetched.
        
        The fallback skeleton is shown until
        WorkflowItems resolves its data.
      */}
      <Suspense fallback={<WorkflowSkeleton />}>
        <WorkflowItems />
      </Suspense>
    </ErrorBoundary>
  );
}

export default WorkflowListBoundary;
