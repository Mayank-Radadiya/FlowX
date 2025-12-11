"use client";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { Save, Loader2, Check } from "lucide-react";
import { editorAtom } from "../../store/atom";
import { useUpdateWorkflowNodes } from "@/features/workflows/hooks/use-workflows";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface EditorSaveButtonProps {
  workflowId: string;
}

export const EditorSaveButton = ({ workflowId }: EditorSaveButtonProps) => {
  const editor = useAtomValue(editorAtom);
  const saveWorkflow = useUpdateWorkflowNodes();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    if (!editor) return;

    const nodes = editor.getNodes();
    const edges = editor.getEdges();

    saveWorkflow.mutate({
      id: workflowId,
      nodes,
      edges,
    });
  };

  // Show success state briefly after save
  useEffect(() => {
    if (saveWorkflow.isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [saveWorkflow.isSuccess]);

  const isLoading = saveWorkflow.isPending;

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={cn(
        "group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
        "transition-all duration-200",
        "border shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        showSuccess
          ? "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/25 focus:ring-emerald-400"
          : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 focus:ring-violet-400"
      )}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : showSuccess ? (
        <Check className="size-4" />
      ) : (
        <Save className="size-4 transition-transform duration-200 group-hover:scale-110" />
      )}
      {isLoading ? "Saving..." : showSuccess ? "Saved!" : "Save"}
    </button>
  );
};
