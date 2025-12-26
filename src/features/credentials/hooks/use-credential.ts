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
import { useCredentialsParams } from "./use-credential-params";
import { CredentialType } from "@prisma/client";

export const useSuspenseCredentials = () => {
  const trpc = useTRPC();
  const [params] = useCredentialsParams();

  return useSuspenseQuery(trpc.credentials.getMany.queryOptions(params));
};

export const useCredentialsPagination = () => {
  const trpc = useTRPC();
  const [params, setParams] = useCredentialsParams();
  const queryClient = useQueryClient();

  const queryOptions = trpc.credentials.getMany.queryOptions(params);

  const cachedData = queryClient.getQueryData(queryOptions.queryKey);

  const { data } = useQuery({
    ...queryOptions,
    enabled: false, // NEVER fetch - only read from cache
    initialData: cachedData,
  });

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

export const useCreateCredential = () => {
  const route = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.credentials.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("Credential created successfully");

        route.push(`/credentials/${data.id}`);

        queryClient.invalidateQueries(
          trpc.credentials.getMany.queryOptions({})
        );

        queryClient.invalidateQueries(
          trpc.credentials.getOne.queryFilter({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Error creating credential: ${error.message}`);
      },
    })
  );
};

export const useRemoveCredential = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const route = useRouter();

  return useMutation(
    trpc.credentials.remove.mutationOptions({
      onSuccess: (data) => {
        route.push("/credentials");
        toast.success(`Credential "${data.name}" removed successfully`);

        queryClient.invalidateQueries(
          trpc.credentials.getMany.queryOptions({})
        );
        queryClient.invalidateQueries(
          trpc.credentials.getMany.queryOptions({})
        );
      },
      onError: (error) => {
        toast.error(`Error removing credential: ${error.message}`);
      },
    })
  );
};

export const useSuspenseCredentialById = (id: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.credentials.getOne.queryOptions({ id }));
};

export const useCredentialGetByType = (type: CredentialType) => {
  const trpc = useTRPC();

  return useQuery(
    trpc.credentials.getByType.queryOptions({
      type,
    })
  );
};

export const useUpdateCredential = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.credentials.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Credential "${data.name}" updated successfully`);

        queryClient.invalidateQueries(
          trpc.credentials.getMany.queryOptions({})
        );

        queryClient.invalidateQueries(
          trpc.credentials.getOne.queryFilter({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Error updating credential: ${error.message}`);
      },
    })
  );
};

export const useRevealCredentialSecret = (id: string, enabled: boolean) => {
  const trpc = useTRPC();

  return useQuery({
    ...trpc.credentials.getSecret.queryOptions({ id }),
    enabled,
    staleTime: 0, // Always fetch fresh
  });
};
