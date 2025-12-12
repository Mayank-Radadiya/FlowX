"use client";
import { useRemoveWorkflow } from "@/features/workflows/hooks/use-workflows";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface EditorDeleteButtonProps {
  workflowId: string;
}

export const EditorDeleteButton = ({ workflowId }: EditorDeleteButtonProps) => {
  const [isPadding, setIsPadding] = useState(false);
  const deleteWorkflow = useRemoveWorkflow();

  const handleDelete = () => {
    setIsPadding(true);
    deleteWorkflow.mutate({ id: workflowId });
    setIsPadding(false);
  };

  return (
    <button
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-red-400 transition-colors hover:text-white"
      onClick={handleDelete}
    >
      {isPadding ? (
        <Loader2 className="size-4 animate-pulse" />
      ) : (
        <Trash2 className="size-4" />
      )}
      Delete
    </button>
  );
};
