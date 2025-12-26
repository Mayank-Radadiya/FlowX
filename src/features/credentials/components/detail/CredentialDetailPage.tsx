/**
 * CredentialDetailPage Component
 * Public export with Suspense and ErrorBoundary.
 * Clean entry point for the credential detail feature.
 */

"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CredentialDetailContent } from "./CredentialDetailContent";
import { CredentialDetailSkeleton } from "./ui/CredentialDetailSkeleton";
import { CredentialDetailError } from "./ui/CredentialDetailError";

interface CredentialDetailPageProps {
  credentialId: string;
}

export function CredentialDetailPage({
  credentialId,
}: CredentialDetailPageProps) {
  return (
    <ErrorBoundary fallback={<CredentialDetailError />}>
      <Suspense fallback={<CredentialDetailSkeleton />}>
        <CredentialDetailContent credentialId={credentialId} />
      </Suspense>
    </ErrorBoundary>
  );
}
