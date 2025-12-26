/**
 * CredentialListBoundary Component
 * --------------------------------
 * Acts as a resilient rendering boundary for the credentials list.
 *
 * Responsibilities:
 * - Handle loading states using React Suspense
 * - Catch rendering or data errors using an Error Boundary
 * - Delegate actual rendering to CredentialItems
 */

"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CredentialItems } from "./CredentialItems";
import CredentialSkeleton from "./CredentialSkeleton";
import CredentialError from "./ui/CredentialError";

export function CredentialListBoundary() {
  return (
    <ErrorBoundary fallback={<CredentialError />}>
      <Suspense fallback={<CredentialSkeleton />}>
        <CredentialItems />
      </Suspense>
    </ErrorBoundary>
  );
}
