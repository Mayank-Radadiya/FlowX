import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useExecuteWorkflow = () => {
  const trpc = useTRPC();

  return useMutation(
    trpc.executeWorkflow.execute.mutationOptions({
      onSuccess: () => {
        toast.success("Workflow executed successfully");
      },
      onError: () => {
        toast.error("Failed to execute workflow");
      },
    })
  );
};
