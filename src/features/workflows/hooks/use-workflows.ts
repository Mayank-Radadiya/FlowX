/**
 * React hooks for managing workflows using TRPC + TanStack Query.
 * Includes:
 *  - Suspense-enabled workflow fetching
 *  - Pagination derived from cached data (no DB calls)
 *  - Mutation hook for creating a workflow
 */

"use client";

import { useTRPC } from "@/trpc/client";
import {
  useQueryClient,
  useSuspenseQuery,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useWorkflowsParams } from "./use-workflows-params";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  // Suspense-enabled workflow query (must be prefetched on server)
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

// Hook to get pagination info from cache - NO extra DB calls, NO Suspense.
// Uses useQuery with enabled:false + initialData from cache
export const useWorkflowsPagination = () => {
  const trpc = useTRPC();
  const [params, setParams] = useWorkflowsParams();
  const queryClient = useQueryClient();

  const queryOptions = trpc.workflows.getMany.queryOptions(params);

  // Get cached data synchronously first to ensure consistent SSR/CSR values
  const cachedData = queryClient.getQueryData(queryOptions.queryKey);

  // Use useQuery that subscribes to cache updates but NEVER fetches
  const { data } = useQuery({
    ...queryOptions,
    enabled: false, // NEVER fetch - only read from cache
    initialData: cachedData,
  });

  // Update only URL params — not hitting the backend
  const goToPage = (page: number) => {
    setParams({ ...params, page });
  };

  const nextPage = () => {
    if (data?.hasNextPage) {
      setParams({ ...params, page: params.page + 1 });
    }
  };

  const prevPage = () => {
    if (data?.hasPreviousPage) {
      setParams({ ...params, page: params.page - 1 });
    }
  };

  const setSearch = (search: string) => {
    setParams({ ...params, search, page: 1 }); // Reset pagination when searching
  };

  const setPageSize = (pageSize: number) => {
    setParams({ ...params, pageSize, page: 1 }); // Reset pagination when pageSize changes
  };

  return {
    // Current active params
    currentPage: params.page,
    pageSize: params.pageSize,
    search: params.search,

    // Cached pagination info (updates reactively when cache updates)
    totalPages: data?.totalPages ?? 1,
    totalCount: data?.totalCount ?? 0,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,

    // User actions
    goToPage,
    nextPage,
    prevPage,
    setSearch,
    setPageSize,
  };
};

export const useCreateWorkflow = () => {
  const route = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Mutation hook for creating a new workflow
  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("Workflow created successfully");

        // Redirect user to created workflow
        route.push(`/workflow/${data.id}`);

        // Refresh cached workflows list
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));

        // Preload the created workflow data into cache
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Error creating workflow: ${error.message}`);
      },
    })
  );
};

// Mutation hook for removing a workflow
export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const route = useRouter();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        route.push("/workflow");
        toast.success(`Workflow "${data.name}" removed successfully`);

        // Refresh cached workflows list
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Error removing workflow: ${error.message}`);
      },
    })
  );
};

// Hook for fetching one workflow by id with suspense
export const useSuspenseWorkflowById = (id: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
};

// Update workflow name and description hook
export const useUpdateWorkflowNameAndDescription = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.updateNameAndDescription.mutationOptions({
      onSuccess: (data) => {
        toast.success("Workflow details updated successfully");

        // Update cached workflow details
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id })
        );
        // Refresh cached workflows list
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Error updating workflow: ${error.message}`);
      },
    })
  );
};

// Update workNode and Save to database.

export const useUpdateWorkflowNodes = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.updateWorkflowNodes.mutationOptions({
      onSuccess: (data) => {
        toast.success("Workflow nodes updated successfully");

        // Update cached workflow details
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id })
        );
        // Refresh cached workflows list
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Error updating workflow nodes: ${error.message}`);
      },
    })
  );
};
