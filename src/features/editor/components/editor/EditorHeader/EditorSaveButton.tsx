"use client";

import { Save, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useEditorSave } from "./hooks/useEditorSave";

interface EditorSaveButtonProps {
  workflowId: string;
}

export const EditorSaveButton = ({ workflowId }: EditorSaveButtonProps) => {
  const { save, canSave, isSaving, isSuccess } = useEditorSave(workflowId);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(t);
    }
  }, [isSuccess]);

  return (
    <button
      onClick={save}
      disabled={!canSave || isSaving}
      className={cn(
        "relative flex w-28 items-center justify-center gap-2 rounded-xl px-4 py-1.5 text-sm font-medium",
        "border backdrop-blur-md transition-all duration-300",
        "bg-white/60 dark:bg-neutral-900/40",
        "border-neutral-300/60 dark:border-neutral-700/60",
        "hover:bg-white/80 dark:hover:bg-neutral-900/60",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        showSuccess &&
          "bg-emerald-500/20 border-emerald-400/30 text-emerald-600"
      )}
    >
      {isSaving ? (
        <Loader2 className="size-4 animate-spin" />
      ) : showSuccess ? (
        <Check className="size-4" />
      ) : (
        <Save className="size-4" />
      )}

      <span>{isSaving ? "Saving.." : showSuccess ? "Saved" : "Save"}</span>
    </button>
  );
};
