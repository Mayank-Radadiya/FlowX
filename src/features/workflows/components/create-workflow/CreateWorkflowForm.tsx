/**
 * CreateWorkflowForm Component
 * ----------------------------
 * Renders the form used inside the "Create Workflow" dialog.
 *
 * Responsibilities:
 *  - Collect workflow name and description
 *  - Delegate form logic (submission, reset, keyboard handling)
 *    to a dedicated custom hook
 *  - Provide visual feedback during async workflow creation
 *  - Close the dialog and reset state after successful submission
 *
 * This component focuses purely on UI and interaction,
 * while business logic lives inside `useCreateWorkflowForm`.
 */

import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Loader2, Sparkles, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateWorkflowForm } from "./useCreateWorkflowForm";

interface CreateWorkflowFormProps {
  /**
   * Callback executed after the workflow
   * has been successfully created.
   */
  onDone: () => void;
}

export function CreateWorkflowForm({ onDone }: CreateWorkflowFormProps) {
  /**
   * Form logic abstraction
   * ----------------------
   * All mutable state and side effects are handled
   * by the custom hook.
   *
   * Returned values:
   *  - nameRef        → ref for workflow name input
   *  - descriptionRef→ ref for description textarea
   *  - submit         → submit handler
   *  - reset          → clears input values
   *  - isPending      → async submission state
   *  - keydown        → keyboard shortcut handling
   */
  const { nameRef, descriptionRef, submit, reset, isPending, keydown } =
    useCreateWorkflowForm(() => {
      onDone(); // Close dialog
      reset(); // Clear form inputs
    });

  return (
    <>
      {/* Form wrapper */}
      <form onSubmit={submit} onKeyDown={keydown}>
        <div className="space-y-4 px-6 py-4">
          {/* --------------------------------
              Workflow Name Field
          -------------------------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="workflow-name"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
            >
              <Type className="size-3.5" />
              Workflow Name
              <span className="text-xs font-normal text-neutral-400 dark:text-white/40">
                (optional)
              </span>
            </Label>

            <div className="relative">
              <Input
                id="workflow-name"
                ref={nameRef}
                placeholder="My awesome workflow..."
                disabled={isPending}
                className={cn(
                  // Base input styling
                  "h-11 rounded-xl border-black/10 dark:border-white/10",
                  "bg-black/2 dark:bg-white/5",

                  // Placeholder styling
                  "placeholder:text-neutral-400 dark:placeholder:text-white/30",

                  // Focus styles
                  "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20",

                  // Smooth visual transitions
                  "transition-all duration-200"
                )}
              />
            </div>

            <p className="text-xs text-neutral-500 dark:text-white/40">
              A creative name will be auto-generated if left empty
            </p>
          </div>

          {/* --------------------------------
              Workflow Description Field
          -------------------------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="workflow-description"
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
            >
              <FileText className="size-3.5" />
              Description
              <span className="text-xs font-normal text-neutral-400 dark:text-white/40">
                (optional)
              </span>
            </Label>

            <div className="relative">
              <textarea
                id="workflow-description"
                ref={descriptionRef}
                placeholder="Describe what this workflow does..."
                disabled={isPending}
                rows={3}
                className={cn(
                  // Base textarea styling
                  "flex w-full rounded-xl border px-3 py-2.5 text-sm",
                  "border-black/10 dark:border-white/10",
                  "bg-black/2 dark:bg-white/5",
                  "text-neutral-900 dark:text-white",

                  // Placeholder styling
                  "placeholder:text-neutral-400 dark:placeholder:text-white/30",

                  // Focus styles
                  "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none",

                  // UX behavior
                  "transition-all duration-200 resize-none",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              />
            </div>

            <p className="text-xs text-neutral-500 dark:text-white/40">
              Help others understand the purpose of this workflow
            </p>
          </div>
        </div>

        {/* --------------------------------
            Dialog Footer Actions
        -------------------------------- */}
        <DialogFooter>
          {/* Cancel button */}
          <DialogClose
            disabled={isPending}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancel
          </DialogClose>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isPending}
            className="h-10 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-violet-500/25"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                Create Workflow
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}