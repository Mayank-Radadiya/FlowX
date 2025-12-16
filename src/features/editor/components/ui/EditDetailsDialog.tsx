"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import {
  Dialog,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useSuspenseWorkflowById,
  useUpdateWorkflowNameAndDescription,
} from "@/features/workflows/hooks/use-workflows";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface EditDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflowId: string;
}

export const EditDetailsDialog = memo(
  ({ open, onOpenChange, workflowId }: EditDetailsDialogProps) => {
    const { data: workflow } = useSuspenseWorkflowById(workflowId);
    const updateMutation = useUpdateWorkflowNameAndDescription();

    // Use refs for form fields
    const nameRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const initial = useRef<{ name: string; description: string }>({
      name: workflow.name || "",
      description: workflow.description || "",
    });
    console.log("render-q");

    // Initialize refs when dialog opens
    useEffect(() => {
      if (open && workflow) {
        initial.current = {
          name: workflow.name ?? "",
          description: workflow.description ?? "",
        };
        if (nameRef.current) nameRef.current.value = initial.current.name;
        if (descRef.current)
          descRef.current.value = initial.current.description;
      }
    }, [open, workflow]);

    // Autofocus
    useEffect(() => {
      if (!open) return;
      const t = setTimeout(() => nameRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }, [open]);

    const handleSave = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = nameRef.current?.value.trim() ?? "";
        const trimmedDesc = descRef.current?.value.trim() ?? "";
        const isDirty =
          trimmedName !== initial.current.name ||
          trimmedDesc !== initial.current.description;
        if (!trimmedName || !isDirty) {
          onOpenChange(false);
          return;
        }
        updateMutation.mutate(
          {
            id: workflowId,
            name: trimmedName,
            description: trimmedDesc,
          },
          { onSuccess: () => onOpenChange(false) }
        );
      },
      [workflowId, updateMutation, onOpenChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          handleSave(e as any);
        }
      },
      [handleSave]
    );

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPopup className="max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-0">
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full px-3 py-1 text-xs font-semibold mr-2">
                Workflow
              </span>
              Edit Details
            </DialogTitle>
            <DialogDescription className="text-base text-zinc-500 dark:text-zinc-400">
              Give your workflow a clear name and description to help you
              understand its purpose.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSave}
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-6 px-8"
          >
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="workflow-name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Name
              </Label>
              <Input
                ref={nameRef}
                id="workflow-name"
                placeholder="e.g. Data Sync Automation"
                defaultValue={workflow.name || ""}
                autoComplete="off"
                maxLength={64}
                className="h-11 rounded-lg border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base px-4  transition"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="workflow-description"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Description
              </Label>
              <textarea
                ref={descRef}
                id="workflow-description"
                placeholder="Describe what this workflow does..."
                rows={3}
                defaultValue={workflow.description || ""}
                maxLength={256}
                className={cn(
                  "w-full rounded-lg border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base px-4 py-2 resize-none transition",
                  "placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                )}
              />
              <div className="text-xs text-zinc-400 text-right mt-1">
                {descRef.current?.value.length || 0}/256
              </div>
            </div>
            <DialogFooter
              variant="bare"
              className="flex items-center justify-end "
            >
              <div className="flex justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className=" h-10 rounded-lg border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className=" h-10 w-28 rounded-lg bg-primary text-white font-semibold transition flex items-center justify-center"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogPopup>
      </Dialog>
    );
  }
);
