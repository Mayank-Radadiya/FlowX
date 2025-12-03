"use client";
import { useTRPC } from "@/trpc/client";
import {
  useQueryClient,
  useSuspenseQuery,
  useMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getAll.queryOptions());
};

export const useCreateWorkflow = () => {
  const route = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success("Workflow created successfully");
        route.push(`/workflow/${data.id}`);
        queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(`Error creating workflow: ${error.message}`);
      },
    })
  );
};
