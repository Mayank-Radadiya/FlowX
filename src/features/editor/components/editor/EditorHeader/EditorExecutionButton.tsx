"use client";

import { Play, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorExecutionButtonProps {
  workflowId: string;
  isRunning?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  onExecute?: () => void;
}

export function EditorExecutionButton({
  isRunning = false,
  isSuccess = false,
  isError = false,
  onExecute,
}: EditorExecutionButtonProps) {
  return (
    <button
      type="button"
      onClick={onExecute}
      disabled={isRunning}
      className={cn(
        // Base
        "group relative flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-medium",
        "transition-all duration-200 border shadow-sm backdrop-blur-md hover:shadow-lg hover:scale-105",

        // Default (idle)
        !isRunning &&
          !isSuccess &&
          !isError &&
          "bg-linear-to-r from-violet-600 to-violet-500 text-white border-purple-500 hover:bg-purple-700",

        // Running
        isRunning &&
          "bg-linear-to-r from-violet-600 to-violet-500/80 text-white border-emerald-500 cursor-not-allowed",

        // Success
        isSuccess &&
          "bg-emerald-500/30 text-black dark:text-white  border-emerald-400/30",

        // Error
        isError && "bg-red-500/15 text-red-600 border-red-400/30",

        // Focus & disabled
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40",
        "disabled:opacity-60 hover:opacity-90"
      )}
    >
      {/* Icon */}
      {isRunning ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isSuccess ? (
        <CheckCircle2 className="size-4" />
      ) : isError ? (
        <AlertTriangle className="size-4" />
      ) : (
        <Play className="size-4 transition-transform group-hover:translate-x-0.5" />
      )}

      {/* Label */}
      <span>
        {isRunning
          ? "Running…"
          : isSuccess
          ? "Executed"
          : isError
          ? "Failed"
          : "Execute"}
      </span>

      {/* Subtle glow on hover */}
      {!isRunning && !isSuccess && !isError && (
        <span className="absolute inset-0 rounded-xl pointer-events-none group-hover:shadow-[0_0_20px_-6px_rgba(16,185,129,0.6)] transition-shadow" />
      )}
    </button>
  );
}
