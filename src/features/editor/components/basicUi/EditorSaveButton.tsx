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
        // Base style
        "relative flex items-center gap-2 px-4 py-1.5 w-24 rounded-xl text-sm font-medium",
        "transition-all duration-300 border backdrop-blur-md",

        // Border + background
        "bg-white/60 dark:bg-neutral-900/40",
        "border-neutral-300/60 dark:border-neutral-700/60",

        // Hover
        "hover:bg-white/80 dark:hover:bg-neutral-900/60",
        "hover:border-neutral-400 dark:hover:border-neutral-600",

        // Disabled
        "disabled:opacity-50 disabled:cursor-not-allowed",

        // Success State
        showSuccess &&
          "bg-emerald-500/20 border-emerald-400/30 text-emerald-600 dark:text-emerald-400",

        // Loading & normal state text color
        !showSuccess && "text-neutral-700 dark:text-neutral-200 shadow-sm"
      )}
    >
      {/* Icon */}
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : showSuccess ? (
        <Check className="size-4" />
      ) : (
        <Save className="size-4 transition-transform duration-300 group-hover:scale-110" />
      )}

      {/* Text */}
      <span className="transition-opacity duration-200">
        {isLoading ? "Saving..." : showSuccess ? "Saved" : "Save"}
      </span>

      {/* Glow on hover */}
      <span
        className={cn(
          "absolute inset-0 rounded-xl pointer-events-none transition-all duration-300",
          "group-hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.4)]"
        )}
      />
    </button>
  );
};
