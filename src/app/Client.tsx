"use client";
/**
 * This component runs on the client and consumes hydrated TRPC data
 * using React Query’s suspense-enabled query hook.
 */

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Client() {
  // Access the TRPC client scoped inside TRPCReactProvider
  const trpc = useTRPC();

  // Suspense-ready query that throws while loading and resumes when hydrated
  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());

  return <div>{JSON.stringify(users)}</div>;
}
