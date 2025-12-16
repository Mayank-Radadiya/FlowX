"use client";

import { useRemoveWorkflow } from "@/features/workflows/hooks/use-workflows";
import { Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorDeleteButtonProps {
  workflowId: string;
}

export function EditorDeleteButton({ workflowId }: EditorDeleteButtonProps) {
  const deleteWorkflow = useRemoveWorkflow();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workflow? This action cannot be undone."
    );

    if (!confirmed) return;

    deleteWorkflow.mutate({ id: workflowId });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleteWorkflow.isPending}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        " hover:bg-red-500/70 hover:text-white",
        "disabled:opacity-50 disabled:pointer-events-none"
      )}
    >
      {deleteWorkflow.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}
      Delete
    </button>
  );
}
