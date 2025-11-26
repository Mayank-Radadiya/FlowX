/**
 * This is basic example of a How to use TRPC in Component.
 * 
 * Server component that prefetches TRPC data, hydrates it for the client,
 * and renders the Client component inside a Suspense boundary.
 */

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Client from "./Client";
import { Suspense } from "react";

export default function Home() {
  // Create a server-side QueryClient instance for prefetching data
  const queryClient = getQueryClient();

  // Prefetch TRPC user data so it can be dehydrated and sent to the client
  void queryClient.prefetchQuery(trpc.getUser.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* This component runs on the client and receives hydrated data */}
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
}
